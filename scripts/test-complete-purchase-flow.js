// Test complete purchase and account creation flow
require('dotenv').config({ path: '.env.local' })

async function testCompletePurchaseFlow() {
  console.log('🧪 Testing complete purchase and account creation flow...\n')

  // Step 1: Create a checkout session
  console.log('1. Creating Stripe checkout session...')

  try {
    const response = await fetch('http://localhost:3004/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        productId: 'wellness-transformation',
        successUrl: 'http://localhost:3004/success',
        cancelUrl: 'http://localhost:3004/pricing'
      })
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('   ❌ Failed to create checkout session:', error)
      return
    }

    const data = await response.json()
    console.log('   ✅ Checkout session created:', data.sessionId)
    console.log('   🔗 Test URL:', data.url)

    // Step 2: Instructions for manual testing
    console.log('\n2. Manual testing steps:')
    console.log('   📋 To test the complete flow:')
    console.log('   1. Open the checkout URL above in your browser')
    console.log('   2. Use Stripe test card: 4242 4242 4242 4242')
    console.log('   3. Use any future expiry date (e.g., 12/34)')
    console.log('   4. Use any 3-digit CVC (e.g., 123)')
    console.log('   5. Complete the payment')
    console.log('   6. Watch the webhook logs below for processing')

    // Step 3: Show current webhook configuration
    console.log('\n3. Webhook configuration:')
    console.log(`   📡 Endpoint: https://a6db4660a727.ngrok-free.app/api/stripe-webhook`)
    console.log(`   🔑 Secret: ${process.env.STRIPE_WEBHOOK_SECRET ? '✅ Configured' : '❌ Missing'}`)

    // Step 4: Test webhook endpoint accessibility
    console.log('\n4. Testing webhook endpoint...')
    const webhookTest = await fetch('https://a6db4660a727.ngrok-free.app/api/stripe-webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'stripe-signature': 'test-signature'
      },
      body: JSON.stringify({ test: 'webhook' })
    })

    console.log(`   Status: ${webhookTest.status}`)
    if (webhookTest.status === 400) {
      console.log('   ✅ Webhook endpoint responding correctly (signature verification working)')
    }

    // Step 5: Expected workflow
    console.log('\n5. Expected workflow after payment:')
    console.log('   ✅ checkout.session.completed event received')
    console.log('   ✅ User account created in Supabase')
    console.log('   ✅ Password-based authentication enabled')
    console.log('   ✅ Meal plan PDF generated with hybrid recipes')
    console.log('   ✅ Welcome + meal plan emails sent')
    console.log('   ✅ Purchase history recorded')
    console.log('   ✅ Customer can login at /login with email/password')

    // Step 6: Monitoring tips
    console.log('\n6. Monitoring:')
    console.log('   🖥️  Server logs: Check the terminal running `npm run dev`')
    console.log('   📧 Email delivery: Check your email inbox')
    console.log('   🏪 Stripe dashboard: https://dashboard.stripe.com/test/payments')
    console.log('   📊 Supabase: Check users and purchases tables')

    console.log('\n🎯 Ready to test! Complete a test purchase and verify all steps work.')

  } catch (error) {
    console.error('❌ Test setup failed:', error.message)
  }
}

testCompletePurchaseFlow()