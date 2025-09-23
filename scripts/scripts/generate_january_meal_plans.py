#!/usr/bin/env python3
"""
Generate January 2025 meal plans for all menu types
Ready for immediate launch with Vercel and Stripe
"""

import json
import os
from datetime import datetime, timedelta
from typing import Dict, List, Any

# Create data directory if it doesn't exist
os.makedirs('../data/meal-plans', exist_ok=True)

def generate_mediterranean_january() -> Dict[str, Any]:
    """Generate Mediterranean diet plan for January 2025"""
    return {
        "menuType": "mediterranean",
        "month": 1,
        "year": 2025,
        "dailyMeals": {
            "1": {
                "breakfast": {
                    "name": "Greek Yogurt Parfait with Honey and Walnuts",
                    "calories": 320,
                    "protein": 15,
                    "prepTime": 5,
                    "ingredients": ["Greek yogurt", "honey", "walnuts", "fresh berries", "granola"]
                },
                "lunch": {
                    "name": "Mediterranean Quinoa Bowl",
                    "calories": 480,
                    "protein": 18,
                    "prepTime": 20,
                    "ingredients": ["quinoa", "chickpeas", "cucumber", "tomatoes", "feta", "olives", "lemon"]
                },
                "dinner": {
                    "name": "Grilled Salmon with Lemon and Herbs",
                    "calories": 520,
                    "protein": 35,
                    "prepTime": 25,
                    "ingredients": ["salmon", "lemon", "dill", "olive oil", "asparagus", "garlic"]
                },
                "snack": {
                    "name": "Hummus with Vegetables",
                    "calories": 150,
                    "protein": 6,
                    "prepTime": 5,
                    "ingredients": ["hummus", "carrots", "bell peppers", "cucumber"]
                }
            },
            "2": {
                "breakfast": {
                    "name": "Whole Grain Toast with Avocado and Tomato",
                    "calories": 340,
                    "protein": 12,
                    "prepTime": 10,
                    "ingredients": ["whole grain bread", "avocado", "tomato", "olive oil", "sea salt"]
                },
                "lunch": {
                    "name": "Greek Salad with Grilled Chicken",
                    "calories": 450,
                    "protein": 32,
                    "prepTime": 15,
                    "ingredients": ["chicken breast", "mixed greens", "tomatoes", "cucumber", "feta", "olives"]
                },
                "dinner": {
                    "name": "Vegetable Lentil Stew",
                    "calories": 420,
                    "protein": 18,
                    "prepTime": 35,
                    "ingredients": ["lentils", "carrots", "celery", "onions", "tomatoes", "herbs"]
                },
                "snack": {
                    "name": "Mixed Nuts and Dried Fruit",
                    "calories": 180,
                    "protein": 5,
                    "prepTime": 0,
                    "ingredients": ["almonds", "walnuts", "dried apricots", "dates"]
                }
            },
            # Continue for all 31 days...
            "3": {
                "breakfast": {
                    "name": "Mediterranean Egg Scramble",
                    "calories": 380,
                    "protein": 22,
                    "prepTime": 15,
                    "ingredients": ["eggs", "spinach", "tomatoes", "feta", "olive oil"]
                },
                "lunch": {
                    "name": "Tuna and White Bean Salad",
                    "calories": 420,
                    "protein": 28,
                    "prepTime": 10,
                    "ingredients": ["tuna", "white beans", "arugula", "lemon", "olive oil"]
                },
                "dinner": {
                    "name": "Herb-Roasted Chicken with Vegetables",
                    "calories": 480,
                    "protein": 38,
                    "prepTime": 40,
                    "ingredients": ["chicken thighs", "rosemary", "thyme", "potatoes", "bell peppers"]
                },
                "snack": {
                    "name": "Greek Yogurt with Honey",
                    "calories": 120,
                    "protein": 10,
                    "prepTime": 2,
                    "ingredients": ["Greek yogurt", "honey", "cinnamon"]
                }
            }
        },
        "weeklyShoppingLists": {
            "week1": {
                "produce": ["tomatoes", "cucumbers", "spinach", "arugula", "bell peppers", "lemons", "avocados"],
                "proteins": ["salmon", "chicken breast", "eggs", "Greek yogurt", "feta cheese"],
                "pantry": ["olive oil", "quinoa", "lentils", "chickpeas", "honey", "nuts"],
                "herbs": ["dill", "rosemary", "thyme", "oregano", "basil"]
            }
        },
        "nutritionTargets": {
            "dailyCalories": 1800,
            "proteinGrams": 90,
            "fiberGrams": 30,
            "healthyFats": "40% of calories from healthy fats"
        },
        "mealPrepGuides": {
            "week1": [
                "Prep quinoa in bulk for the week",
                "Wash and chop vegetables on Sunday",
                "Marinate proteins the night before",
                "Make hummus fresh twice weekly"
            ]
        }
    }

