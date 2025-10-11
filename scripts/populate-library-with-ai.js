#!/usr/bin/env node

// Populate recipe library with AI-generated recipes
// This creates 4 months worth of recipes for each diet type including family recipes

require('dotenv').config({ path: '.env.local' })

const ADMIN_API_KEY = process.env.ADMIN_API_KEY

if (!ADMIN_API_KEY) {
  console.error('❌ Missing ADMIN_API_KEY in .env.local')
  console.log('Please add: ADMIN_API_KEY=your-api-key-here')
  process.exit(1)
}

const DIET_PLANS = [
  { name: 'Mediterranean', slug: 'mediterranean' },
  { name: 'Keto', slug: 'keto' },
  { name: 'Vegan', slug: 'vegan' },
  { name: 'Paleo', slug: 'paleo' },
  { name: 'Vegetarian', slug: 'vegetarian' },
  { name: 'Family Recipes', slug: 'family' }
]

async function generateForDiet(diet) {
  console.log(`\n🍽️  Generating 4 months of ${diet.name} recipes...`)

  try {
    const PORT = process.env.PORT || 3002
    const response = await fetch(`http://localhost:${PORT}/api/generate-recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_API_KEY}`
      },
      body: JSON.stringify({
        action: 'bulk',
        dietType: diet.slug,
        monthsToGenerate: 4
      })
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`API error: ${error}`)
    }

    const result = await response.json()
    console.log(`✅ ${diet.name}: ${result.message}`)

    // This triggers background generation
    // In production, this would be a queued job
    return true
  } catch (error) {
    console.error(`❌ Failed to generate ${diet.name}: ${error.message}`)
    return false
  }
}

async function populateLibrary() {
  console.log('🚀 AI Recipe Library Population Tool')
  console.log('='.repeat(50))
  console.log('\nThis will generate 4 MONTHS of recipes for each diet type.')
  console.log('Target: 120 recipes per diet type (30 of each meal type)')
  console.log(`Diet types: ${DIET_PLANS.map(d => d.name).join(', ')}`)
  console.log(`\nTotal recipes to generate: ${120 * DIET_PLANS.length} recipes`)
  console.log('\n⚠️  This will use AI credits and may take 30-60 minutes\n')

  console.log('Prerequisites:')
  console.log('1. Make sure the server is running: npm run dev')
  console.log('2. Make sure you have AI API keys configured')
  console.log('3. Make sure Supabase is connected\n')

  console.log('⏳ Starting in 10 seconds... (Press Ctrl+C to cancel)\n')

  // Countdown
  for (let i = 10; i > 0; i--) {
    process.stdout.write(`\r${i}...`)
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  console.log('\n')

  let successCount = 0
  let failCount = 0

  // Process each diet sequentially to avoid overwhelming the AI API
  for (const diet of DIET_PLANS) {
    const success = await generateForDiet(diet)
    if (success) {
      successCount++
    } else {
      failCount++
    }

    // Wait between diet types to avoid rate limits
    if (diet !== DIET_PLANS[DIET_PLANS.length - 1]) {
      console.log('⏳ Waiting 30 seconds before next diet type...')
      await new Promise(resolve => setTimeout(resolve, 30000))
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log('✨ Population Request Complete!')
  console.log(`  ✅ Successfully queued: ${successCount} diet types`)
  if (failCount > 0) {
    console.log(`  ❌ Failed: ${failCount} diet types`)
  }
  console.log('\n📊 Recipe generation is happening in the background.')
  console.log('Check the Recipe Library in 30-60 minutes:')
  console.log('http://localhost:3000/admin/recipes\n')
  console.log('Or on production:')
  console.log('https://mindfulmealplan.com/admin/recipes\n')
}

// Check if running directly
if (require.main === module) {
  populateLibrary().catch(console.error)
}