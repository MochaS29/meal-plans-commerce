#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// Meal plan names from calendar
const mealPlanNames = [
  "Overnight Oats with Greek Yogurt",
  "Whole Grain Toast with Avocado and Feta",
  "Turkish Breakfast Platter",
  "Mediterranean Egg Bites",
  "Spanakopita with Greek Salad",
  "Mediterranean Chickpea Salad",
  "Grilled Lemon Herb Salmon",
  "Ratatouille with Grilled Chicken"
]

async function findRecipes() {
  console.log('Searching for matching recipes in database...\n')

  for (const mealName of mealPlanNames) {
    // Try exact match
    const { data: exact } = await supabase
      .from('recipes')
      .select('id, name')
      .ilike('name', mealName)
      .limit(1)

    if (exact && exact.length > 0) {
      console.log(`✅ "${mealName}" → EXACT MATCH: "${exact[0].name}"`)
    } else {
      // Try partial match
      const words = mealName.split(' ').filter(w => w.length > 3)
      const { data: partial } = await supabase
        .from('recipes')
        .select('id, name')
        .or(words.map(w => `name.ilike.%${w}%`).join(','))
        .limit(3)

      if (partial && partial.length > 0) {
        console.log(`⚠️  "${mealName}" → No exact match, closest:`)
        partial.forEach(r => console.log(`    - "${r.name}"`))
      } else {
        console.log(`❌ "${mealName}" → NO MATCHES FOUND`)
      }
    }
  }

  // Show sample recipe names from database
  console.log('\n\n📚 Sample recipe names in database:')
  const { data: samples } = await supabase
    .from('recipes')
    .select('name')
    .limit(20)

  samples?.forEach((r, i) => console.log(`${i + 1}. ${r.name}`))
}

findRecipes().catch(console.error)
