import { UserPreferences } from '@/app/api/user/preferences/route'

export interface Recipe {
  id: string
  name: string
  description?: string
  prep_time?: number
  cook_time?: number
  servings?: number
  difficulty?: string
  diet_plans?: string[]
  ingredients?: { ingredient: string }[]
  nutrition?: {
    calories?: number
    protein?: number
    carbs?: number
    fat?: number
  }
}

export interface FilteredRecipe extends Recipe {
  matchScore: number
  matchReasons: string[]
  warnings: string[]
}

/**
 * Filter and score recipes based on user preferences
 */
export function filterAndScoreRecipes(
  recipes: Recipe[],
  preferences: UserPreferences
): FilteredRecipe[] {
  const scored = recipes
    .map(recipe => scoreRecipe(recipe, preferences))
    .filter(scored => scored.matchScore > 0) // Remove completely incompatible recipes
    .sort((a, b) => b.matchScore - a.matchScore) // Sort by best match first

  return scored
}

/**
 * Score a single recipe against user preferences
 * Returns a score from 0-100 where 100 is a perfect match
 */
function scoreRecipe(recipe: Recipe, preferences: UserPreferences): FilteredRecipe {
  let score = 50 // Base score
  const matchReasons: string[] = []
  const warnings: string[] = []

  // HARD FILTERS - These can disqualify a recipe entirely

  // Check for allergens
  if (preferences.allergies && preferences.allergies.length > 0) {
    const hasAllergen = checkForAllergens(recipe, preferences.allergies)
    if (hasAllergen) {
      score = 0
      warnings.push(`Contains allergen: ${hasAllergen}`)
      return { ...recipe, matchScore: score, matchReasons, warnings }
    }
  }

  // Check for disliked ingredients - HARD FILTER (same as allergens)
  if (preferences.dislikes && preferences.dislikes.length > 0) {
    const hasDislike = checkForIngredients(recipe, preferences.dislikes)
    if (hasDislike) {
      score = 0
      warnings.push(`Contains disliked ingredient: ${hasDislike}`)
      return { ...recipe, matchScore: score, matchReasons, warnings }
    }
  }

  // Check dietary restrictions
  if (preferences.dietary_restrictions && preferences.dietary_restrictions.length > 0) {
    const compatible = checkDietaryCompatibility(recipe, preferences.dietary_restrictions)
    if (!compatible.isCompatible) {
      score = 0
      warnings.push(compatible.reason || 'Not compatible with dietary restrictions')
      return { ...recipe, matchScore: score, matchReasons, warnings }
    }
  }

  // SOFT SCORING - These improve the match score

  // Cooking time preference
  if (preferences.max_prep_time && recipe.prep_time) {
    if (recipe.prep_time <= preferences.max_prep_time) {
      score += 15
      matchReasons.push(`Quick prep (${recipe.prep_time} min)`)
    } else {
      score -= 10
      warnings.push(`Prep time exceeds preference (${recipe.prep_time} min)`)
    }
  }

  // Skill level match
  if (preferences.cooking_skill_level && recipe.difficulty) {
    const skillScore = scoreSkillMatch(preferences.cooking_skill_level, recipe.difficulty)
    score += skillScore
    if (skillScore > 0) {
      matchReasons.push(`Matches skill level: ${recipe.difficulty}`)
    }
  }

  // Servings match (adjust for family size)
  if (recipe.servings && preferences.servings_preference) {
    const servingsDiff = Math.abs(recipe.servings - preferences.servings_preference)
    if (servingsDiff === 0) {
      score += 10
      matchReasons.push(`Perfect serving size (${recipe.servings})`)
    } else if (servingsDiff <= 2) {
      score += 5
      matchReasons.push(`Good serving size (${recipe.servings})`)
    }
  }

  // Nutrition goals
  if (preferences.nutrition_goals && preferences.nutrition_goals.length > 0 && recipe.nutrition) {
    const nutritionScore = scoreNutritionMatch(recipe.nutrition, preferences)
    score += nutritionScore
    if (nutritionScore > 0) {
      matchReasons.push('Aligns with nutrition goals')
    }
  }

  // Cuisine preference
  if (preferences.preferred_cuisines && preferences.preferred_cuisines.length > 0 && recipe.diet_plans) {
    const hasPrefCuisine = preferences.preferred_cuisines.some(cuisine =>
      recipe.diet_plans?.includes(cuisine)
    )
    if (hasPrefCuisine) {
      score += 10
      matchReasons.push('Matches preferred cuisine')
    }
  }

  // Kid-friendly requirement
  if (preferences.kid_friendly_required && preferences.has_kids) {
    // Simple heuristic: kid-friendly recipes tend to be simpler and not too spicy
    const isKidFriendly = checkKidFriendly(recipe)
    if (isKidFriendly) {
      score += 10
      matchReasons.push('Kid-friendly')
    } else {
      score -= 15
      warnings.push('May not be kid-friendly')
    }
  }

  // Batch cooking preference
  if (preferences.batch_cooking_preference) {
    if (recipe.servings && recipe.servings >= 6) {
      score += 8
      matchReasons.push('Great for batch cooking')
    }
  }

  // Ensure score stays within 0-100 range
  score = Math.max(0, Math.min(100, score))

  return {
    ...recipe,
    matchScore: Math.round(score),
    matchReasons,
    warnings
  }
}

