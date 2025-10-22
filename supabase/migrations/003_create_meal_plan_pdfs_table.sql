-- Create meal_plan_pdfs table for PDF caching and reuse
CREATE TABLE IF NOT EXISTS meal_plan_pdfs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- PDF Information
  pdf_url TEXT NOT NULL,
  diet_plan_id UUID REFERENCES diet_plans(id),
  plan_type TEXT NOT NULL, -- 'Mediterranean Diet', 'Keto', etc.

  -- Recipe tracking (for matching)
  recipe_ids UUID[] NOT NULL, -- Array of recipe IDs
  recipe_hash TEXT NOT NULL, -- Hash of sorted recipe IDs for quick matching
  recipe_count INTEGER NOT NULL DEFAULT 30,

  -- Metadata
  generation_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  file_size_bytes INTEGER, -- Optional: track file size
  page_count INTEGER, -- Optional: track number of pages

  -- Usage tracking
  times_reused INTEGER NOT NULL DEFAULT 0,
  last_used_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on recipe_hash for fast lookups
CREATE INDEX IF NOT EXISTS idx_meal_plan_pdfs_recipe_hash ON meal_plan_pdfs(recipe_hash);

-- Create index on diet_plan_id for filtering by diet type
CREATE INDEX IF NOT EXISTS idx_meal_plan_pdfs_diet_plan_id ON meal_plan_pdfs(diet_plan_id);

-- Create index on plan_type for quick filtering
CREATE INDEX IF NOT EXISTS idx_meal_plan_pdfs_plan_type ON meal_plan_pdfs(plan_type);

-- Create GIN index on recipe_ids array for containment queries
CREATE INDEX IF NOT EXISTS idx_meal_plan_pdfs_recipe_ids ON meal_plan_pdfs USING GIN(recipe_ids);

-- Add comment to table
COMMENT ON TABLE meal_plan_pdfs IS 'Stores metadata about generated meal plan PDFs for caching and reuse';

-- Create customer_meal_plans junction table to link customers to PDFs
CREATE TABLE IF NOT EXISTS customer_meal_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  customer_email TEXT NOT NULL,
  meal_plan_pdf_id UUID NOT NULL REFERENCES meal_plan_pdfs(id) ON DELETE CASCADE,
  stripe_session_id TEXT,
  purchase_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for customer lookups
CREATE INDEX IF NOT EXISTS idx_customer_meal_plans_email ON customer_meal_plans(customer_email);
CREATE INDEX IF NOT EXISTS idx_customer_meal_plans_pdf_id ON customer_meal_plans(meal_plan_pdf_id);
CREATE INDEX IF NOT EXISTS idx_customer_meal_plans_stripe_session ON customer_meal_plans(stripe_session_id);

-- Add comment
COMMENT ON TABLE customer_meal_plans IS 'Links customers to their purchased meal plan PDFs';

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_meal_plan_pdfs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
CREATE TRIGGER trigger_update_meal_plan_pdfs_updated_at
  BEFORE UPDATE ON meal_plan_pdfs
  FOR EACH ROW
  EXECUTE FUNCTION update_meal_plan_pdfs_updated_at();
