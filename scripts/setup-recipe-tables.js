// Setup recipe tables in Supabase
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials')
  console.log('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set')
  process.exit(1)
}

// Use service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function setupTables() {
  console.log('🔨 Setting up recipe tables...\n')

  try {
    // SQL to create tables
    const createTablesSQL = `
    -- Create recipe_ingredients table if not exists
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

    -- Create recipe_instructions table if not exists
    CREATE TABLE IF NOT EXISTS recipe_instructions (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
      step_number INTEGER NOT NULL,
      instruction TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- Create recipe_nutrition table if not exists
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
    `

    // Execute SQL
    const { data, error } = await supabase.rpc('exec_sql', {
      query: createTablesSQL
    }).single()

    if (error && error.message.includes('function public.exec_sql does not exist')) {
      // Try alternative method - direct table creation
      console.log('📝 Creating tables using alternative method...\n')

      // Check if tables exist by trying to query them
      const tables = ['recipe_ingredients', 'recipe_instructions', 'recipe_nutrition']

      for (const table of tables) {
        const { error: tableError } = await supabase
          .from(table)
          .select('count')
          .limit(1)

        if (tableError && tableError.code === '42P01') {
          console.log(`❌ Table ${table} doesn't exist`)
          console.log(`   Please run the SQL in scripts/create-recipe-tables.sql manually in Supabase`)
        } else if (tableError) {
          console.log(`⚠️ Error checking ${table}: ${tableError.message}`)
        } else {
          console.log(`✅ Table ${table} exists`)
        }
      }

      console.log('\n📋 Manual Setup Instructions:')
      console.log('1. Go to: ' + supabaseUrl.replace('.supabase.co', '.supabase.co/project/default/sql'))
      console.log('2. Copy the SQL from scripts/create-recipe-tables.sql')
      console.log('3. Paste and run it in the SQL editor')

      return
    } else if (error) {
      throw error
    }

    console.log('✅ Tables created successfully!\n')

    // Set up RLS policies
    console.log('🔐 Setting up Row Level Security policies...\n')

    const policiesSQL = `
    -- Enable RLS on tables
    ALTER TABLE recipe_ingredients ENABLE ROW LEVEL SECURITY;
    ALTER TABLE recipe_instructions ENABLE ROW LEVEL SECURITY;
    ALTER TABLE recipe_nutrition ENABLE ROW LEVEL SECURITY;

    -- Drop existing policies if they exist
    DROP POLICY IF EXISTS "Public can read recipe ingredients" ON recipe_ingredients;
    DROP POLICY IF EXISTS "Public can read recipe instructions" ON recipe_instructions;
    DROP POLICY IF EXISTS "Public can read recipe nutrition" ON recipe_nutrition;
    DROP POLICY IF EXISTS "Authenticated can insert recipe ingredients" ON recipe_ingredients;
    DROP POLICY IF EXISTS "Authenticated can insert recipe instructions" ON recipe_instructions;
    DROP POLICY IF EXISTS "Authenticated can insert recipe nutrition" ON recipe_nutrition;

    -- Create policies for public read access
    CREATE POLICY "Public can read recipe ingredients" ON recipe_ingredients
      FOR SELECT USING (true);

    CREATE POLICY "Public can read recipe instructions" ON recipe_instructions
      FOR SELECT USING (true);

    CREATE POLICY "Public can read recipe nutrition" ON recipe_nutrition
      FOR SELECT USING (true);

    -- Create policies for insert (anyone can insert for now)
    CREATE POLICY "Anyone can insert recipe ingredients" ON recipe_ingredients
      FOR INSERT WITH CHECK (true);

    CREATE POLICY "Anyone can insert recipe instructions" ON recipe_instructions
      FOR INSERT WITH CHECK (true);

    CREATE POLICY "Anyone can insert recipe nutrition" ON recipe_nutrition
      FOR INSERT WITH CHECK (true);
    `

    const { error: policyError } = await supabase.rpc('exec_sql', {
      query: policiesSQL
    }).single()

    if (policyError && !policyError.message.includes('exec_sql')) {
      console.log('⚠️ Could not set up policies automatically')
    } else {
      console.log('✅ RLS policies configured!\n')
    }

    // Verify tables
    await verifyTables()

  } catch (error) {
    console.error('❌ Error setting up tables:', error.message)
    console.log('\n📋 Please manually run the SQL from scripts/create-recipe-tables.sql in your Supabase SQL editor')
  }
}

async function verifyTables() {
  console.log('🔍 Verifying table setup...\n')

  const tables = ['recipe_ingredients', 'recipe_instructions', 'recipe_nutrition']

  for (const table of tables) {
    const { count, error } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.log(`❌ ${table}: Error - ${error.message}`)
    } else {
      console.log(`✅ ${table}: Ready (${count || 0} records)`)
    }
  }

  // Check total recipes
  const { count: recipeCount } = await supabase
    .from('recipes')
    .select('*', { count: 'exact', head: true })

  console.log(`\n📊 Total recipes in database: ${recipeCount || 0}`)

  if (recipeCount > 0) {
    // Check if any recipes have ingredients/instructions
    const { data: recipesWithDetails } = await supabase
      .from('recipes')
      .select(`
        id,
        name,
        recipe_ingredients(count),
        recipe_instructions(count),
        recipe_nutrition(count)
      `)
      .limit(5)

    if (recipesWithDetails && recipesWithDetails.length > 0) {
      console.log('\n📝 Sample recipes:')
      recipesWithDetails.forEach(r => {
        const hasIngredients = r.recipe_ingredients?.length > 0
        const hasInstructions = r.recipe_instructions?.length > 0
        const hasNutrition = r.recipe_nutrition?.length > 0

        console.log(`  - ${r.name}`)
        console.log(`    Ingredients: ${hasIngredients ? '✅' : '❌'}, Instructions: ${hasInstructions ? '✅' : '❌'}, Nutrition: ${hasNutrition ? '✅' : '❌'}`)
      })
    }
  }
}

// Run setup
setupTables()