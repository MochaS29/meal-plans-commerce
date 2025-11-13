import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function resetStuckJob() {
  const jobId = '401ecaac-a016-4df5-8b16-4ca4d3ae6ac6'

  console.log(`Resetting job ${jobId} to pending status...`)

  const { data, error } = await supabase
    .from('meal_plan_jobs')
    .update({ status: 'pending' })
    .eq('id', jobId)
    .select()

  if (error) {
    console.error('Error resetting job:', error)
    return
  }

  console.log('✅ Job reset to pending status!')
  console.log('The cron job should pick it up within 30 minutes.')
  console.log('\nJob details:', data)
}

resetStuckJob().catch(console.error)
