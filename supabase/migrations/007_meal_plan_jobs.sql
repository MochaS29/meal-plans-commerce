-- Create meal_plan_jobs table for background processing
CREATE TABLE IF NOT EXISTS meal_plan_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_email TEXT NOT NULL,
  stripe_session_id TEXT NOT NULL UNIQUE,
  product_type TEXT NOT NULL CHECK (product_type IN ('one_time', 'subscription')),

  -- Customization data
  diet_type TEXT NOT NULL,
  family_size INTEGER DEFAULT 4,
  dietary_needs JSONB DEFAULT '[]'::jsonb,
  allergies TEXT,
  preferences TEXT,
  customizations JSONB DEFAULT '{}'::jsonb,

  -- Processing status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  error_message TEXT,

  -- Recipe tracking
  recipe_count INTEGER,
  pdf_url TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processing_started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,

  -- Metadata
  month INTEGER, -- Month this plan is for (1-12)
  year INTEGER,  -- Year this plan is for
  days_in_month INTEGER, -- Number of days in the target month

  -- Indexes for efficient querying
  CONSTRAINT fk_customer_email FOREIGN KEY (customer_email)
    REFERENCES users(email) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_meal_plan_jobs_status ON meal_plan_jobs(status);
CREATE INDEX IF NOT EXISTS idx_meal_plan_jobs_customer_email ON meal_plan_jobs(customer_email);
CREATE INDEX IF NOT EXISTS idx_meal_plan_jobs_created_at ON meal_plan_jobs(created_at);
CREATE INDEX IF NOT EXISTS idx_meal_plan_jobs_stripe_session ON meal_plan_jobs(stripe_session_id);

-- RLS Policies
ALTER TABLE meal_plan_jobs ENABLE ROW LEVEL SECURITY;

-- Users can view their own jobs
CREATE POLICY "Users can view their own meal plan jobs"
  ON meal_plan_jobs
  FOR SELECT
  USING (customer_email = auth.jwt() ->> 'email');

-- Service role can do everything (for webhook and cron)
CREATE POLICY "Service role has full access to meal plan jobs"
  ON meal_plan_jobs
  FOR ALL
  USING (auth.role() = 'service_role');

COMMENT ON TABLE meal_plan_jobs IS 'Background jobs for generating AI-customized meal plans';
COMMENT ON COLUMN meal_plan_jobs.status IS 'Job status: pending (queued), processing (in progress), completed (done), failed (error)';
COMMENT ON COLUMN meal_plan_jobs.product_type IS 'one_time ($59) or subscription ($29/month)';
