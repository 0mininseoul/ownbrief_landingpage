import { Hero } from '@/components/sections/Hero'
import { Problem } from '@/components/sections/Problem'
import { Security } from '@/components/sections/Security'
import { Features } from '@/components/sections/Features'
import { Persona } from '@/components/sections/Persona'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { FAQ } from '@/components/sections/FAQ'
import { CTA } from '@/components/sections/CTA'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Problem />
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
