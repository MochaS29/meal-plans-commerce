const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function checkMealTypes() {
  console.log('Checking meal types in database...\n')

  // Get count by meal type
  const { data, error } = await supabase
    .from('recipes')
    .select('meal_type')

  if (error) {
    console.error('Error:', error)
    return
  }

  // Count meal types
  const mealTypeCounts = {}
  data.forEach(recipe => {
    const mealType = recipe.meal_type || 'null'
    mealTypeCounts[mealType] = (mealTypeCounts[mealType] || 0) + 1
  })

  console.log('Meal Type Distribution:')
  console.log('========================')
  Object.entries(mealTypeCounts).sort((a, b) => b[1] - a[1]).forEach(([type, count]) => {
    const padding = ' '.repeat(Math.max(0, 15 - type.length))
    console.log(type + padding + count)
  })

  console.log('\nTotal recipes:', data.length)

  // Check for breakfast and dessert specifically
  const breakfast = data.filter(r => r.meal_type === 'breakfast').length
  const dessert = data.filter(r => r.meal_type === 'dessert').length

  console.log('\n🥞 Breakfast recipes:', breakfast)
  console.log('🍰 Dessert recipes:', dessert)

  if (breakfast === 0 || dessert === 0) {
    console.log('\n⚠️  Missing meal types detected!')
    console.log('   We need to populate the database with breakfast and dessert recipes.')
  }
}

checkMealTypes().catch(console.error)
