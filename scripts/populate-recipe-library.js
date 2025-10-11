// Populate recipe library with AI-generated recipes for all diet types
const fetch = require('node-fetch')
require('dotenv').config({ path: '.env.local' })

const DIET_PLANS = [
  { name: 'Mediterranean', slug: 'mediterranean' },
  { name: 'Keto', slug: 'keto' },
  { name: 'Vegan', slug: 'vegan' },
  { name: 'Paleo', slug: 'paleo' },
  { name: 'Vegetarian', slug: 'vegetarian' },
  { name: 'Family Recipes', slug: 'family' }
]

const MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'snack']

// How many recipes to generate per diet - 4 months worth (30 days x 4 = 120 days)
const RECIPES_PER_DIET = 120 // 30 of each meal type for 4 months

async function generateRecipesForDiet(dietSlug, dietName) {
  console.log(`\n🍽️  Generating recipes for ${dietName}...`)

  let successCount = 0
  let errorCount = 0

  for (const mealType of MEAL_TYPES) {
    const recipesToGenerate = RECIPES_PER_DIET / 4 // Evenly distribute across meal types (30 each)

    console.log(`  📝 Generating ${recipesToGenerate} ${mealType} recipes...`)

    for (let i = 0; i < recipesToGenerate; i++) {
      try {
        // Call your API to generate a recipe
        const response = await fetch('http://localhost:3000/api/generate-recipes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': 'admin-token=' + process.env.ADMIN_TOKEN // You'll need to login first
          },
          body: JSON.stringify({
            action: 'single',
            dietType: dietSlug,
            mealType: mealType
          })
        })

        const data = await response.json()

        if (data.success && data.savedToDatabase) {
          successCount++
          console.log(`    ✅ Created: ${data.recipe?.name || 'Recipe'} (${i + 1}/${recipesToGenerate})`)
        } else {
          errorCount++
          console.log(`    ❌ Failed to save recipe`)
        }

        // Wait between requests to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 2000)) // 2 second delay

      } catch (error) {
        errorCount++
        console.log(`    ❌ Error: ${error.message}`)
      }
    }
  }

  console.log(`  📊 ${dietName} complete: ${successCount} created, ${errorCount} failed`)
  return { successCount, errorCount }
}

async function populateLibrary() {
  console.log('🚀 Recipe Library Population Tool')
  console.log('='.repeat(50))
  console.log('\nThis will generate 4 MONTHS of recipes for each diet type.')
  console.log(`Target: ${RECIPES_PER_DIET} recipes per diet type (30 of each meal type)`)
  console.log(`Diet types: ${DIET_PLANS.map(d => d.name).join(', ')}`)
  console.log(`Total recipes to generate: ${RECIPES_PER_DIET * DIET_PLANS.length} recipes`)
  console.log('\n⚠️  This will take approximately ' + Math.round(RECIPES_PER_DIET * DIET_PLANS.length * 2 / 60) + ' minutes')

  console.log('\n⏳ Starting in 5 seconds... (Press Ctrl+C to cancel)\n')
  await new Promise(resolve => setTimeout(resolve, 5000))

  let totalSuccess = 0
  let totalErrors = 0

  for (const diet of DIET_PLANS) {
    const { successCount, errorCount } = await generateRecipesForDiet(diet.slug, diet.name)
    totalSuccess += successCount
    totalErrors += errorCount
  }

  console.log('\n' + '='.repeat(50))
  console.log('✨ Population Complete!')
  console.log(`  ✅ Successfully created: ${totalSuccess} recipes`)
  console.log(`  ❌ Failed: ${totalErrors} recipes`)
  console.log('\nYour 4-month recipe library is now ready for production use!')
}

// Check if running directly
if (require.main === module) {
  console.log('\n⚠️  IMPORTANT: Make sure you are logged in as admin first!')
  console.log('  1. Go to http://localhost:3000/admin/login')
  console.log('  2. Login with your admin credentials')
  console.log('  3. Copy the admin-token cookie value')
  console.log('  4. Set ADMIN_TOKEN in your .env.local file')
  console.log('\nAlternatively, you can manually generate recipes from the admin panel.\n')

  // Uncomment to run
  // populateLibrary().catch(console.error)

  console.log('Uncomment the populateLibrary() line in this script to run.')
}

module.exports = { populateLibrary }