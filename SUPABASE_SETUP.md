# 🚀 Quick Supabase Setup for Recipe Tables

The recipes are being saved successfully, but the related tables (ingredients, instructions, nutrition) need to be created.

## ✅ One-Click Setup

1. **Open Supabase SQL Editor:**
   https://rnvowqoqqcrimrybuiea.supabase.co/project/default/sql

2. **Copy this ENTIRE SQL block and paste it into the SQL editor:**

```sql
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

-- Enable Row Level Security
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

-- Create policies for public insert (for admin panel)
CREATE POLICY "Anyone can insert recipe ingredients" ON recipe_ingredients
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can insert recipe instructions" ON recipe_instructions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can insert recipe nutrition" ON recipe_nutrition
  FOR INSERT WITH CHECK (true);

-- Verify tables were created
SELECT
  'recipe_ingredients' as table_name, COUNT(*) as record_count
FROM recipe_ingredients
UNION ALL
SELECT
  'recipe_instructions' as table_name, COUNT(*) as record_count
FROM recipe_instructions
UNION ALL
SELECT
  'recipe_nutrition' as table_name, COUNT(*) as record_count
FROM recipe_nutrition;
```

3. **Click "Run" button**

4. **You should see:**
   - "Success. No rows returned" (for CREATE TABLE statements)
   - A table showing the 3 tables with 0 records each

## ✅ Verify Setup

After running the SQL, check that everything works:

```bash
node scripts/test-supabase.js
```

You should see:
- ✅ recipe_ingredients: 0 records
- ✅ recipe_instructions: 0 records
- ✅ recipe_nutrition: 0 records

## ✅ Test Recipe Generation

1. Go to Admin Panel: https://mindfulmealplan.com/admin
2. Generate a new recipe
3. Check Recipe Library: https://mindfulmealplan.com/admin/recipes
4. Your new recipes should appear with full details!

## 📊 Current Status

- ✅ 21 recipes saved in database
- ❌ 0 ingredients (tables need to be created)
- ❌ 0 instructions (tables need to be created)
- ❌ 0 nutrition records (tables need to be created)

After running the SQL above, new recipes will save with complete details!