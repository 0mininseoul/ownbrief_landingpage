'use client'

import { Button } from '../ui/Button'
import { trackMVPButtonClick } from '@/lib/analytics'

export const Hero = () => {
  const handleMVPClick = () => {
    trackMVPButtonClick('hero')
    window.open(process.env.NEXT_PUBLIC_MVP_URL, '_blank', 'noopener,noreferrer')
  }

  const handleCTAScroll = () => {
    const ctaSection = document.getElementById('cta')
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-4 md:px-8">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        {/* 로고 placeholder - 실제 로고로 교체 필요 */}
        <div className="mb-12">
          <h1 className="text-2xl font-bold">OwnBrief</h1>
        </div>

        {/* 메인 캐치프레이즈 */}
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance">
          여러 앱을 오가며<br />확인하던 정보들,<br />
          이제 10분 브리핑 하나로
        </h2>

        {/* 서브카피 */}
        <p className="text-xl md:text-2xl font-semibold text-gray-600">
          창업가를 위한 초개인화 AI 브리핑 솔루션
        </p>

        {/* CTA 버튼 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Button variant="primary" onClick={handleMVPClick}>
            MVP 써보기
          </Button>
          <Button variant="secondary" onClick={handleCTAScroll}>
            정식 런칭 알림 받기
          </Button>
        </div>
      </div>
    </section>
  )
}
