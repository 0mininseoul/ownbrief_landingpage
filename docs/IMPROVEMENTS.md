# 온브리프 랜딩페이지 개선사항 (v1.0)

배포 완료 후 검토한 개선사항 및 권장사항입니다.

---

## 🎯 우선순위별 개선사항

### 🔴 높음 (즉시 개선 권장)

#### 1. **필수 이미지 파일 추가**

**문제점:**
- `public/` 폴더가 존재하지 않음
- favicon, OG 이미지, 로고 파일 없음
- SEO 및 소셜 공유 시 이미지 표시 안됨

**개선방안:**
```bash
public/
├── favicon.ico           # 16x16, 32x32, 48x48 사이즈
├── apple-touch-icon.png  # 180x180
├── og-image.png          # 1200x630 (Open Graph)
├── logo.svg              # 벡터 로고
└── robots.txt            # SEO용
```

**작업 방법:**
1. `public/` 폴더 생성
2. favicon 생성 도구 사용: https://realfavicongenerator.net/
3. OG 이미지 제작 (Figma, Canva 등)
4. `app/layout.tsx`의 metadata 확인

**예상 효과:**
- SEO 점수 향상
- 소셜 공유 시 브랜드 인지도 상승
- 전문성 증가

---

#### 2. **API Rate Limiting 추가**

**문제점:**
- 이메일 제출 API에 Rate Limiting 없음
- 스팸 공격 가능성
- Supabase 무료 할당량 초과 위험

**개선방안:**
```typescript
// app/api/subscribe/route.ts
import { ratelimit } from '@/lib/ratelimit'

export async function POST(request: NextRequest) {
  // IP 기반 Rate Limiting
  const ip = request.ip ?? '127.0.0.1'
  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return NextResponse.json(
      { success: false, message: '너무 많은 요청입니다. 잠시 후 다시 시도해주세요.' },
      { status: 429 }
    )
  }
  // ... 기존 코드
}
```

**구현 옵션:**
1. **Upstash Redis** (권장): https://upstash.com/
2. **Vercel Edge Config**: 간단한 Rate Limiting
3. **Supabase Edge Functions**: 서버 측 제한

**예상 효과:**
- 스팸 방지
- 서버 비용 절감
- 보안 강화

---

#### 3. **API 중복 체크 로직 개선**

**문제점:**
```typescript
// 현재 코드
const { data: existing, error: checkError } = await supabase
  .from('email_subscriptions')
  .select('email')
  .eq('email', email)
  .single()  // ⚠️ 결과가 없으면 에러 발생
```

**개선방안:**
```typescript
// 개선된 코드
const { data: existing, error: checkError } = await supabase
  .from('email_subscriptions')
  .select('email')
  .eq('email', email)
  .maybeSingle()  // ✅ 결과가 없어도 에러 없음

// 또는 더 간단하게
const { data: existing } = await supabase
  .from('email_subscriptions')
  .select('email')
  .eq('email', email)
  .limit(1)

if (existing && existing.length > 0) {
  // 중복
}
```

**예상 효과:**
- 불필요한 에러 로그 감소
- 코드 안정성 향상

---

### 🟡 중간 (1-2주 내 개선)

#### 4. **SEO 메타데이터 개선**

**문제점:**
- `keywords` 메타태그는 deprecated (검색엔진이 무시)
- viewport, themeColor 등 누락
- siteName, locale 정보 없음

**개선방안:**
```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: '온브리프(OwnBrief) - 창업가를 위한 AI 브리핑 솔루션',
    template: '%s | 온브리프',
  },
  description: '여러 앱을 오가며 확인하던 정보들, 이제 10분 브리핑 하나로. 구글, 노션, 슬랙을 통합한 초개인화 AI 브리핑.',
  applicationName: '온브리프',
  authors: [{ name: '온브리프' }],
  generator: 'Next.js',
  // keywords 제거 (deprecated)
  referrer: 'origin-when-cross-origin',
  creator: '온브리프',
  publisher: '온브리프',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://your-domain.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '온브리프 - 창업가를 위한 AI 브리핑',
    description: '파편화된 정보를 하나로. 10분 AI 팟캐스트 브리핑.',
    url: 'https://your-domain.com',
    siteName: '온브리프',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '온브리프 - 창업가를 위한 AI 브리핑 솔루션',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '온브리프 - 창업가를 위한 AI 브리핑',
    description: '파편화된 정보를 하나로. 10분 AI 팟캐스트 브리핑.',
    images: ['/og-image.png'],
    creator: '@ownbrief', // 실제 트위터 계정
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
    // 나중에 Google Search Console에서 받기
  },
}

// viewport도 별도로 export
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
}
```

