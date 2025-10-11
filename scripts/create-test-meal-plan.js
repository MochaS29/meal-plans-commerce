// Create a test meal plan record for testing download functionality
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

async function createTestMealPlan() {
  console.log('🧪 Creating test meal plan record...\n')

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  try {
    // First, ensure we have a test customer
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .upsert([
        {
          id: 'test-customer-123',
          email: 'admin@mochasmindlab.com',
          name: 'Mocha',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ], {
        onConflict: 'id',
        ignoreDuplicates: false
      })
      .select()
      .single()

    if (customerError) {
      console.log('Customer upsert result:', customerError)
    } else {
      console.log('✅ Test customer created/updated')
    }

    // Create the test meal plan
    const { data: mealPlan, error: mealPlanError } = await supabase
      .from('meal_plans')
      .upsert([
        {
          id: 'meal-plan-123456',
          customer_id: 'test-customer-123',
          plan_type: 'Mediterranean Challenge',
          recipes: [
            { id: 1, title: 'Mediterranean Quinoa Bowl' },
            { id: 2, title: 'Greek Chicken Souvlaki' },
            { id: 3, title: 'Hummus and Veggie Wrap' }
          ],
          pdf_url: null, // Will be generated on-demand
          created_at: new Date().toISOString()
        }
      ], {
        onConflict: 'id',
        ignoreDuplicates: false
      })
      .select()

    if (mealPlanError) {
      console.error('❌ Failed to create meal plan:', mealPlanError)
      return
    }

    console.log('✅ Test meal plan created successfully!')
    console.log('📋 Meal Plan ID: meal-plan-123456')
    console.log('🔗 Download URL: http://localhost:3001/download/meal-plan-123456')
    console.log('\n🎯 You can now test the download link from the email!')

  } catch (error) {
    console.error('❌ Error creating test data:', error.message)
  }
}

createTestMealPlan()