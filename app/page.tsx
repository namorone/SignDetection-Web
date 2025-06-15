import { HeroSection } from "@/components/hero-section"
import { Features } from "@/components/features"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"

export default function Home() {
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
