# 온브리프(OwnBrief) 랜딩페이지 개발 PRD

## 프로젝트 개요

**프로젝트명**: 온브리프 랜딩페이지  
**목표**: 3일 내 MVP 배포 전 랜딩페이지 완성  
**개발자**: 박영민 (프론트엔드 + 간단한 백엔드)  
**배포 환경**: Vercel (별도 도메인 연결 예정)

---

## 기술 스택

### Frontend
- **Framework**: Next.js 14+ (App Router, TypeScript)
- **Styling**: Tailwind CSS
- **Font**: Pretendard (Google Fonts)
- **Icons**: Lucide React
- **Analytics**: Google Analytics 4

### Backend
- **Database**: Supabase (이메일 수집)
- **API**: Next.js API Routes

### Deployment
- **Hosting**: Vercel
- **Domain**: 별도 도메인 연결 (배포 후)

---

## 프로젝트 구조

```
ownbrief-landing/
├── app/
│   ├── layout.tsx                 # 전역 레이아웃, 폰트, GA4
│   ├── page.tsx                   # 메인 랜딩페이지
│   ├── globals.css                # Tailwind + 커스텀 스타일
│   └── api/
│       └── subscribe/
│           └── route.ts           # 이메일 수집 API
├── components/
│   ├── sections/
│   │   ├── Hero.tsx               # 히어로 섹션
│   │   ├── Problem.tsx            # 문제 정의 섹션
│   │   ├── Solution.tsx           # 솔루션 소개 섹션
│   │   ├── Features.tsx           # 주요 기능 섹션
│   │   ├── Security.tsx           # 보안 강조 섹션 ⭐
│   │   ├── Persona.tsx            # 비서 페르소나 섹션
│   │   ├── HowItWorks.tsx         # 작동 방식 섹션
│   │   ├── CTA.tsx                # CTA + 이메일 폼 섹션
│   │   ├── FAQ.tsx                # FAQ 섹션
│   │   └── Footer.tsx             # Footer
│   └── ui/
│       ├── Button.tsx             # 재사용 버튼 컴포넌트
│       ├── Input.tsx              # 이메일 입력 컴포넌트
│       └── Toast.tsx              # 토스트 메시지 컴포넌트
├── lib/
│   ├── supabase.ts                # Supabase 클라이언트
│   └── analytics.ts               # GA4 트래킹 헬퍼
├── public/
│   ├── logo.svg                   # 로고 (SVG 우선, 없으면 PNG)
│   ├── og-image.png               # OG 이미지 (1200x630px, 나중에 추가)
│   └── images/                    # 기타 이미지
├── .env.local                     # 환경 변수 (Git 제외)
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

---

## 환경 변수 (.env.local)

```bash
# Supabase (사용자가 직접 생성 후 입력)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# MVP URL
NEXT_PUBLIC_MVP_URL=https://ownbrief.vercel.app
```

---

## Supabase 설정 (사용자 작업 필요)

### 1. Supabase 프로젝트 생성
- https://supabase.com 에서 새 프로젝트 생성

### 2. 테이블 생성
```sql
CREATE TABLE email_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  source VARCHAR(50) DEFAULT 'landing_page'
);

-- 이메일 중복 방지 인덱스
CREATE UNIQUE INDEX idx_email ON email_subscriptions(email);
```

### 3. RLS (Row Level Security) 비활성화
```sql
ALTER TABLE email_subscriptions DISABLE ROW LEVEL SECURITY;
```
또는 Public Access 허용 (INSERT만)

---

## 디자인 시스템

### 컬러 팔레트 (블랙 위주)
```typescript
// tailwind.config.ts에 정의
colors: {
  black: '#000000',
  gray: {
    900: '#111111',
    800: '#1a1a1a',
    700: '#2a2a2a',
    600: '#4a4a4a',
    500: '#6a6a6a',
    400: '#8a8a8a',
    300: '#a0a0a0',
    200: '#cccccc',
    100: '#f5f5f5',
    50: '#fafafa',
  },
  white: '#ffffff',
}
```

### 타이포그래피
- **폰트**: Pretendard (모든 요소에 적용)
- **Hero Title**: `text-5xl md:text-6xl lg:text-7xl font-bold`
- **Section Title**: `text-3xl md:text-4xl font-bold`
- **Subtitle**: `text-xl md:text-2xl font-semibold`
- **Body**: `text-base md:text-lg`
- **Small**: `text-sm`

### 스페이싱
- **Section 간격**: `py-16 md:py-24` (64-96px)
- **Container**: `px-4 md:px-8 max-w-7xl mx-auto`
- **요소 간격**: `space-y-6`, `space-y-8`, `space-y-12`

### 버튼 스타일
```typescript
// Primary Button (검은색)
className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-lg"

