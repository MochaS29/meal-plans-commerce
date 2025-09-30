import OpenAI from 'openai'
import Anthropic from '@anthropic-ai/sdk'
import { supabase } from './supabase'

// Initialize AI clients - prefer Claude if available, fallback to OpenAI
const anthropic = process.env.ANTHROPIC_API_KEY ? new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
}) : null

const openai = !anthropic && process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
}) : null

// Debug logging
if (anthropic) {
  console.log('✅ Claude API initialized')
} else if (openai) {
  console.log('✅ OpenAI API initialized')
} else {
  console.log('⚠️ No AI service configured - will use sample recipes')
}

// Recipe generation parameters
interface RecipeParams {
  dietType: string // mediterranean, keto, vegan, etc.
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  season?: 'spring' | 'summer' | 'fall' | 'winter'
  difficulty?: 'easy' | 'medium' | 'hard'
  servings?: number
  avoidIngredients?: string[]
  preferredIngredients?: string[]
  maxPrepTime?: number // in minutes
}

interface GeneratedRecipe {
  name: string
  description: string
  prep_time: number
  cook_time: number
  servings: number
  difficulty: string
  ingredients: {
    item: string
    amount: string
    unit: string
    notes?: string
  }[]
  instructions: string[]
  nutrition: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
  }
  tags: string[]
}

// Diet-specific constraints
const DIET_CONSTRAINTS = {
  mediterranean: {
    focus: 'olive oil, fish, vegetables, whole grains, legumes',
    avoid: 'processed foods, refined sugars',
    macros: { carbs: 45, protein: 20, fat: 35 }
  },
  keto: {
    focus: 'high fat, moderate protein, very low carb',
    avoid: 'grains, sugar, most fruits, starchy vegetables',
    macros: { carbs: 5, protein: 20, fat: 75 }
  },
  vegan: {
    focus: 'plant-based proteins, vegetables, grains, nuts, seeds',
    avoid: 'all animal products including meat, dairy, eggs, honey',
    macros: { carbs: 55, protein: 15, fat: 30 }
  },
  paleo: {
    focus: 'lean meats, fish, vegetables, fruits, nuts, seeds',
    avoid: 'grains, legumes, dairy, processed foods',
    macros: { carbs: 35, protein: 30, fat: 35 }
  },
  vegetarian: {
    focus: 'vegetables, fruits, grains, dairy, eggs',
    avoid: 'meat, fish, poultry',
    macros: { carbs: 50, protein: 20, fat: 30 }
  }
}

