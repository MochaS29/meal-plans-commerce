#!/usr/bin/env node

/**
 * Full System Test
 * Tests all major components to identify what's not working
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

async function testFullSystem() {
  console.log('🧪 FULL SYSTEM TEST\n')
  console.log('=' .repeat(60))

  const results = {
    passed: [],
    failed: [],
    warnings: []
  }

  // Test 1: Environment Variables
  console.log('\n1️⃣  Testing Environment Variables...')
  const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'RESEND_API_KEY',
    'EMAIL_FROM',
    'BLOB_READ_WRITE_TOKEN'
  ]

  let allEnvVarsPresent = true
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      console.log(`   ❌ Missing: ${envVar}`)
      results.failed.push(`Missing env var: ${envVar}`)
      allEnvVarsPresent = false
    } else {
      console.log(`   ✅ ${envVar} is set`)
    }
  }

  if (allEnvVarsPresent) {
    results.passed.push('All environment variables configured')
  }

  // Check if using test or live keys
  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
  if (stripeKey.startsWith('pk_test')) {
    console.log('   ⚠️  Using STRIPE TEST keys (not live)')
    results.warnings.push('Using Stripe test keys instead of live keys')
  } else if (stripeKey.startsWith('pk_live')) {
    console.log('   ✅ Using STRIPE LIVE keys')
    results.passed.push('Stripe live keys configured')
  }

  // Test 2: Database Connection
  console.log('\n2️⃣  Testing Database Connection...')
  try {
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Test connection
    const { count: recipeCount, error: recipeError } = await supabase
      .from('recipes')
      .select('*', { count: 'exact', head: true })

    if (recipeError) {
      console.log(`   ❌ Database connection failed: ${recipeError.message}`)
      results.failed.push(`Database error: ${recipeError.message}`)
    } else {
      console.log(`   ✅ Database connected (${recipeCount} recipes)`)
      results.passed.push(`Database working with ${recipeCount} recipes`)
    }

    // Test user table
    const { count: userCount, error: userError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })

    if (userError) {
      console.log(`   ❌ Users table error: ${userError.message}`)
      results.failed.push(`Users table: ${userError.message}`)
    } else {
      console.log(`   ✅ Users table working (${userCount} users)`)
      results.passed.push(`Users table accessible`)
    }

    // Test purchases table
    const { count: purchaseCount, error: purchaseError } = await supabase
      .from('user_purchases')
      .select('*', { count: 'exact', head: true })

    if (purchaseError) {
      console.log(`   ❌ Purchases table error: ${purchaseError.message}`)
      results.failed.push(`Purchases table: ${purchaseError.message}`)
    } else {
      console.log(`   ✅ Purchases table working (${purchaseCount} purchases)`)
      results.passed.push(`Purchases table accessible`)
    }

  } catch (error) {
    console.log(`   ❌ Database test failed: ${error.message}`)
    results.failed.push(`Database connection: ${error.message}`)
  }

  // Test 3: Test User Account
  console.log('\n3️⃣  Testing User Account (mokah@me.com)...')
  try {
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, email, name')
      .eq('email', 'mokah@me.com')
      .single()

    if (userError || !user) {
      console.log('   ❌ Test user not found')
      results.failed.push('Test user mokah@me.com not found')
    } else {
      console.log(`   ✅ Test user exists: ${user.email}`)

      // Check purchases
      const { data: purchases, error: purchaseError } = await supabase
        .from('user_purchases')
        .select('*')
        .eq('user_id', user.id)

      if (purchaseError) {
        console.log(`   ❌ Could not load purchases: ${purchaseError.message}`)
        results.failed.push('Could not load user purchases')
      } else if (!purchases || purchases.length === 0) {
        console.log('   ⚠️  User has no purchases')
        results.warnings.push('Test user has no active purchases')
      } else {
        console.log(`   ✅ User has ${purchases.length} purchase(s)`)
        console.log(`      Latest: ${purchases[0].product_name} (${purchases[0].diet_plan})`)
        results.passed.push('Test user has active purchases')
      }
    }
  } catch (error) {
    console.log(`   ❌ User test failed: ${error.message}`)
    results.failed.push(`User test: ${error.message}`)
  }

  // Test 4: Recipe API
  console.log('\n4️⃣  Testing Recipe API...')
  try {
    const testRecipe = 'Mediterranean Chickpea Salad'
    const response = await fetch(`http://localhost:3000/api/recipes/by-name/${encodeURIComponent(testRecipe)}`)

    if (response.ok) {
      const recipe = await response.json()
      if (recipe.name && recipe.recipe_ingredients && recipe.recipe_instructions) {
        console.log(`   ✅ Recipe API working`)
        console.log(`      Found: "${recipe.name}"`)
        console.log(`      Ingredients: ${recipe.recipe_ingredients.length}`)
        console.log(`      Instructions: ${recipe.recipe_instructions.length}`)
        results.passed.push('Recipe API functional')
      } else {
        console.log('   ⚠️  Recipe API returns incomplete data')
        results.warnings.push('Recipe API returns incomplete recipe data')
      }
    } else {
      console.log(`   ❌ Recipe API failed: ${response.status}`)
      results.failed.push(`Recipe API returned ${response.status}`)
    }
  } catch (error) {
    console.log(`   ❌ Recipe API test failed: ${error.message}`)
    results.failed.push(`Recipe API: ${error.message}`)
  }

  // Test 5: Meal Plan API
  console.log('\n5️⃣  Testing Meal Plan API...')
  try {
    const response = await fetch('http://localhost:3000/api/meal-plans?menuType=mediterranean&month=1&year=2025')

    if (response.ok) {
      const mealPlan = await response.json()
      if (mealPlan.dailyMeals && mealPlan.dailyMeals.day_1) {
        console.log(`   ✅ Meal Plan API working`)
        console.log(`      Plan: ${mealPlan.title}`)
        console.log(`      Sample Day 1 Breakfast: ${mealPlan.dailyMeals.day_1.breakfast.name}`)
        results.passed.push('Meal Plan API functional')
      } else {
        console.log('   ⚠️  Meal Plan API returns incomplete data')
        results.warnings.push('Meal Plan API structure unexpected')
      }
    } else {
      console.log(`   ❌ Meal Plan API failed: ${response.status}`)
      results.failed.push(`Meal Plan API returned ${response.status}`)
    }
  } catch (error) {
    console.log(`   ❌ Meal Plan API test failed: ${error.message}`)
    results.failed.push(`Meal Plan API: ${error.message}`)
  }

  // Test 6: Email System
  console.log('\n6️⃣  Testing Email System...')
  if (!process.env.RESEND_API_KEY) {
    console.log('   ⚠️  No RESEND_API_KEY configured')
    console.log('      Emails will be logged to console only')
    results.warnings.push('Email system not configured (no Resend API key)')
  } else {
    console.log(`   ✅ RESEND_API_KEY is configured`)
    console.log(`      Email from: ${process.env.EMAIL_FROM}`)
    results.passed.push('Email system configured')

    // Check if domain is verified
    if (process.env.EMAIL_FROM.includes('onboarding@resend.dev')) {
      console.log('   ⚠️  Using Resend sandbox email')
      results.warnings.push('Using Resend sandbox (not custom domain)')
    }
  }

  // Test 7: Blob Storage
  console.log('\n7️⃣  Testing Blob Storage...')
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.log('   ❌ No BLOB_READ_WRITE_TOKEN configured')
    console.log('      PDFs cannot be uploaded to storage')
    results.failed.push('Blob storage not configured')
  } else {
    console.log(`   ✅ BLOB_READ_WRITE_TOKEN is configured`)
    results.passed.push('Blob storage configured')
  }

  // Summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 TEST SUMMARY\n')

  console.log(`✅ PASSED: ${results.passed.length}`)
  results.passed.forEach(item => console.log(`   - ${item}`))

  if (results.warnings.length > 0) {
    console.log(`\n⚠️  WARNINGS: ${results.warnings.length}`)
    results.warnings.forEach(item => console.log(`   - ${item}`))
  }

  if (results.failed.length > 0) {
    console.log(`\n❌ FAILED: ${results.failed.length}`)
    results.failed.forEach(item => console.log(`   - ${item}`))
  }

  console.log('\n' + '='.repeat(60))

  if (results.failed.length === 0) {
    console.log('\n🎉 System is functional! (with warnings noted above)')
  } else {
    console.log('\n⚠️  System has critical issues that need fixing')
  }
}

// Run if called directly
if (require.main === module) {
  testFullSystem().catch(console.error)
}

module.exports = { testFullSystem }