// Secondary Button (아웃라인)
className="border-2 border-black text-black px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-lg"
```

### 카드 스타일
```typescript
className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow bg-white"
```

---

## 페이지 섹션 구성

### 1. Hero Section
**목적**: 첫 인상, 핵심 가치 전달, CTA

**구성 요소**:
- 로고 (좌측 상단)
- 메인 캐치프레이즈: "여러 앱을 오가며 확인하던 정보들, 이제 10분 브리핑 하나로"
- 서브카피: "창업가를 위한 초개인화 AI 브리핑 솔루션"
- 2개 버튼:
  - **[MVP 써보기]** (Primary, 검은색) → 클릭 시 `https://ownbrief.vercel.app` 새 탭에서 열기
  - **[정식 런칭 알림 받기]** (Secondary, 아웃라인) → 클릭 시 CTA 섹션으로 스크롤

**레이아웃**:
- 중앙 정렬
- 버튼은 가로 배치 (모바일에서 세로)
- 배경: 흰색 또는 매우 연한 회색

---

### 2. Problem Section
**목적**: 타겟 고객의 Pain Points 공감

**제목**: "매일 아침, 이런 경험 해보셨나요?"

**구성 요소** (5개 항목, 2x3 그리드 또는 세로 나열):
1. **정보의 파편화**
   - 아이콘: 📱 (또는 Lucide의 Smartphone)
   - 텍스트: "캘린더, 메일, 노션, 슬랙... 4~5개 앱을 매일 확인"

2. **시간 낭비**
   - 아이콘: ⏰ (또는 Clock)
   - 텍스트: "매일 아침 앱 확인하는 데만 20~30분 소요"

3. **컨텍스트 스위칭 피로**
   - 아이콘: 🔄 (또는 RefreshCw)
   - 텍스트: "앱을 오갈 때마다 집중력 분산, 인지적 부담"

4. **우선순위 파악 어려움**
   - 아이콘: ⚠️ (또는 AlertCircle)
   - 텍스트: "중요한 정보를 놓치거나 덜 중요한 것에 시간 낭비"

5. **복잡한 아침 루틴**
   - 아이콘: 😓 (또는 Coffee)
   - 텍스트: "출근 준비하며 여러 앱 확인하기 어려움"

**스타일**:
- 각 항목은 카드 형태
- 아이콘 상단, 제목, 설명 순서
- 호버 시 살짝 들어올려지는 효과

---

### 3. Solution Section
**목적**: 온브리프가 제공하는 핵심 가치

**제목**: "온브리프가 해결합니다"

**구성 요소** (5개 포인트, 세로 나열 또는 2열):
- ✅ **파편화된 정보를 하나로 통합**
- ✅ **완전 자동화 (연동만 하면 끝)**
- ✅ **시간 절약 (20~30분 → 10분)**
- ✅ **핸즈프리 청취 (출근 준비하며)**
- ✅ **초개인화 브리핑 (내 일정, 내 업무, 내 관심사)**

**스타일**:
- 간결한 텍스트
- 체크마크 또는 아이콘 사용
- 배경: 연한 회색 또는 흰색

---

### 4. Features Section
**목적**: 핵심 기능 3가지 강조

**제목**: "온브리프의 핵심 기능"

**구성 요소** (3개 카드, 가로 배치):

