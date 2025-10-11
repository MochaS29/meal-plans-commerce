-- ============================================
-- COMPLETE DATABASE SETUP - RUN THIS ONCE
-- ============================================
-- This file contains all 3 migrations combined
-- Copy everything below and paste into Supabase SQL Editor

-- ============================================
-- MIGRATION 1: Initial Schema
-- ============================================

-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  stripe_customer_id TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create purchases table
CREATE TABLE IF NOT EXISTS public.purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  stripe_session_id TEXT,
  product_id TEXT,
  product_name TEXT,
  amount INTEGER,
  currency TEXT DEFAULT 'usd',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT UNIQUE,
  status TEXT DEFAULT 'active',
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create diet_plans table
CREATE TABLE IF NOT EXISTS public.diet_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price INTEGER,
  features JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create recipes table
CREATE TABLE IF NOT EXISTS public.recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  prep_time INTEGER,
  cook_time INTEGER,
  servings INTEGER,
  difficulty TEXT,
  diet_plans TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create recipe_ingredients table
CREATE TABLE IF NOT EXISTS public.recipe_ingredients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id UUID REFERENCES public.recipes(id) ON DELETE CASCADE,
  ingredient TEXT NOT NULL,
  amount TEXT,
  unit TEXT,
  notes TEXT,
  order_index INTEGER
);

-- Create recipe_instructions table
CREATE TABLE IF NOT EXISTS public.recipe_instructions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id UUID REFERENCES public.recipes(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  instruction TEXT NOT NULL
);

-- Create recipe_nutrition table
CREATE TABLE IF NOT EXISTS public.recipe_nutrition (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id UUID REFERENCES public.recipes(id) ON DELETE CASCADE,
  calories INTEGER,
  protein DECIMAL,
  carbs DECIMAL,
  fat DECIMAL,
  fiber DECIMAL
);

-- Create meal_plans table
CREATE TABLE IF NOT EXISTS public.meal_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  diet_plan_id UUID REFERENCES public.diet_plans(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  month INTEGER NOT NULL,
  week_number INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(diet_plan_id, year, month, week_number)
);

-- Create daily_meals table
CREATE TABLE IF NOT EXISTS public.daily_meals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meal_plan_id UUID REFERENCES public.meal_plans(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL,
  breakfast_recipe_id UUID REFERENCES public.recipes(id),
  lunch_recipe_id UUID REFERENCES public.recipes(id),
  dinner_recipe_id UUID REFERENCES public.recipes(id),
  snack_recipe_id UUID REFERENCES public.recipes(id)
);

-- Create shopping_lists table
CREATE TABLE IF NOT EXISTS public.shopping_lists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meal_plan_id UUID REFERENCES public.meal_plans(id) ON DELETE CASCADE,
  week_number INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create shopping_list_items table
CREATE TABLE IF NOT EXISTS public.shopping_list_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shopping_list_id UUID REFERENCES public.shopping_lists(id) ON DELETE CASCADE,
  item TEXT NOT NULL,
  quantity TEXT,
  category TEXT,
  checked BOOLEAN DEFAULT FALSE
);

-- Create meal_prep_guides table
CREATE TABLE IF NOT EXISTS public.meal_prep_guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meal_plan_id UUID REFERENCES public.meal_plans(id) ON DELETE CASCADE,
  day_name TEXT NOT NULL,
  prep_tasks TEXT[]
);

-- Insert initial diet plans
INSERT INTO public.diet_plans (name, slug, description, price, features) VALUES ('Mediterranean Diet', 'mediterranean', 'Heart-healthy cuisine with anti-inflammatory benefits', 4900, '{"features": ["Olive oil focus", "Fresh vegetables", "Lean proteins", "Whole grains"]}'::jsonb), ('Keto Diet', 'keto', 'High-fat, low-carb for metabolic health', 4900, '{"features": ["75% fat", "20% protein", "5% carbs", "Ketosis support"]}'::jsonb), ('Vegan', 'vegan', '100% plant-based nutrition', 4900, '{"features": ["No animal products", "High fiber", "Plant proteins", "B12 fortified"]}'::jsonb), ('Paleo', 'paleo', 'Ancestral eating for optimal health', 4900, '{"features": ["No grains", "No dairy", "Whole foods", "High protein"]}'::jsonb), ('Vegetarian', 'vegetarian', 'Plant-forward with dairy and eggs', 4900, '{"features": ["No meat", "Includes dairy", "Includes eggs", "Balanced nutrition"]}'::jsonb), ('Intermittent Fasting', 'intermittent-fasting', '16:8 time-restricted eating', 4900, '{"features": ["16-hour fast", "8-hour eating window", "Metabolic benefits", "Flexible meals"]}'::jsonb), ('Family Focused', 'family-focused', 'Kid-friendly meals the whole family loves', 4900, '{"features": ["Kid-approved", "Easy prep", "Budget-friendly", "Batch cooking"]}'::jsonb) ON CONFLICT (slug) DO NOTHING;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON public.purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_recipes_diet_plans ON public.recipes USING GIN(diet_plans);
CREATE INDEX IF NOT EXISTS idx_meal_plans_lookup ON public.meal_plans(diet_plan_id, year, month);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
DO $$ BEGIN
  CREATE POLICY "Public read access" ON public.recipes FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "Public read access" ON public.diet_plans FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "Public read access" ON public.meal_plans FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "Public read access" ON public.daily_meals FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "Public read access" ON public.shopping_lists FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN
  CREATE POLICY "Public read access" ON public.shopping_list_items FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ============================================
