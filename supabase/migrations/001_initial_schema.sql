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
  day_of_week INTEGER NOT NULL, -- 1=Monday, 7=Sunday
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
INSERT INTO public.diet_plans (name, slug, description, price, features) VALUES
  ('Mediterranean Diet', 'mediterranean', 'Heart-healthy cuisine with anti-inflammatory benefits', 4900, '{"features": ["Olive oil focus", "Fresh vegetables", "Lean proteins", "Whole grains"]}'),
  ('Keto Diet', 'keto', 'High-fat, low-carb for metabolic health', 4900, '{"features": ["75% fat", "20% protein", "5% carbs", "Ketosis support"]}'),
  ('Vegan', 'vegan', '100% plant-based nutrition', 4900, '{"features": ["No animal products", "High fiber", "Plant proteins", "B12 fortified"]}'),
  ('Paleo', 'paleo', 'Ancestral eating for optimal health', 4900, '{"features": ["No grains", "No dairy", "Whole foods", "High protein"]}'),
  ('Vegetarian', 'vegetarian', 'Plant-forward with dairy and eggs', 4900, '{"features": ["No meat", "Includes dairy", "Includes eggs", "Balanced nutrition"]}'),
  ('Intermittent Fasting', 'intermittent-fasting', '16:8 time-restricted eating', 4900, '{"features": ["16-hour fast", "8-hour eating window", "Metabolic benefits", "Flexible meals"]}'),
  ('Family Focused', 'family-focused', 'Kid-friendly meals the whole family loves', 4900, '{"features": ["Kid-approved", "Easy prep", "Budget-friendly", "Batch cooking"]}')
ON CONFLICT (slug) DO NOTHING;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON public.purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_recipes_diet_plans ON public.recipes USING GIN(diet_plans);
CREATE INDEX IF NOT EXISTS idx_meal_plans_lookup ON public.meal_plans(diet_plan_id, year, month);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (allows read access to everyone, write requires auth)
CREATE POLICY "Public read access" ON public.recipes FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.diet_plans FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.meal_plans FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.daily_meals FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.shopping_lists FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.shopping_list_items FOR SELECT USING (true);