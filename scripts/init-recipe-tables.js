// Initialize recipe tables by creating them if they don't exist
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function initializeTables() {
  console.log('🔨 Initializing recipe tables...\n')

  // Get first recipe to use as test
  const { data: recipes } = await supabase
    .from('recipes')
    .select('id, name')
    .limit(1)

  if (!recipes || recipes.length === 0) {
    console.log('No recipes found to test with')
    return
  }

  const testRecipeId = recipes[0].id
  console.log(`Using recipe: ${recipes[0].name} (${testRecipeId})\n`)

  // Try to initialize recipe_ingredients table
  console.log('📝 Checking recipe_ingredients table...')
  const { data: ingredients, error: ingredientsError } = await supabase
    .from('recipe_ingredients')
    .select('*')
    .eq('recipe_id', testRecipeId)
    .limit(1)

  if (ingredientsError?.code === '42P01') {
    console.log('❌ Table recipe_ingredients does not exist')
    console.log('   Creating it requires running SQL in Supabase dashboard')
  } else if (ingredientsError) {
    console.log('⚠️ Error:', ingredientsError.message)
  } else {
    console.log('✅ recipe_ingredients table exists')

    // If no ingredients exist, add some sample ones
    if (!ingredients || ingredients.length === 0) {
      console.log('   Adding sample ingredients...')
      const sampleIngredients = [
        { recipe_id: testRecipeId, ingredient: 'Sample Ingredient 1', amount: '1', unit: 'cup', order_index: 0 },
        { recipe_id: testRecipeId, ingredient: 'Sample Ingredient 2', amount: '2', unit: 'tbsp', order_index: 1 }
      ]

      const { error: insertError } = await supabase
        .from('recipe_ingredients')
        .insert(sampleIngredients)

      if (insertError) {
        console.log('   Error inserting:', insertError.message)
      } else {
        console.log('   Sample ingredients added')
      }
    }
  }

  // Try to initialize recipe_instructions table
  console.log('\n📝 Checking recipe_instructions table...')
  const { data: instructions, error: instructionsError } = await supabase
    .from('recipe_instructions')
    .select('*')
    .eq('recipe_id', testRecipeId)
    .limit(1)

  if (instructionsError?.code === '42P01') {
    console.log('❌ Table recipe_instructions does not exist')
    console.log('   Creating it requires running SQL in Supabase dashboard')
  } else if (instructionsError) {
    console.log('⚠️ Error:', instructionsError.message)
  } else {
    console.log('✅ recipe_instructions table exists')

    // If no instructions exist, add some sample ones
    if (!instructions || instructions.length === 0) {
      console.log('   Adding sample instructions...')
      const sampleInstructions = [
        { recipe_id: testRecipeId, step_number: 1, instruction: 'Sample step 1: Prepare ingredients' },
        { recipe_id: testRecipeId, step_number: 2, instruction: 'Sample step 2: Cook and serve' }
      ]

      const { error: insertError } = await supabase
        .from('recipe_instructions')
        .insert(sampleInstructions)

      if (insertError) {
        console.log('   Error inserting:', insertError.message)
      } else {
        console.log('   Sample instructions added')
      }
    }
  }

  // Try to initialize recipe_nutrition table
  console.log('\n📝 Checking recipe_nutrition table...')
  const { data: nutrition, error: nutritionError } = await supabase
    .from('recipe_nutrition')
    .select('*')
    .eq('recipe_id', testRecipeId)
    .limit(1)

  if (nutritionError?.code === '42P01') {
    console.log('❌ Table recipe_nutrition does not exist')
    console.log('   Creating it requires running SQL in Supabase dashboard')
  } else if (nutritionError) {
    console.log('⚠️ Error:', nutritionError.message)
  } else {
    console.log('✅ recipe_nutrition table exists')

    // If no nutrition exists, add sample data
    if (!nutrition || nutrition.length === 0) {
      console.log('   Adding sample nutrition...')
      const sampleNutrition = {
        recipe_id: testRecipeId,
        calories: 300,
        protein: 20,
        carbs: 30,
        fat: 10,
        fiber: 5
      }

      const { error: insertError } = await supabase
        .from('recipe_nutrition')
        .insert([sampleNutrition])

      if (insertError) {
        console.log('   Error inserting:', insertError.message)
      } else {
        console.log('   Sample nutrition added')
      }
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log('\n📋 MANUAL SETUP REQUIRED:\n')
  console.log('If any tables are missing, you need to create them manually:')
  console.log('\n1. Go to your Supabase dashboard:')
  console.log('   ' + supabaseUrl.replace('.supabase.co', '.supabase.co/project/default/sql'))
  console.log('\n2. Open the SQL editor')
  console.log('\n3. Copy and run the SQL from:')
  console.log('   scripts/create-recipe-tables.sql')
  console.log('\n4. After running the SQL, try generating recipes again')
  console.log('\n' + '='.repeat(50))
}

initializeTables().catch(console.error)