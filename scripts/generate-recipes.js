#!/usr/bin/env node

// Script to generate recipes for your meal plans
// Usage: node scripts/generate-recipes.js [diet-type] [months]
// Example: node scripts/generate-recipes.js mediterranean 12

const dietType = process.argv[2] || 'mediterranean'
const months = parseInt(process.argv[3] || '1')

const DIET_TYPES = [
  'mediterranean',
  'keto',
  'vegan',
  'paleo',
  'vegetarian',
  'intermittent-fasting',
  'family-focused',
  'global'
]

if (!DIET_TYPES.includes(dietType)) {
  console.error(`Invalid diet type. Choose from: ${DIET_TYPES.join(', ')}`)
  process.exit(1)
}

console.log(`🍽️  Generating ${months} month(s) of ${dietType} recipes...`)
console.log('This will create approximately:')
console.log(`- ${months * 28} breakfast recipes`)
console.log(`- ${months * 28} lunch recipes`)
console.log(`- ${months * 28} dinner recipes`)
console.log(`- ${months * 28} snack recipes`)
console.log(`Total: ${months * 112} recipes\n`)

// Check if running locally or in production
const API_URL = process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000'
const API_KEY = process.env.ADMIN_API_KEY || 'dev-key'

async function generateRecipes() {
  try {
    const response = await fetch(`${API_URL}/api/generate-recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        action: 'bulk',
        dietType: dietType,
        monthsToGenerate: months
      })
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const result = await response.json()
    console.log('✅ Generation started:', result.message)

    // Poll for completion (in production, this would be a background job)
    console.log('\n📊 Checking progress...')

    let lastCount = 0
    const checkProgress = setInterval(async () => {
      const statsResponse = await fetch(`${API_URL}/api/generate-recipes`)
      const stats = await statsResponse.json()

      const dietStats = stats.stats?.find(s => s.slug === dietType)
      if (dietStats && dietStats.recipeCount > lastCount) {
        console.log(`Progress: ${dietStats.recipeCount} recipes created`)
        lastCount = dietStats.recipeCount
      }

      // Stop checking after expected recipes are created
      if (dietStats && dietStats.recipeCount >= months * 112 * 0.8) {
        clearInterval(checkProgress)
        console.log('\n✅ Recipe generation complete!')
        process.exit(0)
      }
    }, 5000)

  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

// Alternative: Generate locally without API
async function generateLocally() {
  console.log('🏠 Generating recipes locally...')

  // This would import the generator directly
  // Useful for development or if you want to bypass the API

  try {
    // Dynamic import to avoid build issues
    const { bulkGenerateRecipes } = await import('../lib/ai-recipe-generator.js')
    await bulkGenerateRecipes(dietType, months)
    console.log('✅ Complete!')
  } catch (error) {
    console.error('❌ Error:', error.message)
    console.log('Make sure to set OPENAI_API_KEY in your .env.local file')
  }
}

// Check if API is available
fetch(`${API_URL}/api/generate-recipes`)
  .then(() => {
    console.log('🌐 Using API endpoint...\n')
    generateRecipes()
  })
  .catch(() => {
    console.log('🏠 API not available, generating locally...\n')
    generateLocally()
  })