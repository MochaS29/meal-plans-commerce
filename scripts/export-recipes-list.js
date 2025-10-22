#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

async function exportRecipesList() {
  console.log('📝 Exporting recipes list from API...\n')

  // Fetch all recipes from the API
  const response = await fetch('http://localhost:3002/api/admin/recipes?limit=10000&prioritize_images=true')
  const data = await response.json()

  if (!data.success || !data.recipes) {
    console.error('Error fetching recipes from API')
    return
  }

  const recipes = data.recipes

  console.log(`Found ${recipes.length} recipes\n`)

  // Build text output
  let output = '# MEAL PLANS RECIPE DATABASE\n'
  output += `Generated: ${new Date().toLocaleString()}\n`
  output += `Total Recipes: ${recipes.length}\n\n`
  output += '='.repeat(80) + '\n\n'

  // Group recipes by having images or not
  const withImages = recipes.filter(r => r.image_url)
  const withoutImages = recipes.filter(r => !r.image_url)

  output += `## SUMMARY\n\n`
  output += `Recipes with images: ${withImages.length}\n`
  output += `Recipes without images: ${withoutImages.length}\n\n`
  output += '='.repeat(80) + '\n\n'

  // List all recipes
  output += `## ALL RECIPES\n\n`

  recipes.forEach((recipe, index) => {
    output += `-`.repeat(80) + '\n'
    output += `${index + 1}. ${recipe.name}\n`
    output += `   ID: ${recipe.id}\n`
    output += `   Description: ${recipe.description}\n`
    output += `   Prep: ${recipe.prep_time}m | Cook: ${recipe.cook_time}m | Servings: ${recipe.servings} | Difficulty: ${recipe.difficulty}\n`

    if (recipe.recipe_nutrition && recipe.recipe_nutrition.length > 0) {
      const nutrition = recipe.recipe_nutrition[0]
      output += `   Nutrition: ${nutrition.calories || 0} cal, ${nutrition.protein || 0}g protein, ${nutrition.carbs || 0}g carbs, ${nutrition.fat || 0}g fat, ${nutrition.fiber || 0}g fiber\n`
    }

    output += `   Image: ${recipe.image_url ? '✓ YES' : '✗ NO'}\n`

    if (recipe.image_url) {
      output += `   Image URL: ${recipe.image_url}\n`
    }

    output += `   Created: ${new Date(recipe.created_at).toLocaleString()}\n`
    output += '\n'
  })

  // Write to file
  const outputPath = path.join(process.cwd(), 'RECIPE_DATABASE.txt')
  fs.writeFileSync(outputPath, output, 'utf8')

  console.log(`✅ Recipe database exported to: ${outputPath}`)
  console.log(`\nSummary:`)
  console.log(`- Total recipes: ${recipes.length}`)
  console.log(`- Recipes with images: ${withImages.length}`)
  console.log(`- Recipes without images: ${withoutImages.length}`)
}

exportRecipesList().catch(console.error)
