// Test welcome email workflow
require('dotenv').config({ path: '.env.local' })

async function testWelcomeEmail() {
  console.log('🧪 Testing welcome email workflow...\n')

  const testData = {
    to: 'admin@mochasmindlab.com',
    subject: 'Welcome to Your Meal Planning Journey! 🌟',
    customerName: 'Mocha',
    customerEmail: 'admin@mochasmindlab.com',
    isSubscription: false
  }

  try {
    const response = await fetch('http://localhost:3001/api/test-welcome-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    })

    const result = await response.json()

    if (response.ok) {
      console.log('🎉 SUCCESS! Welcome email sent!')
      console.log('✅ Message ID:', result.messageId)
      console.log('📧 Check your email for the welcome message!')
      console.log('\n🎯 This is what customers receive immediately after purchase')
    } else {
      console.log('❌ Failed to send welcome email')
      console.log('Error:', result)
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

testWelcomeEmail()