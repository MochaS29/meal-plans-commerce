const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function checkJobStatus() {
  const { data, error } = await supabase
    .from('meal_plan_jobs')
    .select('*')
    .eq('id', '401ecaac-a016-4df5-8b16-4ca4d3ae6ac6')
    .single()

  if (error) {
    console.error('Error:', error)
    return
  }

  console.log('\n=== JOB STATUS ===')
  console.log('Status:', data.status)
  console.log('Diet Type:', data.diet_type)
  console.log('Created:', data.created_at)
  console.log('Updated:', data.updated_at)
  console.log('Completed:', data.completed_at || 'Not yet')
  console.log('PDF URL:', data.pdf_url ? '✓ Generated' : '✗ Not yet')
  console.log('Error:', data.error || 'None')
}

checkJobStatus().catch(console.error)
