-- Complete Authentication Setup for Production
-- Run this in Supabase SQL Editor to enable user accounts

-- 1. Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT,
    stripe_customer_id TEXT,
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

-- 2. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer_id ON users(stripe_customer_id);

-- 3. Create user_purchases table (for tracking purchases)
CREATE TABLE IF NOT EXISTS user_purchases (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    stripe_session_id TEXT,
    product_id TEXT NOT NULL,
    product_name TEXT NOT NULL,
    diet_plan TEXT,
    amount INTEGER NOT NULL,
    status TEXT DEFAULT 'pending',
    purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create indexes for user_purchases
CREATE INDEX IF NOT EXISTS idx_user_purchases_user_id ON user_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_user_purchases_stripe_session ON user_purchases(stripe_session_id);

-- 5. Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_purchases ENABLE ROW LEVEL SECURITY;

-- 6. Create policies for service role access
CREATE POLICY "Service role can manage users" ON users
  FOR ALL USING (true);

CREATE POLICY "Service role can manage purchases" ON user_purchases
  FOR ALL USING (true);

-- 7. Create update trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_purchases_updated_at BEFORE UPDATE ON user_purchases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Verify setup
SELECT
  'Setup Complete!' as message,
  (SELECT COUNT(*) FROM users) as user_count,
  (SELECT COUNT(*) FROM user_purchases) as purchase_count;