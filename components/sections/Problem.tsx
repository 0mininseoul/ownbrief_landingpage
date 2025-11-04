import { Smartphone, Clock, RefreshCw, AlertCircle, Coffee } from 'lucide-react'

const problems = [
  {
    icon: Smartphone,
    title: '정보의 파편화',
    description: '캘린더, 메일, 노션, 슬랙... 4~5개 앱을 매일 확인',
  },
  {
    icon: Clock,
    title: '시간 낭비',
    description: '매일 아침 앱 확인하는 데만 20~30분 소요',
  },
  {
    icon: RefreshCw,
    title: '컨텍스트 스위칭 피로',
    description: '앱을 오갈 때마다 집중력 분산, 인지적 부담',
  },
  {
    icon: AlertCircle,
    title: '우선순위 파악 어려움',
    description: '중요한 정보를 놓치거나 덜 중요한 것에 시간 낭비',
  },
  {
    icon: Coffee,
    title: '복잡한 아침 루틴',
    description: '출근 준비하며 여러 앱 확인하기 어려움',
  },
]

export const Problem = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
          매일 아침, 이런 경험 해보셨나요?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="liquid-glass-card rounded-xl p-6 hover:-translate-y-1 transition-transform duration-200"
            >
              <problem.icon className="w-12 h-12 mb-4 text-white" />
              <h3 className="text-xl font-semibold mb-2 text-white">{problem.title}</h3>
              <p className="text-base text-gray-300">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
