#!/usr/bin/env node

/**
 * Run migration 006 - Add meal_type to recipes
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function runMigration() {
  console.log('🔄 Running migration 006: Add meal_type to recipes\n');

  try {
    // Read the migration SQL
    const migrationPath = path.join(process.cwd(), 'supabase', 'migrations', '006_add_meal_type.sql');
    const sql = fs.readFileSync(migrationPath, 'utf-8');

    // Execute each statement separately
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s && !s.startsWith('--') && !s.startsWith('COMMENT'));

    for (const statement of statements) {
      if (statement) {
        console.log('Executing:', statement.substring(0, 80) + '...');
        const { error } = await supabase.rpc('exec_sql', { sql: statement });

        if (error) {
          console.log('⚠️  Note:', error.message);
        } else {
          console.log('✅ Success\n');
        }
      }
    }

    // Verify the column was added
    const { data, error } = await supabase
      .from('recipes')
      .select('id, name, meal_type')
      .limit(1);

    if (error) {
      console.log('❌ Verification failed:', error.message);
      console.log('\nℹ️  The migration SQL has been created at:');
      console.log('   supabase/migrations/006_add_meal_type.sql');
      console.log('\n   You may need to run it manually using Supabase Dashboard:');
      console.log('   1. Go to https://supabase.com/dashboard');
      console.log('   2. Select your project');
      console.log('   3. Go to SQL Editor');
      console.log('   4. Paste the contents of the migration file');
      console.log('   5. Run the query\n');
    } else {
      console.log('✅ Migration successful!');
      console.log(`   meal_type column added to recipes table`);
      console.log(`   Default value: 'any'\n`);
    }

  } catch (error) {
    console.error('❌ Migration error:', error.message);
  }
}

runMigration();
