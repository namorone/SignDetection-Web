"use client"

import { Link, useLocation } from "react-router-dom"
import { cn } from "../lib/utils"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Menu } from "lucide-react"
import { useState } from "react"
import { useMobile } from "../hooks/useMobile"
import { useLanguage } from "../contexts/LanguageContext"

export function DashboardNav() {
  const location = useLocation()
  const isMobile = useMobile()
  const [open, setOpen] = useState(false)
  const { t, language } = useLanguage()

  // Використовуємо переклади для пунктів меню
  const navItems = [
    {
      title: t.dashboard,
      href: "/dashboard",
    },
    {
      title: t.translator,
      href: "/translator",
    },
    {
      title: t.training,
      href: "/training",
    },
    {
      title: t.progress,
      href: "/progress",
    },
    {
      title: t.settings,
      href: "/settings",
    },
  ]

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden ml-2 mt-2">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <ScrollArea className="h-full py-6">
            <div className="px-4 py-4">
              <h2 className="text-lg font-semibold">{language === "uk" ? "Навігація" : "Navigation"}</h2>
            </div>
            <nav className="grid gap-1 px-2">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                    location.pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div className="hidden border-r bg-muted/40 md:block w-64">
      <ScrollArea className="h-full py-6">
        <div className="px-4 py-4">
          <h2 className="text-lg font-semibold">{language === "uk" ? "Навігація" : "Navigation"}</h2>
        </div>
        <nav className="grid gap-1 px-2">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                location.pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted",
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}
