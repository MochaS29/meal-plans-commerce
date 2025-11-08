import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkDatabase() {
  console.log('🔍 Checking database status...\n')

  try {
    // Get recent jobs
    const { data: jobs, error: jobsError } = await supabase
      .from('meal_plan_jobs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)

    if (jobsError) {
      console.error('❌ Error fetching jobs:', jobsError.message)
    } else {
      console.log(`📋 Recent Meal Plan Jobs (${jobs?.length || 0}):`)
      jobs?.forEach(job => {
        console.log(`  - ${job.id.substring(0, 8)}: ${job.status} | ${job.customer_email} | ${job.diet_type} | Created: ${new Date(job.created_at).toLocaleString()}`)
      })
      console.log()
    }

    // Get recent purchases
    const { data: purchases, error: purchasesError } = await supabase
      .from('purchases')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)

    if (purchasesError) {
      console.error('❌ Error fetching purchases:', purchasesError.message)
    } else {
      console.log(`💳 Recent Purchases (${purchases?.length || 0}):`)
      purchases?.forEach(purchase => {
        console.log(`  - ${purchase.id.substring(0, 8)}: ${purchase.status} | ${purchase.product_name} | $${purchase.amount / 100} | Created: ${new Date(purchase.created_at).toLocaleString()}`)
      })
      console.log()
    }

    // Get recent users
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)

    if (usersError) {
      console.error('❌ Error fetching users:', usersError.message)
    } else {
      console.log(`👥 Recent Users (${users?.length || 0}):`)
      users?.forEach(user => {
        console.log(`  - ${user.id.substring(0, 8)}: ${user.email} | Created: ${new Date(user.created_at).toLocaleString()}`)
      })
      console.log()
    }

    // Summary
    console.log('📊 Summary:')
    console.log(`  Pending jobs: ${jobs?.filter(j => j.status === 'pending').length || 0}`)
    console.log(`  Processing jobs: ${jobs?.filter(j => j.status === 'processing').length || 0}`)
    console.log(`  Completed jobs: ${jobs?.filter(j => j.status === 'completed').length || 0}`)
    console.log(`  Failed jobs: ${jobs?.filter(j => j.status === 'failed').length || 0}`)
  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

checkDatabase()
