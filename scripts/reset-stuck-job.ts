import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function resetStuckJob() {
  const jobId = '401ecaac-a016-4df5-8b16-4ca4d3ae6ac6'

  console.log(`Resetting job ${jobId} to pending status with fresh phase data...`)

  const { data, error } = await supabase
    .from('meal_plan_jobs')
    .update({
      status: 'pending',
      current_phase: 1,
      total_phases: 5,
      generated_recipes: [],
      phase_progress: '',
      error_message: null,
      processing_started_at: null,
      completed_at: null
    })
    .eq('id', jobId)
    .select()

  if (error) {
    console.error('Error resetting job:', error)
    return
  }

  console.log('✅ Job reset to pending status with fresh phase data!')
  console.log('📍 Current phase: 1/5')
  console.log('📋 Generated recipes: 0')
  console.log('The cron job should pick it up and start Phase 1.')
  console.log('\nJob details:', data)
}

resetStuckJob().catch(console.error)
