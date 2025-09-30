import { supabase } from './supabase'

// Fetch meal plan data from Supabase
export async function getMealPlanData(dietPlanSlug: string, year: number, month: number) {
  if (!supabase) {
    // Return sample data if Supabase not configured
    return getSampleMealPlan(dietPlanSlug)
  }

  try {
    // Get diet plan
    const { data: dietPlan } = await supabase
      .from('diet_plans')
      .select('*')
      .eq('slug', dietPlanSlug)
      .single()

    if (!dietPlan) {
      return getSampleMealPlan(dietPlanSlug)
    }

    // Get meal plan for the month
    const { data: mealPlans } = await supabase
      .from('meal_plans')
      .select(`
        *,
        daily_meals (
          *,
          breakfast:recipes!breakfast_recipe_id (*),
          lunch:recipes!lunch_recipe_id (*),
          dinner:recipes!dinner_recipe_id (*),
          snack:recipes!snack_recipe_id (*)
        ),
        shopping_lists (
          *,
          shopping_list_items (*)
        ),
        meal_prep_guides (*)
      `)
      .eq('diet_plan_id', dietPlan.id)
      .eq('year', year)
      .eq('month', month)
      .order('week_number')

    if (!mealPlans || mealPlans.length === 0) {
      return getSampleMealPlan(dietPlanSlug)
    }

    // Transform data into the format our PDF generator expects
    return transformMealPlanData(dietPlan, mealPlans)
  } catch (error) {
    console.error('Error fetching meal plan:', error)
    return getSampleMealPlan(dietPlanSlug)
  }
}

// Transform Supabase data to our format
function transformMealPlanData(dietPlan: any, mealPlans: any[]) {
  const dailyMeals: any = {}
  const weeklyShoppingLists: any = {}
  const mealPrepGuides: any = {}

  mealPlans.forEach(plan => {
    const weekKey = `week${plan.week_number}`

    // Transform daily meals
    dailyMeals[weekKey] = {}
    plan.daily_meals.forEach((day: any) => {
      const dayName = getDayName(day.day_of_week).toLowerCase()
      dailyMeals[weekKey][dayName] = {
        breakfast: day.breakfast?.name || 'Healthy Breakfast',
        lunch: day.lunch?.name || 'Nutritious Lunch',
        dinner: day.dinner?.name || 'Wholesome Dinner',
        snack: day.snack?.name || 'Fresh Fruit'
      }
    })

    // Transform shopping lists
    if (plan.shopping_lists && plan.shopping_lists.length > 0) {
      weeklyShoppingLists[weekKey] = plan.shopping_lists[0].shopping_list_items.map((item: any) =>
        `${item.quantity ? item.quantity + ' ' : ''}${item.item}`
      )
    }

    // Transform meal prep guides
    if (plan.meal_prep_guides && plan.meal_prep_guides.length > 0) {
      plan.meal_prep_guides.forEach((guide: any) => {
        const dayKey = guide.day_name.toLowerCase()
        mealPrepGuides[dayKey] = guide.prep_tasks
      })
    }
  })

  return {
    menuType: dietPlan.name,
    month: mealPlans[0].month,
    year: mealPlans[0].year,
    dailyMeals,
    weeklyShoppingLists,
    nutritionTargets: {
      calories: 2000,
      protein: 75,
      carbs: 225,
      fat: 75,
      fiber: 35
    },
    mealPrepGuides
  }
}

function getDayName(dayNumber: number): string {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  return days[dayNumber - 1] || 'Monday'
}

