"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { DashboardNav } from "@/components/dashboard-nav"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SignLanguageRecognition } from "@/components/sign-language-recognition"
import { SpeechToText } from "@/components/speech-to-text"

export default function TranslatorPage() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()
  const [activeTab, setActiveTab] = useState("sign-to-text")
  const [recognitionSpeed, setRecognitionSpeed] = useState(50)
  const [isRecognizing, setIsRecognizing] = useState(false)
  const [recognizedText, setRecognizedText] = useState("")
  const [spokenText, setSpokenText] = useState("")

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login")
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading || !isAuthenticated) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  const handleRecognitionToggle = () => {
    setIsRecognizing(!isRecognizing)
  }

  const handleRecognizedTextUpdate = (text: string) => {
    setRecognizedText(text)
  }

  const handleSpokenTextUpdate = (text: string) => {
    setSpokenText(text)
  }

  const clearText = () => {
    if (activeTab === "sign-to-text") {
      setRecognizedText("")
    } else {
      setSpokenText("")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 flex">
        <DashboardNav />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Translator</h1>
              <p className="text-muted-foreground">Translate between sign language and speech</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="sign-to-text">Sign Language to Text</TabsTrigger>
                <TabsTrigger value="text-to-sign">Speech to Text</TabsTrigger>
              </TabsList>

              <TabsContent value="sign-to-text" className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="recognition-speed">Recognition Speed</Label>
                            <span className="text-sm text-muted-foreground">{recognitionSpeed}%</span>
                          </div>
                          <Slider
                            id="recognition-speed"
                            min={10}
                            max={100}
                            step={10}
                            value={[recognitionSpeed]}
                            onValueChange={(value) => setRecognitionSpeed(value[0])}
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch
                            id="recognition-toggle"
                            checked={isRecognizing}
                            onCheckedChange={handleRecognitionToggle}
                          />
                          <Label htmlFor="recognition-toggle">
                            {isRecognizing ? "Stop Recognition" : "Start Recognition"}
                          </Label>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" onClick={clearText} className="flex-1">
                            Clear
                          </Button>
                          <Button variant="default" className="flex-1" disabled={!recognizedText}>
                            Copy Text
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-64 overflow-auto p-4">
                          <SignLanguageRecognition
                            isActive={isRecognizing}
                            speed={recognitionSpeed}
                            onTextUpdate={handleRecognizedTextUpdate}
                          />
                        </div>

                        <Textarea
                          placeholder="Recognized text will appear here..."
                          value={recognizedText}
                          onChange={(e) => setRecognizedText(e.target.value)}
                          className="min-h-[120px]"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="text-to-sign" className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="speech-toggle"
                            checked={isRecognizing}
                            onCheckedChange={handleRecognitionToggle}
                          />
                          <Label htmlFor="speech-toggle">{isRecognizing ? "Stop Listening" : "Start Listening"}</Label>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" onClick={clearText} className="flex-1">
                            Clear
                          </Button>
                          <Button variant="default" className="flex-1" disabled={!spokenText}>
                            Copy Text
                          </Button>
                        </div>

                        <Textarea
                          placeholder="Spoken text will appear here..."
                          value={spokenText}
                          onChange={(e) => setSpokenText(e.target.value)}
                          className="min-h-[120px]"
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-64 overflow-auto p-4">
                          <SpeechToText isActive={isRecognizing} onTextUpdate={handleSpokenTextUpdate} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
