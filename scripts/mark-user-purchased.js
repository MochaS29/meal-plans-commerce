// Simple script to mark mokah@me.com as having purchased the Mediterranean plan
// This simulates a successful purchase for testing purposes

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function markUserPurchased() {
  try {
    // Update the user's Stripe customer ID (simulating they've made a purchase)
    const { data: userData, error: userError } = await supabase
      .from('users')
      .update({
        stripe_customer_id: 'cus_test_' + Math.random().toString(36).substring(2, 15)
      })
      .eq('email', 'mokah@me.com')
      .select();

    if (userError) {
      console.error('Error updating user:', userError);
      return;
    }

    console.log('\n✅ Successfully marked your account as having made a purchase!');
    console.log('\n📦 Simulated Purchase Details:');
    console.log('- Email: mokah@me.com');
    console.log('- Product: 30-Day Wellness Transformation');
    console.log('- Diet Plan: Mediterranean');
    console.log('- Amount: $79.00 CAD');
    console.log('- Status: Active');
    console.log('- Access: You now have full access to Mediterranean diet recipes');

    if (userData && userData[0]) {
      console.log('- User ID:', userData[0].id);
      console.log('- Stripe Customer ID:', userData[0].stripe_customer_id);
    }

    console.log('\n🎉 You can now:');
    console.log('  • Access all Mediterranean diet recipes');
    console.log('  • Download your meal calendar PDF');
    console.log('  • Generate shopping lists');
    console.log('  • View your dashboard at https://mindfulmealplan.com/dashboard');

  } catch (error) {
    console.error('Unexpected error:', error);
  } finally {
    process.exit(0);
  }
}

markUserPurchased();