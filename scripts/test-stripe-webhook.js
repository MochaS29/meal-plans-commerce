// Test Stripe webhook integration
require('dotenv').config({ path: '.env.local' })

async function testStripeWebhook() {
  console.log('🧪 Testing Stripe webhook integration...\n')

  // Test 1: Verify webhook endpoint exists
  console.log('1. Testing webhook endpoint accessibility...')

  try {
    const response = await fetch('http://localhost:3004/api/stripe-webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'stripe-signature': 'test-signature'
      },
      body: JSON.stringify({ test: 'webhook' })
    })

    console.log(`   Status: ${response.status}`)
    if (response.status === 400) {
      console.log('   ✅ Webhook endpoint responding (signature verification working)')
    } else {
      console.log('   ❌ Unexpected response')
    }
  } catch (error) {
    console.log('   ❌ Webhook endpoint not accessible:', error.message)
  }

  console.log('\n2. Environment variables check...')
  console.log(`   STRIPE_SECRET_KEY: ${process.env.STRIPE_SECRET_KEY ? '✅ Set' : '❌ Missing'}`)
  console.log(`   STRIPE_WEBHOOK_SECRET: ${process.env.STRIPE_WEBHOOK_SECRET ? '✅ Set' : '❌ Missing'}`)
  console.log(`   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: ${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? '✅ Set' : '❌ Missing'}`)

  console.log('\n3. Webhook configuration guide:')
  console.log('   📋 Stripe Dashboard Steps:')
  console.log('   1. Go to https://dashboard.stripe.com/test/webhooks')
  console.log('   2. Click "Add endpoint"')
  console.log('   3. Enter URL: https://your-ngrok-url.ngrok.io/api/stripe-webhook')
  console.log('   4. Select events: checkout.session.completed')
  console.log('   5. Copy webhook secret to .env.local')

  console.log('\n4. Required events for full functionality:')
  console.log('   ✅ checkout.session.completed - Triggers account creation')
  console.log('   ✅ customer.subscription.created - Handles subscriptions')
  console.log('   ✅ customer.subscription.deleted - Handles cancellations')
  console.log('   ✅ invoice.payment_succeeded - Handles recurring payments')
  console.log('   ✅ invoice.payment_failed - Handles failed payments')

  console.log('\n5. Testing workflow:')
  console.log('   1. Start ngrok: ngrok http 3004')
  console.log('   2. Update webhook URL in Stripe Dashboard')
  console.log('   3. Create test checkout session')
  console.log('   4. Complete test payment')
  console.log('   5. Check webhook receives checkout.session.completed')
  console.log('   6. Verify user account created in Supabase')
  console.log('   7. Confirm emails sent to customer')

  console.log('\n🎯 Next steps:')
  console.log('   1. Set up ngrok for local testing')
  console.log('   2. Create webhook in Stripe Dashboard')
  console.log('   3. Test complete purchase flow')
  console.log('   4. Verify account creation and email delivery')
}

testStripeWebhook()