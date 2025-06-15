"use client"

import { useNavigate } from "react-router-dom"
import { MainNav } from "../components/MainNav"
import { Footer } from "../components/Footer"
import { DashboardNav } from "../components/DashboardNav"
import { useAuth } from "../hooks/useAuth"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { useLanguage } from "../contexts/LanguageContext"

export default function DashboardPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { t } = useLanguage()

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 flex">
        <DashboardNav />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{t.dashboard}</h1>
              <p className="text-muted-foreground">
                {t.welcomeBack}
                {user?.name || "User"}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>{t.translator}</CardTitle>
                  <CardDescription>{t.translatorSubtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" onClick={() => navigate("/translator")}>
                    {t.openTranslator}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>{t.training}</CardTitle>
                  <CardDescription>{t.trainingSubtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" onClick={() => navigate("/training")}>
                    {t.startTraining}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>{t.progressTitle}</CardTitle>
                  <CardDescription>{t.progressSubtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" onClick={() => navigate("/progress")} variant="outline">
                    {t.viewProgress}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
