#!/usr/bin/env node

// Generate AI images for recipes
// Starts with one month's worth and builds up over time

require('dotenv').config({ path: '.env.local' })

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const adminApiKey = process.env.ADMIN_API_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials')
  process.exit(1)
}

if (!adminApiKey) {
  console.error('❌ Missing ADMIN_API_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function getRecipesWithoutImages(limit = 30) {
  // Get ALL recipes (paginated to handle large datasets)
  let allRecipes = []
  let page = 0
  const pageSize = 1000

  while (true) {
    const { data, error } = await supabase
      .from('recipes')
      .select('id, name, description, diet_plans')
      .range(page * pageSize, (page + 1) * pageSize - 1)

    if (error) {
      console.error('❌ Error fetching recipes:', error.message)
      break
    }

    if (!data || data.length === 0) break

    allRecipes = allRecipes.concat(data)
    page++

    if (data.length < pageSize) break
  }

  // Get all recipe IDs that already have images (paginated)
  let allImages = []
  page = 0

  while (true) {
    const { data, error } = await supabase
      .from('images')
      .select('entity_id')
      .eq('entity_type', 'recipe')
      .range(page * pageSize, (page + 1) * pageSize - 1)

    if (error) {
      console.error('❌ Error fetching images:', error.message)
      break
    }

    if (!data || data.length === 0) break

    allImages = allImages.concat(data)
    page++

    if (data.length < pageSize) break
  }

  // Create a Set of recipe IDs that have images for fast lookup
  const recipeIdsWithImages = new Set(allImages.map(img => img.entity_id))

  // Filter out recipes that already have images
  const recipesWithoutImages = allRecipes
    .filter(recipe => !recipeIdsWithImages.has(recipe.id))
    .slice(0, limit)

  return recipesWithoutImages
}

async function generateImageForRecipe(recipe) {
  console.log(`\n📸 Generating image for: ${recipe.name}`)

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
      console.log(`✅ Image generated and saved`)
      return { success: true, recipe: recipe.name }
    } else {
      console.log(`❌ Failed: ${result.error}`)
      return { success: false, recipe: recipe.name, error: result.error }
    }
  } catch (error) {
    console.error(`❌ Error: ${error.message}`)
    return { success: false, recipe: recipe.name, error: error.message }
  }
}

async function main() {
  console.log('🎨 AI Recipe Image Generation Tool')
  console.log('='.repeat(50))

  // Check what recipes need images
  console.log('\n📊 Analyzing recipe database...')

  const { count: totalRecipes } = await supabase
    .from('recipes')
    .select('*', { count: 'exact', head: true })

  const { count: recipesWithImages } = await supabase
    .from('images')
    .select('*', { count: 'exact', head: true })
    .eq('entity_type', 'recipe')

  console.log(`\nTotal recipes: ${totalRecipes}`)
  console.log(`Recipes with images: ${recipesWithImages}`)
  console.log(`Recipes without images: ${totalRecipes - recipesWithImages}`)

  // Check today's usage to avoid exceeding daily limit
  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)

  const { count: todaysImages } = await supabase
    .from('images')
    .select('*', { count: 'exact', head: true })
    .eq('entity_type', 'recipe')
    .gte('created_at', todayStart.toISOString())

  const DAILY_LIMIT = 1500 // Gemini free tier daily limit
  const remainingToday = DAILY_LIMIT - (todaysImages || 0)

  console.log(`\n📅 Daily Usage (Google Gemini Free Tier):`)
  console.log(`   Today: ${todaysImages || 0} / ${DAILY_LIMIT} images generated`)
  console.log(`   Remaining: ${remainingToday} images`)

  // Determine how many to generate
  const args = process.argv.slice(2)
  let requestedBatchSize = 30 // Default: one month worth (30 recipes)

  if (args[0]) {
    const parsed = parseInt(args[0], 10)
    if (!isNaN(parsed) && parsed > 0) {
      requestedBatchSize = parsed
    }
  }

  // Cap batch size to remaining daily limit
  let batchSize = requestedBatchSize

  if (remainingToday <= 0) {
    console.log('\n⚠️  Daily limit reached!')
    console.log('You\'ve generated 1,500 images today (Gemini free tier limit)')
    console.log('Please wait until tomorrow to generate more images.')
    console.log(`\nNext reset: ${new Date(todayStart.getTime() + 24 * 60 * 60 * 1000).toLocaleString()}`)
    return
  }

  if (requestedBatchSize > remainingToday) {
    console.log(`\n⚠️  Requested ${requestedBatchSize} images, but only ${remainingToday} remaining today`)
    batchSize = remainingToday
    console.log(`   Automatically adjusted to ${batchSize} images to stay within daily limit`)
  }

  console.log(`\n🎯 Target: Generate ${batchSize} recipe images`)
  console.log('\n⚠️  Image generation uses AI credits and takes 5-10 seconds per image')
  console.log(`⏱️  Estimated time: ${Math.ceil(batchSize * 7 / 60)} minutes`)
  console.log('\nPrerequisites:')
  console.log('1. Server running: npm run dev')
  console.log('2. Google AI API key configured (GOOGLE_AI_API_KEY)')
  console.log('3. Supabase Storage bucket "recipe-images" created')
  console.log('\n⏳ Starting in 10 seconds... (Press Ctrl+C to cancel)\n')

  // Countdown
  for (let i = 10; i > 0; i--) {
    process.stdout.write(`\r${i}...`)
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  console.log('\n')

  // Get recipes without images
  console.log(`📋 Finding ${batchSize} recipes without images...`)
  const recipesToProcess = await getRecipesWithoutImages(batchSize)

  if (recipesToProcess.length === 0) {
    console.log('\n✨ All recipes already have images!')
    return
  }

  console.log(`✅ Found ${recipesToProcess.length} recipes to process\n`)

  let successCount = 0
  let failCount = 0
  const results = []

  // Process each recipe
  for (let i = 0; i < recipesToProcess.length; i++) {
    const recipe = recipesToProcess[i]

    console.log(`\n[${ i + 1}/${recipesToProcess.length}] ${recipe.name}`)
    console.log('─'.repeat(50))

    const result = await generateImageForRecipe(recipe)
    results.push(result)

    if (result.success) {
      successCount++
    } else {
      failCount++
    }

    // Add delay between requests to avoid rate limits
    // Gemini: 15 requests per minute
    if (i < recipesToProcess.length - 1) {
      const delay = 5000 // 5 seconds between requests
      console.log(`\n⏳ Waiting ${delay / 1000}s before next image...`)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50))
  console.log('✨ Image Generation Complete!')
  console.log(`  ✅ Successfully generated: ${successCount} images`)
  if (failCount > 0) {
    console.log(`  ❌ Failed: ${failCount} images`)
    console.log('\n⚠️  Failed recipes:')
    results
      .filter(r => !r.success)
      .forEach(r => console.log(`  - ${r.recipe}: ${r.error}`))
  }

  console.log(`\n📊 Progress: ${recipesWithImages + successCount}/${totalRecipes} recipes have images`)
  console.log(`   (${Math.round(((recipesWithImages + successCount) / totalRecipes) * 100)}% complete)`)

  const remaining = totalRecipes - (recipesWithImages + successCount)
  if (remaining > 0) {
    console.log(`\n💡 To continue generating images, run:`)
    console.log(`   node scripts/generate-recipe-images.js ${Math.min(remaining, 30)}`)
  } else {
    console.log('\n🎉 All recipes now have images!')
  }

  console.log('')
}

if (require.main === module) {
  main().catch(console.error)
}
