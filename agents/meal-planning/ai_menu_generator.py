#!/usr/bin/env python3
"""
Complete AI-Powered Menu Generation System
Integrates with Claude/OpenAI to generate custom recipes and menus
"""

import json
import random
import re
from typing import List, Dict, Optional, Tuple
from dataclasses import dataclass, asdict
from datetime import datetime, timedelta
import asyncio
import aiohttp
import os
import logging

# AI Integration imports
try:
    import anthropic
    ANTHROPIC_AVAILABLE = True
except ImportError:
    ANTHROPIC_AVAILABLE = False

try:
    import openai
    OPENAI_AVAILABLE = True
except ImportError:
    OPENAI_AVAILABLE = False

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

@dataclass
class RecipeRequirements:
    """Requirements for AI recipe generation"""
    menu_type: str
    meal_category: str  # breakfast, lunch, dinner, snack
    cuisine_style: str
    target_calories: int
    target_protein: int
    dietary_restrictions: List[str]
    prep_time_max: int  # minutes
    difficulty_level: str  # easy, medium, hard
    season: str  # spring, summer, fall, winter
    family_size: int
    budget_level: str  # budget, moderate, premium
    equipment_available: List[str]  # oven, stovetop, air_fryer, etc.

class AIMenuGenerator:
    """AI-powered menu and recipe generation system"""

    def __init__(self, anthropic_api_key: str = None, openai_api_key: str = None):
        self.anthropic_client = None
        self.openai_client = None

        # Initialize AI clients
        if anthropic_api_key and ANTHROPIC_AVAILABLE:
            self.anthropic_client = anthropic.Anthropic(api_key=anthropic_api_key)
            logging.info("Anthropic client initialized")

        if openai_api_key and OPENAI_AVAILABLE:
            self.openai_client = openai.OpenAI(api_key=openai_api_key)
            logging.info("OpenAI client initialized")

        # Load cuisine knowledge base
        self.cuisine_knowledge = self._load_cuisine_knowledge()
        self.nutrition_database = self._load_nutrition_database()

    def _load_cuisine_knowledge(self) -> Dict[str, Dict]:
        """Load cuisine-specific knowledge for better AI prompts"""
        return {
            "mediterranean": {
                "key_ingredients": [
                    "extra virgin olive oil", "garlic", "lemon", "tomatoes",
                    "olives", "feta cheese", "herbs (oregano, basil, thyme)",
                    "fish", "legumes", "whole grains"
                ],
                "cooking_methods": [
                    "grilling", "roasting", "sautéing", "braising",
                    "simple preparations", "minimal processing"
                ],
                "flavor_profiles": [
                    "bright and fresh", "herb-forward", "citrusy",
                    "savory", "umami-rich"
                ],
                "authentic_dishes": [
                    "Greek salad", "Shakshuka", "Ratatouille", "Paella",
                    "Tabbouleh", "Moussaka", "Gazpacho"
                ]
            },
            "intermittent_fasting": {
                "key_principles": [
                    "high protein first meal", "nutrient density",
                    "satiety focus", "stable blood sugar"
                ],
                "recommended_foods": [
                    "protein powder", "eggs", "lean meats", "healthy fats",
                    "leafy greens", "avocado", "nuts", "seeds"
                ],
                "meal_timing": {
                    "break_fast": "protein and fat heavy",
                    "main_meal": "balanced macros",
                    "optional_snack": "light and satisfying"
                }
            },
            "keto": {
                "macros": {"fat": 70, "protein": 25, "carbs": 5},
                "key_ingredients": [
                    "avocado", "coconut oil", "grass-fed butter", "MCT oil",
                    "low-carb vegetables", "fatty fish", "nuts", "seeds"
                ],
                "avoid": [
                    "grains", "sugar", "starchy vegetables", "most fruits",
                    "legumes", "high-carb sauces"
                ]
            },
            "family_friendly": {
                "principles": [
                    "kid-approved flavors", "hidden vegetables",
                    "familiar foods with healthy twists", "easy eating"
                ],
                "popular_formats": [
                    "casseroles", "wraps", "bowls", "finger foods",
                    "one-pot meals", "build-your-own options"
                ]
            }
        }

    def _load_nutrition_database(self) -> Dict[str, Dict]:
        """Load nutrition data for accurate calorie/macro calculations"""
        return {
            "proteins": {
                "chicken_breast": {"calories_per_100g": 165, "protein": 31, "fat": 3.6, "carbs": 0},
                "salmon": {"calories_per_100g": 208, "protein": 20, "fat": 12, "carbs": 0},
                "eggs": {"calories_per_egg": 70, "protein": 6, "fat": 5, "carbs": 0.5},
                "greek_yogurt": {"calories_per_100g": 59, "protein": 10, "fat": 0.4, "carbs": 3.6},
                "tofu": {"calories_per_100g": 76, "protein": 8, "fat": 4.8, "carbs": 1.9},
                "lean_beef": {"calories_per_100g": 250, "protein": 26, "fat": 15, "carbs": 0}
            },
            "vegetables": {
                "spinach": {"calories_per_100g": 23, "protein": 2.9, "fat": 0.4, "carbs": 3.6},
                "tomatoes": {"calories_per_100g": 18, "protein": 0.9, "fat": 0.2, "carbs": 3.9},
                "avocado": {"calories_per_100g": 160, "protein": 2, "fat": 15, "carbs": 9},
                "broccoli": {"calories_per_100g": 55, "protein": 3.7, "fat": 0.6, "carbs": 11},
                "bell_peppers": {"calories_per_100g": 31, "protein": 1, "fat": 0.3, "carbs": 6}
            },
            "grains": {
                "quinoa": {"calories_per_100g": 368, "protein": 14, "fat": 6, "carbs": 64},
                "brown_rice": {"calories_per_100g": 112, "protein": 2.6, "fat": 0.9, "carbs": 23},
                "oats": {"calories_per_100g": 389, "protein": 16.9, "fat": 6.9, "carbs": 66}
            },
            "healthy_fats": {
                "olive_oil": {"calories_per_tbsp": 119, "protein": 0, "fat": 13.5, "carbs": 0},
                "almonds": {"calories_per_100g": 579, "protein": 21, "fat": 49, "carbs": 22},
                "walnuts": {"calories_per_100g": 654, "protein": 15, "fat": 65, "carbs": 14}
            }
        }

    async def generate_recipe(self, requirements: RecipeRequirements) -> Dict:
        """Generate a single recipe using AI"""

        # Choose AI provider based on availability and task
        if self.anthropic_client:
            return await self._generate_recipe_claude(requirements)
        elif self.openai_client:
            return await self._generate_recipe_openai(requirements)
        else:
            # Fallback to template-based generation
            return self._generate_recipe_template(requirements)

    async def _generate_recipe_claude(self, req: RecipeRequirements) -> Dict:
        """Generate recipe using Claude (Anthropic)"""

        cuisine_info = self.cuisine_knowledge.get(req.menu_type, {})

        prompt = f"""
        Create a detailed {req.cuisine_style} {req.meal_category} recipe that follows these exact requirements:

        MENU TYPE: {req.menu_type}
        TARGET CALORIES: {req.target_calories} calories (±20 calories)
        TARGET PROTEIN: {req.target_protein}g protein minimum
        PREP TIME: Maximum {req.prep_time_max} minutes
        DIFFICULTY: {req.difficulty_level}
        SERVES: {req.family_size} people
        SEASON: {req.season} (use seasonal ingredients)
        BUDGET: {req.budget_level}

        DIETARY RESTRICTIONS: {', '.join(req.dietary_restrictions) if req.dietary_restrictions else 'None'}
        AVAILABLE EQUIPMENT: {', '.join(req.equipment_available)}

        CUISINE GUIDELINES:
        {json.dumps(cuisine_info, indent=2)}

        REQUIREMENTS:
        1. Recipe must be authentic to the {req.cuisine_style} style
        2. Use seasonal {req.season} ingredients when possible
        3. Meet the exact calorie and protein targets
        4. Include prep and cook times
        5. List all ingredients with exact measurements
        6. Provide clear step-by-step instructions

        Format the response as JSON with this structure:
        {{
            "name": "Recipe Name",
            "description": "Brief description",
            "prep_time": "X minutes",
            "cook_time": "Y minutes",
            "servings": {req.family_size},
            "calories_per_serving": number,
            "protein_per_serving": "Xg",
            "ingredients": [
                {{"item": "ingredient", "amount": "X", "unit": "cups/tbsp/etc"}},
                ...
            ],
            "instructions": [
                "Step 1...",
                "Step 2...",
                ...
            ],
            "tips": ["Optional cooking tips"],
            "tags": ["tag1", "tag2"]
        }}
        """

        try:
            message = self.anthropic_client.messages.create(
                model="claude-3-sonnet-20240229",
                max_tokens=2000,
                messages=[{"role": "user", "content": prompt}]
            )

            # Parse the JSON response
            recipe_json = json.loads(message.content[0].text)

            # Add metadata
            recipe_json["id"] = f"{req.menu_type}_{req.meal_category}_{datetime.now().strftime('%Y%m%d%H%M%S')}"
            recipe_json["cuisine"] = req.cuisine_style
            recipe_json["category"] = req.meal_category
            recipe_json["generated_by"] = "claude"
            recipe_json["generated_at"] = datetime.now().isoformat()

            logging.info(f"Generated recipe: {recipe_json['name']} using Claude")
            return recipe_json

        except Exception as e:
            logging.error(f"Error generating recipe with Claude: {str(e)}")
            return self._generate_recipe_template(req)

    async def _generate_recipe_openai(self, req: RecipeRequirements) -> Dict:
        """Generate recipe using OpenAI GPT"""

        cuisine_info = self.cuisine_knowledge.get(req.menu_type, {})

        prompt = f"""
        Generate a {req.cuisine_style} {req.meal_category} recipe with these specifications:
        - Calories: {req.target_calories} (±20)
        - Protein: {req.target_protein}g minimum
        - Prep time: max {req.prep_time_max} minutes
        - Serves: {req.family_size}
        - Season: {req.season}
        - Budget: {req.budget_level}
        - Dietary restrictions: {req.dietary_restrictions}

        Return as JSON with name, ingredients, instructions, and nutrition info.
        """

        try:
            response = self.openai_client.chat.completions.create(
                model="gpt-4-turbo-preview",
                messages=[
                    {"role": "system", "content": "You are an expert chef specializing in healthy, customized meal planning."},
                    {"role": "user", "content": prompt}
                ],
                response_format={"type": "json_object"}
            )

            recipe_json = json.loads(response.choices[0].message.content)

            # Add metadata
            recipe_json["id"] = f"{req.menu_type}_{req.meal_category}_{datetime.now().strftime('%Y%m%d%H%M%S')}"
            recipe_json["generated_by"] = "openai"
            recipe_json["generated_at"] = datetime.now().isoformat()

            logging.info(f"Generated recipe: {recipe_json['name']} using OpenAI")
            return recipe_json

        except Exception as e:
            logging.error(f"Error generating recipe with OpenAI: {str(e)}")
            return self._generate_recipe_template(req)

    def _generate_recipe_template(self, req: RecipeRequirements) -> Dict:
        """Fallback template-based recipe generation when AI is not available"""

        # Create a basic recipe based on requirements
        recipe_templates = {
            "mediterranean": {
                "breakfast": {
                    "name": "Mediterranean Breakfast Bowl",
                    "ingredients": [
                        {"item": "Greek yogurt", "amount": 1, "unit": "cup"},
                        {"item": "Honey", "amount": 1, "unit": "tbsp"},
                        {"item": "Walnuts", "amount": 0.25, "unit": "cup"},
                        {"item": "Fresh berries", "amount": 0.5, "unit": "cup"}
                    ],
                    "calories": 320,
                    "protein": 18
                },
                "lunch": {
                    "name": "Greek Salad with Grilled Chicken",
                    "ingredients": [
                        {"item": "Chicken breast", "amount": 6, "unit": "oz"},
                        {"item": "Mixed greens", "amount": 2, "unit": "cups"},
                        {"item": "Feta cheese", "amount": 0.25, "unit": "cup"},
                        {"item": "Olives", "amount": 10, "unit": "pieces"}
                    ],
                    "calories": 450,
                    "protein": 42
                },
                "dinner": {
                    "name": "Mediterranean Herb Salmon",
                    "ingredients": [
                        {"item": "Salmon fillet", "amount": 6, "unit": "oz"},
                        {"item": "Olive oil", "amount": 2, "unit": "tbsp"},
                        {"item": "Lemon", "amount": 1, "unit": "whole"},
                        {"item": "Fresh herbs", "amount": 2, "unit": "tbsp"}
                    ],
                    "calories": 520,
                    "protein": 45
                }
            },
            "intermittent_fasting": {
                "break_fast": {
                    "name": "Power Protein Smoothie",
                    "ingredients": [
                        {"item": "Protein powder", "amount": 1, "unit": "scoop"},
                        {"item": "Spinach", "amount": 1, "unit": "cup"},
                        {"item": "Banana", "amount": 0.5, "unit": "medium"},
                        {"item": "Almond butter", "amount": 1, "unit": "tbsp"}
                    ],
                    "calories": 380,
                    "protein": 32
                }
            }
        }

        # Get template for menu type and meal category
        template = recipe_templates.get(req.menu_type, {}).get(req.meal_category, {})

        if not template:
            # Create a generic recipe if no template exists
            template = {
                "name": f"{req.cuisine_style.title()} {req.meal_category.title()}",
                "ingredients": [
                    {"item": "Protein source", "amount": 6, "unit": "oz"},
                    {"item": "Vegetables", "amount": 2, "unit": "cups"},
                    {"item": "Healthy fat", "amount": 1, "unit": "tbsp"}
                ],
                "calories": req.target_calories,
                "protein": req.target_protein
            }

        # Build the complete recipe
        recipe = {
            "id": f"{req.menu_type}_{req.meal_category}_{datetime.now().strftime('%Y%m%d%H%M%S')}",
            "name": template["name"],
            "category": req.meal_category,
            "cuisine": req.cuisine_style,
            "prep_time": f"{min(req.prep_time_max, 20)} minutes",
            "cook_time": "15 minutes",
            "servings": req.family_size,
            "calories_per_serving": template["calories"],
            "protein_per_serving": f"{template['protein']}g",
            "ingredients": template["ingredients"],
            "instructions": [
                "Prepare all ingredients",
                "Cook protein as needed",
                "Combine ingredients",
                "Season to taste",
                "Serve immediately"
            ],
            "generated_by": "template",
            "generated_at": datetime.now().isoformat()
        }

        logging.info(f"Generated template recipe: {recipe['name']}")
        return recipe

    async def generate_monthly_menu(
        self,
        menu_type: str,
        month: int,
        year: int,
        dietary_restrictions: List[str] = None,
        family_size: int = 2,
        budget_level: str = "moderate"
    ) -> Dict:
        """Generate a complete monthly menu with AI-powered recipes"""

        logging.info(f"Generating {menu_type} menu for {month}/{year}")

        monthly_menu = {
            "meta": {
                "menu_type": menu_type,
                "month": month,
                "year": year,
                "family_size": family_size,
                "budget_level": budget_level,
                "dietary_restrictions": dietary_restrictions or [],
                "generated_at": datetime.now().isoformat()
            },
            "weeks": {}
        }

        # Determine season based on month
        seasons = {
            12: "winter", 1: "winter", 2: "winter",
            3: "spring", 4: "spring", 5: "spring",
            6: "summer", 7: "summer", 8: "summer",
            9: "fall", 10: "fall", 11: "fall"
        }
        season = seasons[month]

        # Generate 4 weeks of menus
        for week in range(1, 5):
            weekly_menu = {
                "week_number": week,
                "days": {}
            }

            for day in range(1, 8):  # 7 days
                daily_menu = {
                    "date": f"{year}-{month:02d}-{(week-1)*7 + day:02d}",
                    "meals": {}
                }

                # Generate meals for the day
                meal_categories = self._get_meal_categories(menu_type)

                for meal_category in meal_categories:
                    requirements = RecipeRequirements(
                        menu_type=menu_type,
                        meal_category=meal_category,
                        cuisine_style=self._get_cuisine_style(menu_type, week),
                        target_calories=self._get_target_calories(menu_type, meal_category),
                        target_protein=self._get_target_protein(menu_type, meal_category),
                        dietary_restrictions=dietary_restrictions or [],
                        prep_time_max=30 if meal_category == "dinner" else 15,
                        difficulty_level="easy" if day in [6, 7] else "medium",  # Easier on weekends
                        season=season,
                        family_size=family_size,
                        budget_level=budget_level,
                        equipment_available=["oven", "stovetop", "microwave"]
                    )

                    # Generate recipe
                    recipe = await self.generate_recipe(requirements)
                    daily_menu["meals"][meal_category] = recipe

                weekly_menu["days"][f"day_{day}"] = daily_menu

            monthly_menu["weeks"][f"week_{week}"] = weekly_menu

            # Add progress logging
            logging.info(f"Completed week {week} of {menu_type} menu")

        # Generate shopping lists
        monthly_menu["shopping_lists"] = self._generate_shopping_lists(monthly_menu)

        # Generate meal prep guides
        monthly_menu["prep_guides"] = self._generate_prep_guides(monthly_menu, menu_type)

        # Calculate summary statistics
        monthly_menu["summary"] = self._calculate_menu_summary(monthly_menu)

        logging.info(f"Successfully generated complete {menu_type} menu for {month}/{year}")
        return monthly_menu

    def _get_meal_categories(self, menu_type: str) -> List[str]:
        """Get meal categories based on menu type"""
        if menu_type == "intermittent_fasting":
            return ["break_fast", "main_meal", "optional_snack"]
        else:
            return ["breakfast", "lunch", "dinner", "snack"]

    def _get_cuisine_style(self, menu_type: str, week: int) -> str:
        """Rotate cuisine styles by week for variety"""
        cuisine_rotations = {
            "mediterranean": ["Greek", "Italian", "Spanish", "Turkish"],
            "intermittent_fasting": ["International", "Asian-inspired", "Mediterranean", "American"],
            "keto": ["American", "Italian", "Asian", "Mexican"],
            "family_friendly": ["American", "Italian", "Mexican", "Asian"]
        }

        rotations = cuisine_rotations.get(menu_type, ["International"])
        return rotations[(week - 1) % len(rotations)]

    def _get_target_calories(self, menu_type: str, meal_category: str) -> int:
        """Get target calories for a meal"""
        calorie_targets = {
            "mediterranean": {
                "breakfast": 300,
                "lunch": 450,
                "dinner": 500,
                "snack": 150
            },
            "intermittent_fasting": {
                "break_fast": 400,
                "main_meal": 700,
                "optional_snack": 300
            },
            "keto": {
                "breakfast": 400,
                "lunch": 500,
                "dinner": 500,
                "snack": 100
            }
        }

        return calorie_targets.get(menu_type, {}).get(meal_category, 400)

    def _get_target_protein(self, menu_type: str, meal_category: str) -> int:
        """Get target protein for a meal"""
        protein_targets = {
            "mediterranean": {
                "breakfast": 15,
                "lunch": 25,
                "dinner": 35,
                "snack": 10
            },
            "intermittent_fasting": {
                "break_fast": 30,
                "main_meal": 45,
                "optional_snack": 15
            }
        }

        return protein_targets.get(menu_type, {}).get(meal_category, 20)

    def _generate_shopping_lists(self, monthly_menu: Dict) -> Dict:
        """Generate weekly shopping lists from menu"""
        shopping_lists = {}

        for week_key, week_data in monthly_menu["weeks"].items():
            ingredients = []

            for day_key, day_data in week_data["days"].items():
                for meal_category, recipe in day_data["meals"].items():
                    if "ingredients" in recipe:
                        ingredients.extend(recipe["ingredients"])

            # Consolidate and categorize ingredients
            categorized = self._categorize_ingredients(ingredients)

            shopping_lists[week_key] = {
                "categories": categorized,
                "estimated_cost": self._estimate_cost(categorized),
                "shopping_tips": [
                    "Buy organic when possible",
                    "Check pantry staples before shopping",
                    "Consider bulk buying for frequently used items"
                ]
            }

        return shopping_lists

    def _categorize_ingredients(self, ingredients: List[Dict]) -> Dict:
        """Categorize ingredients by grocery store section"""
        categories = {
            "Produce": [],
            "Proteins": [],
            "Dairy": [],
            "Pantry": [],
            "Frozen": []
        }

        for ingredient in ingredients:
            item = ingredient.get("item", "")
            # Simple categorization logic
            if any(word in item.lower() for word in ["chicken", "beef", "fish", "salmon", "pork"]):
                categories["Proteins"].append(ingredient)
            elif any(word in item.lower() for word in ["yogurt", "cheese", "milk", "egg"]):
                categories["Dairy"].append(ingredient)
            elif any(word in item.lower() for word in ["frozen"]):
                categories["Frozen"].append(ingredient)
            else:
                categories["Produce"].append(ingredient)

        return {k: v for k, v in categories.items() if v}

    def _estimate_cost(self, categorized_ingredients: Dict) -> str:
        """Estimate weekly grocery cost"""
        # Simple estimation based on ingredient count
        total_items = sum(len(items) for items in categorized_ingredients.values())
        base_cost = 50
        cost_per_item = 3
        estimated = base_cost + (total_items * cost_per_item)

        return f"${estimated}-${estimated + 25}"

    def _generate_prep_guides(self, monthly_menu: Dict, menu_type: str) -> Dict:
        """Generate meal prep guides for each week"""
        prep_guides = {}

        for week_key in monthly_menu["weeks"].keys():
            prep_guides[week_key] = {
                "sunday_prep": {
                    "time_required": "2-3 hours",
                    "tasks": [
                        "Wash and chop all vegetables",
                        "Cook grains and proteins in bulk",
                        "Prepare sauces and dressings",
                        "Portion snacks into containers"
                    ]
                },
                "daily_prep": {
                    "time_required": "15-20 minutes",
                    "tasks": [
                        "Assemble meals from prepped components",
                        "Heat and season as needed",
                        "Pack lunches for next day"
                    ]
                },
                "storage_tips": [
                    "Use glass containers for best freshness",
                    "Label everything with dates",
                    "Store dressings separately"
                ]
            }

        return prep_guides

    def _calculate_menu_summary(self, monthly_menu: Dict) -> Dict:
        """Calculate summary statistics for the menu"""
        total_recipes = 0
        total_calories = 0
        total_protein = 0
        cuisines = set()

        for week_data in monthly_menu["weeks"].values():
            for day_data in week_data["days"].values():
                for recipe in day_data["meals"].values():
                    total_recipes += 1
                    if "calories_per_serving" in recipe:
                        total_calories += recipe["calories_per_serving"]
                    if "cuisine" in recipe:
                        cuisines.add(recipe["cuisine"])

        days_count = sum(len(week["days"]) for week in monthly_menu["weeks"].values())

        return {
            "total_unique_recipes": total_recipes,
            "cuisine_variety": list(cuisines),
            "average_daily_calories": int(total_calories / days_count) if days_count > 0 else 0,
            "generated_by": "AI Menu Generator",
            "ai_providers_used": self._get_active_providers()
        }

    def _get_active_providers(self) -> List[str]:
        """Get list of active AI providers"""
        providers = []
        if self.anthropic_client:
            providers.append("Claude (Anthropic)")
        if self.openai_client:
            providers.append("GPT-4 (OpenAI)")
        if not providers:
            providers.append("Template System")
        return providers

