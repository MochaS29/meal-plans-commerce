#!/usr/bin/env python3
"""
Automated Meal Planning Agent System
Generates complete monthly meal plans with recipes, shopping lists, and prep strategies
"""

import json
import random
from datetime import datetime, timedelta
from dataclasses import dataclass, asdict
from typing import List, Dict, Optional
import calendar

@dataclass
class Recipe:
    id: str
    name: str
    category: str
    cuisine: str
    prep_time: str
    cook_time: str = ""
    calories: int = 0
    protein: str = "0g"
    carbs: str = "0g"
    fat: str = "0g"
    ingredients: List[str] = None
    instructions: List[str] = None
    notes: str = ""
    difficulty: str = "easy"  # easy, medium, hard
    meal_type: str = ""  # breakfast, lunch, dinner, snack

    def __post_init__(self):
        if self.ingredients is None:
            self.ingredients = []
        if self.instructions is None:
            self.instructions = []

@dataclass
class DayMenu:
    date: str
    breakfast: Recipe
    morning_snack: Optional[Recipe]
    lunch: Recipe
    afternoon_snack: Optional[Recipe]
    dinner: Recipe
    daily_calories: int = 0
    daily_protein: str = "0g"
    prep_notes: List[str] = None

    def __post_init__(self):
        if self.prep_notes is None:
            self.prep_notes = []
        self.calculate_daily_totals()

    def calculate_daily_totals(self):
        total_calories = self.breakfast.calories + self.lunch.calories + self.dinner.calories
        if self.morning_snack:
            total_calories += self.morning_snack.calories
        if self.afternoon_snack:
            total_calories += self.afternoon_snack.calories
        self.daily_calories = total_calories

@dataclass
class ShoppingList:
    week_number: int
    categories: Dict[str, List[str]]
    estimated_cost: str = "$50-75"
    notes: List[str] = None

    def __post_init__(self):
        if self.notes is None:
            self.notes = []

@dataclass
class MealPrepGuide:
    week_number: int
    total_time: str
    tasks: List[Dict[str, any]]
    storage_tips: List[str] = None

    def __post_init__(self):
        if self.storage_tips is None:
            self.storage_tips = []

