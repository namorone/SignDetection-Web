"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import { useLanguage } from "../contexts/LanguageContext"

export function SignLanguageRecognition({ isActive, speed, onTextUpdate }) {
  const { t } = useLanguage()
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [recognizedLetters, setRecognizedLetters] = useState([])
  const [isWebcamReady, setIsWebcamReady] = useState(false)

  // Start webcam
  useEffect(() => {
    let stream = null

    const startWebcam = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setIsWebcamReady(true)
        }
      } catch (err) {
        console.error("Error accessing webcam:", err)
      }
    }

    startWebcam()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  // Handle recognition based on isActive state
  useEffect(() => {
    let recognitionInterval = null

    if (isActive && isWebcamReady) {
      // Calculate interval based on speed (10% = slow, 100% = fast)
      const intervalTime = 2000 - speed * 15 // 500ms to 1500ms

      recognitionInterval = setInterval(() => {
        captureAndRecognize()
      }, intervalTime)
    }

    return () => {
      if (recognitionInterval) {
        clearInterval(recognitionInterval)
      }
    }
  }, [isActive, speed, isWebcamReady])

  // Update parent component with recognized text
  useEffect(() => {
    onTextUpdate(recognizedLetters.join(""))
  }, [recognizedLetters, onTextUpdate])

  const captureAndRecognize = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    if (!context) return

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    // In a real implementation, you would:
    // 1. Get the image data from the canvas
    // 2. Send it to your backend API for processing with the Python model
    // 3. Receive the recognized letter

    // For this demo, we'll simulate recognition with random Ukrainian letters
    simulateRecognition()
  }

  const simulateRecognition = () => {
    // Ukrainian alphabet
    const ukrainianAlphabet = [
      "А",
      "Б",
      "В",
      "Г",
      "Ґ",
      "Д",
      "Е",
      "Є",
      "Ж",
      "З",
      "И",
      "І",
      "Ї",
      "Й",
      "К",
      "Л",
      "М",
      "Н",
      "О",
      "П",
      "Р",
      "С",
      "Т",
      "У",
      "Ф",
      "Х",
      "Ц",
      "Ч",
      "Ш",
      "Щ",
      "Ю",
      "Я",
      "Ь",
    ]

    // Randomly select a letter (in a real app, this would come from your model)
    const randomIndex = Math.floor(Math.random() * ukrainianAlphabet.length)
    const recognizedLetter = ukrainianAlphabet[randomIndex]

    // Add the letter to our recognized letters array
    setRecognizedLetters((prev) => [...prev, recognizedLetter])
  }

  const clearRecognizedText = () => {
    setRecognizedLetters([])
    onTextUpdate("")
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
        <canvas ref={canvasRef} className="hidden" />

        {!isWebcamReady && (
          <div className="absolute inset-0 flex items-center justify-center text-white">
            {t.language === "uk" ? "Завантаження веб-камери..." : "Loading webcam..."}
          </div>
        )}

        {isActive && (
          <div className="absolute top-2 right-2">
            <div className="animate-pulse bg-red-500 rounded-full h-3 w-3"></div>
          </div>
        )}
      </div>

      {recognizedLetters.length > 0 && (
        <Button variant="outline" size="sm" onClick={clearRecognizedText}>
          {t.clear}
        </Button>
      )}
    </div>
  )
}