// Generate a single recipe using AI
export async function generateRecipe(params: RecipeParams): Promise<GeneratedRecipe | null> {
  // Try Claude first, then OpenAI, then sample
  if (anthropic) {
    try {
      const dietConstraints = DIET_CONSTRAINTS[params.dietType as keyof typeof DIET_CONSTRAINTS]

      const prompt = `Generate a ${params.dietType} diet ${params.mealType} recipe with the following requirements:

      Diet Focus: ${dietConstraints.focus}
      Must Avoid: ${dietConstraints.avoid}
      Target Macros: ${JSON.stringify(dietConstraints.macros)}
      Meal Type: ${params.mealType}
      Servings: ${params.servings || 4}
      Max Prep Time: ${params.maxPrepTime || 30} minutes
      Difficulty: ${params.difficulty || 'medium'}
      ${params.season ? `Season: ${params.season} (use seasonal ingredients)` : ''}
      ${params.avoidIngredients ? `Avoid these ingredients: ${params.avoidIngredients.join(', ')}` : ''}
      ${params.preferredIngredients ? `Try to include: ${params.preferredIngredients.join(', ')}` : ''}

      Return ONLY a JSON object with this exact structure (no other text):
      {
        "name": "Recipe Name",
        "description": "Brief appealing description",
        "prep_time": 15,
        "cook_time": 30,
        "servings": 4,
        "difficulty": "easy|medium|hard",
        "ingredients": [
          {"item": "ingredient name", "amount": "2", "unit": "cups", "notes": "optional notes"}
        ],
        "instructions": ["Step 1", "Step 2", "Step 3"],
        "nutrition": {
          "calories": 350,
          "protein": 25,
          "carbs": 30,
          "fat": 15,
          "fiber": 8
        },
        "tags": ["gluten-free", "dairy-free", etc]
      }`

      const response = await anthropic.messages.create({
        model: 'claude-3-haiku-20240307', // Using Claude 3 Haiku - fast and reliable
        max_tokens: 2000,
        temperature: 0.8,
        messages: [{
          role: 'user',
          content: `You are a professional chef and nutritionist. Create a recipe that exactly matches these requirements and return ONLY valid JSON:\n\n${prompt}`
        }]
      })

      // Extract JSON from Claude's response
      const content = response.content[0].type === 'text' ? response.content[0].text : ''

      // Try to parse JSON from the response
      let jsonStr = content

      // If response has markdown code blocks, extract the JSON
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/```\s*([\s\S]*?)\s*```/)
      if (jsonMatch) {
        jsonStr = jsonMatch[1]
      }

      const recipe = JSON.parse(jsonStr)
      console.log('✅ Generated recipe with Claude:', recipe.name)
      return recipe as GeneratedRecipe
    } catch (error) {
      console.error('Error generating recipe with Claude:', error)
      // Fall through to OpenAI or sample
    }
  }

  if (openai) {
    try {
      const dietConstraints = DIET_CONSTRAINTS[params.dietType as keyof typeof DIET_CONSTRAINTS]

      const prompt = `Generate a ${params.dietType} diet ${params.mealType} recipe with the following requirements:

      Diet Focus: ${dietConstraints.focus}
      Must Avoid: ${dietConstraints.avoid}
      Target Macros: ${JSON.stringify(dietConstraints.macros)}
      Meal Type: ${params.mealType}
      Servings: ${params.servings || 4}
      Max Prep Time: ${params.maxPrepTime || 30} minutes
      Difficulty: ${params.difficulty || 'medium'}
      ${params.season ? `Season: ${params.season} (use seasonal ingredients)` : ''}
      ${params.avoidIngredients ? `Avoid these ingredients: ${params.avoidIngredients.join(', ')}` : ''}
      ${params.preferredIngredients ? `Try to include: ${params.preferredIngredients.join(', ')}` : ''}

      Return a JSON object with this exact structure:
      {
        "name": "Recipe Name",
        "description": "Brief appealing description",
        "prep_time": 15,
        "cook_time": 30,
        "servings": 4,
        "difficulty": "easy|medium|hard",
        "ingredients": [
          {"item": "ingredient name", "amount": "2", "unit": "cups", "notes": "optional notes"}
        ],
        "instructions": ["Step 1", "Step 2", "Step 3"],
        "nutrition": {
          "calories": 350,
          "protein": 25,
          "carbs": 30,
          "fat": 15,
          "fiber": 8
        },
        "tags": ["gluten-free", "dairy-free", etc]
      }`

      const response = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are a professional chef and nutritionist creating healthy, delicious recipes. Always return valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        response_format: { type: 'json_object' }
      })

      const recipe = JSON.parse(response.choices[0].message.content || '{}')
      console.log('✅ Generated recipe with OpenAI:', recipe.name)
      return recipe as GeneratedRecipe
    } catch (error) {
      console.error('Error generating recipe with OpenAI:', error)
      return generateSampleRecipe(params)
    }
  }

  console.log('No AI configured, using sample recipe')
  return generateSampleRecipe(params)
}

