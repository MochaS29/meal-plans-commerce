#!/usr/bin/env npx tsx

/**
 * Populate Dessert Recipes Script
 *
 * Generates AI-powered dessert recipes for all diet types in the database.
 * This addresses the missing "dessert" meal type that was identified in the database.
 *
 * Usage: npx tsx scripts/populate-dessert-recipes.ts
 */

import { generateRecipe } from '../lib/ai-recipe-generator'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Diet types to generate desserts for
const DIET_TYPES = [
  'mediterranean',
  'keto',
  'vegan',
  'paleo',
  'vegetarian',
  'family-focused',
  'global-cuisine',
  'intermittent-fasting'
]

// Number of desserts to generate per diet type
const DESSERTS_PER_DIET = 20

async function generateDessertRecipe(dietType: string): Promise<boolean> {
  try {
    console.log(`   Generating ${dietType} dessert...`)

    const recipe = await generateRecipe({
      dietType,
      mealType: 'snack', // Using 'snack' as meal type, but we'll label it as dessert
      difficulty: ['easy', 'medium'][Math.floor(Math.random() * 2)] as any,
      servings: [4, 6, 8][Math.floor(Math.random() * 3)]
    })

    if (!recipe) {
      console.error(`   ❌ Failed to generate recipe for ${dietType}`)
      return false
    }

    // Insert the recipe into the database with meal_type='dessert'
    const { error } = await supabase
      .from('recipes')
      .insert({
        name: recipe.name,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        nutrition: recipe.nutrition,
        diet_type: dietType,
        meal_type: 'dessert', // Set to dessert!
        prep_time: recipe.prep_time,
        cook_time: recipe.cook_time,
        servings: recipe.servings,
        difficulty: recipe.difficulty,
        tags: recipe.tags || []
      })

    if (error) {
      console.error(`   ❌ Database error for ${dietType}:`, error.message)
      return false
    }

    console.log(`   ✅ Created: ${recipe.name}`)
    return true

  } catch (error) {
    console.error(`   ❌ Error generating ${dietType} dessert:`, error)
    return false
  }
}

async function populateDesserts() {
  console.log('🍰 Dessert Recipe Population Tool')
  console.log('='.repeat(60))
  console.log(`\nGenerating ${DESSERTS_PER_DIET} desserts for each of ${DIET_TYPES.length} diet types`)
  console.log(`Total desserts to generate: ${DESSERTS_PER_DIET * DIET_TYPES.length}`)
  console.log('\nDiet types:', DIET_TYPES.join(', '))
  console.log('\n⚠️  This will use AI credits and may take 20-30 minutes\n')

  const stats = {
    totalGenerated: 0,
    totalFailed: 0,
    byDiet: {} as Record<string, { success: number, failed: number }>
  }

  // Initialize stats for each diet
  DIET_TYPES.forEach(diet => {
    stats.byDiet[diet] = { success: 0, failed: 0 }
  })

  // Generate desserts for each diet type
  for (const dietType of DIET_TYPES) {
    console.log(`\n🍽️  Generating ${DESSERTS_PER_DIET} ${dietType} desserts...`)
    console.log('-'.repeat(60))

    for (let i = 1; i <= DESSERTS_PER_DIET; i++) {
      console.log(`\n${dietType} dessert ${i}/${DESSERTS_PER_DIET}:`)

      const success = await generateDessertRecipe(dietType)

      if (success) {
        stats.totalGenerated++
        stats.byDiet[dietType].success++
      } else {
        stats.totalFailed++
        stats.byDiet[dietType].failed++
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000))
    }

    console.log(`\n✅ Completed ${dietType}: ${stats.byDiet[dietType].success}/${DESSERTS_PER_DIET} successful`)

    // Longer delay between diet types
    if (dietType !== DIET_TYPES[DIET_TYPES.length - 1]) {
      console.log('\n⏳ Waiting 10 seconds before next diet type...')
      await new Promise(resolve => setTimeout(resolve, 10000))
    }
  }

  // Print final summary
  console.log('\n' + '='.repeat(60))
  console.log('🎉 Dessert Recipe Population Complete!')
  console.log('='.repeat(60))
  console.log(`\n📊 Summary:`)
  console.log(`   ✅ Successfully generated: ${stats.totalGenerated}`)
  console.log(`   ❌ Failed: ${stats.totalFailed}`)
  console.log(`\n📋 By Diet Type:`)

  Object.entries(stats.byDiet).forEach(([diet, counts]) => {
    const percentage = ((counts.success / DESSERTS_PER_DIET) * 100).toFixed(0)
    console.log(`   ${diet.padEnd(20)} ${counts.success}/${DESSERTS_PER_DIET} (${percentage}%)`)
  })

  console.log('\n✨ Dessert recipes are now available in the database!')
  console.log('You can verify by running: node scripts/check-meal-types.js\n')
}

// Run the script
populateDesserts()
  .then(() => {
    console.log('✅ Script completed successfully')
    process.exit(0)
  })
  .catch(error => {
    console.error('❌ Script failed:', error)
    process.exit(1)
  })
