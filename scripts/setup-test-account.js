#!/usr/bin/env node

/**
 * Setup Test Account Script
 * Creates a test user account (mokah@me.com) with a Mediterranean meal plan purchase
 *
 * Usage: node scripts/setup-test-account.js
 */

const { createClient } = require('@supabase/supabase-js')
const bcrypt = require('bcryptjs')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials')
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function setupTestAccount() {
  const email = 'mokah@me.com'
  const password = 'TestPassword123!'
  const name = 'Mocha Test User'

  console.log('🔧 Setting up test account...\n')

  try {
    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10)

    // Check if user exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    let userId

    if (existingUser) {
      // Update existing user
      const { error: updateError } = await supabase
        .from('users')
        .update({
          password_hash: passwordHash
        })
        .eq('id', existingUser.id)

      if (updateError) throw updateError

      userId = existingUser.id
      console.log('✅ Updated existing user account')
    } else {
      // Create new user
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({
          email,
          password_hash: passwordHash,
          name
        })
        .select()
        .single()

      if (createError) throw createError

      userId = newUser.id
      console.log('✅ Created new user account')
    }

    // Check if user already has a purchase
    const { data: existingPurchases } = await supabase
      .from('user_purchases')
      .select('*')
      .eq('user_id', userId)

    let purchase

    if (existingPurchases && existingPurchases.length > 0) {
      // Update existing purchase
      const { data: updatedPurchase, error: updateError } = await supabase
        .from('user_purchases')
        .update({
          stripe_session_id: `cs_test_${Math.random().toString(36).substring(2, 15)}`,
          product_id: 'mediterranean-30day',
          product_name: '30-Day Mediterranean Meal Plan',
          diet_plan: 'mediterranean',
          amount: 7900, // $79.00
          status: 'completed',
          purchased_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year
        })
        .eq('id', existingPurchases[0].id)
        .select()
        .single()

      if (updateError) throw updateError
      purchase = updatedPurchase
      console.log('✅ Updated existing Mediterranean meal plan purchase\n')
    } else {
      // Create new purchase
      const { data: newPurchase, error: purchaseError } = await supabase
        .from('user_purchases')
        .insert({
          user_id: userId,
          stripe_session_id: `cs_test_${Math.random().toString(36).substring(2, 15)}`,
          product_id: 'mediterranean-30day',
          product_name: '30-Day Mediterranean Meal Plan',
          diet_plan: 'mediterranean',
          amount: 7900, // $79.00
          status: 'completed',
          purchased_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year
        })
        .select()
        .single()

      if (purchaseError) throw purchaseError
      purchase = newPurchase
      console.log('✅ Created Mediterranean meal plan purchase\n')
    }

    // Verify setup
    const { data: userData } = await supabase
      .from('users')
      .select(`
        id,
        email,
        name,
        created_at,
        user_purchases (
          product_name,
          diet_plan,
          amount,
          status,
          purchased_at,
          expires_at
        )
      `)
      .eq('email', email)
      .single()

    // Print summary
    console.log('====================================')
    console.log('🎉 Account Setup Complete!')
    console.log('====================================')
    console.log(`Email: ${email}`)
    console.log(`Password: ${password}`)
    console.log('')
    console.log('Purchase Details:')
    console.log(`- Product: ${purchase.product_name}`)
    console.log(`- Diet Plan: ${purchase.diet_plan}`)
    console.log(`- Status: ${purchase.status}`)
    console.log(`- Valid Until: ${new Date(purchase.expires_at).toLocaleDateString()}`)
    console.log('')
    console.log('🌐 Login URL: http://localhost:3000/login')
    console.log('====================================\n')

    // Check recipe count
    const { count: recipeCount } = await supabase
      .from('recipes')
      .select('*', { count: 'exact', head: true })

    console.log(`📚 Database has ${recipeCount || 0} recipes\n`)

    if (!recipeCount || recipeCount === 0) {
      console.warn('⚠️  Warning: No recipes found in database!')
      console.warn('   Recipe book and calendar clicks will not work without recipes.')
    } else if (recipeCount < 781) {
      console.warn(`⚠️  Warning: Only ${recipeCount} recipes found (expected 781)`)
    } else {
      console.log('✅ Recipe database is properly populated')
    }

  } catch (error) {
    console.error('❌ Error setting up account:', error.message)
    if (error.details) console.error('Details:', error.details)
    if (error.hint) console.error('Hint:', error.hint)
    process.exit(1)
  }
}

setupTestAccount()
