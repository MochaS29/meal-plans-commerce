#!/usr/bin/env node

// Populate missing diet types only
require('dotenv').config({ path: '.env.local' })

const ADMIN_API_KEY = process.env.ADMIN_API_KEY

if (!ADMIN_API_KEY) {
  console.error('❌ Missing ADMIN_API_KEY in .env.local')
  process.exit(1)
}

// Only the missing diet types
const MISSING_DIETS = [
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
    return true
  } catch (error) {
    console.error(`❌ Failed to generate ${diet.name}: ${error.message}`)
    return false
  }
}

async function populateMissingDiets() {
  console.log('🚀 Generating Missing Diet Types')
  console.log('='.repeat(50))
  console.log(`\nDiet types: ${MISSING_DIETS.map(d => d.name).join(', ')}`)
  console.log('\n⏳ Starting in 5 seconds... (Press Ctrl+C to cancel)\n')

  for (let i = 5; i > 0; i--) {
    process.stdout.write(`\r${i}...`)
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  console.log('\n')

  let successCount = 0
  let failCount = 0

  for (const diet of MISSING_DIETS) {
    const success = await generateForDiet(diet)
    if (success) {
      successCount++
    } else {
      failCount++
    }

    // Wait 60 seconds between diet types to avoid overloading Claude API
    if (diet !== MISSING_DIETS[MISSING_DIETS.length - 1]) {
      console.log('⏳ Waiting 60 seconds before next diet type...')
      await new Promise(resolve => setTimeout(resolve, 60000))
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log('✨ Population Request Complete!')
  console.log(`  ✅ Successfully queued: ${successCount} diet types`)
  if (failCount > 0) {
    console.log(`  ❌ Failed: ${failCount} diet types`)
  }
  console.log('\nRecipes are generating in the background.')
  console.log('Check progress at: http://localhost:3002/admin/recipes\n')
}

if (require.main === module) {
  populateMissingDiets().catch(console.error)
}