**예상 효과:**
- Google 검색 순위 향상
- 소셜 공유 최적화
- 모바일 UX 개선

---

#### 5. **로딩 및 에러 상태 개선**

**문제점:**
- 전역 로딩 상태 없음
- 에러 경계(Error Boundary) 없음
- API 요청 중 화면 전환 시 처리 없음

**개선방안:**

**5.1. 로딩 UI 추가**
```typescript
// app/loading.tsx (새 파일)
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
        <p className="text-gray-600">로딩 중...</p>
      </div>
    </div>
  )
}
```

**5.2. 에러 경계 추가**
```typescript
// app/error.tsx (새 파일)
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">문제가 발생했습니다</h2>
        <p className="text-gray-600 mb-6">
          페이지를 불러오는 중 오류가 발생했습니다.
        </p>
        <button
          onClick={reset}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
        >
          다시 시도
        </button>
      </div>
    </div>
  )
}
```

**5.3. 404 페이지 추가**
```typescript
// app/not-found.tsx (새 파일)
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
        <Link
          href="/"
          className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 inline-block"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}
```

**예상 효과:**
- 사용자 경험 개선
- 에러 발생 시 친절한 안내
- 이탈률 감소

---

#### 6. **접근성 (a11y) 개선**

**문제점:**
- ARIA 레이블 부족
- 키보드 네비게이션 미흡
- 스크린 리더 최적화 부족

**개선방안:**

**6.1. Hero Section**
```typescript
// components/sections/Hero.tsx
<section
  className="..."
  aria-label="메인 히어로 섹션"
>
  <h1 className="sr-only">온브리프 - 창업가를 위한 AI 브리핑 솔루션</h1>
  {/* ... */}
</section>
```

**6.2. CTA Form**
```typescript
// components/sections/CTA.tsx
<form onSubmit={handleSubmit} aria-label="이메일 구독 폼">
  <Input
    type="email"
    placeholder="your@email.com"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    error={error}
    aria-label="이메일 주소"
    aria-required="true"
    aria-invalid={!!error}
    aria-describedby={error ? "email-error" : undefined}
  />
  {error && <span id="email-error" className="sr-only">{error}</span>}
</form>
```

**6.3. Skip to Content 링크 추가**
```typescript
// app/layout.tsx
<body>
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-black text-white px-4 py-2 rounded z-50"
  >
    메인 콘텐츠로 건너뛰기
  </a>
  <main id="main-content">{children}</main>
</body>
```

**예상 효과:**
- 장애인 사용자 접근성 향상
- SEO 개선
- 법적 요구사항 충족

---

#### 7. **성능 최적화**

**7.1. 이미지 최적화**
```typescript
// next.config.js
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'], // AVIF 추가
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // 번들 분석기 추가 (개발 시)
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // vendor chunk
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20
          },
          // commons chunk
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      }
    }
    return config
  },
}
```

**7.2. 폰트 최적화**
```typescript
// app/layout.tsx
const pretendard = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // 500 제거 (사용 안하면)
  variable: '--font-pretendard',
  display: 'swap',
  preload: true, // 명시적 프리로드
  adjustFontFallback: false, // CLS 방지
})
```

**7.3. Framer Motion 최적화**
```typescript
// components/sections/Features.tsx
// 현재: 모든 컴포넌트 애니메이션
// 개선: viewport threshold 추가
<motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }} // 30% 보일 때 트리거
>
```

**예상 효과:**
- Lighthouse 성능 점수 향상 (목표: 90+)
- 첫 로딩 속도 개선
- Core Web Vitals 개선

