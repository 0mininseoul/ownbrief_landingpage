'use client'

import { useEffect, useRef } from 'react'
import { trackScrollDepth } from '@/lib/analytics'

export function ScrollTracker() {
  const trackedDepths = useRef<Set<number>>(new Set())

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const scrollPercent = Math.floor((scrollTop / (documentHeight - windowHeight)) * 100)

      // Track at 25%, 50%, 75%, 100%
      const milestones = [25, 50, 75, 100]

      milestones.forEach((milestone) => {
        if (scrollPercent >= milestone && !trackedDepths.current.has(milestone)) {
          trackedDepths.current.add(milestone)
          trackScrollDepth(milestone)
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return null
}
