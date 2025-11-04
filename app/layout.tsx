import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import { Aurora } from '@/components/ui/backgrounds/Aurora'

const pretendard = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-pretendard',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '온브리프(OwnBrief) - 창업가를 위한 AI 브리핑 솔루션',
  description: '여러 앱을 오가며 확인하던 정보들, 이제 10분 브리핑 하나로. 구글, 노션, 슬랙을 통합한 초개인화 AI 브리핑.',
  keywords: ['온브리프', 'OwnBrief', 'AI 브리핑', '창업가', '생산성', '노션', '슬랙', '구글'],
  openGraph: {
    title: '온브리프 - 창업가를 위한 AI 브리핑',
    description: '파편화된 정보를 하나로. 10분 AI 팟캐스트 브리핑.',
    images: ['/og-image.png'],
    url: 'https://ownbrief.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: '온브리프 - 창업가를 위한 AI 브리핑',
    description: '파편화된 정보를 하나로. 10분 AI 팟캐스트 브리핑.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <head>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="font-sans antialiased relative">
        <Aurora />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  )
}
