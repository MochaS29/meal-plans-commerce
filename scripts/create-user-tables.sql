-- Create comprehensive user authentication and purchase tracking tables

-- Users table with password authentication
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  stripe_customer_id VARCHAR(255),
  email_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- Password reset tokens
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Email verification tokens
CREATE TABLE IF NOT EXISTS email_verification_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User purchases linked to Stripe
CREATE TABLE IF NOT EXISTS user_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_session_id VARCHAR(255),
  stripe_payment_intent_id VARCHAR(255),
  product_id VARCHAR(255) NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  diet_plan VARCHAR(100),
  amount INTEGER NOT NULL, -- Amount in cents
  currency VARCHAR(10) DEFAULT 'usd',
  status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed, refunded
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE, -- For subscription-based access
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User sessions for login tracking
CREATE TABLE IF NOT EXISTS user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_token VARCHAR(500) UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT
);

-- User recipe access log (track what recipes they've accessed)
CREATE TABLE IF NOT EXISTS user_recipe_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  recipe_id INTEGER REFERENCES recipes(id),
  diet_plan VARCHAR(100),
  access_type VARCHAR(50) DEFAULT 'view', -- view, download, print
  accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer_id ON users(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_user_purchases_user_id ON user_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_user_purchases_stripe_session ON user_purchases(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_user_purchases_diet_plan ON user_purchases(diet_plan);
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_token ON password_reset_tokens(token);
CREATE INDEX IF NOT EXISTS idx_email_verification_tokens_token ON email_verification_tokens(token);
CREATE INDEX IF NOT EXISTS idx_user_recipe_access_user_id ON user_recipe_access(user_id);

-- Update triggers for updated_at columns
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

-- Function to get user's active purchases
CREATE OR REPLACE FUNCTION get_user_active_purchases(user_email VARCHAR)
RETURNS TABLE (
  product_id VARCHAR,
  product_name VARCHAR,
  diet_plan VARCHAR,
  purchased_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  status VARCHAR
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    up.product_id,
    up.product_name,
    up.diet_plan,
    up.purchased_at,
    up.expires_at,
    up.status
  FROM user_purchases up
  JOIN users u ON u.id = up.user_id
  WHERE u.email = user_email
    AND up.status = 'completed'
    AND (up.expires_at IS NULL OR up.expires_at > NOW())
  ORDER BY up.purchased_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to check if user has access to a diet plan
CREATE OR REPLACE FUNCTION user_has_diet_access(user_email VARCHAR, diet_plan_name VARCHAR)
RETURNS BOOLEAN AS $$
DECLARE
  has_access BOOLEAN DEFAULT FALSE;
BEGIN
  SELECT EXISTS(
    SELECT 1
    FROM user_purchases up
    JOIN users u ON u.id = up.user_id
    WHERE u.email = user_email
      AND up.diet_plan = diet_plan_name
      AND up.status = 'completed'
      AND (up.expires_at IS NULL OR up.expires_at > NOW())
  ) INTO has_access;

  RETURN has_access;
END;
$$ LANGUAGE plpgsql;