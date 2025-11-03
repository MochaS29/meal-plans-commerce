-- Fix login by creating missing user_sessions table
-- Run this in Supabase SQL Editor

-- 1. Create user_sessions table
CREATE TABLE IF NOT EXISTS user_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT
);

-- 2. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);

-- 3. Enable RLS
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

-- 4. Create policy
DROP POLICY IF EXISTS "Service role can manage sessions" ON user_sessions;
CREATE POLICY "Service role can manage sessions" ON user_sessions FOR ALL USING (true);

-- 5. Create password reset tokens table (also needed)
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Create index for password reset tokens
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_token ON password_reset_tokens(token);

-- 7. Enable RLS for password reset tokens
ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;

-- 8. Create policy for password reset tokens
DROP POLICY IF EXISTS "Service role can manage reset tokens" ON password_reset_tokens;
CREATE POLICY "Service role can manage reset tokens" ON password_reset_tokens FOR ALL USING (true);

-- 9. Verify all tables exist
SELECT 
  'Login tables created successfully!' as message,
  (SELECT COUNT(*) FROM user_sessions) as sessions_count,
  (SELECT COUNT(*) FROM password_reset_tokens) as reset_tokens_count;