---

### 🟢 낮음 (여유 있을 때)

#### 8. **Analytics 고도화**

**개선방안:**
```typescript
// lib/analytics.ts에 추가
export const trackFormInteraction = (field: string) => {
  trackEvent('form_interaction', { field })
}

export const trackSectionView = (section: string) => {
  trackEvent('section_view', { section })
}

export const trackCTAClick = (location: string, buttonText: string) => {
  trackEvent('cta_click', { location, button_text: buttonText })
}
```

**Intersection Observer로 섹션 뷰 추적:**
```typescript
// components/ScrollTracker.tsx에 추가
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          trackSectionView(entry.target.id)
        }
      })
    },
    { threshold: 0.5 }
  )

  document.querySelectorAll('section[id]').forEach((section) => {
    observer.observe(section)
  })

  return () => observer.disconnect()
}, [])
```

---

#### 9. **다크 모드 지원**

**구현:**
```typescript
// app/layout.tsx
import { ThemeProvider } from 'next-themes'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

**예상 효과:**
- 사용자 선택권 제공
- 야간 가독성 향상

---

#### 10. **국제화 (i18n) 준비**

**미래 확장을 위한 구조:**
```
app/
├── [locale]/
│   ├── layout.tsx
│   └── page.tsx
├── ko/           # 한국어 (기본)
└── en/           # 영어
```

---

## 📊 성능 목표

배포 후 측정 목표:

| 지표 | 현재 | 목표 |
|------|------|------|
| Lighthouse Performance | ? | 90+ |
| First Contentful Paint | ? | < 1.5s |
| Largest Contentful Paint | ? | < 2.5s |
| Total Blocking Time | ? | < 200ms |
| Cumulative Layout Shift | ? | < 0.1 |
| Time to Interactive | ? | < 3.5s |

**측정 방법:**
```bash
# Lighthouse CLI
npx lighthouse https://your-domain.com --view

# 또는 Chrome DevTools > Lighthouse
```

---

## 🔒 보안 체크리스트

- [ ] HTTPS 강제 (Vercel 자동)
- [ ] CORS 설정 확인
- [ ] Rate Limiting 구현
- [ ] 환경 변수 보안 (Vercel Secrets)
- [ ] Content Security Policy 헤더
- [ ] XSS 방지 (React 기본 제공)
- [ ] SQL Injection 방지 (Supabase Parameterized)
- [ ] CSRF 토큰 (POST 요청 시)

**CSP 헤더 추가:**
```typescript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https:;
              font-src 'self';
              connect-src 'self' https://*.supabase.co https://www.google-analytics.com;
            `.replace(/\s{2,}/g, ' ').trim()
          },
        ],
      },
    ]
  },
}
```

---

## 🚀 배포 후 즉시 할 일

### 1. Google Search Console 등록
```
https://search.google.com/search-console
```
- 사이트 소유권 확인
- Sitemap 제출 (`/sitemap.xml`)
- 색인 요청

### 2. Analytics 확인
- GA4 실시간 보고서 확인
- 이벤트 트래킹 테스트
- 전환 목표 설정

### 3. 모니터링 설정
- Vercel Analytics 활성화
- Sentry 에러 트래킹 (선택)
- Uptime 모니터링 (UptimeRobot 등)

### 4. 이메일 수집 테스트
- 실제 이메일로 제출 테스트
- Supabase에서 데이터 확인
- 중복 제출 테스트

---

## 📝 다음 버전 (v2.0) 아이디어

1. **블로그/뉴스 섹션** - 제품 업데이트, 사용 팁
2. **고객 후기/사례** - 신뢰도 향상
3. **가격 정책 페이지** - 정식 출시 전
4. **데모 영상** - Hero 섹션에 임베드
5. **라이브 챗** - Intercom, Crisp 등
6. **A/B 테스트** - CTA 문구, 색상 등
7. **이메일 마케팅 연동** - Mailchimp, SendGrid

---

**작성일:** 2025-01-03
**검토자:** Claude
**다음 검토:** 배포 2주 후
