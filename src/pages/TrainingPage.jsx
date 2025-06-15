"use client"

import { useState, useEffect } from "react"
import { MainNav } from "../components/MainNav"
import { Footer } from "../components/Footer"
import { DashboardNav } from "../components/DashboardNav"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Progress } from "../components/ui/progress"
import { SignLanguageTraining } from "../components/SignLanguageTraining"
import { useLanguage } from "../contexts/LanguageContext"

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

export default function TrainingPage() {
  const { t } = useLanguage()
  const [currentLetter, setCurrentLetter] = useState("А")
  const [trainingActive, setTrainingActive] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState(null)

  useEffect(() => {
    // Calculate progress based on current letter
    const index = ukrainianAlphabet.indexOf(currentLetter)
    setProgress(((index + 1) / ukrainianAlphabet.length) * 100)
  }, [currentLetter])

  const startTraining = () => {
    setTrainingActive(true)
    setResult(null)
  }

  const stopTraining = () => {
    setTrainingActive(false)
  }

  const handleNextLetter = () => {
    const currentIndex = ukrainianAlphabet.indexOf(currentLetter)
    if (currentIndex < ukrainianAlphabet.length - 1) {
      setCurrentLetter(ukrainianAlphabet[currentIndex + 1])
    } else {
      // Completed all letters
      setCurrentLetter(ukrainianAlphabet[0])
    }
    setResult(null)
  }

  const handlePreviousLetter = () => {
    const currentIndex = ukrainianAlphabet.indexOf(currentLetter)
    if (currentIndex > 0) {
      setCurrentLetter(ukrainianAlphabet[currentIndex - 1])
    } else {
      // Wrap to the end
      setCurrentLetter(ukrainianAlphabet[ukrainianAlphabet.length - 1])
    }
    setResult(null)
  }

  const handleTrainingResult = (success) => {
    setResult(success)
    setTrainingActive(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 flex">
        <DashboardNav />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{t.trainingTitle}</h1>
              <p className="text-muted-foreground">{t.trainingSubtitle}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>{t.trainingProgress}</CardTitle>
                  <CardDescription>{t.trackProgress}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={progress} className="h-2" />
                  <div className="mt-2 text-sm text-muted-foreground">
                    {Math.round(progress)}% {t.complete}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    {t.currentLetter}
                    {currentLetter}
                  </CardTitle>
                  <CardDescription>{t.learnToSign}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="relative w-64 h-64 border rounded-lg overflow-hidden flex items-center justify-center text-6xl font-bold">
                    {currentLetter}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handlePreviousLetter}>
                    {t.previous}
                  </Button>
                  <Button variant="outline" onClick={handleNextLetter}>
                    {t.next}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t.practiceSign}</CardTitle>
                  <CardDescription>{t.showSignToCamera}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-64 overflow-hidden">
                    {trainingActive ? (
                      <SignLanguageTraining targetLetter={currentLetter} onResult={handleTrainingResult} />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        {result === null ? (
                          <p className="text-muted-foreground">{t.pressStartToBegin}</p>
                        ) : result ? (
                          <div className="text-center">
                            <div className="text-green-500 text-xl mb-2">{t.correct}</div>
                            <p>
                              {t.greatJob} {currentLetter}.
                            </p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className="text-red-500 text-xl mb-2">{t.tryAgain}</div>
                            <p>
                              {t.signNotRecognized} {currentLetter}.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  {!trainingActive ? (
                    <Button onClick={startTraining}>{t.startPractice}</Button>
                  ) : (
                    <Button variant="destructive" onClick={stopTraining}>
                      {t.stop}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
