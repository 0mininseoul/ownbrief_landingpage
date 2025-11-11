import { Lock, Trash2, ShieldOff } from 'lucide-react'

const securityFeatures = [
  {
    icon: Lock,
    title: '데이터 즉시 삭제',
    subtitle: '수집 → 브리핑 생성 → 삭제',
    description: '수집된 원본 데이터는 당일 브리핑 제작 후 즉시 완전 삭제됩니다.',
  },
  {
    icon: Trash2,
    title: '브리핑도 24시간 후 삭제',
    subtitle: '임시 저장만',
    description: '생성된 브리핑 콘텐츠도 24시간 후 자동으로 삭제됩니다.',
  },
  {
    icon: ShieldOff,
    title: '개인정보 보관 없음',
    subtitle: 'Zero 개인정보 저장',
    description: '온브리프는 사용자의 개인정보를 일체 보관하지 않습니다.',
  },
]

const timeline = [
  { time: '오후 11시', label: '데이터 수집' },
  { time: '새벽 1시', label: 'AI 브리핑 생성' },
  { time: '새벽 1시', label: '원본 데이터 삭제' },
  { time: '다음날 새벽 1시', label: '브리핑 삭제' },
]

export const Security = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 text-white bg-black/80">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            철저한 보안, 안심하고 사용하세요
          </h2>
          <p className="text-xl text-gray-300">
            온브리프는 사용자의 개인정보를 보관하지 않습니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {securityFeatures.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6"
            >
              <feature.icon className="w-16 h-16 mx-auto mb-4 text-white" />
              <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-lg font-semibold text-gray-300 mb-3">
                {feature.subtitle}
              </p>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">
            데이터 처리 프로세스
          </h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-700 hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
              {timeline.map((step, index) => (
                <div key={index} className="relative">
                  {/* Circle */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black font-bold mb-3 relative z-10">
                      {index + 1}
                    </div>
                    <p className="text-sm font-semibold text-gray-300 mb-1">
                      {step.time}
                    </p>
                    <p className="text-base text-center">{step.label}</p>
                  </div>

                  {/* Arrow (mobile only) */}
                  {index < timeline.length - 1 && (
                    <div className="flex justify-center my-4 md:hidden">
                      <svg
                        className="w-6 h-6 text-gray-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
