import { Hero } from '@/components/sections/Hero'
import { Problem } from '@/components/sections/Problem'
import { Solution } from '@/components/sections/Solution'
import { Security } from '@/components/sections/Security'
import { Features } from '@/components/sections/Features'
import { Persona } from '@/components/sections/Persona'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { FAQ } from '@/components/sections/FAQ'
import { CTA } from '@/components/sections/CTA'
import { Footer } from '@/components/sections/Footer'
import { ScrollTracker } from '@/components/ScrollTracker'
import { Aurora } from '@/components/ui/backgrounds/Aurora'

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Aurora />
      <ScrollTracker />
      <Hero />
      <Problem />
      <Solution />
      <Security />
      <Features />
      <Persona />
      <HowItWorks />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