class MealPlanningAgent:
    def __init__(self):
        self.recipe_database = self.load_recipe_database()
        self.menu_templates = self.load_menu_templates()
        self.nutrition_targets = self.load_nutrition_targets()

    def load_recipe_database(self) -> Dict[str, List[Recipe]]:
        """Load recipes organized by menu type and category"""
        return {
            "mediterranean": {
                "breakfast": [
                    Recipe(
                        id="med_b_001",
                        name="Greek Yogurt with Thyme Honey",
                        category="breakfast",
                        cuisine="Greek",
                        prep_time="3 minutes",
                        calories=280,
                        protein="20g",
                        carbs="24g",
                        fat="12g",
                        ingredients=[
                            "3/4 cup plain Greek yogurt (0% fat)",
                            "1 tbsp Greek thyme honey",
                            "2 tbsp chopped walnuts",
                            "1 tsp extra virgin olive oil",
                            "Pinch of cinnamon"
                        ],
                        instructions=[
                            "Place Greek yogurt in bowl",
                            "Drizzle with olive oil and honey",
                            "Top with walnuts and cinnamon",
                            "Enjoy immediately"
                        ],
                        meal_type="breakfast"
                    ),
                    Recipe(
                        id="med_b_002",
                        name="Shakshuka (Mediterranean Style)",
                        category="breakfast",
                        cuisine="North African",
                        prep_time="10 minutes",
                        cook_time="20 minutes",
                        calories=320,
                        protein="18g",
                        carbs="12g",
                        fat="22g",
                        ingredients=[
                            "2 tbsp olive oil",
                            "1/2 onion, diced",
                            "1 red bell pepper, diced",
                            "2 cloves garlic, minced",
                            "1 tsp cumin",
                            "1 tsp paprika",
                            "1 can (14 oz) crushed tomatoes",
                            "2 large eggs",
                            "2 tbsp feta cheese",
                            "Fresh cilantro"
                        ],
                        instructions=[
                            "Heat olive oil in skillet",
                            "Sauté onion and pepper until soft",
                            "Add garlic and spices, cook 1 minute",
                            "Add tomatoes, simmer 10 minutes",
                            "Create wells, crack eggs into them",
                            "Cover and cook until eggs are set",
                            "Top with feta and cilantro"
                        ],
                        meal_type="breakfast"
                    )
                ],
                "lunch": [
                    Recipe(
                        id="med_l_001",
                        name="Horiatiki (Greek Village Salad)",
                        category="lunch",
                        cuisine="Greek",
                        prep_time="15 minutes",
                        calories=420,
                        protein="12g",
                        carbs="18g",
                        fat="36g",
                        ingredients=[
                            "3 large tomatoes, cut into wedges",
                            "1 large cucumber, sliced thick",
                            "1 green bell pepper, sliced",
                            "1/2 red onion, sliced",
                            "1/2 cup Kalamata olives",
                            "4 oz feta cheese block",
                            "1/4 cup extra virgin olive oil",
                            "2 tbsp red wine vinegar",
                            "1 tsp dried oregano"
                        ],
                        instructions=[
                            "Arrange vegetables on platter",
                            "Place feta block in center",
                            "Whisk dressing ingredients",
                            "Drizzle over salad",
                            "Serve immediately"
                        ],
                        meal_type="lunch"
                    )
                ],
                "dinner": [
                    Recipe(
                        id="med_d_001",
                        name="Mediterranean Herb Chicken",
                        category="dinner",
                        cuisine="Greek",
                        prep_time="10 minutes",
                        cook_time="25 minutes",
                        calories=480,
                        protein="42g",
                        carbs="4g",
                        fat="32g",
                        ingredients=[
                            "4 boneless chicken breasts",
                            "2 tbsp extra virgin olive oil",
                            "3 cloves garlic, minced",
                            "1 lemon (zested and juiced)",
                            "2 tsp dried oregano",
                            "1 tsp dried thyme",
                            "1 tsp sea salt",
                            "1/2 tsp black pepper"
                        ],
                        instructions=[
                            "Preheat oven to 425°F",
                            "Mix oil, garlic, herbs, and seasonings",
                            "Rub mixture over chicken",
                            "Bake 20-25 minutes until done",
                            "Rest 5 minutes before serving"
                        ],
                        meal_type="dinner"
                    )
                ],
                "snacks": [
                    Recipe(
                        id="med_s_001",
                        name="Kalamata Olives & Almonds",
                        category="snack",
                        cuisine="Mediterranean",
                        prep_time="1 minute",
                        calories=150,
                        protein="6g",
                        carbs="4g",
                        fat="14g",
                        ingredients=[
                            "8 Kalamata olives",
                            "1 oz raw almonds"
                        ],
                        instructions=[
                            "Combine in small bowl",
                            "Enjoy as afternoon snack"
                        ],
                        meal_type="snack"
                    )
                ]
            },
            "intermittent_fasting": {
                "break_fast": [
                    Recipe(
                        id="if_bf_001",
                        name="Ultimate Protein Smoothie",
                        category="break_fast",
                        cuisine="International",
                        prep_time="5 minutes",
                        calories=380,
                        protein="32g",
                        carbs="28g",
                        fat="18g",
                        ingredients=[
                            "1 scoop vanilla protein powder",
                            "1 cup unsweetened almond milk",
                            "1/2 banana",
                            "1 cup fresh spinach",
                            "1 tbsp almond butter",
                            "1 tbsp chia seeds",
                            "Ice cubes"
                        ],
                        instructions=[
                            "Blend all ingredients until smooth",
                            "Add ice for desired consistency",
                            "Pour into glass and enjoy"
                        ],
                        meal_type="break_fast"
                    )
                ],
                "main_meal": [
                    Recipe(
                        id="if_mm_001",
                        name="Asian Buddha Bowl",
                        category="main_meal",
                        cuisine="Asian",
                        prep_time="20 minutes",
                        calories=520,
                        protein="22g",
                        carbs="45g",
                        fat="28g",
                        ingredients=[
                            "1 cup cooked quinoa",
                            "4 cups mixed greens",
                            "1/2 cup edamame",
                            "1/2 cup roasted sweet potato",
                            "1/4 avocado, sliced",
                            "2 tbsp sesame seeds",
                            "Tahini ginger dressing"
                        ],
                        instructions=[
                            "Arrange quinoa in bowl",
                            "Top with vegetables and edamame",
                            "Add avocado slices",
                            "Drizzle with dressing",
                            "Sprinkle with sesame seeds"
                        ],
                        meal_type="main_meal"
                    )
                ]
            }
        }

    def load_menu_templates(self) -> Dict[str, Dict]:
        """Load menu type templates with specific requirements"""
        return {
            "mediterranean": {
                "daily_calories": {"min": 1400, "max": 1500},
                "daily_protein": {"min": 80, "max": 100},
                "meal_distribution": {
                    "breakfast": 0.20,  # 20% of daily calories
                    "morning_snack": 0.10,
                    "lunch": 0.30,
                    "afternoon_snack": 0.10,
                    "dinner": 0.30
                },
                "cuisine_variety": ["Greek", "Italian", "Spanish", "Turkish", "North African"],
                "weekly_fish_meals": 3,
                "weekly_legume_meals": 3
            },
            "intermittent_fasting": {
                "phases": {
                    "phase_1": {"days": "1-7", "eating_window": "7:00 AM - 7:00 PM"},
                    "phase_2": {"days": "8-14", "eating_window": "8:00 AM - 6:00 PM"},
                    "phase_3": {"days": "15-21", "eating_window": "9:00 AM - 6:00 PM"},
                    "phase_4": {"days": "22-30", "eating_window": "12:00 PM - 8:00 PM"}
                },
                "daily_calories": {"min": 1400, "max": 1600},
                "meal_focus": "high_protein_first_meal"
            },
            "keto": {
                "daily_calories": {"min": 1200, "max": 1500},
                "macros": {"fat": 0.70, "protein": 0.25, "carbs": 0.05},
                "net_carbs_limit": 20
            },
            "family_friendly": {
                "daily_calories": {"min": 1600, "max": 2000},
                "kid_approved_ratio": 0.8,  # 80% of meals should be kid-friendly
                "prep_time_limit": 30  # minutes max for weeknight dinners
            }
        }

    def load_nutrition_targets(self) -> Dict[str, Dict]:
        """Load nutrition targets for different menu types"""
        return {
            "mediterranean": {
                "calories_per_day": 1450,
                "protein_per_day": "85g",
                "fat_percentage": 35,
                "carb_percentage": 45,
                "fiber_per_day": "30g"
            },
            "intermittent_fasting": {
                "calories_per_day": 1500,
                "protein_per_day": "100g",
                "fat_percentage": 30,
                "carb_percentage": 40
            }
        }

    def generate_monthly_plan(self, menu_type: str, month: int, year: int) -> Dict:
        """Generate a complete monthly meal plan"""
        # Get month info
        month_name = calendar.month_name[month]
        days_in_month = calendar.monthrange(year, month)[1]

        # Initialize plan structure
        monthly_plan = {
            "meta": {
                "menu_type": menu_type,
                "month": month_name,
                "year": year,
                "days_in_month": days_in_month,
                "generated_date": datetime.now().isoformat(),
                "nutrition_targets": self.nutrition_targets.get(menu_type, {})
            },
            "daily_menus": {},
            "weekly_shopping_lists": {},
            "weekly_prep_guides": {},
            "recipe_collection": {},
            "month_summary": {}
        }

        # Generate daily menus
        for day in range(1, days_in_month + 1):
            date_str = f"{year}-{month:02d}-{day:02d}"
            daily_menu = self.generate_daily_menu(menu_type, date_str, day)
            monthly_plan["daily_menus"][f"day_{day}"] = asdict(daily_menu)

        # Generate weekly shopping lists
        weeks = self.organize_days_into_weeks(days_in_month)
        for week_num, week_days in weeks.items():
            shopping_list = self.generate_shopping_list(monthly_plan, week_days, week_num)
            monthly_plan["weekly_shopping_lists"][f"week_{week_num}"] = asdict(shopping_list)

        # Generate weekly prep guides
        for week_num in weeks.keys():
            prep_guide = self.generate_prep_guide(monthly_plan, week_num, menu_type)
            monthly_plan["weekly_prep_guides"][f"week_{week_num}"] = asdict(prep_guide)

        # Compile recipe collection
        monthly_plan["recipe_collection"] = self.compile_recipe_collection(monthly_plan)

        # Generate month summary
        monthly_plan["month_summary"] = self.generate_month_summary(monthly_plan)

        return monthly_plan

    def generate_daily_menu(self, menu_type: str, date_str: str, day_number: int) -> DayMenu:
        """Generate a single day's menu"""
        template = self.menu_templates[menu_type]
        recipes = self.recipe_database[menu_type]

        # Select recipes based on menu type logic
        if menu_type == "mediterranean":
            breakfast = random.choice(recipes["breakfast"])
            lunch = random.choice(recipes["lunch"])
            dinner = random.choice(recipes["dinner"])
            morning_snack = random.choice(recipes["snacks"])
            afternoon_snack = random.choice(recipes["snacks"])

        elif menu_type == "intermittent_fasting":
            # Determine which phase this day falls into
            phase = self.get_if_phase(day_number)

            if phase in ["phase_1", "phase_2"]:
                # Earlier phases have more meals
                breakfast = random.choice(recipes["break_fast"])
                lunch = random.choice(recipes["main_meal"])
                dinner = random.choice(recipes["main_meal"])
                morning_snack = random.choice(recipes.get("snacks", [recipes["break_fast"][0]]))
                afternoon_snack = None
            else:
                # Later phases have fewer meals
                breakfast = random.choice(recipes["break_fast"])
                lunch = None
                dinner = random.choice(recipes["main_meal"])
                morning_snack = None
                afternoon_snack = random.choice(recipes.get("snacks", [recipes["break_fast"][0]]))

        # Generate prep notes
        prep_notes = self.generate_daily_prep_notes(breakfast, lunch, dinner)

        return DayMenu(
            date=date_str,
            breakfast=breakfast,
            morning_snack=morning_snack,
            lunch=lunch,
            afternoon_snack=afternoon_snack,
            dinner=dinner,
            prep_notes=prep_notes
        )

    def get_if_phase(self, day_number: int) -> str:
        """Determine IF phase based on day number"""
        if 1 <= day_number <= 7:
            return "phase_1"
        elif 8 <= day_number <= 14:
            return "phase_2"
        elif 15 <= day_number <= 21:
            return "phase_3"
        else:
            return "phase_4"

    def generate_daily_prep_notes(self, breakfast: Recipe, lunch: Optional[Recipe], dinner: Recipe) -> List[str]:
        """Generate daily prep notes"""
        notes = []

        # Check if any recipes require advance prep
        if breakfast.prep_time and "overnight" in breakfast.prep_time.lower():
            notes.append(f"Prepare {breakfast.name} the night before")

        if lunch and lunch.cook_time and int(lunch.cook_time.split()[0]) > 30:
            notes.append(f"Start {lunch.name} early - requires {lunch.cook_time}")

        if dinner.difficulty == "hard":
            notes.append(f"Plan extra time for {dinner.name} - more complex preparation")

        return notes

    def organize_days_into_weeks(self, days_in_month: int) -> Dict[int, List[int]]:
        """Organize days into weeks for shopping list generation"""
        weeks = {}
        current_week = 1
        week_start = 1

        while week_start <= days_in_month:
            week_end = min(week_start + 6, days_in_month)
            weeks[current_week] = list(range(week_start, week_end + 1))
            week_start = week_end + 1
            current_week += 1

        return weeks

    def generate_shopping_list(self, monthly_plan: Dict, week_days: List[int], week_number: int) -> ShoppingList:
        """Generate shopping list for a specific week"""
        all_ingredients = []

        # Collect ingredients from all meals in the week
        for day in week_days:
            day_menu = monthly_plan["daily_menus"][f"day_{day}"]

            # Add ingredients from each meal
            for meal_type in ["breakfast", "lunch", "dinner", "morning_snack", "afternoon_snack"]:
                meal = day_menu.get(meal_type)
                if meal and meal.get("ingredients"):
                    all_ingredients.extend(meal["ingredients"])

        # Organize ingredients by category
        categorized_ingredients = self.categorize_ingredients(all_ingredients)

        # Add shopping tips
        notes = [
            f"Shop for Week {week_number} of your meal plan",
            "Buy organic when possible for produce",
            "Check pantry staples before shopping",
            "Consider buying proteins in bulk and freezing"
        ]

        return ShoppingList(
            week_number=week_number,
            categories=categorized_ingredients,
            estimated_cost=f"${50 + (week_number * 10)}-{75 + (week_number * 15)}",
            notes=notes
        )

    def categorize_ingredients(self, ingredients: List[str]) -> Dict[str, List[str]]:
        """Categorize ingredients by grocery store section"""
        categories = {
            "Fresh Produce": [],
            "Proteins": [],
            "Dairy & Eggs": [],
            "Pantry Staples": [],
            "Herbs & Spices": [],
            "Frozen": [],
            "Other": []
        }

        # Simple categorization logic (would be more sophisticated in production)
        for ingredient in set(ingredients):  # Remove duplicates
            ingredient_lower = ingredient.lower()

            if any(word in ingredient_lower for word in ["chicken", "beef", "fish", "salmon", "turkey", "pork"]):
                categories["Proteins"].append(ingredient)
            elif any(word in ingredient_lower for word in ["yogurt", "cheese", "milk", "egg"]):
                categories["Dairy & Eggs"].append(ingredient)
            elif any(word in ingredient_lower for word in ["tomato", "cucumber", "onion", "pepper", "spinach", "lettuce", "avocado"]):
                categories["Fresh Produce"].append(ingredient)
            elif any(word in ingredient_lower for word in ["oil", "vinegar", "honey", "salt", "quinoa", "rice"]):
                categories["Pantry Staples"].append(ingredient)
            elif any(word in ingredient_lower for word in ["oregano", "thyme", "basil", "cumin", "paprika", "cinnamon"]):
                categories["Herbs & Spices"].append(ingredient)
            else:
                categories["Other"].append(ingredient)

        # Remove empty categories
        return {k: v for k, v in categories.items() if v}

    def generate_prep_guide(self, monthly_plan: Dict, week_number: int, menu_type: str) -> MealPrepGuide:
        """Generate weekly meal prep guide"""
        tasks = []

        # Base prep tasks
        if menu_type == "mediterranean":
            tasks = [
                {
                    "task": "Protein Preparation (45 minutes)",
                    "steps": [
                        "Grill chicken breasts for the week",
                        "Hard-boil 6-8 eggs",
                        "Prepare herb marinades"
                    ],
                    "storage": "Store proteins in glass containers, use within 4 days"
                },
                {
                    "task": "Vegetable Prep (30 minutes)",
                    "steps": [
                        "Wash and chop salad vegetables",
                        "Roast vegetables for multiple meals",
                        "Prepare cucumber and tomato for Greek salads"
                    ],
                    "storage": "Store cut vegetables in airtight containers"
                },
                {
                    "task": "Mediterranean Staples (15 minutes)",
                    "steps": [
                        "Portion olives and nuts into containers",
                        "Make olive oil and herb dressings",
                        "Prepare tzatziki if needed"
                    ],
                    "storage": "Dressings last 1 week refrigerated"
                }
            ]

        elif menu_type == "intermittent_fasting":
            tasks = [
                {
                    "task": "Smoothie Prep (20 minutes)",
                    "steps": [
                        "Portion smoothie ingredients into freezer bags",
                        "Pre-wash greens and store properly",
                        "Prepare protein powder portions"
                    ],
                    "storage": "Freezer bags last 1 month"
                },
                {
                    "task": "Main Meal Components (40 minutes)",
                    "steps": [
                        "Cook grains in batches (quinoa, rice)",
                        "Prepare proteins for quick assembly",
                        "Roast vegetables for bowls"
                    ],
                    "storage": "Grains last 5 days, proteins 4 days"
                }
            ]

        storage_tips = [
            "Use glass containers when possible",
            "Label everything with dates",
            "Store proteins on bottom shelf of fridge",
            "Keep cut vegetables in airtight containers",
            "Freeze extra portions for backup meals"
        ]

        return MealPrepGuide(
            week_number=week_number,
            total_time="2-3 hours",
            tasks=tasks,
            storage_tips=storage_tips
        )

    def compile_recipe_collection(self, monthly_plan: Dict) -> Dict[str, Recipe]:
        """Compile all unique recipes used in the monthly plan"""
        unique_recipes = {}

        for day_key, day_menu in monthly_plan["daily_menus"].items():
            for meal_type in ["breakfast", "lunch", "dinner", "morning_snack", "afternoon_snack"]:
                meal = day_menu.get(meal_type)
                if meal and meal.get("id"):
                    unique_recipes[meal["id"]] = meal

        return unique_recipes

    def generate_month_summary(self, monthly_plan: Dict) -> Dict:
        """Generate summary statistics for the month"""
        total_recipes = len(monthly_plan["recipe_collection"])
        cuisines = set()
        total_prep_time = 0

        for recipe in monthly_plan["recipe_collection"].values():
            if recipe.get("cuisine"):
                cuisines.add(recipe["cuisine"])

            # Calculate total prep time (simplified)
            prep_minutes = self.extract_minutes_from_time(recipe.get("prep_time", "0 minutes"))
            cook_minutes = self.extract_minutes_from_time(recipe.get("cook_time", "0 minutes"))
            total_prep_time += prep_minutes + cook_minutes

        avg_daily_calories = sum(
            day_menu.get("daily_calories", 0)
            for day_menu in monthly_plan["daily_menus"].values()
        ) / len(monthly_plan["daily_menus"])

        return {
            "total_unique_recipes": total_recipes,
            "cuisine_variety": list(cuisines),
            "estimated_monthly_prep_time": f"{total_prep_time // 60} hours {total_prep_time % 60} minutes",
            "average_daily_calories": int(avg_daily_calories),
            "weekly_shopping_trips": len(monthly_plan["weekly_shopping_lists"]),
            "meal_variety_score": total_recipes / len(monthly_plan["daily_menus"])  # recipes per day
        }

    def extract_minutes_from_time(self, time_str: str) -> int:
        """Extract minutes from time strings like '30 minutes' or '1 hour'"""
        if not time_str:
            return 0

        time_str = time_str.lower()
        minutes = 0

        if "hour" in time_str:
            hours = int(time_str.split()[0]) if time_str.split()[0].isdigit() else 1
            minutes += hours * 60
        elif "minute" in time_str:
            mins = int(time_str.split()[0]) if time_str.split()[0].isdigit() else 0
            minutes += mins

        return minutes

    def save_monthly_plan(self, monthly_plan: Dict, filename: str = None) -> str:
        """Save monthly plan to JSON file"""
        if not filename:
            menu_type = monthly_plan["meta"]["menu_type"]
            month = monthly_plan["meta"]["month"]
            year = monthly_plan["meta"]["year"]
            filename = f"{menu_type}_{month}_{year}_meal_plan.json"

        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(monthly_plan, f, indent=2, ensure_ascii=False)

        return filename

