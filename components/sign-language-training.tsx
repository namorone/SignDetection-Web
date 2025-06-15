"use client"

import { useEffect, useRef, useState } from "react"

interface SignLanguageTrainingProps {
  targetLetter: string
  onResult: (success: boolean) => void
}

export function SignLanguageTraining({ targetLetter, onResult }: SignLanguageTrainingProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [isCapturing, setIsCapturing] = useState(false)

  // Start webcam
  useEffect(() => {
    let stream: MediaStream | null = null

    const startWebcam = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (err) {
        console.error("Error accessing webcam:", err)
      }
    }

    startWebcam()

    // Start countdown
    setCountdown(3)

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  // Handle countdown
  useEffect(() => {
    if (countdown === null) return

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)

      return () => clearTimeout(timer)
    } else {
      // When countdown reaches 0, capture image
      setIsCapturing(true)
      captureAndVerify()
    }
  }, [countdown])

  const captureAndVerify = () => {
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
    // 3. Receive the verification result

    // For this demo, we'll simulate verification with a random result
    simulateVerification()
  }

  const simulateVerification = () => {
    // Simulate a delay for processing
    setTimeout(() => {
      // 70% chance of success for demo purposes
      const success = Math.random() < 0.7
      onResult(success)
      setIsCapturing(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
        <canvas ref={canvasRef} className="hidden" />

        {countdown !== null && countdown > 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/50 text-white text-5xl font-bold rounded-full h-20 w-20 flex items-center justify-center">
              {countdown}
            </div>
          </div>
        )}

        {isCapturing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="text-white text-xl">Analyzing your sign...</div>
          </div>
        )}
      </div>

      <div className="mt-4 text-center">
        <p>
          Show the sign for letter <span className="font-bold text-xl">{targetLetter}</span>
        </p>
      </div>
    </div>
  )
}
