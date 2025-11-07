#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log('Supabase URL:', supabaseUrl)
console.log('Has Service Key:', !!supabaseKey)

const supabase = createClient(supabaseUrl, supabaseKey)

async function testFetch() {
  const recipeName = 'Mediterranean Chickpea Salad'

  console.log(`\nTesting fetch for: "${recipeName}"\n`)

  // Test the exact query from the API
  const { data: recipes, error: recipeError } = await supabase
    .from('recipes')
    .select(`
      *,
      recipe_ingredients (
        id,
        ingredient,
        amount,
        unit,
        notes,
        order_index
      ),
      recipe_instructions (
        id,
        step_number,
        instruction
      ),
      recipe_nutrition (
        id,
        calories,
        protein,
        carbs,
        fat,
        fiber
      ),
      images (
        id,
        url,
        is_primary
      )
    `)
    .ilike('name', `%${recipeName}%`)
    .order('created_at', { ascending: false })

  if (recipeError) {
    console.error('❌ Error:', recipeError)
    return
  }

  if (!recipes || recipes.length === 0) {
    console.log('❌ No recipes found')
    return
  }

  console.log(`✅ Found ${recipes.length} recipe(s)`)
  const recipe = recipes[0]
  console.log('\nRecipe:', recipe.name)
  console.log('ID:', recipe.id)
  console.log('Ingredients:', recipe.recipe_ingredients?.length || 0)
  console.log('Instructions:', recipe.recipe_instructions?.length || 0)
  console.log('Nutrition:', recipe.recipe_nutrition?.length || 0)
}

testFetch().catch(console.error)
