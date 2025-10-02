-- Create recipe_ingredients table
CREATE TABLE IF NOT EXISTS recipe_ingredients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
  ingredient TEXT NOT NULL,
  amount TEXT,
  unit TEXT,
  notes TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create recipe_instructions table
CREATE TABLE IF NOT EXISTS recipe_instructions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  instruction TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create recipe_nutrition table
CREATE TABLE IF NOT EXISTS recipe_nutrition (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE UNIQUE,
  calories INTEGER,
  protein INTEGER,
  carbs INTEGER,
  fat INTEGER,
  fiber INTEGER,
  sugar INTEGER,
  sodium INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_recipe_ingredients_recipe_id ON recipe_ingredients(recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipe_instructions_recipe_id ON recipe_instructions(recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipe_nutrition_recipe_id ON recipe_nutrition(recipe_id);

-- Grant permissions (adjust based on your auth setup)
ALTER TABLE recipe_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_instructions ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_nutrition ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can read recipe ingredients" ON recipe_ingredients
  FOR SELECT USING (true);

CREATE POLICY "Public can read recipe instructions" ON recipe_instructions
  FOR SELECT USING (true);

CREATE POLICY "Public can read recipe nutrition" ON recipe_nutrition
  FOR SELECT USING (true);

-- Create policies for authenticated users to insert (for admin)
CREATE POLICY "Authenticated can insert recipe ingredients" ON recipe_ingredients
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated can insert recipe instructions" ON recipe_instructions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated can insert recipe nutrition" ON recipe_nutrition
  FOR INSERT WITH CHECK (true);