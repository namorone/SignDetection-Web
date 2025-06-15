import { HeroSection } from "../components/HeroSection"
import { Features } from "../components/Features"
import { MainNav } from "../components/MainNav"
import { Footer } from "../components/Footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <HeroSection />
        <Features />
      </main>
      <Footer />
    </div>
  )
}
