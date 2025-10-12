#!/usr/bin/env node

// Generate remaining images using Replicate (bypasses Google daily limit)
// Cost: $0.003 per image

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const adminApiKey = process.env.ADMIN_API_KEY

if (!supabaseUrl || !supabaseKey || !adminApiKey) {
  console.error('❌ Missing required environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function getRecipesWithoutImages(limit = 500) {
  // Get recipes without images
  let allRecipes = []
  let page = 0
  const pageSize = 1000

  while (true) {
    const { data, error } = await supabase
      .from('recipes')
      .select('id, name, description, diet_plans')
      .range(page * pageSize, (page + 1) * pageSize - 1)

    if (error || !data || data.length === 0) break
    allRecipes = allRecipes.concat(data)
    page++
    if (data.length < pageSize) break
  }

  // Get recipe IDs that already have images
  let allImages = []
  page = 0

  while (true) {
    const { data, error } = await supabase
      .from('images')
      .select('entity_id')
      .eq('entity_type', 'recipe')
      .range(page * pageSize, (page + 1) * pageSize - 1)

    if (error || !data || data.length === 0) break
    allImages = allImages.concat(data)
    page++
    if (data.length < pageSize) break
  }

  const recipeIdsWithImages = new Set(allImages.map(img => img.entity_id))
  const recipesWithoutImages = allRecipes
    .filter(recipe => !recipeIdsWithImages.has(recipe.id))
    .slice(0, limit)

  return recipesWithoutImages
}

async function generateImageForRecipe(recipe) {
  console.log(`\n📸 [${new Date().toLocaleTimeString()}] ${recipe.name}`)

  try {
    const PORT = process.env.PORT || 3002
    const response = await fetch(`http://localhost:${PORT}/api/generate-images`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminApiKey}`
      },
      body: JSON.stringify({
        recipeId: recipe.id,
        recipeName: recipe.name,
        description: recipe.description || '',
        dietType: recipe.diet_plans?.[0] || 'general'
      })
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`API error: ${error}`)
    }

    const result = await response.json()

    if (result.success) {
      console.log(`   ✅ Image generated`)
      return { success: true, recipe: recipe.name }
    } else {
      console.log(`   ❌ Failed: ${result.error}`)
      return { success: false, recipe: recipe.name, error: result.error }
    }
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`)
    return { success: false, recipe: recipe.name, error: error.message }
  }
}

async function main() {
  console.log('🎨 Replicate Image Generation (No Daily Limit)')
  console.log('💰 Cost: $0.003 per image')
  console.log('='.repeat(50))

  // Get current stats
  const { count: totalRecipes } = await supabase
    .from('recipes')
    .select('*', { count: 'exact', head: true })

  const { count: recipesWithImages } = await supabase
    .from('images')
    .select('*', { count: 'exact', head: true })
    .eq('entity_type', 'recipe')

  const remaining = totalRecipes - recipesWithImages

  console.log(`\n📊 Status:`)
  console.log(`   Total recipes: ${totalRecipes}`)
  console.log(`   With images: ${recipesWithImages} (${Math.round((recipesWithImages / totalRecipes) * 100)}%)`)
  console.log(`   Remaining: ${remaining}`)

  if (remaining === 0) {
    console.log('\n✨ All recipes already have images!')
    return
  }

  const cost = (remaining * 0.003).toFixed(2)
  console.log(`\n💵 Estimated cost: $${cost}`)
  console.log(`⏱️  Estimated time: ~${Math.ceil(remaining * 7 / 60)} minutes`)
  console.log('\n⏳ Starting in 5 seconds... (Press Ctrl+C to cancel)\n')

  await new Promise(resolve => setTimeout(resolve, 5000))

  // Get recipes without images
  console.log(`📋 Finding recipes without images...`)
  const recipesToProcess = await getRecipesWithoutImages(remaining)

  if (recipesToProcess.length === 0) {
    console.log('\n✨ All recipes already have images!')
    return
  }

  console.log(`✅ Found ${recipesToProcess.length} recipes to process\n`)

  let successCount = 0
  let failCount = 0

  // Process each recipe
  for (let i = 0; i < recipesToProcess.length; i++) {
    const recipe = recipesToProcess[i]

    const result = await generateImageForRecipe(recipe)

    if (result.success) {
      successCount++
    } else {
      failCount++
    }

    // Progress update every 10 images
    if ((i + 1) % 10 === 0) {
      const progress = Math.round(((i + 1) / recipesToProcess.length) * 100)
      const costSoFar = (successCount * 0.003).toFixed(2)
      console.log(`\n   📊 Progress: ${i + 1}/${recipesToProcess.length} (${progress}%) | ✅ ${successCount} | ❌ ${failCount} | 💵 $${costSoFar}`)
    }

    // Small delay between requests
    if (i < recipesToProcess.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 5000))
    }
  }

  // Final summary
  const finalCost = (successCount * 0.003).toFixed(2)
  console.log('\n' + '='.repeat(50))
  console.log('✨ Image Generation Complete!')
  console.log(`   ✅ Successfully generated: ${successCount} images`)
  console.log(`   💵 Total cost: $${finalCost}`)
  if (failCount > 0) {
    console.log(`   ❌ Failed: ${failCount} images`)
  }

  const newTotal = recipesWithImages + successCount
  console.log(`\n📊 Final Progress: ${newTotal}/${totalRecipes} recipes have images`)
  console.log(`   (${Math.round((newTotal / totalRecipes) * 100)}% complete)`)

  if (newTotal < totalRecipes) {
    console.log(`\n💡 ${totalRecipes - newTotal} recipes still need images. Run this script again to continue.`)
  } else {
    console.log('\n🎉 All recipes now have images!')
  }

  console.log('')
}

if (require.main === module) {
  main().catch(console.error)
}
