"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MainNav } from "../components/MainNav"
import { Footer } from "../components/Footer"
import { DashboardNav } from "../components/DashboardNav"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Progress } from "../components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Calendar, Clock, Award } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"

// Українські літери
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

// Функція для отримання даних прогресу з localStorage
function getProgressData() {
  const storedData = localStorage.getItem("progressData")
  if (storedData) {
    return JSON.parse(storedData)
  }

  // Створюємо початкові дані, якщо немає збережених
  const initialData = {
    masteredLetters: ["А", "Б", "В", "Г", "Д", "Е"],
    inProgressLetters: ["Є", "Ж", "З", "И", "І"],
    sessions: [
      {
        date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 дні тому
        duration: 15, // хвилин
        letters: ["А", "Б", "В"],
        accuracy: 85,
      },
      {
        date: new Date(Date.now() - 86400000).toISOString(), // 1 день тому
        duration: 20,
        letters: ["Г", "Д", "Е"],
        accuracy: 78,
      },
      {
        date: new Date().toISOString(), // сьогодні
        duration: 25,
        letters: ["Є", "Ж", "З"],
        accuracy: 65,
      },
    ],
    totalPracticeTime: 60, // хвилин
    letterAccuracy: {
      А: 95,
      Б: 90,
      В: 85,
      Г: 80,
      Д: 75,
      Е: 70,
      Є: 65,
      Ж: 60,
      З: 55,
      И: 50,
      І: 45,
    },
  }

  return initialData
}

export default function ProgressPage() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [progressData, setProgressData] = useState(getProgressData())

  // Розрахунок загального прогресу
  const overallProgress = Math.round((progressData.masteredLetters.length / ukrainianAlphabet.length) * 100)

  // Літери, які потрібно практикувати (ті, які не вивчені і не в процесі)
  const lettersToPractice = ukrainianAlphabet.filter(
    (letter) => !progressData.masteredLetters.includes(letter) && !progressData.inProgressLetters.includes(letter),
  )

  // Найбільш практиковані літери (сортування за точністю)
  const mostPracticedLetters = Object.entries(progressData.letterAccuracy)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  // Середня точність
  const averageAccuracy =
    Object.values(progressData.letterAccuracy).reduce((sum, acc) => sum + acc, 0) /
    Object.values(progressData.letterAccuracy).length

  // Рекомендовані літери для практики (з найнижчою точністю)
  const recommendedLetters = Object.entries(progressData.letterAccuracy)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 3)
    .map(([letter]) => letter)

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 flex">
        <DashboardNav />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{t.progressTitle}</h1>
              <p className="text-muted-foreground">{t.progressSubtitle}</p>
            </div>

            {/* Загальний прогрес */}
            <Card>
              <CardHeader>
                <CardTitle>{t.overallProgress}</CardTitle>
                <CardDescription>{t.alphabetMastery}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Progress value={overallProgress} className="h-2" />
                  <div className="text-sm text-muted-foreground text-right">
                    {overallProgress}% {t.complete}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <div>
                      <div className="text-sm font-medium">{t.masteredLetters}</div>
                      <div className="text-2xl font-bold">{progressData.masteredLetters.length}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                    <div>
                      <div className="text-sm font-medium">{t.lettersInProgress}</div>
                      <div className="text-2xl font-bold">{progressData.inProgressLetters.length}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    <div>
                      <div className="text-sm font-medium">{t.lettersToPractice}</div>
                      <div className="text-2xl font-bold">{lettersToPractice.length}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Вкладки для різних видів даних */}
            <Tabs defaultValue="recent" className="space-y-4">
              <TabsList className="grid grid-cols-3 md:w-[600px]">
                <TabsTrigger value="recent">{t.recentActivity}</TabsTrigger>
                <TabsTrigger value="statistics">{t.statisticsTitle}</TabsTrigger>
                <TabsTrigger value="recommendations">{t.recommendationsTitle}</TabsTrigger>
              </TabsList>

              {/* Нещодавня активність */}
              <TabsContent value="recent" className="space-y-4">
                {progressData.sessions
                  .slice()
                  .reverse()
                  .map((session, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">
                            {t.practiceSession} {index + 1}
                          </CardTitle>
                          <div className="text-sm text-muted-foreground">
                            {new Date(session.date).toLocaleDateString()}
                          </div>
                        </div>
                        <CardDescription>
                          {session.duration} {t.practiceTime} • {session.accuracy}% {t.accuracyRate}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          <div className="text-sm font-medium">{t.lettersPracticed}:</div>
                          {session.letters.map((letter, i) => (
                            <div key={i} className="px-2 py-1 bg-muted rounded-md text-sm">
                              {letter}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm">
                          {t.viewDetails}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </TabsContent>

              {/* Статистика */}
              <TabsContent value="statistics" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <Clock className="h-5 w-5 text-primary mb-1" />
                      <CardTitle className="text-lg">{t.practiceTime}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{progressData.totalPracticeTime} хв.</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <Calendar className="h-5 w-5 text-primary mb-1" />
                      <CardTitle className="text-lg">{t.totalSessions}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{progressData.sessions.length}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <Award className="h-5 w-5 text-primary mb-1" />
                      <CardTitle className="text-lg">{t.averageAccuracy}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold">{Math.round(averageAccuracy)}%</div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>{t.mostPracticedLetters}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mostPracticedLetters.map(([letter, accuracy], index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 font-bold">
                            {letter}
                          </div>
                          <div className="flex-1">
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${accuracy}%` }}></div>
                            </div>
                          </div>
                          <div className="ml-3 text-sm font-medium">{accuracy}%</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Рекомендації */}
              <TabsContent value="recommendations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{t.recommendationsTitle}</CardTitle>
                    <CardDescription>{t.recommendationsText}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3 mb-6">
                      {recommendedLetters.map((letter, index) => (
                        <div key={index} className="flex items-center p-3 border rounded-lg">
                          <div className="text-3xl font-bold mr-3">{letter}</div>
                          <div className="text-sm">
                            <div className="font-medium">Точність: {progressData.letterAccuracy[letter]}%</div>
                            <div className="text-muted-foreground">Потребує практики</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => navigate("/training")}>{t.continueTraining}</Button>
                  </CardFooter>
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