// Fallback sample data when database is not available
function getSampleMealPlan(dietPlanSlug: string) {
  const samplePlans: any = {
    'mediterranean': {
      menuType: 'Mediterranean Diet',
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      dailyMeals: {
        week1: {
          monday: {
            breakfast: 'Greek Yogurt Parfait with Honey and Walnuts',
            lunch: 'Mediterranean Quinoa Bowl with Feta',
            dinner: 'Grilled Salmon with Lemon and Herbs',
            snack: 'Fresh fruits and almonds'
          },
          tuesday: {
            breakfast: 'Whole Grain Toast with Avocado and Tomato',
            lunch: 'Greek Salad with Chickpeas',
            dinner: 'Chicken Souvlaki with Tzatziki',
            snack: 'Hummus with vegetables'
          },
          wednesday: {
            breakfast: 'Overnight Oats with Berries and Seeds',
            lunch: 'Lentil Soup with Whole Grain Bread',
            dinner: 'Baked Cod with Roasted Vegetables',
            snack: 'Mixed nuts and dried fruits'
          },
          thursday: {
            breakfast: 'Scrambled Eggs with Spinach and Feta',
            lunch: 'Falafel Wrap with Tahini Sauce',
            dinner: 'Eggplant Moussaka',
            snack: 'Greek yogurt with honey'
          },
          friday: {
            breakfast: 'Smoothie Bowl with Fruits and Granola',
            lunch: 'Tabbouleh Salad with Grilled Halloumi',
            dinner: 'Shrimp Pasta with Garlic and Olive Oil',
            snack: 'Dates and walnuts'
          }
        }
      },
      weeklyShoppingLists: {
        week1: [
          '2 containers Greek yogurt',
          '1 jar honey',
          '1 bag walnuts',
          '2 lbs quinoa',
          'Assorted fresh vegetables',
          '4 salmon fillets',
          '6 lemons',
          'Fresh herbs (basil, oregano, parsley)',
          '1 bottle olive oil',
          '1 block feta cheese'
        ]
      },
      nutritionTargets: {
        calories: 2000,
        protein: 75,
        carbs: 225,
        fat: 75,
        fiber: 35
      },
      mealPrepGuides: {
        sunday: [
          'Cook quinoa for the week',
          'Prep vegetables for salads',
          'Make hummus and tzatziki',
          'Marinate chicken for souvlaki',
          'Prepare overnight oats'
        ]
      }
    },
    'keto': {
      menuType: 'Keto Diet',
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      dailyMeals: {
        week1: {
          monday: {
            breakfast: 'Scrambled Eggs with Avocado and Bacon',
            lunch: 'Cauliflower Rice Bowl with Grilled Chicken',
            dinner: 'Ribeye Steak with Butter and Asparagus',
            snack: 'Macadamia nuts'
          },
          tuesday: {
            breakfast: 'Keto Smoothie with MCT Oil',
            lunch: 'Tuna Salad Lettuce Wraps',
            dinner: 'Baked Salmon with Creamy Spinach',
            snack: 'Cheese cubes'
          },
          wednesday: {
            breakfast: 'Chia Pudding with Coconut Milk',
            lunch: 'Zucchini Noodles with Pesto',
            dinner: 'Pork Chops with Cauliflower Mash',
            snack: 'Pork rinds'
          },
          thursday: {
            breakfast: 'Bulletproof Coffee and Eggs',
            lunch: 'Chicken Caesar Salad (no croutons)',
            dinner: 'Lamb Chops with Brussels Sprouts',
            snack: 'Olives'
          },
          friday: {
            breakfast: 'Keto Pancakes with Sugar-Free Syrup',
            lunch: 'Egg Salad with Avocado',
            dinner: 'Shrimp Scampi with Zoodles',
            snack: 'Almonds'
          }
        }
      },
      weeklyShoppingLists: {
        week1: [
          '2 dozen eggs',
          '4 avocados',
          '1 lb bacon',
          '2 lbs cauliflower',
          '3 lbs chicken breast',
          '2 ribeye steaks',
          '1 bottle MCT oil',
          '2 cans tuna',
          '1 lb salmon',
          'Heavy cream',
          'Butter',
          'Assorted low-carb vegetables'
        ]
      },
      nutritionTargets: {
        calories: 1800,
        protein: 90,
        carbs: 25,
        fat: 140,
        fiber: 15
      },
      mealPrepGuides: {
        sunday: [
          'Cook bacon for the week',
          'Prep cauliflower rice',
          'Make chia pudding',
          'Prep salad ingredients',
          'Portion out snacks'
        ]
      }
    },
    'vegan': {
      menuType: 'Vegan Diet',
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      dailyMeals: {
        week1: {
          monday: {
            breakfast: 'Overnight Oats with Almond Milk and Berries',
            lunch: 'Buddha Bowl with Tahini Dressing',
            dinner: 'Lentil Curry with Brown Rice',
            snack: 'Apple slices with almond butter'
          },
          tuesday: {
            breakfast: 'Tofu Scramble with Vegetables',
            lunch: 'Quinoa Salad with Roasted Vegetables',
            dinner: 'Black Bean Tacos with Guacamole',
            snack: 'Trail mix'
          },
          wednesday: {
            breakfast: 'Smoothie Bowl with Granola',
            lunch: 'Chickpea Sandwich with Veggies',
            dinner: 'Pasta Primavera with Nutritional Yeast',
            snack: 'Hummus with carrots'
          },
          thursday: {
            breakfast: 'Chia Pudding with Mango',
            lunch: 'Sweet Potato and Black Bean Bowl',
            dinner: 'Vegetable Stir-Fry with Tofu',
            snack: 'Energy balls'
          },
          friday: {
            breakfast: 'Avocado Toast with Tomatoes',
            lunch: 'Minestrone Soup with Bread',
            dinner: 'Mushroom Risotto (dairy-free)',
            snack: 'Fresh fruit'
          }
        }
      },
      weeklyShoppingLists: {
        week1: [
          '2 containers almond milk',
          '1 bag rolled oats',
          'Mixed berries',
          '2 blocks tofu',
          '2 cans chickpeas',
          '2 cans black beans',
          'Quinoa',
          'Brown rice',
          'Assorted vegetables',
          'Tahini',
          'Nutritional yeast'
        ]
      },
      nutritionTargets: {
        calories: 2000,
        protein: 70,
        carbs: 300,
        fat: 65,
        fiber: 40
      },
      mealPrepGuides: {
        sunday: [
          'Cook grains for the week',
          'Prep overnight oats',
          'Make energy balls',
          'Chop vegetables',
          'Prepare tahini dressing'
        ]
      }
    }
  }

  // Default to Mediterranean if plan not found
  return samplePlans[dietPlanSlug] || samplePlans['mediterranean']
}