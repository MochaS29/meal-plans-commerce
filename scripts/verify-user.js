// Verify user exists and test password
const bcrypt = require('bcryptjs');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function verifyUser() {
  try {
    // Get user from database
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'mokah@me.com')
      .single();

    if (error) {
      console.error('Error finding user:', error);
      return;
    }

    if (!user) {
      console.log('❌ User not found');
      return;
    }

    console.log('✅ User found in database:');
    console.log('- ID:', user.id);
    console.log('- Email:', user.email);
    console.log('- Name:', user.name);
    console.log('- Verified:', user.email_verified);
    console.log('- Stripe ID:', user.stripe_customer_id);

    // Test password
    const testPassword = 'MindfulMeal2025!';
    const passwordMatches = await bcrypt.compare(testPassword, user.password_hash);
    
    console.log('🔒 Password test:', passwordMatches ? '✅ Correct' : '❌ Incorrect');

    // Check purchases
    const { data: purchases, error: purchaseError } = await supabase
      .from('user_purchases')
      .select('*')
      .eq('user_id', user.id);

    if (!purchaseError && purchases) {
      console.log('💳 Purchases:', purchases.length);
      purchases.forEach(p => {
        console.log(`  - ${p.product_name} (${p.diet_plan}) - $${(p.amount/100).toFixed(2)} - ${p.status}`);
      });
    }

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

verifyUser();