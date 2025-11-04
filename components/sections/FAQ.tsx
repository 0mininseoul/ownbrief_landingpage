'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: '온브리프는 무료인가요?',
    answer: 'MVP는 무료로 체험하실 수 있습니다. 정식 출시 후 요금제는 추후 공지됩니다.',
  },
  {
    question: '어떤 서비스와 연동되나요?',
    answer: '구글(캘린더, Gmail), 노션, 슬랙과 연동됩니다. 향후 더 많은 서비스를 추가할 예정입니다.',
  },
  {
    question: '내 데이터는 안전한가요?',
    answer: '네, 수집된 데이터는 브리핑 생성 후 즉시 삭제되며, 브리핑 콘텐츠도 24시간 후 자동 삭제됩니다. 개인정보는 일체 보관하지 않습니다.',
  },
  {
    question: '페르소나는 나중에 변경할 수 있나요?',
    answer: '네, 언제든지 설정에서 변경 가능합니다. 원하는 스타일로 브리핑을 받아보세요.',
  },
  {
    question: '브리핑 시간은 언제 받을 수 있나요?',
    answer: '원하시는 시간으로 자유롭게 설정 가능합니다. 출근 전, 아침 운동 중, 언제든지 편한 시간으로 설정하세요.',
  },
  {
    question: '모바일에서도 사용할 수 있나요?',
    answer: '네, 웹 기반으로 모바일에서도 이용 가능합니다. 앱 출시도 계획 중입니다.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="px-4 md:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            자주 묻는 질문
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="liquid-glass-card rounded-lg overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/10 transition-colors"
              >
                <span className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-gray-300 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-6 pt-2">
                  <p className="text-base text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