1. **🔗 다중 서비스 연동**
   - 제목: "모든 정보를 하나로"
   - 설명: "구글 캘린더, Gmail, 노션, 슬랙을 완전 통합. 더 이상 앱을 오갈 필요 없습니다."

2. **🤖 AI 자동 브리핑**
   - 제목: "스마트한 정보 통합"
   - 설명: "일정, 메일, 업무, 트렌드를 AI가 분석하여 하나의 브리핑으로 자동 생성합니다."

3. **🎧 10분 팟캐스트**
   - 제목: "듣기만 하면 끝"
   - 설명: "자연스러운 음성으로 매일 아침 10분, 출근 준비하며 모든 정보를 확인하세요."

**스타일**:
- 3컬럼 그리드 (모바일: 1컬럼)
- 카드 형태
- 아이콘 크게, 제목, 설명 순서

---

### 5. Security Section ⭐ (중요)
**목적**: 보안을 핵심 셀링 포인트로 강조

**제목**: "철저한 보안, 안심하고 사용하세요"
**부제**: "온브리프는 사용자의 개인정보를 보관하지 않습니다"

**구성 요소** (3개 포인트):

1. **🔒 데이터 즉시 삭제**
   - 제목: "수집 → 브리핑 생성 → 삭제"
   - 설명: "수집된 원본 데이터는 당일 브리핑 제작 후 즉시 완전 삭제됩니다."

2. **🗑️ 브리핑도 24시간 후 삭제**
   - 제목: "임시 저장만"
   - 설명: "생성된 브리핑 콘텐츠도 24시간 후 자동으로 삭제됩니다."

3. **🚫 개인정보 보관 없음**
   - 제목: "Zero 개인정보 저장"
   - 설명: "온브리프는 사용자의 개인정보를 일체 보관하지 않습니다."

**시각적 요소**:
타임라인 다이어그램 (가로 화살표):
```
[데이터 수집] → [AI 브리핑 생성] → [원본 데이터 삭제] → [24시간 후 브리핑 삭제]
   오후 11시         새벽 1시              새벽 1시            다음날 새벽 1시
```

**스타일**:
- 배경: 연한 회색 또는 블랙 배경 (텍스트는 흰색)
- 강조 색상: 약간의 녹색 또는 파란색 (신뢰감)
- 큰 아이콘 사용
- 타임라인은 선과 원으로 시각화

---

### 6. Persona Section
**목적**: 3가지 비서 페르소나 소개, 재미 요소

**제목**: "나만의 AI 비서, 내 스타일로"
**부제**: "3가지 페르소나 중 선택하고, 언제든 변경 가능합니다"

**구성 요소** (3개 카드, 가로 배치):

1. **👔 프로페셔널 비서**
   - 태그: "기본"
   - 특징: "정중하고 전문적인 어조"
   - 예시 대사: "안녕하세요, 대표님. 오늘은 3건의 주요 일정과 8개의 미완료 업무가 있습니다."
   - 적합: "업무 모드, 공식적인 분위기"

2. **💕 달달한 파트너**
   - 태그: "격려"
   - 특징: "따뜻하고 다정한 어조"
   - 예시 대사: "좋은 아침이에요! 오늘 일정이 좀 많긴 한데, 하나씩 하면 금방이에요. 화이팅!"
   - 적합: "힘든 아침, 동기부여 필요할 때"

3. **😎 찐친 메이트**
   - 태그: "편함"
   - 특징: "편하고 시니컬한 어조"
   - 예시 대사: "야, 일어나. 오늘 일정 개많음ㅋㅋ 그래도 할 수 있지? 일단 커피부터 마셔."
   - 적합: "친구 같은 느낌, 유머 있는 톤"

**스타일**:
- 3컬럼 카드 (모바일: 가로 스크롤)
- 각 카드는 구분되는 스타일 (예: 프로페셔널 = 검정, 파트너 = 분홍 계열, 메이트 = 캐주얼)
- 호버 시 확대 효과

---

### 7. How It Works Section
**목적**: 사용 방법 간단 설명

**제목**: "이렇게 간단합니다"

