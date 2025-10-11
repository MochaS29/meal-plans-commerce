// Test complete meal plan email workflow
require('dotenv').config({ path: '.env.local' })

async function testMealPlanEmail() {
  console.log('🧪 Testing complete meal plan email workflow...\n')

  const testData = {
    to: 'admin@mochasmindlab.com',
    subject: 'Your Mediterranean Meal Plan is Ready! 🎉',
    customerName: 'Mocha',
    planType: 'Mediterranean Challenge',
    downloadUrl: 'http://localhost:3004/download/meal-plan-123456'
  }

  try {
    const response = await fetch('http://localhost:3004/api/test-meal-plan-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    })

    const result = await response.json()

    if (response.ok) {
      console.log('🎉 SUCCESS! Meal plan email sent!')
      console.log('✅ Message ID:', result.messageId)
      console.log('📧 Check your email for the beautiful meal plan delivery!')
      console.log('\n🎯 This is exactly what your customers will receive after purchase')
    } else {
      console.log('❌ Failed to send meal plan email')
      console.log('Error:', result)
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

testMealPlanEmail()