#!/usr/bin/env node

/**
 * Add meal_type column to recipes table using SQL
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Create admin client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function addMealTypeColumn() {
  console.log('🔄 Adding meal_type column to recipes table...\n');

  try {
    // First, test if we can query recipes
    const { data: testData, error: testError } = await supabase
      .from('recipes')
      .select('id')
      .limit(1);

    if (testError) {
      console.log('❌ Error connecting to database:', testError.message);
      return;
    }

    console.log('✅ Connected to database\n');

    // Check if column already exists
    const { data: sample } = await supabase
      .from('recipes')
      .select('*')
      .limit(1)
      .single();

    if (sample && 'meal_type' in sample) {
      console.log('✅ meal_type column already exists!');
      console.log(`   Current value: ${sample.meal_type}\n`);
      return;
    }

    console.log('⚠️  meal_type column does not exist yet.');
    console.log('\n📝 To add the column, please run this SQL in Supabase Dashboard:\n');
    console.log('='.repeat(70));
    console.log(`
-- Add meal_type column to recipes table
ALTER TABLE public.recipes
ADD COLUMN IF NOT EXISTS meal_type TEXT DEFAULT 'any';

-- Add check constraint
ALTER TABLE public.recipes
ADD CONSTRAINT meal_type_check
CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack', 'any'));

-- Create index
CREATE INDEX IF NOT EXISTS idx_recipes_meal_type ON public.recipes(meal_type);
    `.trim());
    console.log('\n' + '='.repeat(70));
    console.log('\n📍 Steps to run in Supabase:');
    console.log('   1. Go to https://supabase.com/dashboard');
    console.log('   2. Select your project');
    console.log('   3. Go to SQL Editor');
    console.log('   4. Copy the SQL above');
    console.log('   5. Paste and run it');
    console.log('   6. Come back and run this script again to verify\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

addMealTypeColumn();
