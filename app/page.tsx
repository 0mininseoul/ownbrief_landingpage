import { Hero } from '@/components/sections/Hero'
import { Problem } from '@/components/sections/Problem'
import { Security } from '@/components/sections/Security'
import { CTA } from '@/components/sections/CTA'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Problem />
      <Security />
      <CTA />
      <Footer />
    </main>
  )
}
