-- Create customer_recipes tracking table
-- This tracks which recipes have been sent to which customers
-- Ensures we can provide variety and track usage

CREATE TABLE IF NOT EXISTS customer_recipes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id TEXT NOT NULL, -- Can be email or Stripe customer ID
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
  sent_month TEXT NOT NULL, -- Format: YYYY-MM
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_customer_recipes_customer_id ON customer_recipes(customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_recipes_recipe_id ON customer_recipes(recipe_id);
CREATE INDEX IF NOT EXISTS idx_customer_recipes_sent_month ON customer_recipes(sent_month);

-- Create compound index for checking if recipe was sent to customer
CREATE INDEX IF NOT EXISTS idx_customer_recipe_unique ON customer_recipes(customer_id, recipe_id);

-- Enable Row Level Security
ALTER TABLE customer_recipes ENABLE ROW LEVEL SECURITY;

-- Create policies for access
CREATE POLICY "Service role can manage customer recipes" ON customer_recipes
  FOR ALL USING (true);

-- Stats view: Recipe popularity
CREATE OR REPLACE VIEW recipe_popularity AS
SELECT
  r.name as recipe_name,
  r.id as recipe_id,
  COUNT(DISTINCT cr.customer_id) as times_sent,
  MAX(cr.created_at) as last_sent
FROM recipes r
LEFT JOIN customer_recipes cr ON r.id = cr.recipe_id
GROUP BY r.id, r.name
ORDER BY times_sent DESC;

-- Stats view: Customer variety
CREATE OR REPLACE VIEW customer_recipe_stats AS
SELECT
  customer_id,
  COUNT(DISTINCT recipe_id) as unique_recipes_received,
  COUNT(DISTINCT sent_month) as months_active,
  MIN(created_at) as first_order,
  MAX(created_at) as last_order
FROM customer_recipes
GROUP BY customer_id;

-- Function to get fresh recipes for customer
CREATE OR REPLACE FUNCTION get_fresh_recipes_for_customer(
  p_customer_id TEXT,
  p_diet_plan_id UUID,
  p_limit INT DEFAULT 20
)
RETURNS TABLE(
  id UUID,
  name TEXT,
  description TEXT,
  prep_time INT,
  cook_time INT,
  servings INT,
  difficulty TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    r.id,
    r.name,
    r.description,
    r.prep_time,
    r.cook_time,
    r.servings,
    r.difficulty
  FROM recipes r
  WHERE
    p_diet_plan_id = ANY(r.diet_plan_ids)
    AND r.id NOT IN (
      SELECT recipe_id
      FROM customer_recipes
      WHERE customer_id = p_customer_id
    )
  ORDER BY r.created_at DESC
  LIMIT p_limit;
END;
$$;

-- Verify table was created
SELECT
  'customer_recipes' as table_name,
  COUNT(*) as record_count
FROM customer_recipes;