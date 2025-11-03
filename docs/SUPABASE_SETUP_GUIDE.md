# Supabase 설정 가이드 (직접 작업)

온브리프 랜딩페이지를 위한 Supabase 데이터베이스를 직접 설정하는 단계별 가이드입니다.

---

## 📋 목차

1. [Supabase 프로젝트 생성](#1-supabase-프로젝트-생성)
2. [데이터베이스 테이블 생성](#2-데이터베이스-테이블-생성)
3. [API 키 확인 및 복사](#3-api-키-확인-및-복사)
4. [환경 변수 설정](#4-환경-변수-설정)
5. [연결 테스트](#5-연결-테스트)
6. [데이터 확인 방법](#6-데이터-확인-방법)

---

## 1. Supabase 프로젝트 생성

### 1.1 Supabase 계정 만들기

1. **웹브라우저에서 접속**
   ```
   https://supabase.com
   ```

2. **로그인/가입**
   - 우측 상단 "Start your project" 또는 "Sign In" 클릭
   - GitHub 계정으로 간편 로그인 권장
   - 이메일로도 가입 가능

3. **대시보드 접속 확인**
   - 로그인 후 Supabase 대시보드가 보이면 성공!

### 1.2 새 프로젝트 생성

1. **"New Project" 버튼 클릭**
   - 대시보드 왼쪽 상단 또는 중앙의 "New Project" 버튼 클릭

2. **Organization 선택**
   - 이미 Organization이 있다면 선택
   - 없다면 새로 생성 (보통 GitHub 계정명으로 자동 생성됨)

3. **프로젝트 정보 입력**
   ```
   Name: ownbrief-landing
   Database Password: [안전한 비밀번호 입력 - 꼭 어딘가에 저장하세요!]
   Region: Northeast Asia (Seoul) - icn1
   Pricing Plan: Free (무료 플랜으로 시작)
   ```

4. **"Create new project" 버튼 클릭**
   - 프로젝트 생성에 약 2-3분 소요
   - "Setting up project..." 메시지가 표시됩니다
   - 완료되면 자동으로 프로젝트 대시보드로 이동

---

## 2. 데이터베이스 테이블 생성

### 2.1 SQL Editor 접속

1. **왼쪽 사이드바에서 "SQL Editor" 클릭**
   - 아이콘: `</>` 모양
   - 또는 직접 URL 접속: `https://supabase.com/dashboard/project/[your-project-id]/sql`

2. **"New query" 버튼 클릭**
   - 우측 상단의 "+ New query" 버튼

### 2.2 SQL 스크립트 실행

1. **아래 SQL 코드를 복사**

```sql
-- 온브리프 랜딩페이지 이메일 구독 테이블

-- 1. email_subscriptions 테이블 생성
CREATE TABLE IF NOT EXISTS email_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  source VARCHAR(50) DEFAULT 'landing_page'
);

-- 2. 이메일 중복 방지 인덱스
CREATE UNIQUE INDEX IF NOT EXISTS idx_email ON email_subscriptions(email);

-- 3. RLS (Row Level Security) 비활성화
-- 랜딩페이지에서 공개적으로 이메일을 수집하므로 RLS를 비활성화합니다
ALTER TABLE email_subscriptions DISABLE ROW LEVEL SECURITY;

-- 완료! 아래 쿼리로 테이블이 잘 생성되었는지 확인하세요:
-- SELECT * FROM email_subscriptions;
```

2. **SQL Editor에 붙여넣기**
   - 위 코드 전체를 복사
   - SQL Editor의 빈 영역에 붙여넣기

3. **"Run" 버튼 클릭 (또는 Ctrl+Enter / Cmd+Enter)**
   - 하단 우측의 초록색 "Run" 버튼
   - 성공하면 "Success. No rows returned" 메시지 표시

### 2.3 테이블 생성 확인

1. **왼쪽 사이드바에서 "Table Editor" 클릭**
   - 아이콘: 표 모양

2. **email_subscriptions 테이블 확인**
   - 왼쪽 목록에 `email_subscriptions` 테이블이 보이면 성공!
   - 클릭하면 테이블 구조 확인 가능:
     - `id`: UUID (자동 생성)
     - `email`: VARCHAR(255) (필수, 중복 불가)
     - `created_at`: TIMESTAMP (자동 생성)
     - `source`: VARCHAR(50) (기본값: 'landing_page')

---

## 3. API 키 확인 및 복사

### 3.1 Settings 페이지 접속

1. **왼쪽 사이드바 하단의 "Project Settings" (톱니바퀴 아이콘) 클릭**

2. **"API" 메뉴 클릭**
   - 왼쪽 서브메뉴에서 "API" 선택

### 3.2 필요한 정보 복사

다음 **2가지 정보**를 복사하여 메모장에 저장하세요:

#### ① Project URL
```
Configuration > Project URL

예시: https://xyzabcdefghijk.supabase.co
```
→ 이것이 `NEXT_PUBLIC_SUPABASE_URL` 값입니다.

#### ② anon public Key
```
Project API keys > anon public

(매우 긴 문자열)
예시: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdX...
```
→ 이것이 `NEXT_PUBLIC_SUPABASE_ANON_KEY` 값입니다.

**⚠️ 중요:**
- `anon public` 키만 복사하세요 (프론트엔드용)
- `service_role` 키는 **절대 복사하지 마세요** (서버용, 노출 금지!)

---

## 4. 환경 변수 설정

### 4.1 로컬 개발 환경 (컴퓨터에서 테스트)

1. **프로젝트 폴더에서 `.env.local` 파일 열기**
   - 파일 경로: `ownbrief_landingpage/.env.local`
   - 이미 생성되어 있습니다

2. **아래 값들을 실제 값으로 교체**

```bash
# Supabase 설정 (아래 값들을 위에서 복사한 값으로 교체)
NEXT_PUBLIC_SUPABASE_URL=https://xyzabcdefghijk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0

# Google Analytics 4 (선택사항, 나중에 설정 가능)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# MVP URL (그대로 사용)
NEXT_PUBLIC_MVP_URL=https://ownbrief.vercel.app
```

3. **파일 저장**
   - Ctrl+S (Windows/Linux) 또는 Cmd+S (Mac)

### 4.2 Vercel 배포 환경

1. **Vercel 대시보드 접속**
   ```
   https://vercel.com
   ```

2. **프로젝트 선택**
   - `ownbrief-landingpage` 프로젝트 클릭

3. **Settings > Environment Variables 이동**

4. **환경 변수 추가**
   - "Add New" 버튼 클릭
   - 아래 3개 변수를 하나씩 추가:

   ```
   Name: NEXT_PUBLIC_SUPABASE_URL
   Value: https://xyzabcdefghijk.supabase.co
   Environments: Production, Preview, Development 모두 체크
   ```

   ```
   Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   Environments: Production, Preview, Development 모두 체크
   ```

   ```
   Name: NEXT_PUBLIC_MVP_URL
   Value: https://ownbrief.vercel.app
   Environments: Production, Preview, Development 모두 체크
   ```

5. **Redeploy**
   - Deployments 탭으로 이동
   - 최신 배포 우측의 "..." 메뉴 클릭
   - "Redeploy" 선택
   - 환경 변수가 적용됩니다

---

## 5. 연결 테스트

### 5.1 로컬에서 테스트

1. **개발 서버 실행**
   ```bash
   npm run dev
   ```

2. **브라우저에서 접속**
   ```
   http://localhost:3000
   ```

3. **CTA 섹션까지 스크롤**
   - 페이지 하단의 "정식 런칭 시 알림 받기" 폼 찾기

4. **테스트 이메일 제출**
   ```
   이메일: test@example.com
   개인정보 동의 체크박스 클릭
   "알림 받기" 버튼 클릭
   ```

5. **성공 메시지 확인**
   - "알림 신청이 완료되었습니다!" 토스트 메시지가 나타나면 성공!

### 5.2 중복 제출 테스트

1. **같은 이메일로 다시 제출**
   - `test@example.com` 다시 입력

2. **에러 메시지 확인**
   - "이미 등록된 이메일입니다." 메시지가 나타나면 성공!

---

## 6. 데이터 확인 방법

### 6.1 Supabase Table Editor에서 확인

1. **Supabase 대시보드 접속**
   ```
   https://supabase.com/dashboard
   ```

2. **프로젝트 선택**
   - `ownbrief-landing` 클릭

3. **Table Editor 메뉴 클릭**

4. **email_subscriptions 테이블 선택**
   - 왼쪽 목록에서 클릭

5. **데이터 확인**
   - 방금 제출한 `test@example.com` 이 보이면 성공!
   - 각 행을 클릭하면 상세 정보 확인 가능

### 6.2 SQL Editor로 조회

1. **SQL Editor 접속**

2. **아래 쿼리 실행**
   ```sql
   SELECT * FROM email_subscriptions
   ORDER BY created_at DESC;
   ```

3. **결과 확인**
   - 최신 순으로 정렬된 이메일 목록 표시

### 6.3 이메일 데이터 내보내기

나중에 수집된 이메일을 사용하려면:

1. **Table Editor에서 email_subscriptions 테이블 열기**

2. **우측 상단 "..." 메뉴 클릭**

3. **"Export to CSV" 선택**
   - 모든 이메일이 CSV 파일로 다운로드됩니다

---

## 🎯 체크리스트

완료한 항목에 체크하세요:

- [ ] Supabase 계정 생성
- [ ] 프로젝트 생성 (ownbrief-landing)
- [ ] 데이터베이스 비밀번호 안전하게 저장
- [ ] SQL 스크립트 실행 (email_subscriptions 테이블 생성)
- [ ] Table Editor에서 테이블 확인
- [ ] Project URL 복사
- [ ] anon public Key 복사
- [ ] `.env.local` 파일 수정 (로컬 개발용)
- [ ] Vercel 환경 변수 설정 (배포용)
- [ ] 로컬에서 이메일 제출 테스트
- [ ] Supabase에서 데이터 확인

---

## 🆘 문제 해결

### Q1: "Project URL을 찾을 수 없어요"
→ Settings > API > Configuration > Project URL

### Q2: "테이블이 생성되지 않아요"
→ SQL Editor에서 에러 메시지 확인. 빨간색으로 표시된 오류를 읽어보세요.

### Q3: "이메일 제출하면 오류가 나요"
→ 브라우저 개발자 도구(F12) > Console 탭에서 오류 확인
→ `.env.local` 파일의 Supabase 값이 올바른지 확인

### Q4: "anon public 키가 너무 길어요"
→ 맞습니다! 약 200-300자 정도의 긴 문자열입니다. 전체를 복사하세요.

### Q5: "데이터가 Supabase에 저장 안돼요"
→ RLS (Row Level Security) 확인:
```sql
-- SQL Editor에서 실행
ALTER TABLE email_subscriptions DISABLE ROW LEVEL SECURITY;
```

---

## 📞 추가 도움

- **Supabase 공식 문서**: https://supabase.com/docs
- **이메일 문의**: contact@ownbrief.com
- **프로젝트 README**: [README.md](../README.md)

---

**작업 완료 후 이 가이드는 참고용으로 보관하세요!** 🎉
