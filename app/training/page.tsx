"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { DashboardNav } from "@/components/dashboard-nav"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { SignLanguageTraining } from "@/components/sign-language-training"

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
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()
  const [currentLetter, setCurrentLetter] = useState("А")
  const [trainingActive, setTrainingActive] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<null | boolean>(null)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login")
    }
  }, [isLoading, isAuthenticated, router])

  useEffect(() => {
    // Calculate progress based on current letter
    const index = ukrainianAlphabet.indexOf(currentLetter)
    setProgress(((index + 1) / ukrainianAlphabet.length) * 100)
  }, [currentLetter])

  if (isLoading || !isAuthenticated) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

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

  const handleTrainingResult = (success: boolean) => {
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
              <h1 className="text-3xl font-bold tracking-tight">Sign Language Training</h1>
              <p className="text-muted-foreground">Practice and learn Ukrainian sign language</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Training Progress</CardTitle>
                  <CardDescription>Track your progress through the Ukrainian alphabet</CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={progress} className="h-2" />
                  <div className="mt-2 text-sm text-muted-foreground">{Math.round(progress)}% complete</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Letter: {currentLetter}</CardTitle>
                  <CardDescription>Learn how to sign this letter</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div className="relative w-64 h-64 border rounded-lg overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=256&width=256&text=${currentLetter}`}
                      alt={`Sign for letter ${currentLetter}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handlePreviousLetter}>
                    Previous
                  </Button>
                  <Button variant="outline" onClick={handleNextLetter}>
                    Next
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Practice Sign</CardTitle>
                  <CardDescription>Show your sign to the camera for verification</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-64 overflow-hidden">
                    {trainingActive ? (
                      <SignLanguageTraining targetLetter={currentLetter} onResult={handleTrainingResult} />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        {result === null ? (
                          <p className="text-muted-foreground">Press Start to begin</p>
                        ) : result ? (
                          <div className="text-center">
                            <div className="text-green-500 text-xl mb-2">Correct!</div>
                            <p>Great job! You signed {currentLetter} correctly.</p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className="text-red-500 text-xl mb-2">Try Again</div>
                            <p>Your sign for {currentLetter} wasn't recognized.</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  {!trainingActive ? (
                    <Button onClick={startTraining}>Start Practice</Button>
                  ) : (
                    <Button variant="destructive" onClick={stopTraining}>
                      Stop
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
