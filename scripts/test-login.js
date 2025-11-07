#!/usr/bin/env node

async function testLogin() {
  console.log('🔐 Testing Login Flow...\n')

  const credentials = {
    email: 'mokah@me.com',
    password: 'TestPassword123!'
  }

  try {
    const response = await fetch('http://localhost:3000/api/simple-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    })

    const data = await response.json()

    if (response.ok && data.success) {
      console.log('✅ Login successful!')
      console.log(`   User: ${data.user.email}`)
      console.log(`   Name: ${data.user.name || 'N/A'}`)
      console.log(`   Purchases: ${data.user.purchases?.length || 0}`)

      if (data.user.purchases && data.user.purchases.length > 0) {
        console.log('\n   📦 User Purchases:')
        data.user.purchases.forEach((purchase, i) => {
          console.log(`      ${i+1}. ${purchase.productName}`)
          console.log(`         Diet: ${purchase.dietPlan}`)
          console.log(`         Date: ${new Date(purchase.purchaseDate).toLocaleDateString()}`)
        })
      }

      console.log(`\n   🔄 Redirect: ${data.redirect}`)
      return true
    } else {
      console.log('❌ Login failed!')
      console.log(`   Error: ${data.error || data.message || 'Unknown error'}`)
      if (data.debug) {
        console.log('   Debug info:', data.debug)
      }
      return false
    }
  } catch (error) {
    console.log('❌ Login request failed!')
    console.log(`   Error: ${error.message}`)
    return false
  }
}

testLogin()
