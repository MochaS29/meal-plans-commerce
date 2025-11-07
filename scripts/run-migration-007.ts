#!/usr/bin/env npx tsx

import { config } from 'dotenv';
config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function runMigration() {
  console.log('🚀 Running migration 007: meal_plan_jobs table\n');

  try {
    // Read the migration file
    const migrationPath = join(process.cwd(), 'supabase/migrations/007_meal_plan_jobs.sql');
    const sql = readFileSync(migrationPath, 'utf-8');

    console.log('📄 Migration SQL:');
    console.log('─'.repeat(60));
    console.log(sql);
    console.log('─'.repeat(60));
    console.log('\n⚠️  Please run this SQL manually in Supabase SQL Editor');
    console.log('   Dashboard → SQL Editor → New Query → Paste → Run\n');
    console.log('   URL: https://supabase.com/dashboard/project/qdiocczbfqfb3rss/sql/new\n');

  } catch (error) {
    console.error('❌ Error reading migration:', error);
    process.exit(1);
  }
}

runMigration();
