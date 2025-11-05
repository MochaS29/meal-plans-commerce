import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Advanced recipe matching functions
function calculateAdvancedSimilarityScore(original: string, candidate: string, ingredients: any[]): number {
  const originalLower = original.toLowerCase();
  const candidateLower = candidate.toLowerCase();
  const originalWords = originalLower.split(/\s+/);
  const candidateWords = candidateLower.split(/\s+/);
  
  let score = 0;
  
  // 1. Direct word matching (high value)
  for (const word of originalWords) {
    if (word.length > 2) { // Ignore short words like "and", "of", etc.
      if (candidateWords.some(cWord => cWord.includes(word) || word.includes(cWord))) {
        score += 3;
      }
    }
  }
  
  // 2. Key ingredient matching (very high value)
  const keyIngredients = ['avocado', 'feta', 'oats', 'yogurt', 'chicken', 'salmon', 'quinoa', 'chickpea', 'lentil', 'beef', 'lamb', 'egg', 'spinach', 'toast'];
  for (const ingredient of keyIngredients) {
    if (originalLower.includes(ingredient)) {
      if (candidateLower.includes(ingredient)) {
        score += 5; // Exact ingredient match
      } else if (ingredients?.some((ing: any) => ing.ingredient?.toLowerCase().includes(ingredient))) {
        score += 4; // Ingredient in recipe ingredients
      }
    }
  }
  
  // 3. Cuisine type matching
  const cuisineTypes = ['mediterranean', 'greek', 'moroccan', 'turkish', 'italian', 'spanish'];
  for (const cuisine of cuisineTypes) {
    if (originalLower.includes(cuisine) && candidateLower.includes(cuisine)) {
      score += 2;
    }
  }
  
  // 4. Cooking method matching
  const cookingMethods = ['grilled', 'roasted', 'baked', 'fried', 'sauteed', 'overnight', 'poached'];
  for (const method of cookingMethods) {
    if (originalLower.includes(method) && candidateLower.includes(method)) {
      score += 2;
    }
  }
  
  // 5. Food category matching
  if (originalLower.includes('salad') && candidateLower.includes('salad')) score += 3;
  if (originalLower.includes('soup') && candidateLower.includes('soup')) score += 3;
  if (originalLower.includes('toast') && candidateLower.includes('toast')) score += 3;
  if (originalLower.includes('bowl') && candidateLower.includes('bowl')) score += 2;
  if (originalLower.includes('platter') && candidateLower.includes('platter')) score += 2;
  
  return score;
}

function findBestMatchFromAll(originalName: string, recipes: any[]): any {
  // Enhanced scoring for comprehensive matching
  const scoredRecipes = recipes.map(recipe => ({
    ...recipe,
    score: calculateAdvancedSimilarityScore(originalName, recipe.name, recipe.recipe_ingredients)
  }));

  // Sort by score (highest first) and return the best match if score is above threshold
  scoredRecipes.sort((a, b) => b.score - a.score);
  const bestMatch = scoredRecipes[0];
  
  // Only return if we have a reasonable match (score > 1)
  return bestMatch && bestMatch.score > 1 ? bestMatch : null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  console.log('=== Recipe API Route Called ===')
  console.log('Request URL:', request.url)
  
  try {
    const { name } = await params
    const recipeName = decodeURIComponent(name)
    
    console.log('Decoded recipe name:', recipeName)
    console.log('Recipe name length:', recipeName.length)
    
    if (!recipeName) {
      console.error('No recipe name provided')
      return NextResponse.json(
        { error: 'Recipe name is required' },
        { status: 400 }
      )
    }

    // Connect to Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Database configuration missing' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Search for recipe by name (case-insensitive, partial match)
    const { data: recipes, error: recipeError } = await supabase
      .from('recipes')
      .select(`
        *,
        recipe_ingredients (
          id,
          ingredient,
          amount,
          unit,
          notes,
          order_index
        ),
        recipe_instructions (
          id,
          step_number,
          instruction
        ),
        recipe_nutrition (
          id,
          calories,
          protein,
          carbs,
          fat,
          fiber
        )
      `)
      .ilike('name', `%${recipeName}%`)
      .order('created_at', { ascending: false })

    if (recipeError) {
      console.error('Recipe fetch error:', recipeError)
      return NextResponse.json(
        { error: 'Failed to fetch recipe' },
        { status: 500 }
      )
    }

    if (!recipes || recipes.length === 0) {
      // Try advanced matching by getting all recipes and using comprehensive scoring
      const { data: allRecipes, error: allError } = await supabase
        .from('recipes')
        .select(`
          *,
          recipe_ingredients (
            id,
            ingredient,
            amount,
            unit,
            notes,
            order_index
          ),
          recipe_instructions (
            id,
            step_number,
            instruction
          ),
          recipe_nutrition (
            id,
            calories,
            protein,
            carbs,
            fat,
            fiber
          )
        `)
        .order('created_at', { ascending: false });

      if (!allError && allRecipes && allRecipes.length > 0) {
        console.log(`Trying advanced matching for "${recipeName}" against ${allRecipes.length} recipes`);
        
        // Find best match using comprehensive scoring
        const bestMatch = findBestMatchFromAll(recipeName, allRecipes);
        if (bestMatch && bestMatch.score > 1) {
          console.log(`Advanced match found: "${bestMatch.name}" (score: ${bestMatch.score}) for "${recipeName}"`);
          
          // Sort ingredients and instructions
          if (bestMatch.recipe_ingredients) {
            bestMatch.recipe_ingredients.sort((a: any, b: any) => 
              (a.order_index || 0) - (b.order_index || 0)
            );
          }

          if (bestMatch.recipe_instructions) {
            bestMatch.recipe_instructions.sort((a: any, b: any) => 
              a.step_number - b.step_number
            );
          }

          return NextResponse.json(bestMatch);
        }
      }

      console.log(`No recipe found for: ${recipeName}`);
      return NextResponse.json(
        { error: 'Recipe not found' },
        { status: 404 }
      )
    }

    // Get the best match (exact or closest)
    const recipe = recipes[0]

    // Sort ingredients by order_index
    if (recipe.recipe_ingredients) {
      recipe.recipe_ingredients.sort((a: any, b: any) => 
        (a.order_index || 0) - (b.order_index || 0)
      )
    }

    // Sort instructions by step_number
    if (recipe.recipe_instructions) {
      recipe.recipe_instructions.sort((a: any, b: any) => 
        a.step_number - b.step_number
      )
    }

    return NextResponse.json(recipe)
  } catch (error) {
    console.error('Recipe API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}