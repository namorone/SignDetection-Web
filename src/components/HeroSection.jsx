"use client"

import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useLanguage } from "../contexts/LanguageContext"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">{t.heroTitle}</h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">{t.heroSubtitle}</p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link to="/register">
                <Button size="lg" className="w-full min-[400px]:w-auto">
                  {t.getStarted}
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                  {t.signIn}
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[300px] w-[300px] md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50 rounded-full opacity-20 blur-3xl"></div>
              <div className="relative h-full w-full rounded-lg overflow-hidden border bg-background">
                <div className="flex items-center justify-center h-full text-center p-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{t.interactiveDemo}</h3>
                    <p className="text-muted-foreground mb-4">{t.experienceRealTime}</p>
                    <Link to="/register">
                      <Button>{t.tryNow}</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
