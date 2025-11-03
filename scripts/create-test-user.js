// Create a test user directly in the database
const bcrypt = require('bcryptjs');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createTestUser() {
  try {
    // Hash the password
    const password = 'MindfulMeal2025!';
    const passwordHash = await bcrypt.hash(password, 12);
    
    // Create user directly
    const { data, error } = await supabase
      .from('users')
      .upsert([
        {
          email: 'mokah@me.com',
          password_hash: passwordHash,
          name: 'Mocha',
          email_verified: true,
          stripe_customer_id: 'cus_test_mokah'
        }
      ], { 
        onConflict: 'email',
        ignoreDuplicates: false 
      })
      .select();

    if (error) {
      console.error('Error creating user:', error);
      return;
    }

    console.log('✅ User created/updated successfully!');
    console.log('📧 Email: mokah@me.com');
    console.log('🔒 Password: MindfulMeal2025!');
    
    // Also create a test purchase
    if (data && data[0]) {
      const { data: purchaseData, error: purchaseError } = await supabase
        .from('user_purchases')
        .upsert([
          {
            user_id: data[0].id,
            stripe_session_id: 'cs_test_mokah_' + Date.now(),
            product_id: 'wellness-transformation',
            product_name: '30-Day Wellness Transformation',
            diet_plan: 'mediterranean',
            amount: 7900,
            status: 'completed'
          }
        ], {
          onConflict: 'stripe_session_id'
        });

      if (purchaseError) {
        console.log('Note: Could not create purchase record:', purchaseError);
      } else {
        console.log('💳 Test purchase added');
      }
    }

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

createTestUser();