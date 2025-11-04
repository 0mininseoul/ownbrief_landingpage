'use client'

import { motion } from 'framer-motion'
import { Briefcase, Heart, Smile } from 'lucide-react'

const personas = [
  {
    icon: Briefcase,
    tag: '기본',
    title: '프로페셔널 비서',
    characteristic: '정중하고 전문적인 어조',
    example: '"안녕하세요, 대표님. 오늘은 3건의 주요 일정과 8개의 미완료 업무가 있습니다."',
    suitableFor: '업무 모드, 공식적인 분위기',
  },
  {
    icon: Heart,
    tag: '격려',
    title: '달달한 파트너',
    characteristic: '따뜻하고 다정한 어조',
    example: '"좋은 아침이에요! 오늘 일정이 좀 많긴 한데, 하나씩 하면 금방이에요. 화이팅!"',
    suitableFor: '힘든 아침, 동기부여 필요할 때',
  },
  {
    icon: Smile,
    tag: '편함',
    title: '찐친 메이트',
    characteristic: '편하고 시니컬한 어조',
    example: '"야, 일어나. 오늘 일정 개많음ㅋㅋ 그래도 할 수 있지? 일단 커피부터 마셔."',
    suitableFor: '친구 같은 느낌, 유머 있는 톤',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
}

export function Persona() {
  return (
    <section className="py-16 md:py-24">
      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            나만의 AI 비서, 내 스타일로
          </h2>
          <p className="text-lg md:text-xl text-gray-300">
            3가지 페르소나 중 선택하고, 언제든 변경 가능합니다
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {personas.map((persona, index) => {
            const Icon = persona.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="liquid-glass-card rounded-xl p-6 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {persona.tag}
                  </span>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {persona.title}
                </h3>

                <p className="text-sm font-semibold text-gray-400 mb-4">
                  {persona.characteristic}
                </p>

                <div className="bg-black/30 rounded-lg p-4 mb-4 border border-white/10">
                  <p className="text-sm text-gray-200 italic leading-relaxed">
                    {persona.example}
                  </p>
                </div>

                <p className="text-sm text-gray-300">
                  <span className="font-semibold">적합:</span> {persona.suitableFor}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