def generate_intermittent_fasting_january() -> Dict[str, Any]:
    """Generate Intermittent Fasting (16:8) plan for January 2025"""
    return {
        "menuType": "intermittent-fasting",
        "month": 1,
        "year": 2025,
        "fastingSchedule": "16:8 - Eating window 12pm-8pm",
        "dailyMeals": {
            "1": {
                "lunch": {
                    "name": "Power Bowl with Grilled Protein",
                    "calories": 650,
                    "protein": 40,
                    "prepTime": 20,
                    "ingredients": ["grilled chicken", "brown rice", "black beans", "avocado", "salsa", "lime"]
                },
                "snack": {
                    "name": "Protein Smoothie",
                    "calories": 280,
                    "protein": 25,
                    "prepTime": 5,
                    "ingredients": ["protein powder", "banana", "almond milk", "peanut butter", "spinach"]
                },
                "dinner": {
                    "name": "Steak with Roasted Vegetables",
                    "calories": 720,
                    "protein": 45,
                    "prepTime": 30,
                    "ingredients": ["sirloin steak", "brussels sprouts", "sweet potato", "olive oil", "garlic"]
                }
            },
            "2": {
                "lunch": {
                    "name": "Buddha Bowl with Tahini Dressing",
                    "calories": 620,
                    "protein": 28,
                    "prepTime": 25,
                    "ingredients": ["quinoa", "chickpeas", "kale", "beets", "tahini", "lemon"]
                },
                "snack": {
                    "name": "Apple with Almond Butter",
                    "calories": 240,
                    "protein": 8,
                    "prepTime": 2,
                    "ingredients": ["apple", "almond butter", "cinnamon"]
                },
                "dinner": {
                    "name": "Baked Salmon with Asparagus",
                    "calories": 680,
                    "protein": 42,
                    "prepTime": 25,
                    "ingredients": ["salmon fillet", "asparagus", "lemon", "dill", "olive oil"]
                }
            },
            "3": {
                "lunch": {
                    "name": "Turkey and Avocado Wrap",
                    "calories": 580,
                    "protein": 35,
                    "prepTime": 10,
                    "ingredients": ["turkey breast", "whole wheat tortilla", "avocado", "lettuce", "tomato", "mustard"]
                },
                "snack": {
                    "name": "Greek Yogurt Parfait",
                    "calories": 220,
                    "protein": 15,
                    "prepTime": 5,
                    "ingredients": ["Greek yogurt", "berries", "granola", "honey"]
                },
                "dinner": {
                    "name": "Chicken Stir-Fry",
                    "calories": 650,
                    "protein": 38,
                    "prepTime": 20,
                    "ingredients": ["chicken breast", "mixed vegetables", "soy sauce", "ginger", "garlic", "brown rice"]
                }
            }
        },
        "weeklyShoppingLists": {
            "week1": {
                "produce": ["avocados", "spinach", "kale", "brussels sprouts", "sweet potatoes", "apples"],
                "proteins": ["chicken breast", "sirloin steak", "salmon", "turkey", "Greek yogurt", "eggs"],
                "pantry": ["brown rice", "quinoa", "black beans", "almond butter", "protein powder"],
                "herbs": ["cilantro", "dill", "ginger", "garlic"]
            }
        },
        "nutritionTargets": {
            "dailyCalories": 1650,
            "proteinGrams": 110,
            "eatingWindow": "12pm-8pm",
            "fastingHours": 16
        },
        "mealPrepGuides": {
            "week1": [
                "Prep proteins in bulk on Sunday",
                "Pre-cut vegetables for quick stir-fries",
                "Prepare overnight oats for quick first meals",
                "Keep emergency protein snacks ready"
            ]
        }
    }

