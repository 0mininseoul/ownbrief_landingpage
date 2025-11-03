-- 온브리프 랜딩페이지 Supabase 데이터베이스 설정
-- 이 스크립트를 Supabase SQL Editor에서 실행하세요

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

-- 4. (선택사항) 특정 도메인만 접근하도록 하려면 아래 설정을 사용하세요
-- ALTER TABLE email_subscriptions ENABLE ROW LEVEL SECURITY;
--
-- CREATE POLICY "Allow public insert" ON email_subscriptions
--   FOR INSERT
--   TO anon
--   WITH CHECK (true);
--
-- CREATE POLICY "Allow service role to read" ON email_subscriptions
--   FOR SELECT
--   TO authenticated
--   USING (true);

-- 완료! 이제 Supabase URL과 Anon Key를 복사하여 환경 변수에 설정하세요.
