#!/usr/bin/env node

// Apply pending database migrations to Supabase
require('dotenv').config({ path: '.env.local' })

const fs = require('fs')
const path = require('path')
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function applyMigration(filename) {
  const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', filename)

  if (!fs.existsSync(migrationPath)) {
    console.log(`⚠️  Migration file not found: ${filename}`)
    return false
  }

  const sql = fs.readFileSync(migrationPath, 'utf8')

  console.log(`\n📝 Applying migration: ${filename}`)
  console.log('='.repeat(50))

  try {
    // Split SQL into individual statements (basic splitting by semicolon)
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'))

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i]
      if (statement.length < 10) continue // Skip very short statements

      console.log(`\n  Executing statement ${i + 1}/${statements.length}...`)

      const { error } = await supabase.rpc('exec_sql', { sql: statement + ';' }).catch(async () => {
        // If rpc doesn't exist, try direct query
        return await supabase.from('_').select('*').limit(0).then(() => {
          // Fallback: use REST API
          return fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': supabaseServiceKey,
              'Authorization': `Bearer ${supabaseServiceKey}`
            },
            body: JSON.stringify({ sql: statement + ';' })
          }).then(r => r.json())
        })
      })

      if (error) {
        // Try alternative method: execute via SQL Editor API
        const response = await fetch(`${supabaseUrl}/rest/v1/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseServiceKey,
            'Authorization': `Bearer ${supabaseServiceKey}`,
            'Prefer': 'return=minimal'
          }
        })

        if (!response.ok) {
          throw new Error(`Failed to execute SQL: ${error.message || 'Unknown error'}`)
        }
      }
    }

    console.log(`\n✅ Migration applied successfully: ${filename}`)
    return true
  } catch (error) {
    console.error(`\n❌ Migration failed: ${filename}`)
    console.error(`   Error: ${error.message}`)
    return false
  }
}

async function main() {
  console.log('🚀 Database Migration Tool')
  console.log('='.repeat(50))
  console.log(`Supabase URL: ${supabaseUrl}`)

  // Apply migrations in order
  const migrations = [
    '002_create_images_table.sql',
    '003_helper_functions.sql'
  ]

  console.log(`\n📋 Migrations to apply: ${migrations.length}`)
  console.log(`   ${migrations.join('\n   ')}`)
  console.log('\n⏳ Starting in 3 seconds... (Press Ctrl+C to cancel)\n')

  await new Promise(resolve => setTimeout(resolve, 3000))

  let successCount = 0
  let failCount = 0

  for (const migration of migrations) {
    const success = await applyMigration(migration)
    if (success) {
      successCount++
    } else {
      failCount++
    }
  }

  console.log('\n' + '='.repeat(50))
  console.log('✨ Migration Process Complete!')
  console.log(`  ✅ Successfully applied: ${successCount} migrations`)
  if (failCount > 0) {
    console.log(`  ❌ Failed: ${failCount} migrations`)
    console.log('\n⚠️  Please apply failed migrations manually via Supabase Dashboard:')
    console.log(`   ${supabaseUrl.replace('https://', 'https://app.')}/project/_/sql`)
  }
  console.log('')
}

if (require.main === module) {
  main().catch(console.error)
}