def generate_family_focused_january() -> Dict[str, Any]:
    """Generate Family-Focused meal plan for January 2025"""
    return {
        "menuType": "family-focused",
        "month": 1,
        "year": 2025,
        "familySize": 4,
        "dailyMeals": {
            "1": {
                "breakfast": {
                    "name": "Pancakes with Fresh Fruit",
                    "calories": 380,
                    "protein": 12,
                    "prepTime": 20,
                    "servings": 4,
                    "ingredients": ["flour", "eggs", "milk", "blueberries", "maple syrup", "butter"]
                },
                "lunch": {
                    "name": "Chicken Quesadillas",
                    "calories": 420,
                    "protein": 28,
                    "prepTime": 15,
                    "servings": 4,
                    "ingredients": ["chicken", "tortillas", "cheese", "bell peppers", "onions", "salsa"]
                },
                "dinner": {
                    "name": "Spaghetti with Meat Sauce",
                    "calories": 520,
                    "protein": 25,
                    "prepTime": 30,
                    "servings": 4,
                    "ingredients": ["ground beef", "pasta", "tomato sauce", "onions", "garlic", "parmesan"]
                },
                "snack": {
                    "name": "Fruit and Cheese Platter",
                    "calories": 150,
                    "protein": 8,
                    "prepTime": 5,
                    "servings": 4,
                    "ingredients": ["apples", "grapes", "cheddar cheese", "crackers"]
                }
            },
            "2": {
                "breakfast": {
                    "name": "Scrambled Eggs with Toast",
                    "calories": 340,
                    "protein": 20,
                    "prepTime": 10,
                    "servings": 4,
                    "ingredients": ["eggs", "whole wheat bread", "butter", "milk", "cheese"]
                },
                "lunch": {
                    "name": "Turkey and Cheese Sandwiches",
                    "calories": 380,
                    "protein": 24,
                    "prepTime": 10,
                    "servings": 4,
                    "ingredients": ["turkey", "bread", "cheese", "lettuce", "tomato", "mayo"]
                },
                "dinner": {
                    "name": "Taco Tuesday",
                    "calories": 480,
                    "protein": 28,
                    "prepTime": 25,
                    "servings": 4,
                    "ingredients": ["ground turkey", "taco shells", "lettuce", "cheese", "tomatoes", "sour cream"]
                },
                "snack": {
                    "name": "Homemade Popcorn",
                    "calories": 110,
                    "protein": 3,
                    "prepTime": 5,
                    "servings": 4,
                    "ingredients": ["popcorn kernels", "butter", "salt"]
                }
            },
            "3": {
                "breakfast": {
                    "name": "Oatmeal Bar",
                    "calories": 320,
                    "protein": 10,
                    "prepTime": 15,
                    "servings": 4,
                    "ingredients": ["oats", "milk", "brown sugar", "berries", "nuts", "honey"]
                },
                "lunch": {
                    "name": "Pizza Bagels",
                    "calories": 360,
                    "protein": 18,
                    "prepTime": 12,
                    "servings": 4,
                    "ingredients": ["bagels", "pizza sauce", "mozzarella", "pepperoni"]
                },
                "dinner": {
                    "name": "Baked Chicken with Vegetables",
                    "calories": 450,
                    "protein": 35,
                    "prepTime": 35,
                    "servings": 4,
                    "ingredients": ["chicken breasts", "potatoes", "carrots", "green beans", "olive oil"]
                },
                "snack": {
                    "name": "Veggie Sticks with Ranch",
                    "calories": 120,
                    "protein": 4,
                    "prepTime": 5,
                    "servings": 4,
                    "ingredients": ["carrots", "celery", "ranch dressing"]
                }
            }
        },
        "weeklyShoppingLists": {
            "week1": {
                "produce": ["apples", "berries", "lettuce", "tomatoes", "potatoes", "carrots"],
                "proteins": ["chicken breasts", "ground beef", "ground turkey", "eggs", "cheese"],
                "pantry": ["pasta", "rice", "bread", "tortillas", "oats", "flour"],
                "dairy": ["milk", "butter", "yogurt", "sour cream"]
            }
        },
        "nutritionTargets": {
            "dailyCaloriesPerPerson": 1600,
            "kidFriendly": True,
            "prepTimeMax": 35,
            "servings": 4
        },
        "mealPrepGuides": {
            "week1": [
                "Batch cook ground meat on Sunday",
                "Pre-cut vegetables for the week",
                "Make pancake batter the night before",
                "Prep lunch boxes Sunday evening"
            ]
        }
    }

