# 🔒 Supabase Row Level Security (RLS) Setup Guide

## Overview
This guide provides step-by-step instructions to enable Row Level Security (RLS) on your Supabase tables to fix the security warnings and protect your data in production.

## Why RLS is Critical
- **Without RLS**: Anyone with your Supabase URL and anon key can read/write ALL data
- **With RLS**: Data access is controlled by policies you define
- **Service Role Key**: Bypasses RLS (use only on server-side)

## Step 1: Access Supabase SQL Editor

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/rnvowqoqqcrimrybuiea
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query** button

## Step 2: Enable RLS on All Tables

Copy and run this SQL to enable RLS on all your tables:

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
```

## Step 3: Create Security Policies

Run these SQL commands to create appropriate access policies:

### Users Table Policies
```sql
-- Users can only read their own data
CREATE POLICY "Users can view own profile"
ON users FOR SELECT
USING (auth.uid()::text = id OR auth.jwt()->>'email' = email);

-- Server can create/update users (using service role key)
-- No INSERT/UPDATE policy means only service role can modify
```

### Purchases Table Policies
```sql
-- Users can view their own purchases
CREATE POLICY "Users can view own purchases"
ON purchases FOR SELECT
USING (
  user_id IN (
    SELECT id FROM users
    WHERE auth.jwt()->>'email' = email
  )
);

-- Server can create purchases (using service role key)
-- No INSERT/UPDATE policy means only service role can modify
```

### Subscriptions Table Policies
```sql
-- Users can view their own subscriptions
CREATE POLICY "Users can view own subscriptions"
ON subscriptions FOR SELECT
USING (
  user_id IN (
    SELECT id FROM users
    WHERE auth.jwt()->>'email' = email
  )
);

-- Server can manage subscriptions (using service role key)
-- No INSERT/UPDATE/DELETE policy means only service role can modify
```

## Step 4: Create Admin-Only Policies (Optional)

If you want to allow admin access through the dashboard:

```sql
-- Create an admin users table (optional)
CREATE TABLE IF NOT EXISTS admin_users (
  email TEXT PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Add yourself as admin
INSERT INTO admin_users (email) VALUES ('mocha@mochasmindlab.com');

-- Enable RLS on admin table
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Admin policy for users table
CREATE POLICY "Admins can view all users"
ON users FOR ALL
USING (
  auth.jwt()->>'email' IN (
    SELECT email FROM admin_users
  )
);

-- Admin policy for purchases table
CREATE POLICY "Admins can view all purchases"
ON purchases FOR ALL
USING (
  auth.jwt()->>'email' IN (
    SELECT email FROM admin_users
  )
);

-- Admin policy for subscriptions table
CREATE POLICY "Admins can view all subscriptions"
ON subscriptions FOR ALL
USING (
  auth.jwt()->>'email' IN (
    SELECT email FROM admin_users
  )
);
```

## Step 5: Test Your Policies

Run these queries to verify RLS is working:

```sql
-- Check RLS status
SELECT
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('users', 'purchases', 'subscriptions');

-- List all policies
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

## Step 6: Update Your Application Code

Your application already uses the service role key on the server-side, which bypasses RLS:

```typescript
// In lib/supabase.ts
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
```

This means:
- ✅ Server-side operations (webhooks, API routes) will continue to work
- ✅ RLS protects against direct database access with anon key
- ✅ No code changes needed

## Step 7: Verify in Supabase Dashboard

1. Go to **Authentication** → **Policies** in Supabase dashboard
2. You should see all your new policies listed
3. Check the **Database** → **Tables** view
4. Each table should show "RLS enabled" badge

## Important Security Notes

1. **Never expose SERVICE_ROLE_KEY in client code** - it bypasses all RLS
2. **ANON_KEY is safe to expose** - it respects RLS policies
3. **Test thoroughly** before production deployment
4. **Monitor failed requests** in Supabase logs after enabling RLS

## Quick Verification Script

After enabling RLS, test with this in SQL Editor:

```sql
-- This should return empty (no auth context in SQL editor)
SELECT * FROM users;
SELECT * FROM purchases;
SELECT * FROM subscriptions;

-- This should show RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND rowsecurity = true;
```

## Rollback (If Needed)

If you encounter issues and need to temporarily disable RLS:

```sql
-- DANGER: Only use in development/testing
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE purchases DISABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions DISABLE ROW LEVEL SECURITY;

-- Drop all policies
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can view own purchases" ON purchases;
DROP POLICY IF EXISTS "Users can view own subscriptions" ON subscriptions;
```

## Production Checklist

Before going live:
- [ ] RLS enabled on all tables
- [ ] Policies tested with test accounts
- [ ] Service role key only used server-side
- [ ] Admin access policies configured (if needed)
- [ ] Monitoring alerts configured for auth failures
- [ ] Backup created before enabling RLS

## Support

If you see any errors after enabling RLS:
1. Check Supabase logs for policy violations
2. Verify auth tokens are being passed correctly
3. Test with service role key to confirm it's an RLS issue
4. Review policy conditions for logic errors