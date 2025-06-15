"use client"

import { useState } from "react"
import { MainNav } from "../components/MainNav"
import { Footer } from "../components/Footer"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Mail, Phone, MapPin, Github, Twitter, Facebook, Instagram } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"

export default function ContactPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Симуляція відправки форми
    setTimeout(() => {
      console.log("Form submitted:", formData)
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // Скидаємо повідомлення про успіх через 3 секунди
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 3000)
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t.contactTitle}</h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">{t.contactSubtitle}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
              <Card>
                <CardHeader>
                  <CardTitle>{t.contactFormTitle}</CardTitle>
                  <CardDescription>
                    {submitSuccess ? <div className="text-green-500">Ваше повідомлення успішно надіслано!</div> : null}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t.yourName}</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t.yourEmail}</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">{t.subject}</Label>
                      <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">{t.message}</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Надсилання..." : t.send}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">{t.contactInfo}</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">{t.address}</div>
                        <div className="text-sm text-muted-foreground">{t.addressText}</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Phone className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">{t.phoneNumber}</div>
                        <div className="text-sm text-muted-foreground">+380 44 123 4567</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Mail className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">{t.emailAddress}</div>
                        <div className="text-sm text-muted-foreground">info@usl-translator.com</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">{t.followUs}</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="p-2 rounded-full bg-muted hover:bg-muted/80">
                      <Facebook className="h-5 w-5" />
                      <span className="sr-only">Facebook</span>
                    </a>
                    <a href="#" className="p-2 rounded-full bg-muted hover:bg-muted/80">
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </a>
                    <a href="#" className="p-2 rounded-full bg-muted hover:bg-muted/80">
                      <Instagram className="h-5 w-5" />
                      <span className="sr-only">Instagram</span>
                    </a>
                    <a href="#" className="p-2 rounded-full bg-muted hover:bg-muted/80">
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="h-[400px] w-full rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2573.1188673832307!2d24.022173799999997!3d49.840224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add717532da69%3A0xf0cb97b8441ff1fe!2z0LLRg9C70LjRhtGPINCj0L3RltCy0LXRgNGB0LjRgtC10YLRgdGM0LrQsCwgMSwg0JvRjNCy0ZbQsiwg0JvRjNCy0ZbQstGB0YzQutCwINC-0LHQu9Cw0YHRgtGMLCA3OTAwMA!5e0!3m2!1suk!2sua!4v1750024354145!5m2!1suk!2sua"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
