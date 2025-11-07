#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkSchema() {
  console.log('Checking database schema...\n')

  // Check users table
  const { data: users, error: usersError } = await supabase
    .from('users')
    .select('*')
    .limit(1)

  console.log('Users table columns:', users ? Object.keys(users[0] || {}) : 'Error: ' + usersError?.message)

  // Check user_purchases table
  const { data: purchases, error: purchasesError } = await supabase
    .from('user_purchases')
    .select('*')
    .limit(1)

  console.log('User_purchases table columns:', purchases && purchases[0] ? Object.keys(purchases[0]) : 'Error: ' + purchasesError?.message)

  // Check recipe count
  const { count: recipeCount } = await supabase
    .from('recipes')
    .select('*', { count: 'exact', head: true })

  console.log(`\nRecipes in database: ${recipeCount || 0}`)

  // Check if mokah@me.com exists
  const { data: mokah } = await supabase
    .from('users')
    .select('id, email, name')
    .eq('email', 'mokah@me.com')
    .single()

  if (mokah) {
    console.log('\nUser mokah@me.com exists:', mokah)

    // Check their purchases
    const { data: userPurchases } = await supabase
      .from('user_purchases')
      .select('*')
      .eq('user_id', mokah.id)

    console.log('Purchases for mokah@me.com:', userPurchases?.length || 0)
    if (userPurchases && userPurchases.length > 0) {
      console.log('Latest purchase:', userPurchases[0])
    }
  } else {
    console.log('\nUser mokah@me.com does not exist')
  }
}

checkSchema().catch(console.error)
