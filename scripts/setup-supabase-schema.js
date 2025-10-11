// Setup Supabase database schema for user authentication
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

async function setupSupabaseSchema() {
  console.log('🛠️  Setting up Supabase database schema...\n')

  // Initialize Supabase client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase configuration in .env.local')
    console.error('Required: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    console.log('📋 To set up the database schema:')
    console.log('1. Go to your Supabase dashboard: https://supabase.com/dashboard')
    console.log('2. Navigate to your project: https://rnvowqoqqcrimrybuiea.supabase.co')
    console.log('3. Go to SQL Editor in the left sidebar')
    console.log('4. Create a new query and paste the following SQL:')
    console.log('5. Run the query to create all necessary tables\n')

    // Read and display the SQL schema
    const sqlPath = path.join(__dirname, 'setup-database-schema.sql')
    const sql = fs.readFileSync(sqlPath, 'utf8')

    console.log('📝 SQL Schema to run in Supabase:')
    console.log('=' .repeat(80))
    console.log(sql)
    console.log('=' .repeat(80))

    console.log('\n✅ After running this SQL in Supabase, the following will be ready:')
    console.log('   • users table with password authentication')
    console.log('   • user_purchases table for purchase history')
    console.log('   • user_sessions table for session management')
    console.log('   • password_reset_tokens table for password resets')
    console.log('   • email_verification_tokens table for email verification')
    console.log('   • All necessary indexes and triggers')

    console.log('\n🔗 Supabase Dashboard Links:')
    console.log(`   Project: ${supabaseUrl}`)
    console.log('   SQL Editor: https://supabase.com/dashboard/project/rnvowqoqqcrimrybuiea/sql')
    console.log('   Table Editor: https://supabase.com/dashboard/project/rnvowqoqqcrimrybuiea/editor')

    console.log('\n🚀 Next Steps:')
    console.log('   1. Run the SQL schema in Supabase SQL Editor')
    console.log('   2. Test another Stripe purchase to verify webhook works')
    console.log('   3. Check that user account creation and emails work properly')

  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

setupSupabaseSchema()