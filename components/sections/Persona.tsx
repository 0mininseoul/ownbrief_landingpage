'use client'

import { Briefcase, Heart, Smile } from 'lucide-react'

const personas = [
  {
    icon: Briefcase,
    tag: '기본',
    title: '프로페셔널 비서',
    characteristic: '정중하고 전문적인 어조',
    example: '"안녕하세요, 대표님. 오늘은 3건의 주요 일정과 8개의 미완료 업무가 있습니다."',
    suitableFor: '업무 모드, 공식적인 분위기',
    bgColor: 'bg-gray-900',
    borderColor: 'border-gray-900',
  },
  {
    icon: Heart,
    tag: '격려',
    title: '달달한 파트너',
    characteristic: '따뜻하고 다정한 어조',
    example: '"좋은 아침이에요! 오늘 일정이 좀 많긴 한데, 하나씩 하면 금방이에요. 화이팅!"',
    suitableFor: '힘든 아침, 동기부여 필요할 때',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
  },
  {
    icon: Smile,
    tag: '편함',
    title: '찐친 메이트',
    characteristic: '편하고 시니컬한 어조',
    example: '"야, 일어나. 오늘 일정 개많음ㅋㅋ 그래도 할 수 있지? 일단 커피부터 마셔."',
    suitableFor: '친구 같은 느낌, 유머 있는 톤',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
]

export function Persona() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            나만의 AI 비서, 내 스타일로
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            3가지 페르소나 중 선택하고, 언제든 변경 가능합니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {personas.map((persona, index) => {
            const Icon = persona.icon
            return (
              <div
                key={index}
                className={`${persona.bgColor} ${persona.borderColor} border-2 rounded-xl p-6 hover:scale-105 transition-transform cursor-pointer`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {persona.tag}
                  </span>
                  <Icon className="w-8 h-8 text-gray-700" />
                </div>

                <h3 className="text-xl font-bold text-black mb-2">
                  {persona.title}
                </h3>

                <p className="text-sm font-semibold text-gray-600 mb-4">
                  {persona.characteristic}
                </p>

                <div className="bg-white/70 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-800 italic leading-relaxed">
                    {persona.example}
                  </p>
                </div>

                <p className="text-sm text-gray-600">
                  <span className="font-semibold">적합:</span> {persona.suitableFor}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