# CLI Interface
async def main():
    """Command line interface for AI menu generation"""
    import argparse

    parser = argparse.ArgumentParser(description="Generate AI-powered meal plans")
    parser.add_argument("menu_type", choices=["mediterranean", "intermittent_fasting", "keto", "family_friendly"])
    parser.add_argument("--month", type=int, default=datetime.now().month)
    parser.add_argument("--year", type=int, default=datetime.now().year)
    parser.add_argument("--family-size", type=int, default=2)
    parser.add_argument("--budget", choices=["budget", "moderate", "premium"], default="moderate")
    parser.add_argument("--restrictions", nargs="+", help="Dietary restrictions")
    parser.add_argument("--output", help="Output filename")

    args = parser.parse_args()

    # Initialize generator with API keys from environment
    generator = AIMenuGenerator(
        anthropic_api_key=os.getenv("ANTHROPIC_API_KEY"),
        openai_api_key=os.getenv("OPENAI_API_KEY")
    )

    # Generate menu
    print(f"🤖 Generating AI-powered {args.menu_type} menu for {args.month}/{args.year}...")

    menu = await generator.generate_monthly_menu(
        menu_type=args.menu_type,
        month=args.month,
        year=args.year,
        dietary_restrictions=args.restrictions,
        family_size=args.family_size,
        budget_level=args.budget
    )

    # Save to file
    output_file = args.output or f"ai_{args.menu_type}_{args.month}_{args.year}.json"
    with open(output_file, 'w') as f:
        json.dump(menu, f, indent=2)

    print(f"✅ Menu saved to {output_file}")
    print(f"📊 Generated {menu['summary']['total_unique_recipes']} recipes")
    print(f"🤖 Using: {', '.join(menu['summary']['ai_providers_used'])}")

if __name__ == "__main__":
    asyncio.run(main())