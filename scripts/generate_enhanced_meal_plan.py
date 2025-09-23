#!/usr/bin/env python3
"""
Generate enhanced meal plans with complete recipes and shopping lists
"""

import json
import os
from typing import Dict, List, Any

def generate_enhanced_mediterranean_january() -> Dict[str, Any]:
    """Generate Mediterranean diet plan with full recipes for January 2025"""
    return {
        "menuType": "mediterranean",
        "month": 1,
        "year": 2025,
        "description": menuDescriptions["mediterranean"]["briefDescription"],
        "healthBenefits": menuDescriptions["mediterranean"]["whyItWorks"]["points"],
        "dailyMeals": {
            "1": {
                "breakfast": {
                    "name": "Greek Yogurt Parfait with Honey and Walnuts",
                    "calories": 320,
                    "protein": 15,
                    "prepTime": 5,
                    "recipe": {
                        "ingredients": [
                            "1 cup Greek yogurt (full-fat)",
                            "2 tbsp honey",
                            "1/4 cup walnuts, chopped",
                            "1/2 cup mixed berries",
                            "2 tbsp granola"
                        ],
                        "instructions": [
                            "Layer Greek yogurt in a glass or bowl",
                            "Drizzle with honey",
                            "Top with chopped walnuts and berries",
                            "Sprinkle granola on top",
                            "Serve immediately"
                        ],
                        "nutritionFacts": {
                            "calories": 320,
                            "protein": "15g",
                            "carbs": "35g",
                            "fat": "14g",
                            "fiber": "4g",
                            "sugar": "24g"
                        }
                    }
                },
                "lunch": {
                    "name": "Mediterranean Quinoa Bowl",
                    "calories": 480,
                    "protein": 18,
                    "prepTime": 20,
                    "recipe": {
                        "ingredients": [
                            "1 cup cooked quinoa",
                            "1/2 cup chickpeas, drained",
                            "1/2 cucumber, diced",
                            "1 cup cherry tomatoes, halved",
                            "1/4 cup feta cheese, crumbled",
                            "8 Kalamata olives",
                            "2 tbsp lemon juice",
                            "3 tbsp olive oil",
                            "1 tsp dried oregano",
                            "Salt and pepper to taste"
                        ],
                        "instructions": [
                            "Cook quinoa according to package directions and let cool",
                            "In a bowl, combine quinoa with chickpeas",
                            "Add cucumber, tomatoes, feta, and olives",
                            "Whisk together lemon juice, olive oil, and oregano",
                            "Toss salad with dressing",
                            "Season with salt and pepper",
                            "Serve chilled or at room temperature"
                        ],
                        "nutritionFacts": {
                            "calories": 480,
                            "protein": "18g",
                            "carbs": "52g",
                            "fat": "24g",
                            "fiber": "9g",
                            "omega3": "high"
                        }
                    }
                },
                "dinner": {
                    "name": "Grilled Salmon with Lemon and Herbs",
                    "calories": 520,
                    "protein": 35,
                    "prepTime": 25,
                    "recipe": {
                        "ingredients": [
                            "6 oz salmon fillet",
                            "2 tbsp olive oil",
                            "2 lemons (1 juiced, 1 sliced)",
                            "2 cloves garlic, minced",
                            "2 tbsp fresh dill",
                            "1 lb asparagus spears",
                            "Salt and pepper to taste"
                        ],
                        "instructions": [
                            "Preheat grill or oven to 400°F",
                            "Mix olive oil, lemon juice, garlic, and dill",
                            "Marinate salmon for 15 minutes",
                            "Season asparagus with olive oil, salt, and pepper",
                            "Grill salmon for 12-15 minutes",
                            "Grill asparagus for 8-10 minutes",
                            "Serve with lemon slices"
                        ],
                        "nutritionFacts": {
                            "calories": 520,
                            "protein": "35g",
                            "carbs": "12g",
                            "fat": "38g",
                            "omega3": "2.5g",
                            "vitaminD": "100% DV"
                        }
                    }
                },
                "snack": {
                    "name": "Hummus with Vegetables",
                    "calories": 150,
                    "protein": 6,
                    "prepTime": 5,
                    "recipe": {
                        "ingredients": [
                            "1/3 cup hummus",
                            "1 carrot, sliced",
                            "1/2 bell pepper, sliced",
                            "1/2 cucumber, sliced"
                        ],
                        "instructions": [
                            "Arrange vegetables on a plate",
                            "Serve with hummus for dipping"
                        ]
                    }
                }
            }
        },
        "weeklyShoppingLists": {
            "week1": {
                "produce": {
                    "items": [
                        {"item": "Tomatoes", "quantity": "3 lbs", "estimatedCost": "$6"},
                        {"item": "Cucumbers", "quantity": "6", "estimatedCost": "$4"},
                        {"item": "Bell Peppers", "quantity": "8", "estimatedCost": "$8"},
                        {"item": "Spinach", "quantity": "2 bags", "estimatedCost": "$6"},
                        {"item": "Lemons", "quantity": "10", "estimatedCost": "$5"}
                    ],
                    "subtotal": "$29"
                },
                "proteins": {
                    "items": [
                        {"item": "Salmon", "quantity": "1.5 lbs", "estimatedCost": "$18"},
                        {"item": "Chicken breast", "quantity": "2 lbs", "estimatedCost": "$12"},
                        {"item": "Ground lamb", "quantity": "1 lb", "estimatedCost": "$8"},
                        {"item": "Eggs", "quantity": "1 dozen", "estimatedCost": "$4"}
                    ],
                    "subtotal": "$42"
                },
                "pantry": {
                    "items": [
                        {"item": "Olive oil", "quantity": "1 bottle", "estimatedCost": "$12"},
                        {"item": "Chickpeas", "quantity": "3 cans", "estimatedCost": "$4"},
                        {"item": "Quinoa", "quantity": "1 bag", "estimatedCost": "$6"},
                        {"item": "Olives", "quantity": "2 jars", "estimatedCost": "$8"}
                    ],
                    "subtotal": "$30"
                },
                "dairy": {
                    "items": [
                        {"item": "Greek yogurt", "quantity": "2 containers", "estimatedCost": "$8"},
                        {"item": "Feta cheese", "quantity": "1 lb", "estimatedCost": "$7"},
                        {"item": "Halloumi", "quantity": "8 oz", "estimatedCost": "$6"}
                    ],
                    "subtotal": "$21"
                },
                "totalEstimatedCost": "$122"
            }
        },
        "mealPrepGuides": {
            "week1": {
                "sunday": [
                    "Cook 3 cups of quinoa for the week",
                    "Prep vegetables: wash, chop, and store in containers",
                    "Make homemade hummus (lasts 5 days)",
                    "Marinate chicken breasts for Monday and Tuesday",
                    "Prepare overnight oats for 3 days"
                ],
                "wednesday": [
                    "Refresh vegetables mid-week",
                    "Make second batch of hummus",
                    "Prep proteins for Thursday and Friday"
                ],
                "timeEstimate": "Sunday: 2.5 hours, Wednesday: 45 minutes"
            }
        },
        "nutritionTargets": {
            "dailyCalories": 1800,
            "proteinGrams": 90,
            "fiberGrams": 30,
            "omega3": "2-3g daily",
            "healthyFats": "40% of calories from healthy fats"
        }
    }

