'use client'

import { Check } from 'lucide-react'

const solutions = [
  '파편화된 정보를 하나로 통합',
  '완전 자동화 (연동만 하면 끝)',
  '시간 절약 (20~30분 → 10분)',
  '핸즈프리 청취 (출근 준비하며)',
  '초개인화 브리핑 (내 일정, 내 업무, 내 관심사)',
]

export function Solution() {
  return (
    <section className="py-16 md:py-24 bg-black/30">
      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            온브리프가 해결합니다
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="flex items-start gap-4 liquid-glass-card p-6 rounded-xl transition-all"
              >
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-lg text-gray-200 font-medium pt-1">
                  {solution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
