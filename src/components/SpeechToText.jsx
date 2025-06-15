"use client"

import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Mic, MicOff } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"

export function SpeechToText({ isActive, onTextUpdate }) {
  const { t } = useLanguage()
  const [transcript, setTranscript] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState(null)

  // Initialize speech recognition
  useEffect(() => {
    // Check if browser supports speech recognition
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      // Browser doesn't know about SpeechRecognition
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()

      recognitionInstance.continuous = true
      recognitionInstance.interimResults = true
      recognitionInstance.lang = "uk-UA" // Ukrainian language

      recognitionInstance.onresult = (event) => {
        let interimTranscript = ""
        let finalTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }

        // Update transcript
        setTranscript((prev) => prev + finalTranscript)
        onTextUpdate((prev) => prev + finalTranscript)
      }

      setRecognition(recognitionInstance)
    } else {
      console.error("Speech recognition not supported in this browser")
    }

    return () => {
      if (recognition) {
        recognition.stop()
      }
    }
  }, [onTextUpdate])

  // Handle active state changes
  useEffect(() => {
    if (recognition) {
      if (isActive && !isListening) {
        startListening()
      } else if (!isActive && isListening) {
        stopListening()
      }
    }
  }, [isActive, isListening, recognition])

  const startListening = () => {
    if (recognition) {
      recognition.start()
      setIsListening(true)
    }
  }

  const stopListening = () => {
    if (recognition) {
      recognition.stop()
      setIsListening(false)
    }
  }

  const clearTranscript = () => {
    setTranscript("")
    onTextUpdate("")
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-full h-full flex items-center justify-center">
        {isListening ? (
          <div className="flex flex-col items-center">
            <Mic className="h-16 w-16 text-primary animate-pulse" />
            <p className="mt-2">{t.listeningActive}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <MicOff className="h-16 w-16 text-muted-foreground" />
            <p className="mt-2">{t.microphoneInactive}</p>
          </div>
        )}
      </div>

      {transcript && (
        <Button variant="outline" size="sm" onClick={clearTranscript}>
          {t.clear}
        </Button>
      )}
    </div>
  )
}