/**
 * Check if recipe contains any allergens
 */
function checkForAllergens(recipe: Recipe, allergens: string[]): string | null {
  if (!recipe.ingredients || !allergens.length) return null

  const ingredientNames = recipe.ingredients.map(i => i.ingredient.toLowerCase())

  for (const allergen of allergens) {
    const allergenLower = allergen.toLowerCase()
    const found = ingredientNames.find(ing =>
      ing.includes(allergenLower) ||
      // Common allergen variations
      (allergenLower === 'dairy' && (ing.includes('milk') || ing.includes('cheese') || ing.includes('butter') || ing.includes('cream'))) ||
      (allergenLower === 'gluten' && (ing.includes('wheat') || ing.includes('flour') || ing.includes('bread'))) ||
      (allergenLower === 'nuts' && (ing.includes('almond') || ing.includes('walnut') || ing.includes('pecan') || ing.includes('cashew')))
    )
    if (found) return allergen
  }

  return null
}

/**
 * Check if recipe contains disliked ingredients
 */
function checkForIngredients(recipe: Recipe, ingredients: string[]): string | null {
  if (!recipe.ingredients || !ingredients.length) return null

  const ingredientNames = recipe.ingredients.map(i => i.ingredient.toLowerCase())

  for (const dislike of ingredients) {
    const dislikeLower = dislike.toLowerCase()

    // Check for exact match or substring match
    const found = ingredientNames.find(ing => {
      // Direct substring match
      if (ing.includes(dislikeLower)) return true

      // Handle common variations
      if (dislikeLower === 'pepper' || dislikeLower === 'peppers') {
        // Match bell pepper, red pepper, green pepper, etc. but NOT peppercorn
        return (ing.includes('pepper') && !ing.includes('peppercorn'))
      }

      if (dislikeLower === 'mushroom' || dislikeLower === 'mushrooms') {
        return ing.includes('mushroom')
      }

      if (dislikeLower === 'onion' || dislikeLower === 'onions') {
        return ing.includes('onion')
      }

      if (dislikeLower === 'tomato' || dislikeLower === 'tomatoes') {
        return ing.includes('tomato')
      }

      if (dislikeLower === 'olive' || dislikeLower === 'olives') {
        return ing.includes('olive') && !ing.includes('olive oil') // Allow olive oil
      }

      return false
    })

    if (found) return dislike
  }

  return null
}

/**
 * Check if recipe is compatible with dietary restrictions
 */
function checkDietaryCompatibility(
  recipe: Recipe,
  restrictions: string[]
): { isCompatible: boolean; reason?: string } {
  // This would be more sophisticated in production with a proper taxonomy
  // For now, checking against common patterns

  for (const restriction of restrictions) {
    const lower = restriction.toLowerCase()

    if (lower.includes('vegetarian')) {
      const hasMeat = recipe.ingredients?.some(i =>
        ['chicken', 'beef', 'pork', 'fish', 'meat'].some(m =>
          i.ingredient.toLowerCase().includes(m)
        )
      )
      if (hasMeat) {
        return { isCompatible: false, reason: 'Contains meat (not vegetarian)' }
      }
    }

    if (lower.includes('vegan')) {
      const hasAnimal = recipe.ingredients?.some(i =>
        ['chicken', 'beef', 'pork', 'fish', 'meat', 'milk', 'cheese', 'egg', 'butter', 'cream', 'honey'].some(m =>
          i.ingredient.toLowerCase().includes(m)
        )
      )
      if (hasAnimal) {
        return { isCompatible: false, reason: 'Contains animal products (not vegan)' }
      }
    }
  }

  return { isCompatible: true }
}

