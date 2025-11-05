#!/usr/bin/env node

/**
 * Categorize existing recipes by meal type using AI analysis
 */

const { createClient } = require('@supabase/supabase-js');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

async function categorizeRecipes() {
  console.log('🤖 Categorizing recipes by meal type using AI...\n');
  console.log('='.repeat(70) + '\n');

  try {
    // Get all recipes
    const { data: recipes, error } = await supabase
      .from('recipes')
      .select('id, name, description, prep_time, recipe_ingredients(ingredient)')
      .order('name');

    if (error || !recipes) {
      console.log('❌ Error fetching recipes:', error?.message);
      return;
    }

    console.log(`📊 Found ${recipes.length} recipes to categorize\n`);

    // Batch categorize using AI
    const batchSize = 20;
    let categorized = 0;
    let breakfast = 0;
    let lunch = 0;
    let dinner = 0;
    let snack = 0;
    let any = 0;

    for (let i = 0; i < recipes.length; i += batchSize) {
      const batch = recipes.slice(i, Math.min(i + batchSize, recipes.length));

      console.log(`Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(recipes.length / batchSize)}...`);

      // Prepare recipe summaries for AI
      const recipeSummaries = batch.map(r => {
        const ingredients = r.recipe_ingredients?.slice(0, 5).map(ing => ing.ingredient).join(', ') || 'N/A';
        return `${r.name} - Ingredients: ${ingredients}`;
      }).join('\n');

      // Ask AI to categorize
      const message = await anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 2000,
        messages: [{
          role: 'user',
          content: `Categorize these recipes by meal type. For each recipe, respond with ONLY the meal type: breakfast, lunch, dinner, or snack.

Rules:
- breakfast: Oatmeal, eggs, breakfast bowls, frittatas, muffins, pancakes, yogurt
- lunch: Sandwiches, wraps, salads, light pasta, soups
- dinner: Hearty mains, salmon, chicken bakes, substantial pasta, grain bowls
- snack: Bites, dips, small portions, finger foods

Recipes:
${recipeSummaries}

Response format (one per line):
breakfast
dinner
snack
etc.`
        }]
      });

      const aiResponse = message.content[0].text.trim().split('\n');

      // Update each recipe
      for (let j = 0; j < batch.length; j++) {
        const recipe = batch[j];
        let mealType = aiResponse[j]?.trim().toLowerCase() || 'any';

        // Validate meal type
        if (!['breakfast', 'lunch', 'dinner', 'snack'].includes(mealType)) {
          mealType = 'any';
        }

        // Update in database
        const { error: updateError } = await supabase
          .from('recipes')
          .update({ meal_type: mealType })
          .eq('id', recipe.id);

        if (!updateError) {
          categorized++;
          if (mealType === 'breakfast') breakfast++;
          else if (mealType === 'lunch') lunch++;
          else if (mealType === 'dinner') dinner++;
          else if (mealType === 'snack') snack++;
          else any++;

          console.log(`   ✅ ${recipe.name.substring(0, 50)}... → ${mealType}`);
        }
      }

      // Rate limiting - wait a bit between batches
      if (i + batchSize < recipes.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    console.log('\n' + '='.repeat(70));
    console.log('\n✅ Categorization Complete!\n');
    console.log('📊 Summary:');
    console.log(`   🌅 Breakfast: ${breakfast} recipes`);
    console.log(`   ☀️  Lunch: ${lunch} recipes`);
    console.log(`   🌙 Dinner: ${dinner} recipes`);
    console.log(`   🍿 Snack: ${snack} recipes`);
    console.log(`   ❓ Any: ${any} recipes`);
    console.log(`   📝 Total: ${categorized} recipes categorized\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

categorizeRecipes();