// Generate recipes for an entire week
export async function generateWeeklyMealPlan(
  dietType: string,
  weekNumber: number,
  season?: string
): Promise<{ [key: string]: GeneratedRecipe }> {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  const meals: { [key: string]: GeneratedRecipe } = {}

  for (const day of days) {
    // Generate breakfast
    const breakfast = await generateRecipe({
      dietType,
      mealType: 'breakfast',
      season: season as any,
      difficulty: 'easy',
      maxPrepTime: 20
    })

    // Generate lunch
    const lunch = await generateRecipe({
      dietType,
      mealType: 'lunch',
      season: season as any,
      difficulty: weekNumber % 2 === 0 ? 'medium' : 'easy',
      maxPrepTime: 30
    })

    // Generate dinner
    const dinner = await generateRecipe({
      dietType,
      mealType: 'dinner',
      season: season as any,
      difficulty: 'medium',
      maxPrepTime: 45
    })

    // Generate snack
    const snack = await generateRecipe({
      dietType,
      mealType: 'snack',
      season: season as any,
      difficulty: 'easy',
      maxPrepTime: 10
    })

    if (breakfast) meals[`${day}_breakfast`] = breakfast
    if (lunch) meals[`${day}_lunch`] = lunch
    if (dinner) meals[`${day}_dinner`] = dinner
    if (snack) meals[`${day}_snack`] = snack

    // Add delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  return meals
}

// Save generated recipes to Supabase
export async function saveRecipeToDatabase(recipe: GeneratedRecipe, dietPlanIds: string[]) {
  if (!supabase) {
    console.log('Supabase not configured, skipping save')
    return null
  }

  try {
    // Insert recipe
    const { data: newRecipe, error: recipeError } = await supabase
      .from('recipes')
      .insert({
        name: recipe.name,
        description: recipe.description,
        prep_time: recipe.prep_time,
        cook_time: recipe.cook_time,
        servings: recipe.servings,
        difficulty: recipe.difficulty,
        diet_plans: dietPlanIds
      })
      .select()
      .single()

    if (recipeError) throw recipeError

    // Insert ingredients
    const ingredients = recipe.ingredients.map((ing, index) => ({
      recipe_id: newRecipe.id,
      ingredient: ing.item,
      amount: ing.amount,
      unit: ing.unit,
      notes: ing.notes,
      order_index: index
    }))

    await supabase.from('recipe_ingredients').insert(ingredients)

    // Insert instructions
    const instructions = recipe.instructions.map((inst, index) => ({
      recipe_id: newRecipe.id,
      step_number: index + 1,
      instruction: inst
    }))

    await supabase.from('recipe_instructions').insert(instructions)

    // Insert nutrition
    await supabase.from('recipe_nutrition').insert({
      recipe_id: newRecipe.id,
      calories: recipe.nutrition.calories,
      protein: recipe.nutrition.protein,
      carbs: recipe.nutrition.carbs,
      fat: recipe.nutrition.fat,
      fiber: recipe.nutrition.fiber
    })

    return newRecipe
  } catch (error) {
    console.error('Error saving recipe:', error)
    return null
  }
}

// Generate sample recipe when AI is not available
function generateSampleRecipe(params: RecipeParams): GeneratedRecipe {
  // Multiple sample recipes for variety
  const mediterraneanRecipes: GeneratedRecipe[] = [
    {
      name: 'Greek Yogurt Parfait with Honey and Walnuts',
      description: 'A protein-rich Mediterranean breakfast with creamy yogurt, sweet honey, and crunchy walnuts',
      prep_time: 10,
      cook_time: 0,
      servings: 2,
      difficulty: 'easy',
      ingredients: [
        { item: 'Greek yogurt', amount: '2', unit: 'cups', notes: 'full-fat' },
        { item: 'Honey', amount: '2', unit: 'tablespoons', notes: 'local if possible' },
        { item: 'Walnuts', amount: '1/4', unit: 'cup', notes: 'chopped' },
        { item: 'Fresh berries', amount: '1', unit: 'cup', notes: 'mixed' },
        { item: 'Granola', amount: '1/4', unit: 'cup', notes: 'optional' }
      ],
      instructions: [
        'Divide Greek yogurt between two bowls',
        'Drizzle honey over each serving',
        'Top with chopped walnuts and fresh berries',
        'Add granola if desired for extra crunch'
      ],
      nutrition: {
        calories: 320,
        protein: 18,
        carbs: 35,
        fat: 14,
        fiber: 4
      },
      tags: ['vegetarian', 'gluten-free-option', 'quick', 'no-cook']
    },
    {
      name: 'Mediterranean Shakshuka',
      description: 'Eggs poached in a spiced tomato sauce with feta and herbs',
      prep_time: 15,
      cook_time: 25,
      servings: 4,
      difficulty: 'medium',
      ingredients: [
        { item: 'Eggs', amount: '6', unit: 'large', notes: '' },
        { item: 'Tomatoes', amount: '4', unit: 'cups', notes: 'crushed' },
        { item: 'Onion', amount: '1', unit: 'large', notes: 'diced' },
        { item: 'Bell pepper', amount: '2', unit: 'medium', notes: 'diced' },
        { item: 'Feta cheese', amount: '1/2', unit: 'cup', notes: 'crumbled' },
        { item: 'Olive oil', amount: '3', unit: 'tablespoons', notes: '' }
      ],
      instructions: [
        'Heat olive oil in a large skillet over medium heat',
        'Sauté onion and bell pepper until softened',
        'Add crushed tomatoes and spices, simmer for 10 minutes',
        'Make wells in sauce and crack eggs into them',
        'Cover and cook until eggs are set, top with feta'
      ],
      nutrition: {
        calories: 280,
        protein: 16,
        carbs: 22,
        fat: 15,
        fiber: 5
      },
      tags: ['vegetarian', 'gluten-free']
    }
  ]

  const ketoRecipes: GeneratedRecipe[] = [
    {
      name: 'Cauliflower Rice Bowl with Grilled Chicken',
      description: 'Low-carb bowl with seasoned cauliflower rice and perfectly grilled chicken',
      prep_time: 15,
      cook_time: 25,
      servings: 4,
      difficulty: 'medium',
      ingredients: [
        { item: 'Chicken breast', amount: '1.5', unit: 'pounds', notes: 'boneless, skinless' },
        { item: 'Cauliflower', amount: '1', unit: 'head', notes: 'riced' },
        { item: 'Avocado', amount: '2', unit: 'whole', notes: 'sliced' },
        { item: 'Olive oil', amount: '3', unit: 'tablespoons', notes: '' },
        { item: 'Garlic', amount: '3', unit: 'cloves', notes: 'minced' }
      ],
      instructions: [
        'Season and grill chicken breast until internal temp reaches 165°F',
        'Rice cauliflower in food processor',
        'Sauté cauliflower rice with garlic in olive oil',
        'Slice grilled chicken and serve over cauliflower rice',
        'Top with sliced avocado'
      ],
      nutrition: {
        calories: 380,
        protein: 35,
        carbs: 8,
        fat: 24,
        fiber: 5
      },
      tags: ['keto', 'low-carb', 'gluten-free', 'paleo']
    },
    {
      name: 'Bacon-Wrapped Asparagus',
      description: 'Crispy bacon wrapped around tender asparagus spears',
      prep_time: 10,
      cook_time: 20,
      servings: 4,
      difficulty: 'easy',
      ingredients: [
        { item: 'Asparagus', amount: '1', unit: 'pound', notes: 'trimmed' },
        { item: 'Bacon', amount: '12', unit: 'slices', notes: '' },
        { item: 'Olive oil', amount: '1', unit: 'tablespoon', notes: '' },
        { item: 'Black pepper', amount: '1', unit: 'teaspoon', notes: 'freshly ground' }
      ],
      instructions: [
        'Preheat oven to 400°F',
        'Bundle 3-4 asparagus spears and wrap with bacon',
        'Place on baking sheet and drizzle with olive oil',
        'Bake for 20 minutes until bacon is crispy'
      ],
      nutrition: {
        calories: 220,
        protein: 12,
        carbs: 4,
        fat: 18,
        fiber: 2
      },
      tags: ['keto', 'low-carb', 'gluten-free', 'paleo']
    }
  ]

  // Select recipes based on diet type
  let recipes: GeneratedRecipe[] = []

  if (params.dietType === 'mediterranean') {
    recipes = mediterraneanRecipes
  } else if (params.dietType === 'keto') {
    recipes = ketoRecipes
  } else {
    // Default fallback
    recipes = [...mediterraneanRecipes, ...ketoRecipes]
  }

  // Return a random recipe from the available options
  const randomIndex = Math.floor(Math.random() * recipes.length)
  return recipes[randomIndex]
}

// Bulk generate recipes for multiple months
export async function bulkGenerateRecipes(
  dietType: string,
  monthsToGenerate: number = 12
): Promise<void> {
  console.log(`Starting bulk recipe generation for ${dietType} - ${monthsToGenerate} months`)

  const currentDate = new Date()
  const seasons = ['winter', 'spring', 'summer', 'fall']

  for (let monthOffset = 0; monthOffset < monthsToGenerate; monthOffset++) {
    const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthOffset)
    const month = targetDate.getMonth()
    const year = targetDate.getFullYear()

    // Determine season
    const seasonIndex = Math.floor((month % 12) / 3)
    const season = seasons[seasonIndex]

    console.log(`Generating recipes for ${year}-${month + 1} (${season})`)

    // Generate 4 weeks of recipes
    for (let week = 1; week <= 4; week++) {
      const weeklyMeals = await generateWeeklyMealPlan(dietType, week, season)

      // Save to database
      for (const [key, recipe] of Object.entries(weeklyMeals)) {
        const dietPlanId = await getDietPlanId(dietType)
        if (dietPlanId) {
          await saveRecipeToDatabase(recipe, [dietPlanId])
        }
      }

      console.log(`  Week ${week} complete`)
    }
  }

  console.log('Bulk generation complete!')
}

// Helper to get diet plan ID from slug
async function getDietPlanId(dietType: string): Promise<string | null> {
  if (!supabase) return null

  const { data } = await supabase
    .from('diet_plans')
    .select('id')
    .eq('slug', dietType)
    .single()

  return data?.id || null
}