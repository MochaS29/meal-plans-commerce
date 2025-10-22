#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function exportAllRecipes() {
  console.log('📝 Exporting all recipes to text file...\n')

  // Get all recipes
  const { data: recipes, error: recipesError } = await supabase
    .from('recipes')
    .select('*')
    .order('created_at', { ascending: false })

  if (recipesError) {
    console.error('Error fetching recipes:', recipesError)
    return
  }

  // Get recipe diet plans
  const { data: recipeDietPlans, error: dietError } = await supabase
    .from('recipe_diet_plans')
    .select(`
      recipe_id,
      diet_plans (
        name,
        slug
      )
    `)

  if (dietError) {
    console.error('Error fetching diet plans:', dietError)
    return
  }

  // Get recipe images
  const { data: recipeImages, error: imageError } = await supabase
    .from('images')
    .select('*')
    .eq('entity_type', 'recipe')

  if (imageError) {
    console.error('Error fetching images:', imageError)
    return
  }

  // Get recipe nutrition
  const { data: recipeNutrition, error: nutritionError } = await supabase
    .from('recipe_nutrition')
    .select('*')

  if (nutritionError) {
    console.error('Error fetching nutrition:', nutritionError)
    return
  }

  // Map diet plans to recipes
  const dietPlansByRecipe = {}
  recipeDietPlans?.forEach(rdp => {
    if (!dietPlansByRecipe[rdp.recipe_id]) {
      dietPlansByRecipe[rdp.recipe_id] = []
    }
    dietPlansByRecipe[rdp.recipe_id].push(rdp.diet_plans)
  })

  // Map images to recipes
  const imagesByRecipe = {}
  recipeImages?.forEach(img => {
    if (!imagesByRecipe[img.entity_id]) {
      imagesByRecipe[img.entity_id] = []
    }
    imagesByRecipe[img.entity_id].push({ url: img.url })
  })

  // Map nutrition to recipes
  const nutritionByRecipe = {}
  recipeNutrition?.forEach(n => {
    nutritionByRecipe[n.recipe_id] = n
  })

  // Attach data to recipes
  recipes.forEach(recipe => {
    recipe.diet_plans = dietPlansByRecipe[recipe.id] || []
    recipe.images = imagesByRecipe[recipe.id] || []
    recipe.recipe_nutrition = nutritionByRecipe[recipe.id] ? [nutritionByRecipe[recipe.id]] : []
  })


  console.log(`Found ${recipes.length} recipes\n`)

  // Group by diet plan
  const recipesByDiet = {}
  recipes.forEach(recipe => {
    const dietPlans = recipe.diet_plans || []
    dietPlans.forEach(diet => {
      if (!recipesByDiet[diet.slug]) {
        recipesByDiet[diet.slug] = {
          name: diet.name,
          recipes: []
        }
      }
      recipesByDiet[diet.slug].recipes.push(recipe)
    })
  })

  // Build text output
  let output = '# MEAL PLANS RECIPE DATABASE\n'
  output += `Generated: ${new Date().toLocaleString()}\n`
  output += `Total Recipes: ${recipes.length}\n\n`
  output += '=' .repeat(80) + '\n\n'

  // Summary by diet
  output += '## RECIPES BY DIET PLAN\n\n'
  const sortedDiets = Object.keys(recipesByDiet).sort()
  sortedDiets.forEach(slug => {
    const diet = recipesByDiet[slug]
    const withImages = diet.recipes.filter(r => r.images && r.images.length > 0).length
    output += `${diet.name}: ${diet.recipes.length} recipes (${withImages} with images)\n`
  })
  output += '\n' + '=' .repeat(80) + '\n\n'

  // Detailed listing by diet
  sortedDiets.forEach(slug => {
    const diet = recipesByDiet[slug]
    output += `## ${diet.name.toUpperCase()} (${diet.recipes.length} recipes)\n\n`

    diet.recipes.forEach((recipe, index) => {
      output += `-`.repeat(80) + '\n'
      output += `${index + 1}. ${recipe.name}\n`
      output += `   ID: ${recipe.id}\n`
      output += `   Description: ${recipe.description}\n`
      output += `   Prep: ${recipe.prep_time}m | Cook: ${recipe.cook_time}m | Servings: ${recipe.servings} | Difficulty: ${recipe.difficulty}\n`

      if (recipe.recipe_nutrition && recipe.recipe_nutrition.length > 0) {
        const nutrition = recipe.recipe_nutrition[0]
        output += `   Nutrition: ${nutrition.calories} cal, ${nutrition.protein}g protein, ${nutrition.carbs}g carbs, ${nutrition.fat}g fat, ${nutrition.fiber}g fiber\n`
      }

      output += `   Image: ${recipe.images && recipe.images.length > 0 ? '✓ YES' : '✗ NO'}\n`

      if (recipe.images && recipe.images.length > 0) {
        output += `   Image URL: ${recipe.images[0].url}\n`
      }

      output += `   Created: ${new Date(recipe.created_at).toLocaleString()}\n`
      output += '\n'
    })

    output += '\n'
  })

  // Write to file
  const outputPath = path.join(process.cwd(), 'RECIPE_DATABASE.txt')
  fs.writeFileSync(outputPath, output, 'utf8')

  console.log(`✅ Recipe database exported to: ${outputPath}`)
  console.log(`\nSummary:`)
  console.log(`- Total recipes: ${recipes.length}`)
  console.log(`- Recipes with images: ${recipes.filter(r => r.images && r.images.length > 0).length}`)
  console.log(`- Diet plans: ${sortedDiets.length}`)
}

exportAllRecipes().catch(console.error)
