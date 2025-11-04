'use client'

import { useEffect, useRef } from 'react'

interface AuroraProps {
  className?: string
}

export const Aurora = ({ className = '' }: AuroraProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resize = () => {
      // Fixed positioning으로 뷰포트 전체 크기 사용
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)

    const animate = () => {
      if (!ctx || !canvas) return

      time += 0.005

      // Create gradient
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.3,
        canvas.height * 0.3,
        0,
        canvas.width * 0.3,
        canvas.height * 0.3,
        canvas.width * 0.6
      )

      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.7,
        canvas.height * 0.7,
        0,
        canvas.width * 0.7,
        canvas.height * 0.7,
        canvas.width * 0.6
      )

      // Animate colors
      const hue1 = (time * 20) % 360
      const hue2 = (time * 20 + 180) % 360

      gradient1.addColorStop(0, `hsla(${hue1}, 70%, 60%, 0.4)`)
      gradient1.addColorStop(0.5, `hsla(${hue1}, 70%, 50%, 0.2)`)
      gradient1.addColorStop(1, 'hsla(0, 0%, 100%, 0)')

      gradient2.addColorStop(0, `hsla(${hue2}, 70%, 60%, 0.4)`)
      gradient2.addColorStop(0.5, `hsla(${hue2}, 70%, 50%, 0.2)`)
      gradient2.addColorStop(1, 'hsla(0, 0%, 100%, 0)')

      // Clear and draw
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.globalCompositeOperation = 'screen'

      ctx.fillStyle = gradient1
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = gradient2
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.globalCompositeOperation = 'source-over'

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-screen h-screen ${className}`}
      style={{ filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }}
    />
  )
}
