// Script to add a test purchase for mokah@me.com
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function addTestPurchase() {
  try {
    // First, get the user
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', 'mokah@me.com')
      .single();

    if (userError) {
      console.error('Error finding user:', userError);
      return;
    }

    if (!userData) {
      console.error('User mokah@me.com not found');
      return;
    }

    console.log('Found user:', userData.id);

    // Add a test purchase to customer_recipes table (store the purchase info)
    const testSessionId = 'cs_test_' + Math.random().toString(36).substring(2, 26);

    const customerData = {
      email: 'mokah@me.com',
      diet_plan: 'mediterranean',
      product_type: 'wellness-transformation',
      purchase_date: new Date().toISOString(),
      stripe_session_id: testSessionId,
      price_paid: 79.00
    };

    const { data: purchaseResult, error: purchaseError } = await supabase
      .from('customer_recipes')
      .insert([customerData])
      .select();

    if (purchaseError) {
      console.error('Error adding purchase:', purchaseError);
      return;
    }

    console.log('\n✅ Test purchase added successfully!');
    console.log('\n📦 Purchase Details:');
    console.log('- Product: 30-Day Wellness Transformation');
    console.log('- Diet Plan: Mediterranean');
    console.log('- Amount: $79.00 CAD');
    console.log('- Status: Completed');
    console.log('- Purchase Date:', new Date(customerData.purchase_date).toLocaleDateString());
    console.log('- Session ID:', testSessionId);

    // Verify the purchase from customer_recipes
    const { data: verification, error: verifyError } = await supabase
      .from('customer_recipes')
      .select('*')
      .eq('email', 'mokah@me.com')
      .order('purchase_date', { ascending: false });

    if (!verifyError && verification) {
      console.log('\n📋 All purchase records for mokah@me.com:');
      verification.forEach(p => {
        console.log(`  - Product: ${p.product_type || 'wellness-transformation'}`);
        console.log(`  - Diet Plan: ${p.diet_plan}`);
        console.log(`  - Amount: $${(p.price_paid || 0).toFixed(2)} CAD`);
        console.log(`  - Purchase Date: ${new Date(p.purchase_date).toLocaleDateString()}`);
        if (p.stripe_session_id) {
          console.log(`  - Session ID: ${p.stripe_session_id}`);
        }
        console.log('  ---');
      });
    }

  } catch (error) {
    console.error('Unexpected error:', error);
  } finally {
    process.exit(0);
  }
}

addTestPurchase();