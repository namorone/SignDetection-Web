"use client"

import { useState } from "react"
import { MainNav } from "../components/MainNav"
import { Footer } from "../components/Footer"
import { DashboardNav } from "../components/DashboardNav"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Slider } from "../components/ui/slider"
import { Switch } from "../components/ui/switch"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { SignLanguageRecognition } from "../components/SignLanguageRecognition"
import { SpeechToText } from "../components/SpeechToText"
import { useLanguage } from "../contexts/LanguageContext"

export default function TranslatorPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("sign-to-text")
  const [recognitionSpeed, setRecognitionSpeed] = useState(50)
  const [isRecognizing, setIsRecognizing] = useState(false)
  const [recognizedText, setRecognizedText] = useState("")
  const [spokenText, setSpokenText] = useState("")

  const handleRecognitionToggle = () => {
    setIsRecognizing(!isRecognizing)
  }

  const handleRecognizedTextUpdate = (text) => {
    setRecognizedText(text)
  }

  const handleSpokenTextUpdate = (text) => {
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
              <h1 className="text-3xl font-bold tracking-tight">{t.translatorTitle}</h1>
              <p className="text-muted-foreground">{t.translatorSubtitle}</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="sign-to-text">{t.signToText}</TabsTrigger>
                <TabsTrigger value="text-to-sign">{t.textToSign}</TabsTrigger>
              </TabsList>

              <TabsContent value="sign-to-text" className="space-y-4">
                <Card >
                  <CardContent className="mt-6">
                    <div className="-mt6 grid gap-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="recognition-speed">{t.recognitionSpeed}</Label>
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
                            {isRecognizing ? t.stopRecognition : t.startRecognition}
                          </Label>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" onClick={clearText} className="flex-1">
                            {t.clear}
                          </Button>
                          <Button
                            variant="default"
                            className="flex-1"
                            disabled={!recognizedText}
                            onClick={() => navigator.clipboard.writeText(recognizedText)}
                          >
                            {t.copyText}
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
                          placeholder={t.recognizedTextPlaceholder}
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
                  <CardContent className="p-6 pt-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="speech-toggle"
                            checked={isRecognizing}
                            onCheckedChange={handleRecognitionToggle}
                          />
                          <Label htmlFor="speech-toggle">{isRecognizing ? t.stopListening : t.startListening}</Label>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" onClick={clearText} className="flex-1">
                            {t.clear}
                          </Button>
                          <Button
                            variant="default"
                            className="flex-1"
                            disabled={!spokenText}
                            onClick={() => navigator.clipboard.writeText(spokenText)}
                          >
                            {t.copyText}
                          </Button>
                        </div>

                        <Textarea
                          placeholder={t.spokenTextPlaceholder}
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
