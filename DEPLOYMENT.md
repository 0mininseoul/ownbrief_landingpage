# 온브리프 랜딩페이지 배포 가이드

## 📚 관련 문서

- **상세 Supabase 설정 가이드**: [docs/SUPABASE_SETUP_GUIDE.md](docs/SUPABASE_SETUP_GUIDE.md) ⭐ **강력 추천!**
- **프로젝트 README**: [README.md](README.md)
- **PRD 문서**: [docs/prd.md](docs/prd.md)

---

## 1. Supabase 설정

**🎯 상세한 스크린샷과 함께 하는 단계별 가이드를 원하시면 [docs/SUPABASE_SETUP_GUIDE.md](docs/SUPABASE_SETUP_GUIDE.md)를 참조하세요!**

### 빠른 요약:

1. [Supabase](https://supabase.com) 접속 → 로그인
2. "New Project" 클릭 → 프로젝트명: `ownbrief-landing`, Region: Seoul
3. SQL Editor에서 아래 스크립트 실행:

```sql
-- email_subscriptions 테이블 생성
CREATE TABLE IF NOT EXISTS email_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  source VARCHAR(50) DEFAULT 'landing_page'
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_email ON email_subscriptions(email);
ALTER TABLE email_subscriptions DISABLE ROW LEVEL SECURITY;
```

4. Settings > API에서 복사:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 2. Google Analytics 설정 (선택사항)

1. [Google Analytics](https://analytics.google.com)에 접속
2. 새 속성 생성 (GA4)
3. 데이터 스트림 추가 (웹)
4. 측정 ID (G-XXXXXXXXXX) 복사

## 3. Vercel 배포

### 3.1 GitHub 연동 (권장)

1. [Vercel](https://vercel.com)에 로그인
2. "Add New..." > "Project" 클릭
3. GitHub 리포지토리 연결:
   - `0mininseoul/ownbrief_landingpage` 선택
   - "Import" 클릭

### 3.2 환경 변수 설정

1. "Configure Project" 페이지에서 "Environment Variables" 섹션으로 스크롤
2. 다음 환경 변수들을 추가:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_MVP_URL=https://ownbrief.vercel.app
```

3. "Deploy" 버튼 클릭

### 3.3 배포 완료

- 배포가 완료되면 Vercel이 자동으로 URL을 생성합니다
- 예: `https://ownbrief-landingpage.vercel.app`

## 4. 커스텀 도메인 연결 (선택사항)

1. Vercel 프로젝트 대시보드에서 "Settings" > "Domains" 클릭
2. 도메인 입력 (예: `landing.ownbrief.com`)
3. DNS 설정 안내에 따라 도메인 제공업체에서 레코드 추가:
   - Type: `CNAME`
   - Name: `landing` (또는 `@` for apex domain)
   - Value: `cname.vercel-dns.com`
4. DNS 전파 대기 (최대 48시간, 보통 몇 분 내)

## 5. 배포 후 확인사항

### 5.1 기능 테스트

- [ ] MVP 버튼이 올바른 URL로 이동하는지 확인
- [ ] 이메일 폼 제출이 정상 작동하는지 확인
- [ ] Supabase에 이메일이 저장되는지 확인
- [ ] 모든 섹션이 제대로 표시되는지 확인
- [ ] 모바일에서 레이아웃이 깨지지 않는지 확인

### 5.2 Supabase 데이터 확인

1. Supabase 대시보드에서 "Table Editor" 클릭
2. `email_subscriptions` 테이블 선택
3. 테스트 이메일이 저장되었는지 확인

### 5.3 Analytics 확인 (GA4 설정한 경우)

1. Google Analytics 대시보드에서 "실시간" 보고서 확인
2. 페이지뷰가 기록되는지 확인
3. 이벤트 (MVP 클릭, 이메일 제출) 확인

## 6. 지속적 배포 (Continuous Deployment)

Vercel은 GitHub와 자동 연동되어 있습니다:

- `main` 브랜치에 push하면 자동으로 프로덕션 배포
- 다른 브랜치에 push하면 프리뷰 배포 생성
- Pull Request 생성 시 자동 프리뷰 URL 생성

## 7. 문제 해결

### 빌드 실패 시

1. Vercel 대시보드에서 "Deployments" 클릭
2. 실패한 배포 클릭하여 로그 확인
3. 대부분 환경 변수 누락이 원인

### 이메일 제출 실패 시

1. 브라우저 개발자 도구 (F12) > Console 확인
2. Network 탭에서 `/api/subscribe` 요청 확인
3. Supabase API 키가 올바른지 확인

### 폰트 로딩 실패 시

- 빌드 환경에서 Google Fonts 접근 불가한 경우
- 로컬에서는 정상 작동하며, 프로덕션 배포 시 해결됨

## 8. 보안 체크리스트

- [ ] `.env.local` 파일이 `.gitignore`에 포함되어 Git에 커밋되지 않음
- [ ] Supabase anon key만 사용 (service_role key는 절대 노출하지 말 것)
- [ ] Vercel 환경 변수가 올바르게 설정됨
- [ ] Supabase RLS가 적절히 설정됨

## 배포 완료!

배포가 완료되면 아래 URL들을 확인하세요:

- **프로덕션 URL**: Vercel에서 생성된 URL
- **Supabase 대시보드**: https://supabase.com/dashboard/project/[your-project-id]
- **Vercel 대시보드**: https://vercel.com/[your-username]/ownbrief-landingpage

문제가 발생하면 이메일로 문의하세요: contact@ownbrief.com
