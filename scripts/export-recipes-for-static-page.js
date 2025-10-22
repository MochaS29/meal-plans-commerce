#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function exportRecipes() {
  console.log('🔍 Fetching all recipes with images from database...\n')

  // Get all diet plans
  const { data: dietPlans } = await supabase
    .from('diet_plans')
    .select('id, name, slug')
    .order('name')

  const allRecipes = []
  const recipesByDiet = {}

  for (const plan of dietPlans) {
    console.log(`Fetching ${plan.name} recipes...`)

    // Get recipes for this diet plan
    const { data: recipes } = await supabase
      .from('recipes')
      .select(`
        id,
        name,
        description,
        prep_time,
        cook_time,
        servings,
        difficulty,
        recipe_nutrition (
          calories,
          protein,
          carbs,
          fat,
          fiber
        )
      `)
      .contains('diet_plans', [plan.id])
      .order('created_at', { ascending: false })
      .limit(100) // Get up to 100 recipes per diet

    if (!recipes || recipes.length === 0) {
      console.log(`  ⚠️  No recipes found`)
      continue
    }

    // Get images for these recipes
    const recipeIds = recipes.map(r => r.id)
    const { data: images } = await supabase
      .from('images')
      .select('entity_id, url, alt_text')
      .eq('entity_type', 'recipe')
      .eq('is_primary', true)
      .in('entity_id', recipeIds)

    // Create a map of recipe IDs to image URLs
    const imageMap = {}
    images?.forEach(img => {
      imageMap[img.entity_id] = img.url
    })

    // Filter to only recipes with images
    const recipesWithImages = recipes.filter(r => imageMap[r.id]).slice(0, 50)

    if (recipesWithImages && recipesWithImages.length > 0) {
      // Transform and add diet info + image URL to each recipe
      const transformedRecipes = recipesWithImages.map(recipe => ({
        id: recipe.id,
        name: recipe.name,
        description: recipe.description,
        prep_time: recipe.prep_time,
        cook_time: recipe.cook_time,
        servings: recipe.servings,
        difficulty: recipe.difficulty,
        image_url: imageMap[recipe.id],
        diet_plan_names: [{ name: plan.name, slug: plan.slug }],
        recipe_nutrition: recipe.recipe_nutrition || []
      }))

      recipesByDiet[plan.slug] = transformedRecipes
      allRecipes.push(...transformedRecipes)
      console.log(`  ✓ Found ${recipesWithImages.length} recipes with images`)
    } else {
      console.log(`  ⚠️  No recipes with images found`)
    }
  }

  console.log(`\n📊 Total recipes exported: ${allRecipes.length}\n`)

  // Write to data file
  const outputPath = path.join(process.cwd(), 'app', 'recipes', 'recipes-data.ts')
  const fileContent = `// Auto-generated from database - Do not edit manually
// Generated on: ${new Date().toISOString()}
// Total recipes: ${allRecipes.length}

export interface Recipe {
  id: string
  name: string
  description: string
  prep_time: number
  cook_time: number
  servings: number
  difficulty: string
  image_url?: string | null
  diet_plan_names: { name: string; slug: string }[]
  recipe_nutrition: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
  }[]
}

export const recipesByDiet = ${JSON.stringify(recipesByDiet, null, 2)} as const

export const allRecipes: Recipe[] = ${JSON.stringify(allRecipes, null, 2)}

export const dietPlans = ${JSON.stringify(dietPlans.filter(p => recipesByDiet[p.slug]), null, 2)}
`

  fs.writeFileSync(outputPath, fileContent)
  console.log(`✅ Recipes exported to: ${outputPath}`)
  console.log(`\nRecipes per diet:`)
  for (const [slug, recipes] of Object.entries(recipesByDiet)) {
    console.log(`  ${slug}: ${recipes.length}`)
  }
}

exportRecipes().catch(console.error)