/**
 * Score how well a recipe's difficulty matches user's skill level
 */
function scoreSkillMatch(userLevel: string, recipeDifficulty: string): number {
  const skillLevels = ['beginner', 'intermediate', 'advanced']
  const userIndex = skillLevels.indexOf(userLevel.toLowerCase())
  const recipeIndex = skillLevels.indexOf(recipeDifficulty.toLowerCase())

  if (userIndex === -1 || recipeIndex === -1) return 0

  // Perfect match
  if (userIndex === recipeIndex) return 10

  // One level below (easier for user) - still good
  if (recipeIndex < userIndex) return 5

  // One level above (challenging but doable)
  if (recipeIndex === userIndex + 1) return 3

  // Too difficult
  return -10
}

/**
 * Score how well recipe nutrition matches user's goals
 */
function scoreNutritionMatch(
  nutrition: { calories?: number; protein?: number; carbs?: number; fat?: number },
  preferences: UserPreferences
): number {
  let score = 0

  // Check calorie target
  if (preferences.calorie_target && nutrition.calories) {
    const caloriePerServing = nutrition.calories
    const targetPerMeal = preferences.calorie_target / 3 // Rough estimate for one meal
    const diff = Math.abs(caloriePerServing - targetPerMeal)

    if (diff < targetPerMeal * 0.2) { // Within 20%
      score += 10
    } else if (diff < targetPerMeal * 0.4) { // Within 40%
      score += 5
    }
  }

  // Check protein priority
  if (preferences.protein_priority && nutrition.protein) {
    if (nutrition.protein >= 25) { // High protein
      score += 10
    } else if (nutrition.protein >= 15) { // Moderate protein
      score += 5
    }
  }

  return score
}

/**
 * Simple heuristic to determine if a recipe is kid-friendly
 */
function checkKidFriendly(recipe: Recipe): boolean {
  // Kid-friendly indicators:
  // - Not too complex (beginner/intermediate)
  // - Familiar ingredients
  // - Not too spicy

  const difficulty = recipe.difficulty?.toLowerCase() || ''
  if (difficulty === 'advanced') return false

  // Check for kid-friendly keywords in name/description
  const text = `${recipe.name} ${recipe.description || ''}`.toLowerCase()
  const kidFriendlyKeywords = ['kid', 'family', 'children', 'simple', 'classic', 'traditional']
  const hasKidFriendly = kidFriendlyKeywords.some(kw => text.includes(kw))

  // Check for potentially problematic ingredients
  const problematicIngredients = ['hot pepper', 'chili', 'spicy', 'curry', 'anchov']
  const hasProblematic = recipe.ingredients?.some(i =>
    problematicIngredients.some(p => i.ingredient.toLowerCase().includes(p))
  )

  return hasKidFriendly || (!hasProblematic && difficulty !== 'advanced')
}

/**
 * Get recipes that match user preferences from database
 */
export async function getMatchedRecipes(
  supabase: any,
  userId: string,
  limit: number = 50
): Promise<FilteredRecipe[]> {
  // Get user preferences
  const { data: preferences, error: prefError } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (prefError || !preferences) {
    // No preferences, return unfiltered recipes
    const { data: recipes } = await supabase
      .from('recipes')
      .select(`
        *,
        ingredients:recipe_ingredients(ingredient),
        nutrition:recipe_nutrition(calories, protein, carbs, fat)
      `)
      .limit(limit)

    return recipes || []
  }

  // Get all recipes with their details
  const { data: recipes, error: recipeError } = await supabase
    .from('recipes')
    .select(`
      *,
      ingredients:recipe_ingredients(ingredient),
      nutrition:recipe_nutrition(calories, protein, carbs, fat)
    `)
    .limit(200) // Get more recipes for better filtering

  if (recipeError || !recipes) {
    return []
  }

  // Filter and score
  const filtered = filterAndScoreRecipes(recipes, preferences)

  // Return top matches
  return filtered.slice(0, limit)
}