**구성 요소** (4단계, 가로 또는 세로):

1. **1️⃣ 연동하기**
   - 아이콘: 🔗
   - 설명: "구글, 노션, 슬랙 계정 연동 (1분)"

2. **2️⃣ 설정하기**
   - 아이콘: ⚙️
   - 설명: "브리핑 시간, 관심사, 페르소나 선택"

3. **3️⃣ 받기**
   - 아이콘: 🔔
   - 설명: "매일 아침 설정한 시간에 알림"

4. **4️⃣ 듣기**
   - 아이콘: 🎧
   - 설명: "10분 팟캐스트로 모든 정보 확인"

**스타일**:
- 가로 스크롤 또는 세로 나열
- 숫자 크게, 아이콘, 간결한 텍스트
- 단계 간 화살표 또는 선으로 연결

---

### 8. CTA Section ⭐ (핵심 전환 포인트)
**목적**: 이메일 수집 + MVP 이동

**배경**: 어두운 배경 (검은색 또는 진한 회색) + 흰색 텍스트

**구성 요소**:

1. **상단**:
   - 제목: "지금 바로 시작하세요"
   - 부제: "MVP를 먼저 경험하고, 정식 런칭 소식을 받아보세요"

2. **MVP 버튼**:
   - **[MVP 써보기]** (Primary, 흰색 배경 + 검은 텍스트, 크고 눈에 띄게)
   - 클릭 → `https://ownbrief.vercel.app` 새 탭에서 열기

3. **구분선**: "또는"

4. **이메일 수집 폼**:
   - 제목: "정식 런칭 시 알림 받기"
   - Input: 이메일 주소 (placeholder: "your@email.com")
   - Button: **[알림 받기]** (Secondary)
   - 체크박스: "개인정보 수집 및 이용 동의" (필수)
     - 인라인 문구: "이메일 주소는 온브리프 정식 런칭 안내 목적으로만 사용되며, 제3자에게 제공되지 않습니다. 언제든 수신 거부 가능합니다."
   - 안내 문구: "스팸 없이, 오직 런칭 소식만 보내드립니다"

**폼 동작**:
- 이메일 유효성 검사 (정규식)
- 제출 시 로딩 스피너
- 성공 → 토스트 메시지: "알림 신청이 완료되었습니다!"
- 에러 (중복) → "이미 등록된 이메일입니다."
- 에러 (형식) → "올바른 이메일 주소를 입력해주세요."
- 에러 (동의 안함) → "개인정보 수집 및 이용에 동의해주세요."

---

### 9. FAQ Section
**목적**: 자주 묻는 질문 해결

**제목**: "자주 묻는 질문"

**구성 요소** (Accordion 형식, 6개 질문):

1. **Q: 온브리프는 무료인가요?**
   - A: MVP는 무료로 체험하실 수 있습니다. 정식 출시 후 요금제는 추후 공지됩니다.

2. **Q: 어떤 서비스와 연동되나요?**
   - A: 구글(캘린더, Gmail), 노션, 슬랙과 연동됩니다. 향후 더 많은 서비스를 추가할 예정입니다.

3. **Q: 내 데이터는 안전한가요?**
   - A: 네, 수집된 데이터는 브리핑 생성 후 즉시 삭제되며, 브리핑 콘텐츠도 24시간 후 자동 삭제됩니다. 개인정보는 일체 보관하지 않습니다.

4. **Q: 페르소나는 나중에 변경할 수 있나요?**
   - A: 네, 언제든지 설정에서 변경 가능합니다. 원하는 스타일로 브리핑을 받아보세요.

5. **Q: 브리핑 시간은 언제 받을 수 있나요?**
   - A: 원하시는 시간으로 자유롭게 설정 가능합니다. 출근 전, 아침 운동 중, 언제든지 편한 시간으로 설정하세요.

6. **Q: 모바일에서도 사용할 수 있나요?**
   - A: 네, 웹 기반으로 모바일에서도 이용 가능합니다. 앱 출시도 계획 중입니다.

