"use client"

import { Link, useLocation } from "react-router-dom"
import { cn } from "../lib/utils"
import { Button } from "./ui/button"
import { useAuth } from "../hooks/useAuth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { ModeToggle } from "./ModeToggle"
import { LanguageSwitcher } from "./LanguageSwitcher"
import { LogOut } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"

// Функція для отримання ініціалів з імені
function getInitials(name) {
  if (!name) return "U"

  const parts = name.split(" ")
  if (parts.length === 1) {
    return name.substring(0, 2).toUpperCase()
  }

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function MainNav() {
  const location = useLocation()
  const { user, isAuthenticated, signOut } = useAuth()
  const { t } = useLanguage()

  // Отримуємо ініціали користувача
  const userInitials = getInitials(user?.name)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl">USL {t.translator}</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/"
              className={cn(
                "transition-colors hover:text-foreground/80",
                location.pathname === "/" ? "text-foreground" : "text-foreground/60",
              )}
            >
              {t.home}
            </Link>
            <Link
              to="/about"
              className={cn(
                "transition-colors hover:text-foreground/80",
                location.pathname === "/about" ? "text-foreground" : "text-foreground/60",
              )}
            >
              {t.about}
            </Link>
            <Link
              to="/contact"
              className={cn(
                "transition-colors hover:text-foreground/80",
                location.pathname === "/contact" ? "text-foreground" : "text-foreground/60",
              )}
            >
              {t.contact}
            </Link>
          </nav>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <LanguageSwitcher />
          <ModeToggle />
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full overflow-hidden p-0">
                  <div className="w-full h-full bg-primary/20 flex items-center justify-center text-sm font-medium">
                    {userInitials}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">{t.dashboard}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">{t.settings}</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t.logout}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="ghost">{t.signIn}</Button>
              </Link>
              <Link to="/register">
                <Button>{t.signUp}</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
