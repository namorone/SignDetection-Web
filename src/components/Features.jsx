"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Camera, Mic, BookOpen, BarChart } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"

export function Features() {
  const { t } = useLanguage()

  return (
    <section className="py-12 px-4 md:py-24">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">{t.keyFeatures}</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">{t.keyFeaturesSubtitle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <Camera className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>{t.signLanguageRecognition}</CardTitle>
              <CardDescription>{t.signLanguageRecognitionDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{t.signLanguageRecognitionText}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <Mic className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>{t.speechToText}</CardTitle>
              <CardDescription>{t.speechToTextDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{t.speechToTextText}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <BookOpen className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>{t.interactiveLearning}</CardTitle>
              <CardDescription>{t.interactiveLearningDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{t.interactiveLearningText}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <BarChart className="h-10 w-10 mb-2 text-primary" />
              <CardTitle>{t.progressTracking}</CardTitle>
              <CardDescription>{t.progressTrackingDesc}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{t.progressTrackingText}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