# Example usage and CLI interface
def main():
    """Command line interface for the meal planning agent"""
    import argparse

    parser = argparse.ArgumentParser(description="Generate automated meal plans")
    parser.add_argument("menu_type", choices=["mediterranean", "intermittent_fasting", "keto", "family_friendly"],
                       help="Type of meal plan to generate")
    parser.add_argument("--month", type=int, default=datetime.now().month,
                       help="Month number (1-12)")
    parser.add_argument("--year", type=int, default=datetime.now().year,
                       help="Year")
    parser.add_argument("--output", type=str, help="Output filename")

    args = parser.parse_args()

    # Initialize agent
    agent = MealPlanningAgent()

    # Generate plan
    print(f"Generating {args.menu_type} meal plan for {calendar.month_name[args.month]} {args.year}...")
    monthly_plan = agent.generate_monthly_plan(args.menu_type, args.month, args.year)

    # Save plan
    filename = agent.save_monthly_plan(monthly_plan, args.output)
    print(f"Meal plan saved to: {filename}")

    # Print summary
    summary = monthly_plan["month_summary"]
    print(f"\nPlan Summary:")
    print(f"- {summary['total_unique_recipes']} unique recipes")
    print(f"- {len(summary['cuisine_variety'])} different cuisines")
    print(f"- Average {summary['average_daily_calories']} calories per day")
    print(f"- {summary['weekly_shopping_trips']} weekly shopping trips")

if __name__ == "__main__":
    main()