# Menu descriptions for health benefits
menuDescriptions = {
    "mediterranean": {
        "briefDescription": "Inspired by traditional Mediterranean eating patterns, scientifically proven to reduce inflammation by up to 20%, support sustainable weight loss of 1-2 lbs per week, and reduce heart disease risk by 30%.",
        "whyItWorks": {
            "points": [
                {
                    "title": "Anti-Inflammatory Power",
                    "detail": "Rich in omega-3s from fish and olive oil polyphenols that reduce C-reactive protein and other inflammatory markers"
                },
                {
                    "title": "Heart Health",
                    "detail": "PREDIMED study showed 30% reduction in cardiovascular events with Mediterranean diet adherence"
                },
                {
                    "title": "Weight Loss Without Hunger",
                    "detail": "High fiber and healthy fats provide satiety, leading to natural calorie reduction without counting"
                }
            ]
        }
    },
    "intermittent-fasting": {
        "briefDescription": "16:8 time-restricted eating triggers autophagy, improves insulin sensitivity by 20-31%, and accelerates fat burning. Studies show 3-8% weight loss in 3-24 weeks without calorie restriction.",
        "whyItWorks": {
            "points": [
                {
                    "title": "Metabolic Switch",
                    "detail": "After 12-16 hours, body switches from glucose to fat metabolism, increasing fat oxidation by up to 50%"
                },
                {
                    "title": "Cellular Renewal",
                    "detail": "Autophagy removes damaged proteins and organelles, potentially reducing cancer risk and slowing aging"
                },
                {
                    "title": "Hormone Optimization",
                    "detail": "Increases human growth hormone by up to 5-fold, improving fat loss and muscle preservation"
                }
            ]
        }
    }
}

def save_enhanced_plan(meal_plan: Dict[str, Any], filename: str):
    """Save enhanced meal plan with recipes to JSON file"""
    filepath = f"../data/meal-plans-enhanced/{filename}"
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, 'w') as f:
        json.dump(meal_plan, f, indent=2)
    print(f"✓ Generated enhanced {filename}")

def main():
    """Generate enhanced meal plans with complete recipes"""
    print("Generating Enhanced Meal Plans with Complete Recipes...")
    print("-" * 50)

    # Generate Mediterranean plan with full recipes
    mediterranean_plan = generate_enhanced_mediterranean_january()
    save_enhanced_plan(mediterranean_plan, "mediterranean-enhanced-2025-01.json")

    print("-" * 50)
    print("✅ Enhanced meal plans with recipes generated successfully!")
    print("Protected content ready for paid subscribers")

if __name__ == "__main__":
    main()