**스타일**:
- Accordion UI (클릭하면 열림/닫힘)
- 질문은 볼드, 답변은 일반 텍스트
- 호버 시 배경색 변화

---

### 10. Footer
**목적**: 기본 정보 및 링크

**구성 요소**:
- 로고 (작게)
- 태그라인: "창업가를 위한 AI 브리핑 솔루션"
- 링크:
  - 문의하기: `mailto:contact@ownbrief.com` (또는 실제 이메일)
  - 개인정보처리방침 (선택사항, 시간 있으면)
  - 이용약관 (선택사항)
- Copyright: "© 2025 OwnBrief. All rights reserved."

**스타일**:
- 배경: 검은색
- 텍스트: 흰색 또는 연한 회색
- 중앙 정렬 또는 좌측 정렬
- 심플하게

---

## API 명세

### POST /api/subscribe
**목적**: 이메일 구독 신청

**Request**:
```typescript
{
  email: string  // 이메일 주소
}
```

**Response (성공)**:
```typescript
{
  success: true,
  message: "알림 신청이 완료되었습니다!"
}
```

**Response (실패)**:
```typescript
{
  success: false,
  message: "이미 등록된 이메일입니다." | "올바른 이메일 주소를 입력해주세요." | "오류가 발생했습니다. 다시 시도해주세요."
}
```

