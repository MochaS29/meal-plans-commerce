#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function getSampleRecipes() {
  // Get ALL diet plans
  const { data: dietPlans } = await supabase.from('diet_plans').select('id, name, slug').order('name')

  console.log(`\nFound ${dietPlans.length} diet plans\n`)

  const selectedRecipes = {
    breakfast: [],
    lunch: [],
    dinner: []
  }

  for (const mealType of ['breakfast', 'lunch', 'dinner']) {
    console.log(`\n=== Finding ${mealType.toUpperCase()} recipes ===`)

    for (const plan of dietPlans) {
      // Get recipes for this diet plan
      const { data: recipes } = await supabase
        .from('recipes')
        .select('id, name, description, prep_time, cook_time, servings, difficulty, diet_plans')
        .contains('diet_plans', [plan.id])
        .limit(100)

      if (!recipes || recipes.length === 0) {
        console.log(`⚠️  ${plan.name}: No recipes found`)
        continue
      }

      // Find recipe with image
      let foundRecipe = false
      for (const recipe of recipes) {
        const { data: image } = await supabase
          .from('images')
          .select('url, alt_text')
          .eq('entity_type', 'recipe')
          .eq('entity_id', recipe.id)
          .eq('is_primary', true)
          .maybeSingle()

        if (image) {
          const recipeData = {
            id: recipe.id,
            name: recipe.name,
            description: recipe.description,
            prepTime: recipe.prep_time,
            cookTime: recipe.cook_time,
            servings: recipe.servings,
            difficulty: recipe.difficulty,
            dietPlan: plan.name,
            dietSlug: plan.slug,
            imageUrl: image.url,
            imageAlt: image.alt_text
          }

          selectedRecipes[mealType].push(recipeData)

          console.log(`✓ ${plan.name}: ${recipe.name}`)
          foundRecipe = true
          break
        }
      }

      if (!foundRecipe) {
        console.log(`⚠️  ${plan.name}: No recipes with images found`)
      }
    }
  }

  console.log('\n\n=== SELECTED RECIPES ===\n')
  console.log(JSON.stringify(selectedRecipes, null, 2))

  return selectedRecipes
}

getSampleRecipes().catch(console.error)