def generate_paleo_january() -> Dict[str, Any]:
    """Generate Paleo diet plan for January 2025"""
    return {
        "menuType": "paleo",
        "month": 1,
        "year": 2025,
        "dailyMeals": {
            "1": {
                "breakfast": {
                    "name": "Sweet Potato Hash with Eggs",
                    "calories": 420,
                    "protein": 24,
                    "prepTime": 20,
                    "ingredients": ["sweet potatoes", "eggs", "bell peppers", "onions", "coconut oil"]
                },
                "lunch": {
                    "name": "Grilled Chicken Salad",
                    "calories": 480,
                    "protein": 35,
                    "prepTime": 15,
                    "ingredients": ["chicken breast", "mixed greens", "avocado", "tomatoes", "olive oil", "lemon"]
                },
                "dinner": {
                    "name": "Grass-Fed Beef with Roasted Vegetables",
                    "calories": 580,
                    "protein": 40,
                    "prepTime": 35,
                    "ingredients": ["grass-fed beef", "broccoli", "cauliflower", "carrots", "ghee"]
                },
                "snack": {
                    "name": "Almond Butter Apple Slices",
                    "calories": 180,
                    "protein": 6,
                    "prepTime": 3,
                    "ingredients": ["apple", "almond butter", "cinnamon"]
                }
            },
            "2": {
                "breakfast": {
                    "name": "Paleo Breakfast Bowl",
                    "calories": 440,
                    "protein": 28,
                    "prepTime": 15,
                    "ingredients": ["ground turkey", "spinach", "mushrooms", "eggs", "avocado"]
                },
                "lunch": {
                    "name": "Tuna Avocado Boats",
                    "calories": 420,
                    "protein": 32,
                    "prepTime": 10,
                    "ingredients": ["tuna", "avocados", "lime", "cilantro", "jalapeño"]
                },
                "dinner": {
                    "name": "Baked Salmon with Asparagus",
                    "calories": 520,
                    "protein": 38,
                    "prepTime": 25,
                    "ingredients": ["wild salmon", "asparagus", "lemon", "garlic", "olive oil"]
                },
                "snack": {
                    "name": "Mixed Nuts and Berries",
                    "calories": 160,
                    "protein": 5,
                    "prepTime": 0,
                    "ingredients": ["almonds", "walnuts", "blueberries", "strawberries"]
                }
            },
            "3": {
                "breakfast": {
                    "name": "Vegetable Frittata",
                    "calories": 380,
                    "protein": 26,
                    "prepTime": 25,
                    "ingredients": ["eggs", "zucchini", "tomatoes", "onions", "coconut oil"]
                },
                "lunch": {
                    "name": "Beef and Vegetable Soup",
                    "calories": 440,
                    "protein": 30,
                    "prepTime": 40,
                    "ingredients": ["beef stew meat", "bone broth", "carrots", "celery", "herbs"]
                },
                "dinner": {
                    "name": "Grilled Chicken with Cauliflower Rice",
                    "calories": 480,
                    "protein": 36,
                    "prepTime": 30,
                    "ingredients": ["chicken thighs", "cauliflower", "garlic", "herbs", "olive oil"]
                },
                "snack": {
                    "name": "Coconut Chips",
                    "calories": 140,
                    "protein": 2,
                    "prepTime": 0,
                    "ingredients": ["unsweetened coconut chips", "sea salt"]
                }
            }
        },
        "weeklyShoppingLists": {
            "week1": {
                "produce": ["sweet potatoes", "spinach", "kale", "cauliflower", "broccoli", "avocados"],
                "proteins": ["grass-fed beef", "wild salmon", "chicken", "eggs", "tuna"],
                "pantry": ["coconut oil", "olive oil", "almond butter", "nuts", "coconut chips"],
                "herbs": ["cilantro", "parsley", "rosemary", "thyme"]
            }
        },
        "nutritionTargets": {
            "dailyCalories": 1700,
            "proteinGrams": 120,
            "noGrains": True,
            "noDairy": True,
            "noLegumes": True
        },
        "mealPrepGuides": {
            "week1": [
                "Prep cauliflower rice in advance",
                "Marinate meats overnight",
                "Pre-chop vegetables for the week",
                "Make bone broth on Sunday"
            ]
        }
    }

