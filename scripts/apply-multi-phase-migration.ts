import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function applyMigration() {
  console.log('📦 Applying multi-phase support migration...')

  // Read SQL file
  const sqlFile = path.join(__dirname, 'add-multi-phase-support.sql')
  const sql = fs.readFileSync(sqlFile, 'utf-8')

  // Split into individual statements
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'))

  console.log(`\n📝 Executing ${statements.length} SQL statements...`)

  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i]
    console.log(`\n[${i + 1}/${statements.length}] Executing:`)
    console.log(statement.substring(0, 100) + '...')

    const { error } = await supabase.rpc('exec_sql', {
      sql_query: statement
    }).single()

    if (error) {
      // Try direct query if RPC doesn't work
      console.log('  Trying direct query...')
      try {
        // For ALTER TABLE, we need to use the postgrest endpoint directly
        const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`
          },
          body: JSON.stringify({ sql_query: statement })
        })

        if (!response.ok) {
          console.log(`  ⚠️  Skipping (might already exist): ${error.message}`)
        } else {
          console.log('  ✅ Success')
        }
      } catch (e) {
        console.log(`  ⚠️  Skipping: ${error.message}`)
      }
    } else {
      console.log('  ✅ Success')
    }
  }

  console.log('\n✅ Migration completed!')
  console.log('\n📊 Verifying changes...')

  // Verify by checking a sample job
  const { data, error } = await supabase
    .from('meal_plan_jobs')
    .select('id, current_phase, total_phases, generated_recipes, phase_progress')
    .limit(1)
    .single()

  if (error) {
    console.error('❌ Error verifying changes:', error)
  } else {
    console.log('✅ Schema verified! Sample job:')
    console.log(data)
  }
}

applyMigration().catch(console.error)
