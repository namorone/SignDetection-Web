"use client"

import { useState } from "react"
import { MainNav } from "../components/MainNav"
import { Footer } from "../components/Footer"
import { DashboardNav } from "../components/DashboardNav"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Label } from "../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Switch } from "../components/ui/switch"
import { Separator } from "../components/ui/separator"
import { useTheme } from "../components/ThemeProvider"
import { useLanguage } from "../contexts/LanguageContext"

export default function SettingsPage() {
  const { t, language, setLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState({
    email: true,
    browser: true,
    practiceReminders: true,
    updates: false,
  })
  const [privacy, setPrivacy] = useState({
    shareProgress: true,
    collectUsageData: true,
  })

  const handleNotificationChange = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handlePrivacyChange = (key) => {
    setPrivacy((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 flex">
        <DashboardNav />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{t.settings}</h1>
              <p className="text-muted-foreground">
                {language === "uk"
                  ? "Керуйте своїми налаштуваннями та перевагами"
                  : "Manage your settings and preferences"}
              </p>
            </div>

            <div className="grid gap-6">
              {/* Мовні налаштування */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.language}</CardTitle>
                  <CardDescription>
                    {language === "uk" ? "Оберіть мову інтерфейсу" : "Choose interface language"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={language} onValueChange={setLanguage} className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="uk" id="uk" />
                      <Label htmlFor="uk">{t.ukrainian}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="en" id="en" />
                      <Label htmlFor="en">{t.english}</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Налаштування теми */}
              <Card>
                <CardHeader>
                  <CardTitle>{language === "uk" ? "Тема" : "Theme"}</CardTitle>
                  <CardDescription>
                    {language === "uk"
                      ? "Налаштуйте зовнішній вигляд додатку"
                      : "Customize the appearance of the application"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={theme} onValueChange={setTheme} className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light">{language === "uk" ? "Світла" : "Light"}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark">{language === "uk" ? "Темна" : "Dark"}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="system" />
                      <Label htmlFor="system">{language === "uk" ? "Системна" : "System"}</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Налаштування сповіщень */}
              <Card>
                <CardHeader>
                  <CardTitle>{language === "uk" ? "Сповіщення" : "Notifications"}</CardTitle>
                  <CardDescription>
                    {language === "uk"
                      ? "Налаштуйте, як ви хочете отримувати сповіщення"
                      : "Configure how you want to receive notifications"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">{language === "uk" ? "Електронна пошта" : "Email"}</Label>
                      <p className="text-sm text-muted-foreground">
                        {language === "uk"
                          ? "Отримувати сповіщення на електронну пошту"
                          : "Receive notifications via email"}
                      </p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notifications.email}
                      onCheckedChange={() => handleNotificationChange("email")}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="browser-notifications">{language === "uk" ? "Браузер" : "Browser"}</Label>
                      <p className="text-sm text-muted-foreground">
                        {language === "uk" ? "Отримувати сповіщення в браузері" : "Receive notifications in browser"}
                      </p>
                    </div>
                    <Switch
                      id="browser-notifications"
                      checked={notifications.browser}
                      onCheckedChange={() => handleNotificationChange("browser")}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="practice-reminders">
                        {language === "uk" ? "Нагадування про практику" : "Practice Reminders"}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {language === "uk"
                          ? "Отримувати нагадування про щоденну практику"
                          : "Receive reminders about daily practice"}
                      </p>
                    </div>
                    <Switch
                      id="practice-reminders"
                      checked={notifications.practiceReminders}
                      onCheckedChange={() => handleNotificationChange("practiceReminders")}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="updates">{language === "uk" ? "Оновлення" : "Updates"}</Label>
                      <p className="text-sm text-muted-foreground">
                        {language === "uk"
                          ? "Отримувати сповіщення про оновлення платформи"
                          : "Receive notifications about platform updates"}
                      </p>
                    </div>
                    <Switch
                      id="updates"
                      checked={notifications.updates}
                      onCheckedChange={() => handleNotificationChange("updates")}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Налаштування конфіденційності */}
              <Card>
                <CardHeader>
                  <CardTitle>{language === "uk" ? "Конфіденційність" : "Privacy"}</CardTitle>
                  <CardDescription>
                    {language === "uk"
                      ? "Керуйте своїми налаштуваннями конфіденційності"
                      : "Manage your privacy settings"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="share-progress">
                        {language === "uk" ? "Поділитися прогресом" : "Share Progress"}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {language === "uk"
                          ? "Дозволити ділитися вашим прогресом з іншими користувачами"
                          : "Allow sharing your progress with other users"}
                      </p>
                    </div>
                    <Switch
                      id="share-progress"
                      checked={privacy.shareProgress}
                      onCheckedChange={() => handlePrivacyChange("shareProgress")}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="collect-usage-data">
                        {language === "uk" ? "Збір даних використання" : "Usage Data Collection"}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {language === "uk"
                          ? "Дозволити збирати анонімні дані про використання для покращення платформи"
                          : "Allow collecting anonymous usage data to improve the platform"}
                      </p>
                    </div>
                    <Switch
                      id="collect-usage-data"
                      checked={privacy.collectUsageData}
                      onCheckedChange={() => handlePrivacyChange("collectUsageData")}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Кнопки дій */}
              <div className="flex justify-end space-x-4">
                <Button variant="outline">{language === "uk" ? "Скасувати" : "Cancel"}</Button>
                <Button>{language === "uk" ? "Зберегти зміни" : "Save Changes"}</Button>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
