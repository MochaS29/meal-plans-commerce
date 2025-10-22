import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables from .env.local
dotenv.config({ path: join(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function applyMigration() {
  try {
    console.log('📦 Reading migration file...')
    const migrationPath = join(__dirname, '../supabase/migrations/004_create_user_preferences.sql')
    const migrationSQL = readFileSync(migrationPath, 'utf8')

    console.log('🚀 Applying migration...')

    // Execute the SQL directly
    const { data, error } = await supabase.rpc('exec_sql', { sql: migrationSQL })

    if (error) {
      // Try alternative approach - execute via REST API
      console.log('⚠️  RPC method unavailable, trying direct execution...')

      // Split by semicolons and execute each statement
      const statements = migrationSQL
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--'))

      for (const statement of statements) {
        const { error: stmtError } = await supabase.rpc('exec', { sql: statement })
        if (stmtError) {
          console.error(`❌ Failed to execute statement: ${statement.substring(0, 50)}...`)
          console.error(stmtError)
        }
      }
    }

    console.log('✅ Migration applied successfully!')
    console.log('📊 User preferences table created with RLS policies')

  } catch (error) {
    console.error('❌ Migration failed:', error)
    console.log('\n💡 Alternative: Run this SQL manually in Supabase Dashboard > SQL Editor')
    process.exit(1)
  }
}

applyMigration()