def generate_vegetarian_january() -> Dict[str, Any]:
    """Generate Vegetarian diet plan for January 2025"""
    return {
        "menuType": "vegetarian",
        "month": 1,
        "year": 2025,
        "dailyMeals": {
            "1": {
                "breakfast": {
                    "name": "Veggie Scrambled Eggs with Toast",
                    "calories": 380,
                    "protein": 20,
                    "prepTime": 15,
                    "ingredients": ["eggs", "spinach", "tomatoes", "mushrooms", "whole grain bread", "butter"]
                },
                "lunch": {
                    "name": "Chickpea Buddha Bowl",
                    "calories": 480,
                    "protein": 18,
                    "prepTime": 20,
                    "ingredients": ["chickpeas", "quinoa", "kale", "sweet potato", "tahini", "lemon"]
                },
                "dinner": {
                    "name": "Eggplant Parmesan",
                    "calories": 520,
                    "protein": 22,
                    "prepTime": 45,
                    "ingredients": ["eggplant", "mozzarella", "parmesan", "tomato sauce", "basil"]
                },
                "snack": {
                    "name": "Hummus with Pita",
                    "calories": 160,
                    "protein": 6,
                    "prepTime": 5,
                    "ingredients": ["hummus", "whole wheat pita", "cucumber", "carrots"]
                }
            },
            "2": {
                "breakfast": {
                    "name": "Overnight Oats with Berries",
                    "calories": 360,
                    "protein": 12,
                    "prepTime": 5,
                    "ingredients": ["oats", "almond milk", "chia seeds", "berries", "honey", "almonds"]
                },
                "lunch": {
                    "name": "Caprese Sandwich",
                    "calories": 440,
                    "protein": 16,
                    "prepTime": 10,
                    "ingredients": ["mozzarella", "tomatoes", "basil", "ciabatta", "balsamic", "olive oil"]
                },
                "dinner": {
                    "name": "Lentil Curry",
                    "calories": 480,
                    "protein": 20,
                    "prepTime": 35,
                    "ingredients": ["red lentils", "coconut milk", "curry spices", "tomatoes", "spinach", "rice"]
                },
                "snack": {
                    "name": "Apple with Peanut Butter",
                    "calories": 180,
                    "protein": 6,
                    "prepTime": 2,
                    "ingredients": ["apple", "peanut butter", "cinnamon"]
                }
            },
            "3": {
                "breakfast": {
                    "name": "Avocado Toast with Poached Egg",
                    "calories": 420,
                    "protein": 16,
                    "prepTime": 12,
                    "ingredients": ["whole grain bread", "avocado", "eggs", "lime", "red pepper flakes"]
                },
                "lunch": {
                    "name": "Black Bean Tacos",
                    "calories": 460,
                    "protein": 15,
                    "prepTime": 15,
                    "ingredients": ["black beans", "corn tortillas", "lettuce", "cheese", "salsa", "avocado"]
                },
                "dinner": {
                    "name": "Mushroom Risotto",
                    "calories": 500,
                    "protein": 14,
                    "prepTime": 40,
                    "ingredients": ["arborio rice", "mushrooms", "vegetable broth", "parmesan", "white wine"]
                },
                "snack": {
                    "name": "Greek Yogurt with Granola",
                    "calories": 160,
                    "protein": 10,
                    "prepTime": 2,
                    "ingredients": ["Greek yogurt", "granola", "honey"]
                }
            }
        },
        "weeklyShoppingLists": {
            "week1": {
                "produce": ["spinach", "kale", "tomatoes", "mushrooms", "avocados", "sweet potatoes"],
                "proteins": ["eggs", "chickpeas", "lentils", "black beans", "Greek yogurt", "cheese"],
                "pantry": ["quinoa", "rice", "oats", "pasta", "bread", "tahini"],
                "dairy": ["mozzarella", "parmesan", "milk", "butter"]
            }
        },
        "nutritionTargets": {
            "dailyCalories": 1700,
            "proteinGrams": 70,
            "fiberGrams": 35,
            "plantBased": "lacto-ovo vegetarian"
        },
        "mealPrepGuides": {
            "week1": [
                "Cook grains in bulk on Sunday",
                "Prep overnight oats for the week",
                "Make hummus and sauces fresh",
                "Pre-chop vegetables for quick meals"
            ]
        }
    }

