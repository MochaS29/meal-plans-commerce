// Test Resend email integration
require('dotenv').config({ path: '.env.local' })

async function testEmail() {
  const testData = {
    to: 'admin@mochasmindlab.com',
    subject: 'SUCCESS! Resend Email Integration Working!',
    message: 'Your Resend email system is now active and ready to serve customers!'
  }

  try {
    const response = await fetch('http://localhost:3001/api/test-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    })

    const result = await response.json()

    if (response.ok) {
      console.log('🎉 SUCCESS! Email sent via Resend')
      console.log('Response:', result)
      console.log('\n✅ Check your email inbox!')
    } else {
      console.log('❌ Failed to send email')
      console.log('Error:', result)
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

console.log('🧪 Testing Resend email integration...\n')
testEmail()