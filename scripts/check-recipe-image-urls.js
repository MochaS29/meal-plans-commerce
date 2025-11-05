#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkRecipeImageUrls() {
  console.log('🔍 Checking recipe.image_url column...\n');

  const { count: totalRecipes } = await supabase
    .from('recipes')
    .select('*', { count: 'exact', head: true });

  const { count: recipesWithImageUrl } = await supabase
    .from('recipes')
    .select('*', { count: 'exact', head: true })
    .not('image_url', 'is', null);

  console.log(`📊 Recipe Image URLs:`);
  console.log(`   Total recipes: ${totalRecipes}`);
  console.log(`   With image_url: ${recipesWithImageUrl}`);
  console.log(`   Without image_url: ${totalRecipes - recipesWithImageUrl}`);
}

checkRecipeImageUrls().catch(console.error);