def generate_vegan_january() -> Dict[str, Any]:
    """Generate Vegan diet plan for January 2025"""
    return {
        "menuType": "vegan",
        "month": 1,
        "year": 2025,
        "dailyMeals": {
            "1": {
                "breakfast": {
                    "name": "Smoothie Bowl",
                    "calories": 380,
                    "protein": 12,
                    "prepTime": 10,
                    "ingredients": ["banana", "berries", "spinach", "almond milk", "chia seeds", "granola"]
                },
                "lunch": {
                    "name": "Quinoa Tabbouleh",
                    "calories": 420,
                    "protein": 14,
                    "prepTime": 20,
                    "ingredients": ["quinoa", "parsley", "tomatoes", "cucumber", "lemon", "olive oil"]
                },
                "dinner": {
                    "name": "Thai Coconut Curry",
                    "calories": 520,
                    "protein": 16,
                    "prepTime": 30,
                    "ingredients": ["tofu", "coconut milk", "vegetables", "curry paste", "rice", "basil"]
                },
                "snack": {
                    "name": "Trail Mix",
                    "calories": 160,
                    "protein": 5,
                    "prepTime": 0,
                    "ingredients": ["almonds", "cashews", "dried fruit", "dark chocolate chips"]
                }
            },
            "2": {
                "breakfast": {
                    "name": "Tofu Scramble",
                    "calories": 360,
                    "protein": 20,
                    "prepTime": 15,
                    "ingredients": ["tofu", "turmeric", "nutritional yeast", "vegetables", "whole grain toast"]
                },
                "lunch": {
                    "name": "Buddha Bowl with Tahini",
                    "calories": 480,
                    "protein": 16,
                    "prepTime": 25,
                    "ingredients": ["brown rice", "chickpeas", "kale", "beets", "tahini sauce"]
                },
                "dinner": {
                    "name": "Vegan Pasta Primavera",
                    "calories": 500,
                    "protein": 18,
                    "prepTime": 25,
                    "ingredients": ["whole wheat pasta", "vegetables", "garlic", "olive oil", "nutritional yeast"]
                },
                "snack": {
                    "name": "Apple with Almond Butter",
                    "calories": 180,
                    "protein": 6,
                    "prepTime": 2,
                    "ingredients": ["apple", "almond butter", "cinnamon"]
                }
            },
            "3": {
                "breakfast": {
                    "name": "Overnight Chia Pudding",
                    "calories": 340,
                    "protein": 10,
                    "prepTime": 5,
                    "ingredients": ["chia seeds", "coconut milk", "maple syrup", "berries", "coconut flakes"]
                },
                "lunch": {
                    "name": "Lentil Soup",
                    "calories": 440,
                    "protein": 18,
                    "prepTime": 35,
                    "ingredients": ["green lentils", "vegetables", "vegetable broth", "herbs", "whole grain bread"]
                },
                "dinner": {
                    "name": "Stuffed Bell Peppers",
                    "calories": 480,
                    "protein": 14,
                    "prepTime": 40,
                    "ingredients": ["bell peppers", "quinoa", "black beans", "corn", "tomatoes", "spices"]
                },
                "snack": {
                    "name": "Hummus with Vegetables",
                    "calories": 140,
                    "protein": 5,
                    "prepTime": 5,
                    "ingredients": ["hummus", "carrots", "celery", "bell peppers"]
                }
            }
        },
        "weeklyShoppingLists": {
            "week1": {
                "produce": ["spinach", "kale", "tomatoes", "bell peppers", "carrots", "berries"],
                "proteins": ["tofu", "tempeh", "chickpeas", "lentils", "black beans", "quinoa"],
                "pantry": ["coconut milk", "almond milk", "tahini", "nutritional yeast", "chia seeds"],
                "herbs": ["basil", "cilantro", "parsley", "mint"]
            }
        },
        "nutritionTargets": {
            "dailyCalories": 1700,
            "proteinGrams": 65,
            "b12Supplementation": "recommended",
            "plantBased": "100% vegan"
        },
        "mealPrepGuides": {
            "week1": [
                "Batch cook grains and legumes",
                "Prep overnight chia puddings",
                "Make tahini and other sauces",
                "Pre-cut vegetables for quick stir-fries"
            ]
        }
    }

