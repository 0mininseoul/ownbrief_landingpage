'use client'

import { motion } from 'framer-motion'
import { Link2, Bot, Headphones } from 'lucide-react'

const features = [
  {
    icon: Link2,
    title: '모든 정보를 하나로',
    subtitle: '다중 서비스 연동',
    description: '구글 캘린더, Gmail, 노션, 슬랙을 완전 통합. 더 이상 앱을 오갈 필요 없습니다.',
  },
  {
    icon: Bot,
    title: '스마트한 정보 통합',
    subtitle: 'AI 자동 브리핑',
    description: '일정, 메일, 업무, 트렌드를 AI가 분석하여 하나의 브리핑으로 자동 생성합니다.',
  },
  {
    icon: Headphones,
    title: '듣기만 하면 끝',
    subtitle: '10분 팟캐스트',
    description: '자연스러운 음성으로 매일 아침 10분, 출근 준비하며 모든 정보를 확인하세요.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export function Features() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            온브리프의 핵심 기능
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow bg-white text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm font-semibold text-gray-600 mb-3">
                  {feature.subtitle}
                </p>
                <p className="text-base text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
