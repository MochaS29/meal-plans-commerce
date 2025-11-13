const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function runMigration() {
  console.log('📦 Adding multi-phase support to meal_plan_jobs table...\n')

  // We'll add the columns one by one using direct Supabase queries
  // Note: We can't run ALTER TABLE through the REST API, but we can update records

  // First, let's check if we can update a job to add the new fields
  const { data: jobs, error: fetchError } = await supabase
    .from('meal_plan_jobs')
    .select('*')
    .limit(1)

  if (fetchError) {
    console.error('Error fetching jobs:', fetchError)
    return
  }

  console.log('Current job schema:')
  if (jobs && jobs.length > 0) {
    console.log(Object.keys(jobs[0]))
  }

  console.log('\n⚠️  To add columns to the database, please run the following SQL in Supabase SQL Editor:')
  console.log('\n' + '='.repeat(80))
  console.log(`
ALTER TABLE meal_plan_jobs
ADD COLUMN IF NOT EXISTS current_phase INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS total_phases INTEGER DEFAULT 5,
ADD COLUMN IF NOT EXISTS generated_recipes JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS phase_progress TEXT DEFAULT '';

UPDATE meal_plan_jobs
SET current_phase = 1,
    total_phases = 5,
    generated_recipes = '[]'::jsonb
WHERE current_phase IS NULL;
  `)
  console.log('='.repeat(80))
  console.log('\n💡 Open Supabase SQL Editor: https://supabase.com/dashboard/project/iilutvqkqgrssnvwpjij/sql')
}

runMigration().catch(console.error)
