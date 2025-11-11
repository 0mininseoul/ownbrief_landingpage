'use client'

import { Link2, Settings, Bell, Headphones } from 'lucide-react'

const steps = [
  {
    number: '1',
    icon: Link2,
    title: '연동하기',
    description: '구글, 노션, 슬랙 계정 연동 (1분)',
  },
  {
    number: '2',
    icon: Settings,
    title: '설정하기',
    description: '브리핑 시간, 관심사, 페르소나 선택',
  },
  {
    number: '3',
    icon: Bell,
    title: '받기',
    description: '매일 아침 설정한 시간에 알림',
  },
  {
    number: '4',
    icon: Headphones,
    title: '듣기',
    description: '10분 팟캐스트로 모든 정보 확인',
  },
]

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-black/30">
      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            이렇게 간단합니다
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                <div className="liquid-glass-card rounded-xl p-6 text-center">
                  {/* Step Number */}
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-white/20 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                      {step.number}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base text-gray-300">
                    {step.description}
                  </p>
                </div>

                {/* Arrow connector (hidden on last item and mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full">
                    <div className="flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
