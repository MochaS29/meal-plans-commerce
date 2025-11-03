// Test each step of the login process to find the exact error
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testLoginSteps() {
  const email = 'mokah@me.com';
  const password = 'MindfulMeal2025!';

  console.log('🔍 Testing login process step by step...\n');

  try {
    // Step 1: Get user by email
    console.log('Step 1: Looking up user by email...');
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase())
      .single();

    if (userError) {
      console.error('❌ Step 1 failed - User lookup error:', userError);
      return;
    }

    if (!user) {
      console.error('❌ Step 1 failed - User not found');
      return;
    }

    console.log('✅ Step 1 passed - User found:', user.email);

    // Step 2: Verify password
    console.log('\nStep 2: Verifying password...');
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      console.error('❌ Step 2 failed - Invalid password');
      return;
    }

    console.log('✅ Step 2 passed - Password is correct');

    // Step 3: Get user purchases
    console.log('\nStep 3: Getting user purchases...');
    const { data: purchases, error: purchasesError } = await supabase
      .from('user_purchases')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'completed')
      .order('purchased_at', { ascending: false });

    if (purchasesError) {
      console.error('❌ Step 3 failed - Purchases error:', purchasesError);
      return;
    }

    console.log('✅ Step 3 passed - Found', purchases?.length || 0, 'purchases');

    // Step 4: Check if user_sessions table exists
    console.log('\nStep 4: Checking user_sessions table...');
    const { data: sessionTest, error: sessionError } = await supabase
      .from('user_sessions')
      .select('*')
      .limit(1);

    if (sessionError) {
      console.error('❌ Step 4 failed - user_sessions table missing or error:', sessionError);
      console.log('🔧 This is likely the issue! Need to create user_sessions table.');
      return;
    }

    console.log('✅ Step 4 passed - user_sessions table exists');

    // Step 5: Test creating user session object
    console.log('\nStep 5: Creating user session object...');
    const userSession = {
      id: user.id,
      email: user.email,
      name: user.name,
      stripeCustomerId: user.stripe_customer_id,
      emailVerified: user.email_verified,
      purchases: purchases?.map(p => ({
        productId: p.product_id,
        productName: p.product_name,
        purchaseDate: p.purchased_at,
        dietPlan: p.diet_plan,
        status: p.status,
        expiresAt: p.expires_at
      })) || []
    };

    console.log('✅ Step 5 passed - User session object created');
    console.log('📦 Purchases available:', userSession.purchases.length);

    console.log('\n🎉 All login steps working! The issue is elsewhere.');
    console.log('🔍 Next: Check JWT_SECRET and environment variables.');

  } catch (error) {
    console.error('💥 Unexpected error in login test:', error);
  }
}

testLoginSteps();