require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkNutritionData() {
  console.log('🔍 Checking nutrition data...\n');

  // Get total recipes
  const { data: allRecipes, error: recipesError } = await supabase
    .from('recipes')
    .select('id, name')
    .limit(10); // Sample 10 recipes

  if (recipesError) {
    console.error('Error fetching recipes:', recipesError);
    return;
  }

  console.log(`📊 Checking sample of ${allRecipes.length} recipes:\n`);

  for (const recipe of allRecipes) {
    const { data: nutrition, error: nutritionError } = await supabase
      .from('recipe_nutrition')
      .select('*')
      .eq('recipe_id', recipe.id)
      .single();

    const hasImage = recipe.image_url ? '🖼️' : '❌';

    if (nutritionError || !nutrition) {
      console.log(`❌ "${recipe.name}" - NO NUTRITION DATA ${hasImage}`);
    } else {
      console.log(`✅ "${recipe.name}" - Has nutrition (${nutrition.calories} cal, ${nutrition.protein}g protein) ${hasImage} image`);
    }
  }

  // Get totals
  const { count: totalRecipes } = await supabase
    .from('recipes')
    .select('*', { count: 'exact', head: true });

  const { count: recipesWithNutrition } = await supabase
    .from('recipe_nutrition')
    .select('*', { count: 'exact', head: true });

  console.log(`\n📈 Summary:`);
  console.log(`   Total recipes: ${totalRecipes}`);
  console.log(`   Recipes with nutrition: ${recipesWithNutrition}`);
  console.log(`   Missing nutrition: ${totalRecipes - recipesWithNutrition}`);

  if (totalRecipes > recipesWithNutrition) {
    console.log(`\n⚠️  ${totalRecipes - recipesWithNutrition} recipes are missing nutrition data!`);
    console.log(`\n💡 To add nutrition data, run: node scripts/add-nutrition-data.js`);
  } else {
    console.log(`\n✅ All recipes have nutrition data!`);
  }
}

checkNutritionData();