-- MIGRATION 2: Images Table
-- ============================================

CREATE TABLE IF NOT EXISTS public.images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  alt_text TEXT,
  caption TEXT,
  width INTEGER,
  height INTEGER,
  file_size INTEGER,
  mime_type TEXT,
  storage_path TEXT,
  entity_type TEXT,
  entity_id UUID,
  is_primary BOOLEAN DEFAULT FALSE,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_images_entity ON public.images(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_images_primary ON public.images(entity_type, entity_id, is_primary) WHERE is_primary = TRUE;

ALTER TABLE public.images ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Public read access" ON public.images FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Authenticated users can insert" ON public.images FOR INSERT
    WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Authenticated users can update" ON public.images FOR UPDATE
    USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Authenticated users can delete" ON public.images FOR DELETE
    USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_images_updated_at ON public.images;
CREATE TRIGGER update_images_updated_at BEFORE UPDATE ON public.images
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- MIGRATION 3: Helper Functions
-- ============================================

CREATE OR REPLACE FUNCTION get_complete_recipe(recipe_uuid UUID)
RETURNS JSON AS $$
  SELECT json_build_object(
    'id', r.id,
    'name', r.name,
    'description', r.description,
    'prep_time', r.prep_time,
    'cook_time', r.cook_time,
    'servings', r.servings,
    'difficulty', r.difficulty,
    'diet_plans', r.diet_plans,
    'image_url', (SELECT url FROM images WHERE entity_type = 'recipe' AND entity_id = r.id AND is_primary = true LIMIT 1),
    'images', (SELECT json_agg(json_build_object('url', url, 'alt_text', alt_text, 'caption', caption)) FROM images WHERE entity_type = 'recipe' AND entity_id = r.id),
    'ingredients', (
      SELECT json_agg(
        json_build_object(
          'ingredient', ingredient,
          'amount', amount,
          'unit', unit,
          'notes', notes
        ) ORDER BY order_index
      ) FROM recipe_ingredients WHERE recipe_id = r.id
    ),
    'instructions', (
      SELECT json_agg(
        json_build_object(
          'step', step_number,
          'instruction', instruction
        ) ORDER BY step_number
      ) FROM recipe_instructions WHERE recipe_id = r.id
    ),
    'nutrition', (
      SELECT json_build_object(
        'calories', calories,
        'protein', protein,
        'carbs', carbs,
        'fat', fat,
        'fiber', fiber
      ) FROM recipe_nutrition WHERE recipe_id = r.id LIMIT 1
    )
  )
  FROM recipes r
  WHERE r.id = recipe_uuid;
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION generate_shopping_list(meal_plan_uuid UUID)
RETURNS TABLE (
  item TEXT,
  total_quantity TEXT,
  category TEXT,
  recipe_count INTEGER
) AS $$
  WITH week_recipes AS (
    SELECT DISTINCT recipe_id
    FROM (
      SELECT breakfast_recipe_id as recipe_id FROM daily_meals WHERE meal_plan_id = meal_plan_uuid AND breakfast_recipe_id IS NOT NULL
      UNION
      SELECT lunch_recipe_id FROM daily_meals WHERE meal_plan_id = meal_plan_uuid AND lunch_recipe_id IS NOT NULL
      UNION
      SELECT dinner_recipe_id FROM daily_meals WHERE meal_plan_id = meal_plan_uuid AND dinner_recipe_id IS NOT NULL
      UNION
      SELECT snack_recipe_id FROM daily_meals WHERE meal_plan_id = meal_plan_uuid AND snack_recipe_id IS NOT NULL
    ) recipes
  ),
  aggregated_ingredients AS (
    SELECT
      ri.ingredient,
      string_agg(DISTINCT ri.amount || ' ' || COALESCE(ri.unit, ''), ' + ') as total_quantity,
      COUNT(DISTINCT wr.recipe_id) as recipe_count,
      CASE
        WHEN ri.ingredient ILIKE ANY(ARRAY['%chicken%', '%beef%', '%pork%', '%lamb%', '%turkey%', '%fish%', '%salmon%', '%tuna%', '%shrimp%']) THEN 'Protein'
        WHEN ri.ingredient ILIKE ANY(ARRAY['%milk%', '%cheese%', '%yogurt%', '%butter%', '%cream%']) THEN 'Dairy'
        WHEN ri.ingredient ILIKE ANY(ARRAY['%tomato%', '%lettuce%', '%spinach%', '%kale%', '%carrot%', '%onion%', '%garlic%', '%pepper%', '%apple%', '%banana%', '%orange%', '%berry%', '%berries%']) THEN 'Produce'
        WHEN ri.ingredient ILIKE ANY(ARRAY['%rice%', '%pasta%', '%bread%', '%flour%', '%oats%', '%quinoa%']) THEN 'Grains'
        WHEN ri.ingredient ILIKE ANY(ARRAY['%oil%', '%vinegar%', '%sauce%', '%spice%', '%salt%', '%pepper%', '%sugar%']) THEN 'Pantry'
        WHEN ri.ingredient ILIKE '%frozen%' THEN 'Frozen'
        ELSE 'Other'
      END as category
    FROM week_recipes wr
    JOIN recipe_ingredients ri ON ri.recipe_id = wr.recipe_id
    GROUP BY ri.ingredient
  )
  SELECT
    ingredient as item,
    total_quantity,
    category,
    recipe_count
  FROM aggregated_ingredients
  ORDER BY category, ingredient;
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION save_shopping_list(meal_plan_uuid UUID)
RETURNS UUID AS $$
DECLARE
  shopping_list_id UUID;
  week_num INTEGER;
BEGIN
  SELECT week_number INTO week_num FROM meal_plans WHERE id = meal_plan_uuid;
  INSERT INTO shopping_lists (meal_plan_id, week_number)
  VALUES (meal_plan_uuid, week_num)
  RETURNING id INTO shopping_list_id;
  INSERT INTO shopping_list_items (shopping_list_id, item, quantity, category)
  SELECT shopping_list_id, item, total_quantity, category
  FROM generate_shopping_list(meal_plan_uuid);
  RETURN shopping_list_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_weekly_meal_plan(meal_plan_uuid UUID)
RETURNS JSON AS $$
  SELECT json_build_object(
    'meal_plan_id', mp.id,
    'diet_plan', (SELECT name FROM diet_plans WHERE id = mp.diet_plan_id),
    'year', mp.year,
    'month', mp.month,
    'week_number', mp.week_number,
    'daily_meals', (
      SELECT json_agg(
        json_build_object(
          'day_of_week', dm.day_of_week,
          'day_name', CASE dm.day_of_week
            WHEN 1 THEN 'Monday'
            WHEN 2 THEN 'Tuesday'
            WHEN 3 THEN 'Wednesday'
            WHEN 4 THEN 'Thursday'
            WHEN 5 THEN 'Friday'
            WHEN 6 THEN 'Saturday'
            WHEN 7 THEN 'Sunday'
          END,
          'breakfast', (SELECT json_build_object('id', r.id, 'name', r.name, 'image_url', (SELECT url FROM images WHERE entity_type = 'recipe' AND entity_id = r.id AND is_primary = true LIMIT 1)) FROM recipes r WHERE r.id = dm.breakfast_recipe_id),
          'lunch', (SELECT json_build_object('id', r.id, 'name', r.name, 'image_url', (SELECT url FROM images WHERE entity_type = 'recipe' AND entity_id = r.id AND is_primary = true LIMIT 1)) FROM recipes r WHERE r.id = dm.lunch_recipe_id),
          'dinner', (SELECT json_build_object('id', r.id, 'name', r.name, 'image_url', (SELECT url FROM images WHERE entity_type = 'recipe' AND entity_id = r.id AND is_primary = true LIMIT 1)) FROM recipes r WHERE r.id = dm.dinner_recipe_id),
          'snack', (SELECT json_build_object('id', r.id, 'name', r.name, 'image_url', (SELECT url FROM images WHERE entity_type = 'recipe' AND entity_id = r.id AND is_primary = true LIMIT 1)) FROM recipes r WHERE r.id = dm.snack_recipe_id)
        ) ORDER BY dm.day_of_week
      )
      FROM daily_meals dm WHERE dm.meal_plan_id = mp.id
    )
  )
  FROM meal_plans mp
  WHERE mp.id = meal_plan_uuid;
$$ LANGUAGE SQL;

CREATE INDEX IF NOT EXISTS idx_images_recipe_primary ON public.images(entity_id, is_primary) WHERE entity_type = 'recipe' AND is_primary = true;
