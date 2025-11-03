# 온브리프(OwnBrief) 랜딩페이지

> 창업가를 위한 초개인화 AI 브리핑 솔루션

여러 앱을 오가며 확인하던 정보들, 이제 10분 브리핑 하나로. 구글 캘린더, Gmail, 노션, 슬랙을 통합한 AI 팟캐스트 브리핑 서비스입니다.

## 프로젝트 개요

- **목표**: 3일 내 MVP 배포 전 랜딩페이지 완성
- **개발자**: 박영민 (프론트엔드 + 백엔드)
- **배포 환경**: Vercel
- **상세 문서**: [PRD 문서](docs/prd.md) 참조

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
- **Domain**: 별도 도메인 연결 예정

## 시작하기

### 1. 의존성 설치

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 환경 변수를 설정하세요:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# MVP URL
NEXT_PUBLIC_MVP_URL=https://ownbrief.vercel.app
```

### 3. Supabase 테이블 생성

Supabase 프로젝트에서 다음 SQL을 실행하세요:

```sql
CREATE TABLE email_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  source VARCHAR(50) DEFAULT 'landing_page'
);

CREATE UNIQUE INDEX idx_email ON email_subscriptions(email);

ALTER TABLE email_subscriptions DISABLE ROW LEVEL SECURITY;
```

### 4. 개발 서버 실행

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

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
│   ├── logo.svg                   # 로고
│   ├── og-image.png               # OG 이미지 (1200x630px)
│   └── images/                    # 기타 이미지
├── docs/
│   └── prd.md                     # 제품 요구사항 문서
└── mcp.json                       # MCP 서버 설정
```

## 주요 기능

### 랜딩페이지 섹션
1. **Hero Section**: 핵심 가치 전달, MVP 버튼, CTA
2. **Problem Section**: 타겟 고객 Pain Points 공감
3. **Solution Section**: 온브리프의 핵심 가치
4. **Features Section**: 3가지 핵심 기능 강조
5. **Security Section** ⭐: 보안을 핵심 셀링 포인트로 강조
6. **Persona Section**: 3가지 AI 비서 페르소나 소개
7. **How It Works Section**: 간단한 사용 방법
8. **CTA Section** ⭐: 이메일 수집 + MVP 링크
9. **FAQ Section**: 자주 묻는 질문
10. **Footer**: 기본 정보 및 링크

### API
- `POST /api/subscribe`: 이메일 구독 신청

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

### Phase 3: 선택사항 (시간 남으면) ✅ 완료
13. Solution Section
14. 애니메이션 (Framer Motion)
15. 스크롤 깊이 트래킹
16. 개인정보처리방침 별도 페이지

**모든 Phase 개발 완료!**

## 배포하기

상세한 배포 가이드는 [DEPLOYMENT.md](DEPLOYMENT.md)를 참조하세요.

### 빠른 배포 (Vercel 사용)

1. **Supabase 설정**
   ```bash
   # 1. https://supabase.com 에서 프로젝트 생성
   # 2. SQL Editor에서 supabase-setup.sql 실행
   # 3. Settings > API에서 URL과 anon key 복사
   ```

2. **Vercel 배포**
   ```bash
   # 1. https://vercel.com 에서 GitHub 리포지토리 연결
   # 2. 환경 변수 설정:
   #    - NEXT_PUBLIC_SUPABASE_URL
   #    - NEXT_PUBLIC_SUPABASE_ANON_KEY
   #    - NEXT_PUBLIC_GA_ID (선택사항)
   #    - NEXT_PUBLIC_MVP_URL
   # 3. Deploy 버튼 클릭
   ```

3. **배포 완료!**
   - Vercel이 자동으로 URL 생성
   - main 브랜치에 push하면 자동 재배포

### 로컬 개발 환경

```bash
# .env.local 파일 생성 (.env.example 참고)
cp .env.example .env.local

# Supabase 값으로 수정
nano .env.local

# 개발 서버 실행
npm run dev
```

## 배포 전 체크리스트

### 기능
- [ ] MVP 버튼이 `https://ownbrief.vercel.app`로 새 탭에서 열림
- [ ] 이메일 폼이 정상 작동 (제출, 로딩, 성공/에러 메시지)
- [ ] 이메일이 Supabase에 저장됨
- [ ] 중복 이메일 제출 시 에러 메시지
- [ ] 잘못된 이메일 형식 시 에러 메시지

### 반응형
- [ ] 모바일에서 모든 섹션이 깨지지 않음
- [ ] 버튼 터치 영역 충분 (최소 44px)
- [ ] 텍스트 가독성 확인

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
- [ ] favicon 설정

### 보안
- [ ] .env.local이 .gitignore에 포함
- [ ] 환경 변수가 Git에 커밋 안됨

## 디자인 참고

- **Vercel**: https://vercel.com (블랙 위주, 미니멀)
- **Linear**: https://linear.app (깔끔한 블랙)
- **Raycast**: https://raycast.com (생산성 도구)

## 문의

- **이메일**: contact@ownbrief.com
- **상세 문서**: [PRD 문서](docs/prd.md)

## 라이선스

© 2025 OwnBrief. All rights reserved.