**로직**:
1. 이메일 형식 검증 (정규식: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
2. Supabase에 이메일 중복 확인
3. 중복 아니면 INSERT
4. 성공/실패 응답

**에러 처리**:
- 400: 잘못된 요청 (형식 오류)
- 409: 중복 이메일
- 500: 서버 오류

---

## 분석 및 트래킹

### Google Analytics 4 이벤트

**1. 페이지 로드**
```typescript
gtag('event', 'page_view', {
  page_title: 'OwnBrief Landing',
  page_location: window.location.href
});
```

**2. MVP 버튼 클릭**
```typescript
gtag('event', 'click_mvp_button', {
  button_location: 'hero' | 'cta'  // 어디서 클릭했는지
});
```

**3. 이메일 제출 (성공)**
```typescript
gtag('event', 'email_subscription', {
  method: 'landing_page'
});
```

**4. 스크롤 깊이 (선택사항)**
```typescript
gtag('event', 'scroll', {
  percent_scrolled: 25 | 50 | 75 | 100
});
```

---

## 반응형 디자인

### Breakpoints (Tailwind 기본)
- **Mobile**: `< 640px` (sm)
- **Tablet**: `640px - 1024px` (md, lg)
- **Desktop**: `> 1024px` (xl, 2xl)

### 주요 조정사항
- **Hero**: 버튼 가로 → 모바일 세로 배치
- **Features/Persona**: 3컬럼 → 모바일 1컬럼 또는 가로 스크롤
- **How It Works**: 가로 → 모바일 세로
- **CTA**: 이메일 폼 좁게 유지
- **텍스트**: 모바일에서 작은 크기로 조정
- **패딩**: 모바일에서 px-4, 데스크톱에서 px-8

---

## 성능 최적화

1. **이미지 최적화**:
   - Next.js `<Image>` 컴포넌트 사용
   - WebP 포맷 우선
   - Lazy loading 적용

2. **폰트 최적화**:
   - `next/font/google` 사용
   - Font display: swap

3. **코드 스플리팅**:
   - Next.js 자동 처리
   - 동적 import (필요 시)

4. **번들 크기**:
   - Lucide React (트리쉐이킹 가능)
   - 불필요한 의존성 제거

---

## SEO 및 메타태그

### app/layout.tsx 또는 page.tsx에 추가
```typescript
export const metadata: Metadata = {
  title: '온브리프(OwnBrief) - 창업가를 위한 AI 브리핑 솔루션',
  description: '여러 앱을 오가며 확인하던 정보들, 이제 10분 브리핑 하나로. 구글, 노션, 슬랙을 통합한 초개인화 AI 브리핑.',
  keywords: ['온브리프', 'OwnBrief', 'AI 브리핑', '창업가', '생산성', '노션', '슬랙', '구글'],
  openGraph: {
    title: '온브리프 - 창업가를 위한 AI 브리핑',
    description: '파편화된 정보를 하나로. 10분 AI 팟캐스트 브리핑.',
    images: ['/og-image.png'],  // 1200x630px 이미지 (나중에 추가)
    url: 'https://ownbrief.com',  // 실제 도메인
  },
  twitter: {
    card: 'summary_large_image',
    title: '온브리프 - 창업가를 위한 AI 브리핑',
    description: '파편화된 정보를 하나로. 10분 AI 팟캐스트 브리핑.',
    images: ['/og-image.png'],
  },
};
```

---

## 체크리스트 (배포 전)

### 기능
- [ ] MVP 버튼이 `https://ownbrief.vercel.app`로 새 탭에서 열림
- [ ] 이메일 폼이 정상 작동 (제출, 로딩, 성공/에러 메시지)
- [ ] 이메일이 Supabase에 저장됨
- [ ] 중복 이메일 제출 시 에러 메시지
- [ ] 잘못된 이메일 형식 시 에러 메시지
- [ ] 체크박스 미동의 시 제출 불가

### 반응형
- [ ] 모바일에서 모든 섹션이 깨지지 않음
- [ ] 버튼 터치 영역 충분 (최소 44px)
- [ ] 텍스트 가독성 확인
- [ ] 이미지가 적절히 리사이즈

### 분석
- [ ] GA4 페이지뷰 추적
- [ ] MVP 버튼 클릭 이벤트
- [ ] 이메일 제출 이벤트

### 성능
- [ ] Lighthouse Performance > 80
- [ ] 이미지 최적화
- [ ] 폰트 최적화

### SEO/소셜
- [ ] Open Graph 메타태그
- [ ] Twitter Card 메타태그
- [ ] favicon 설정 (public/favicon.ico)

### 보안
- [ ] .env.local이 .gitignore에 포함
- [ ] 환경 변수가 Git에 커밋 안됨

---

## 개발 우선순위

### Phase 1: 핵심 (반드시 완성)
1. Hero Section
2. Problem Section
3. Security Section ⭐
4. CTA Section (이메일 폼 + MVP 버튼)
5. Footer
6. API: /api/subscribe
7. Supabase 연동

### Phase 2: 중요 (시간 있으면)
8. Features Section
9. Persona Section
10. How It Works
11. FAQ Section
12. GA4 이벤트 트래킹

### Phase 3: 선택사항 (시간 남으면)
13. Solution Section
14. 애니메이션 (Framer Motion)
15. 스크롤 깊이 트래킹
16. 개인정보처리방침 별도 페이지

---

## 추가 참고사항

### 디자인 참고 사이트
- **Vercel**: https://vercel.com (블랙 위주, 미니멀)
- **Linear**: https://linear.app (깔끔한 블랙)
- **Raycast**: https://raycast.com (생산성 도구)

### 로고
- **파일 위치**: `public/logo.svg` (SVG 우선) 또는 `public/logo.png`
- **사용 방법**: `<Image src="/logo.svg" alt="OwnBrief" width={...} height={...} />`

### OG 이미지
- **파일 위치**: `public/og-image.png`
- **권장 크기**: 1200x630px
- **포맷**: PNG 또는 JPG
- **나중에 추가**: 개발 후 디자이너가 제작하여 추가

### MVP URL
- **현재**: `https://ownbrief.vercel.app`
- **버튼 동작**: `target="_blank" rel="noopener noreferrer"`로 새 탭에서 열기

---

## 최종 확인사항

1. **로고 파일**: `public/logo.svg` 또는 `public/logo.png`에 배치되어 있는가?
2. **환경 변수**: `.env.local`에 Supabase URL, Anon Key, GA ID가 설정되어 있는가?
3. **Supabase 테이블**: `email_subscriptions` 테이블이 생성되어 있는가?
4. **도메인**: Vercel에서 별도 도메인 연결 준비되어 있는가?
5. **OG 이미지**: 나중에 추가할 수 있도록 `public/og-image.png` 위치 확보되어 있는가?