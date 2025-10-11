-- ============================================
-- SUPABASE RLS SECURITY SETUP
-- Run this entire script in Supabase SQL Editor
-- ============================================

-- Step 1: Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Step 2: Create policies for users table
CREATE POLICY "Users can view own profile"
ON users FOR SELECT
USING (auth.uid()::text = id OR auth.jwt()->>'email' = email);

-- Step 3: Create policies for purchases table
CREATE POLICY "Users can view own purchases"
ON purchases FOR SELECT
USING (
  user_id IN (
    SELECT id FROM users
    WHERE auth.jwt()->>'email' = email
  )
);

-- Step 4: Create policies for subscriptions table
CREATE POLICY "Users can view own subscriptions"
ON subscriptions FOR SELECT
USING (
  user_id IN (
    SELECT id FROM users
    WHERE auth.jwt()->>'email' = email
  )
);

-- Step 5: Create admin table and policies (optional but recommended)
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

-- Admin can do everything on users table
CREATE POLICY "Admins can manage all users"
ON users FOR ALL
USING (
  auth.jwt()->>'email' IN (
    SELECT email FROM admin_users
  )
);

-- Admin can do everything on purchases table
CREATE POLICY "Admins can manage all purchases"
ON purchases FOR ALL
USING (
  auth.jwt()->>'email' IN (
    SELECT email FROM admin_users
  )
);

-- Admin can do everything on subscriptions table
CREATE POLICY "Admins can manage all subscriptions"
ON subscriptions FOR ALL
USING (
  auth.jwt()->>'email' IN (
    SELECT email FROM admin_users
  )
);

-- Step 6: Verify RLS is enabled
SELECT
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('users', 'purchases', 'subscriptions', 'admin_users')
ORDER BY tablename;

-- Step 7: List all policies to confirm
SELECT
  tablename,
  policyname,
  cmd,
  permissive
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;