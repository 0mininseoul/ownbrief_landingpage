'use client'

import { useState } from 'react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { Toast } from '../ui/Toast'
import { trackMVPButtonClick, trackEmailSubscription } from '@/lib/analytics'

export const CTA = () => {
  const [email, setEmail] = useState('')
  const [isAgreed, setIsAgreed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [toast, setToast] = useState<{
    show: boolean
    message: string
    type: 'success' | 'error'
  }>({ show: false, message: '', type: 'success' })

  const handleMVPClick = () => {
    trackMVPButtonClick('cta')
    window.open(process.env.NEXT_PUBLIC_MVP_URL, '_blank', 'noopener,noreferrer')
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateEmail(email)) {
      setError('올바른 이메일 주소를 입력해주세요.')
      return
    }

    if (!isAgreed) {
      setError('개인정보 수집 및 이용에 동의해주세요.')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        trackEmailSubscription()
        setToast({
          show: true,
          message: '알림 신청이 완료되었습니다!',
          type: 'success',
        })
        setEmail('')
        setIsAgreed(false)
      } else {
        setToast({
          show: true,
          message: data.message || '오류가 발생했습니다. 다시 시도해주세요.',
          type: 'error',
        })
      }
    } catch (error) {
      setToast({
        show: true,
        message: '오류가 발생했습니다. 다시 시도해주세요.',
        type: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="cta" className="py-16 md:py-24 px-4 md:px-8 bg-black text-white">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-gray-300">
            MVP를 먼저 경험하고, 정식 런칭 소식을 받아보세요
          </p>
        </div>

        {/* MVP Button */}
        <div>
          <Button
            variant="primary"
            onClick={handleMVPClick}
            className="bg-white text-black hover:bg-gray-200"
          >
            MVP 써보기
          </Button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-700" />
          <span className="text-gray-400">또는</span>
          <div className="flex-1 h-px bg-gray-700" />
        </div>

        {/* Email Form */}
        <div>
          <h3 className="text-2xl font-semibold mb-6">정식 런칭 시 알림 받기</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
              className="text-black"
            />

            <div className="flex items-start gap-3 text-left">
              <input
                type="checkbox"
                id="privacy-agreement"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-gray-600 bg-gray-700 text-black focus:ring-black"
              />
              <label htmlFor="privacy-agreement" className="text-sm text-gray-300">
                <span className="font-semibold text-white">개인정보 수집 및 이용 동의</span> (필수)
                <br />
                이메일 주소는 온브리프 정식 런칭 안내 목적으로만 사용되며, 제3자에게 제공되지 않습니다. 언제든 수신 거부 가능합니다.
              </label>
            </div>

            <Button
              type="submit"
              variant="secondary"
              disabled={isLoading}
              className="w-full border-white text-white hover:bg-white hover:text-black"
            >
              {isLoading ? '처리 중...' : '알림 받기'}
            </Button>

            <p className="text-sm text-gray-400">
              스팸 없이, 오직 런칭 소식만 보내드립니다
            </p>
          </form>
        </div>

        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ ...toast, show: false })}
          />
        )}
      </div>
    </section>
  )
}
