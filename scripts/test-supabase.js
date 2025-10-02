// Test Supabase connection and create tables if needed
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('Testing Supabase connection...')
console.log('URL:', supabaseUrl)
console.log('Key exists:', !!supabaseAnonKey)

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  try {
    // Test basic connection
    console.log('\n📡 Testing connection...')
    const { data, error } = await supabase.from('diet_plans').select('count')

    if (error && error.code === '42P01') {
      console.log('⚠️ Tables not found, creating them...')
      await createTables()
    } else if (error) {
      console.error('❌ Connection error:', error)
    } else {
      console.log('✅ Connected successfully!')
      await checkTables()
    }
  } catch (err) {
    console.error('❌ Error:', err)
  }
}

async function checkTables() {
  console.log('\n📊 Checking tables...')

  const tables = ['diet_plans', 'recipes', 'recipe_ingredients', 'recipe_instructions', 'recipe_nutrition']

  for (const table of tables) {
    const { count, error } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.log(`❌ ${table}: Error - ${error.message}`)
    } else {
      console.log(`✅ ${table}: ${count || 0} records`)
    }
  }

  // Check diet plans
  const { data: dietPlans } = await supabase
    .from('diet_plans')
    .select('id, name, slug')

  if (dietPlans && dietPlans.length > 0) {
    console.log('\n📋 Diet plans found:')
    dietPlans.forEach(plan => {
      console.log(`  - ${plan.name} (${plan.slug})`)
    })
  } else {
    console.log('\n⚠️ No diet plans found. Creating defaults...')
    await createDefaultDietPlans()
  }
}

async function createDefaultDietPlans() {
  const defaultPlans = [
    { name: 'Mediterranean', slug: 'mediterranean', description: 'Heart-healthy Mediterranean diet', price: 49, features: ['Fresh ingredients', 'Olive oil based', 'Fish & vegetables'] },
    { name: 'Keto', slug: 'keto', description: 'Low-carb ketogenic diet', price: 49, features: ['High fat', 'Low carb', 'Protein focused'] },
    { name: 'Vegan', slug: 'vegan', description: 'Plant-based vegan diet', price: 49, features: ['100% plant-based', 'No animal products', 'Nutrient-rich'] },
    { name: 'Paleo', slug: 'paleo', description: 'Ancestral paleo diet', price: 49, features: ['Whole foods', 'No processed', 'Grain-free'] },
  ]

  for (const plan of defaultPlans) {
    const { data, error } = await supabase
      .from('diet_plans')
      .insert([plan])
      .select()

    if (error) {
      console.log(`❌ Failed to create ${plan.name}: ${error.message}`)
    } else {
      console.log(`✅ Created ${plan.name} diet plan`)
    }
  }
}

async function createTables() {
  console.log('\n🔨 Creating tables...')
  console.log('Please run the SQL commands from SETUP_GUIDE.md in your Supabase SQL editor')
  console.log('Visit: ' + supabaseUrl.replace('.supabase.co', '.supabase.co/project/default/sql'))
}

testConnection()