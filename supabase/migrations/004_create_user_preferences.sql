-- Create user_preferences table
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,

  -- Family & Serving Info
  family_size INTEGER DEFAULT 2 CHECK (family_size >= 1 AND family_size <= 12),
  servings_preference INTEGER DEFAULT 4 CHECK (servings_preference >= 1 AND servings_preference <= 12),

  -- Dietary Restrictions & Allergies
  dietary_restrictions TEXT[] DEFAULT '{}', -- e.g., ['vegetarian', 'gluten-free', 'dairy-free']
  allergies TEXT[] DEFAULT '{}', -- e.g., ['peanuts', 'shellfish', 'soy']
  dislikes TEXT[] DEFAULT '{}', -- e.g., ['mushrooms', 'olives']

  -- Cuisine & Cooking Preferences
  preferred_cuisines TEXT[] DEFAULT '{}', -- e.g., ['mediterranean', 'asian', 'mexican']
  cooking_skill_level TEXT DEFAULT 'intermediate' CHECK (cooking_skill_level IN ('beginner', 'intermediate', 'advanced')),
  max_prep_time INTEGER DEFAULT 45, -- minutes

  -- Budget & Shopping
  budget_level TEXT DEFAULT 'moderate' CHECK (budget_level IN ('budget', 'moderate', 'premium')),
  preferred_stores TEXT[] DEFAULT '{}', -- e.g., ['whole-foods', 'trader-joes', 'local-market']

  -- Meal Planning Preferences
  meal_prep_day TEXT DEFAULT 'sunday', -- preferred day for meal prep
  snacks_included BOOLEAN DEFAULT true,
  breakfast_importance TEXT DEFAULT 'moderate' CHECK (breakfast_importance IN ('minimal', 'moderate', 'substantial')),

  -- Kids & Family
  has_kids BOOLEAN DEFAULT false,
  kid_ages INTEGER[] DEFAULT '{}', -- ages of children
  kid_friendly_required BOOLEAN DEFAULT false,

  -- Nutrition Goals
  nutrition_goals TEXT[] DEFAULT '{}', -- e.g., ['weight-loss', 'muscle-gain', 'heart-health']
  calorie_target INTEGER, -- optional calorie goal per day
  protein_priority BOOLEAN DEFAULT false,

  -- Special Requirements
  batch_cooking_preference BOOLEAN DEFAULT false,
  leftover_tolerance TEXT DEFAULT 'moderate' CHECK (leftover_tolerance IN ('minimal', 'moderate', 'high')),
  variety_importance TEXT DEFAULT 'high' CHECK (variety_importance IN ('low', 'moderate', 'high')),

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  -- Unique constraint: one preference per user
  UNIQUE(user_id)
);

-- Create index for fast user lookups
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON public.user_preferences(user_id);

-- Enable RLS
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can only read/write their own preferences
CREATE POLICY "Users can view own preferences"
  ON public.user_preferences
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
  ON public.user_preferences
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
  ON public.user_preferences
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON public.user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default preferences for existing users
INSERT INTO public.user_preferences (user_id, family_size, preferred_cuisines)
SELECT id, 2, ARRAY['mediterranean']::TEXT[]
FROM public.users
WHERE id NOT IN (SELECT user_id FROM public.user_preferences)
ON CONFLICT (user_id) DO NOTHING;
