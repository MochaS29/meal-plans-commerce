import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkRecentPurchase() {
  console.log('🔍 Checking most recent purchase...\n')

  try {
    // Get most recent purchase with full details
    const { data: purchase, error } = await supabase
      .from('purchases')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error) {
      console.error('❌ Error:', error.message)
      return
    }

    console.log('💳 Most Recent Purchase:')
    console.log(JSON.stringify(purchase, null, 2))
    console.log()

    // Check if there's a corresponding job
    if (purchase.stripe_session_id) {
      console.log('🔍 Looking for corresponding job...\n')

      const { data: job, error: jobError } = await supabase
        .from('meal_plan_jobs')
        .select('*')
        .eq('stripe_session_id', purchase.stripe_session_id)
        .single()

      if (jobError) {
        console.log('❌ No job found for this purchase!')
        console.log('Error:', jobError.message)
      } else {
        console.log('✅ Found corresponding job:')
        console.log(JSON.stringify(job, null, 2))
      }
    }
  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

checkRecentPurchase()
