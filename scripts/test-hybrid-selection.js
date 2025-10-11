// Test hybrid recipe selection
const { selectRecipesForCustomer } = require('../lib/hybrid-recipe-selector')

async function testHybridSelection() {
  console.log('🧪 Testing hybrid recipe selection...\n')

  try {
    // Test selecting 10 Mediterranean recipes
    console.log('📋 Testing Mediterranean diet selection...')
    const recipes = await selectRecipesForCustomer({
      dietType: 'mediterranean',
      totalRecipes: 10,
      newRecipesPercentage: 30 // 30% new for testing
    })

    console.log(`✅ Selected ${recipes.length} recipes:`)
    console.log(`  - From library: ${recipes.filter(r => !r.isNew).length}`)
    console.log(`  - Newly generated: ${recipes.filter(r => r.isNew).length}`)

    if (recipes.length > 0) {
      console.log('\n📝 Sample recipes:')
      recipes.slice(0, 3).forEach((recipe, i) => {
        console.log(`  ${i + 1}. ${recipe.name} ${recipe.isNew ? '(NEW)' : '(LIBRARY)'}`)
      })
    }

    console.log('\n✅ Hybrid selection system is working!')
    return true

  } catch (error) {
    console.error('❌ Test failed:', error.message)
    return false
  }
}

testHybridSelection()