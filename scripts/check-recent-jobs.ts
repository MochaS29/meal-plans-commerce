import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkJobs() {
  console.log('Checking recent meal plan jobs...\n')

  // Get jobs from last 4 hours
  const fourHoursAgo = new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()

  const { data: jobs, error } = await supabase
    .from('meal_plan_jobs')
    .select('id, customer_email, status, created_at, error_message')
    .gte('created_at', fourHoursAgo)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching jobs:', error)
    return
  }

  console.log(`Found ${jobs.length} jobs from last 4 hours:\n`)

  jobs.forEach(job => {
    console.log(`Job ${job.id}:`)
    console.log(`  Email: ${job.customer_email}`)
    console.log(`  Status: ${job.status}`)
    console.log(`  Created: ${new Date(job.created_at).toLocaleString()}`)
    if (job.error_message) {
      console.log(`  Error: ${job.error_message}`)
    }
    console.log()
  })

  // Also show the email from your purchase
  console.log('\n Looking for jobs with your email...')
  const { data: userJobs } = await supabase
    .from('meal_plan_jobs')
    .select('*')
    .ilike('customer_email', '%mocha%')
    .order('created_at', { ascending: false })
    .limit(5)

  if (userJobs && userJobs.length > 0) {
    console.log(`\nFound ${userJobs.length} jobs for your email:\n`)
    userJobs.forEach(job => {
      console.log(`Job ${job.id}:`)
      console.log(`  Email: ${job.customer_email}`)
      console.log(`  Status: ${job.status}`)
      console.log(`  Created: ${new Date(job.created_at).toLocaleString()}`)
      console.log(`  Diet: ${job.diet_type}`)
      if (job.pdf_url) {
        console.log(`  PDF: ${job.pdf_url}`)
      }
      if (job.error_message) {
        console.log(`  Error: ${job.error_message}`)
      }
      console.log()
    })
  }
}

checkJobs().catch(console.error)
