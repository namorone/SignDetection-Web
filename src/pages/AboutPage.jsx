"use client"

import { MainNav } from "../components/MainNav"
import { Footer } from "../components/Footer"
import { Card, CardContent } from "../components/ui/card"
import { useLanguage } from "../contexts/LanguageContext"

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t.aboutTitle}</h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">{t.aboutSubtitle}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">{t.ourMission}</h2>
                <p className="text-muted-foreground">{t.ourMissionText}</p>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">{t.ourStory}</h2>
                <p className="text-muted-foreground">{t.ourStoryText}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-[800px] space-y-6">
              <h2 className="text-3xl font-bold text-center">{t.ourTechnology}</h2>
              <p className="text-muted-foreground text-center">{t.ourTechnologyText}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7H2Z" />
                        <path d="M6 11c0-5 1.5-6 4-6s4 1 4 6" />
                        <path d="M10 5v16" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Нейронні мережі</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Використовуємо глибокі нейронні мережі для розпізнавання жестів з високою точністю.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M15 3a3 3 0 0 0-3 3m0 0a3 3 0 0 0 3 3m0 0h6m-6 0a3 3 0 0 1-3 3m0 0a3 3 0 0 1-3-3m0 0H3m6 0a3 3 0 0 0-3 3m0 0a3 3 0 0 0 3 3m0 0h6m-6 0a3 3 0 0 1-3-3" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Комп'ютерний зір</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Передові алгоритми комп'ютерного зору для відстеження рухів рук та пальців.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M12 3v19" />
                        <path d="M5 8h14" />
                        <path d="M15 5h-3v3h3V5Z" />
                        <path d="M9 11v4h3v-4H9Z" />
                        <path d="M15 17h-3v3h3v-3Z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Машинне навчання</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Постійне вдосконалення моделей через машинне навчання для підвищення точності.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">{t.meetTheTeam}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-muted mb-4 overflow-hidden">
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center text-2xl font-bold">
                      ОП
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">{t.teamMember1}</h3>
                  <p className="text-sm text-muted-foreground">{t.teamMember1Role}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-muted mb-4 overflow-hidden">
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center text-2xl font-bold">
                      МК
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">{t.teamMember2}</h3>
                  <p className="text-sm text-muted-foreground">{t.teamMember2Role}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-muted mb-4 overflow-hidden">
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center text-2xl font-bold">
                      ІШ
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">{t.teamMember3}</h3>
                  <p className="text-sm text-muted-foreground">{t.teamMember3Role}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-muted mb-4 overflow-hidden">
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center text-2xl font-bold">
                      НМ
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">{t.teamMember4}</h3>
                  <p className="text-sm text-muted-foreground">{t.teamMember4Role}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
