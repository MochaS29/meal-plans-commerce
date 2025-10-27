-- ============================================
-- SUPABASE RLS SECURITY SETUP (FIXED VERSION)
-- Run this entire script in Supabase SQL Editor
-- ============================================

-- Step 1: Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Step 2: Create service-role bypass policies
-- These allow the service role (your backend) to do everything
-- while blocking direct access via anon key

-- Users table: Service role can do everything
CREATE POLICY "Service role has full access to users"
ON users FOR ALL
USING (auth.role() = 'service_role');

-- Purchases table: Service role can do everything
CREATE POLICY "Service role has full access to purchases"
ON purchases FOR ALL
USING (auth.role() = 'service_role');

-- Subscriptions table: Service role can do everything
CREATE POLICY "Service role has full access to subscriptions"
ON subscriptions FOR ALL
USING (auth.role() = 'service_role');

-- Step 3: Create admin table for future use
CREATE TABLE IF NOT EXISTS admin_users (
  email TEXT PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Add your admin email
INSERT INTO admin_users (email)
VALUES ('mocha@mochasmindlab.com')
ON CONFLICT (email) DO NOTHING;

-- Enable RLS on admin table
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Service role can manage admin table
CREATE POLICY "Service role has full access to admin_users"
ON admin_users FOR ALL
USING (auth.role() = 'service_role');

-- Step 4: Verify RLS is enabled
SELECT
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('users', 'purchases', 'subscriptions', 'admin_users')
ORDER BY tablename;

-- Step 5: List all policies to confirm
SELECT
  tablename,
  policyname,
  cmd,
  permissive
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;