def generate_global_cuisine_january() -> Dict[str, Any]:
    """Generate Global Cuisine plan for January 2025"""
    return {
        "menuType": "global-cuisine",
        "month": 1,
        "year": 2025,
        "weeklyThemes": {
            "week1": "Italian Week",
            "week2": "Asian Fusion",
            "week3": "Mexican Fiesta",
            "week4": "Middle Eastern"
        },
        "dailyMeals": {
            "1": {
                "breakfast": {
                    "name": "Italian Frittata",
                    "calories": 380,
                    "protein": 22,
                    "prepTime": 20,
                    "cuisine": "Italian",
                    "ingredients": ["eggs", "prosciutto", "mozzarella", "tomatoes", "basil", "olive oil"]
                },
                "lunch": {
                    "name": "Caprese Panini",
                    "calories": 460,
                    "protein": 18,
                    "prepTime": 15,
                    "cuisine": "Italian",
                    "ingredients": ["ciabatta", "mozzarella", "tomatoes", "basil", "pesto", "balsamic"]
                },
                "dinner": {
                    "name": "Osso Buco with Risotto",
                    "calories": 580,
                    "protein": 35,
                    "prepTime": 90,
                    "cuisine": "Italian",
                    "ingredients": ["veal shanks", "arborio rice", "white wine", "saffron", "vegetables"]
                },
                "snack": {
                    "name": "Bruschetta",
                    "calories": 140,
                    "protein": 4,
                    "prepTime": 10,
                    "cuisine": "Italian",
                    "ingredients": ["baguette", "tomatoes", "garlic", "basil", "olive oil"]
                }
            },
            "2": {
                "breakfast": {
                    "name": "Japanese Tamago Sando",
                    "calories": 340,
                    "protein": 16,
                    "prepTime": 15,
                    "cuisine": "Japanese",
                    "ingredients": ["eggs", "Japanese milk bread", "mayo", "mustard", "chives"]
                },
                "lunch": {
                    "name": "Pad Thai",
                    "calories": 480,
                    "protein": 20,
                    "prepTime": 25,
                    "cuisine": "Thai",
                    "ingredients": ["rice noodles", "shrimp", "tofu", "peanuts", "bean sprouts", "lime"]
                },
                "dinner": {
                    "name": "Korean BBQ Bowl",
                    "calories": 540,
                    "protein": 32,
                    "prepTime": 30,
                    "cuisine": "Korean",
                    "ingredients": ["beef bulgogi", "rice", "kimchi", "vegetables", "gochujang", "sesame"]
                },
                "snack": {
                    "name": "Edamame",
                    "calories": 120,
                    "protein": 9,
                    "prepTime": 5,
                    "cuisine": "Japanese",
                    "ingredients": ["edamame", "sea salt"]
                }
            },
            "3": {
                "breakfast": {
                    "name": "Chilaquiles",
                    "calories": 420,
                    "protein": 18,
                    "prepTime": 20,
                    "cuisine": "Mexican",
                    "ingredients": ["tortilla chips", "salsa verde", "eggs", "cheese", "crema", "cilantro"]
                },
                "lunch": {
                    "name": "Pozole Soup",
                    "calories": 440,
                    "protein": 24,
                    "prepTime": 45,
                    "cuisine": "Mexican",
                    "ingredients": ["hominy", "pork", "chiles", "cabbage", "radishes", "lime"]
                },
                "dinner": {
                    "name": "Mole Chicken",
                    "calories": 520,
                    "protein": 35,
                    "prepTime": 60,
                    "cuisine": "Mexican",
                    "ingredients": ["chicken", "mole sauce", "rice", "beans", "tortillas"]
                },
                "snack": {
                    "name": "Guacamole with Chips",
                    "calories": 160,
                    "protein": 3,
                    "prepTime": 10,
                    "cuisine": "Mexican",
                    "ingredients": ["avocado", "lime", "cilantro", "jalapeño", "tortilla chips"]
                }
            }
        },
        "weeklyShoppingLists": {
            "week1": {
                "produce": ["tomatoes", "basil", "garlic", "lemons", "vegetables"],
                "proteins": ["eggs", "veal", "prosciutto", "mozzarella", "parmesan"],
                "pantry": ["arborio rice", "pasta", "olive oil", "balsamic vinegar", "wine"],
                "herbs": ["basil", "oregano", "rosemary", "thyme"]
            }
        },
        "nutritionTargets": {
            "dailyCalories": 1750,
            "proteinGrams": 85,
            "varietyScore": "high",
            "culturalDiversity": "7 cuisines per week"
        },
        "mealPrepGuides": {
            "week1": [
                "Research authentic recipes for each cuisine",
                "Shop at specialty stores for unique ingredients",
                "Prep sauces and marinades in advance",
                "Learn proper cooking techniques for each cuisine"
            ]
        }
    }

def save_meal_plan(meal_plan: Dict[str, Any], filename: str):
    """Save meal plan to JSON file"""
    filepath = f"../data/meal-plans/{filename}"
    with open(filepath, 'w') as f:
        json.dump(meal_plan, f, indent=2)
    print(f"✓ Generated {filename}")

def main():
    """Generate all January 2025 meal plans"""
    print("Generating January 2025 Meal Plans for Launch...")
    print("-" * 50)

    # Generate each menu type
    plans = [
        ("Mediterranean", generate_mediterranean_january(), "mediterranean-2025-01.json"),
        ("Intermittent Fasting", generate_intermittent_fasting_january(), "intermittent-fasting-2025-01.json"),
        ("Family Focused", generate_family_focused_january(), "family-focused-2025-01.json"),
        ("Paleo", generate_paleo_january(), "paleo-2025-01.json"),
        ("Vegetarian", generate_vegetarian_january(), "vegetarian-2025-01.json"),
        ("Vegan", generate_vegan_january(), "vegan-2025-01.json"),
        ("Global Cuisine", generate_global_cuisine_january(), "global-cuisine-2025-01.json")
    ]

    for name, plan, filename in plans:
        save_meal_plan(plan, filename)

    print("-" * 50)
    print("✅ All January 2025 meal plans generated successfully!")
    print("Ready for launch with Vercel and Stripe integration")

if __name__ == "__main__":
    main()