#!/usr/bin/env python3
"""
Enhanced Meal Planning Agent with AI Integration
Combines template-based and AI-powered recipe generation
"""

import json
import os
import logging
import asyncio
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, asdict
import calendar

from meal_planning_agent import MealPlanningAgent, Recipe, DayMenu, ShoppingList, MealPrepGuide
from ai_menu_generator import AIMenuGenerator, RecipeRequirements

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

class EnhancedMealPlanningAgent(MealPlanningAgent):
    """Enhanced agent with AI capabilities"""

    def __init__(self, anthropic_key: str = None, openai_key: str = None):
        super().__init__()

        # Initialize AI generator
        self.ai_generator = AIMenuGenerator(
            anthropic_api_key=anthropic_key or os.getenv('ANTHROPIC_API_KEY'),
            openai_api_key=openai_key or os.getenv('OPENAI_API_KEY')
        )

        self.ai_enabled = bool(anthropic_key or openai_key or
                               os.getenv('ANTHROPIC_API_KEY') or
                               os.getenv('OPENAI_API_KEY'))

        if self.ai_enabled:
            logging.info("AI generation enabled")
        else:
            logging.info("AI generation disabled - using templates only")

    async def generate_ai_monthly_plan(
        self,
        menu_type: str,
        month: int,
        year: int,
        custom_requirements: Dict = None,
        use_ai: bool = True
    ) -> Dict:
        """Generate monthly plan with AI-enhanced recipes"""

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
                "ai_enabled": self.ai_enabled and use_ai,
                "nutrition_targets": self.nutrition_targets.get(menu_type, {}),
                "custom_requirements": custom_requirements or {}
            },
            "daily_menus": {},
            "weekly_shopping_lists": {},
            "weekly_prep_guides": {},
            "recipe_collection": {},
            "month_summary": {}
        }

        # Determine season
        seasons = {
            12: "winter", 1: "winter", 2: "winter",
            3: "spring", 4: "spring", 5: "spring",
            6: "summer", 7: "summer", 8: "summer",
            9: "fall", 10: "fall", 11: "fall"
        }
        season = seasons[month]

        # Track AI vs template recipes
        ai_recipe_count = 0
        template_recipe_count = 0

        # Generate daily menus
        for day in range(1, days_in_month + 1):
            date_str = f"{year}-{month:02d}-{day:02d}"

            if self.ai_enabled and use_ai:
                # Try AI generation
                try:
                    daily_menu = await self._generate_ai_daily_menu(
                        menu_type, date_str, day, season, custom_requirements
                    )
                    ai_recipe_count += len([m for m in daily_menu.__dict__.values()
                                          if isinstance(m, Recipe)])
                except Exception as e:
                    logging.warning(f"AI generation failed for day {day}: {str(e)}")
                    # Fallback to template
                    daily_menu = self.generate_daily_menu(menu_type, date_str, day)
                    template_recipe_count += len([m for m in daily_menu.__dict__.values()
                                                 if isinstance(m, Recipe)])
            else:
                # Use template generation
                daily_menu = self.generate_daily_menu(menu_type, date_str, day)
                template_recipe_count += len([m for m in daily_menu.__dict__.values()
                                             if isinstance(m, Recipe)])

            monthly_plan["daily_menus"][f"day_{day}"] = asdict(daily_menu)

            # Progress indicator
            if day % 7 == 0:
                logging.info(f"Completed week {day // 7} of {menu_type} plan generation")

        # Generate weekly shopping lists
        weeks = self.organize_days_into_weeks(days_in_month)
        for week_num, week_days in weeks.items():
            shopping_list = self._generate_enhanced_shopping_list(monthly_plan, week_days, week_num)
            monthly_plan["weekly_shopping_lists"][f"week_{week_num}"] = asdict(shopping_list)

        # Generate weekly prep guides
        for week_num in weeks.keys():
            prep_guide = self._generate_enhanced_prep_guide(monthly_plan, week_num, menu_type)
            monthly_plan["weekly_prep_guides"][f"week_{week_num}"] = asdict(prep_guide)

        # Compile recipe collection
        monthly_plan["recipe_collection"] = self.compile_recipe_collection(monthly_plan)

        # Generate enhanced month summary
        monthly_plan["month_summary"] = self._generate_enhanced_summary(
            monthly_plan, ai_recipe_count, template_recipe_count
        )

        logging.info(f"Successfully generated {menu_type} plan for {month_name} {year}")
        logging.info(f"AI recipes: {ai_recipe_count}, Template recipes: {template_recipe_count}")

        return monthly_plan

    async def _generate_ai_daily_menu(
        self,
        menu_type: str,
        date_str: str,
        day_number: int,
        season: str,
        custom_requirements: Dict = None
    ) -> DayMenu:
        """Generate daily menu using AI"""

        custom_requirements = custom_requirements or {}
        family_size = custom_requirements.get('family_size', 2)
        budget_level = custom_requirements.get('budget_level', 'moderate')
        dietary_restrictions = custom_requirements.get('dietary_restrictions', [])

        # Determine meal categories based on menu type
        if menu_type == "intermittent_fasting":
            meal_categories = ["break_fast", "main_meal", "snack"]
        else:
            meal_categories = ["breakfast", "lunch", "dinner", "snack"]

        recipes = {}

        for meal_category in meal_categories:
            # Create requirements for this meal
            requirements = RecipeRequirements(
                menu_type=menu_type,
                meal_category=meal_category,
                cuisine_style=self._get_cuisine_rotation(menu_type, day_number),
                target_calories=self._get_meal_calories(menu_type, meal_category),
                target_protein=self._get_meal_protein(menu_type, meal_category),
                dietary_restrictions=dietary_restrictions,
                prep_time_max=30 if meal_category == "dinner" else 15,
                difficulty_level="easy" if day_number % 7 in [0, 6] else "medium",
                season=season,
                family_size=family_size,
                budget_level=budget_level,
                equipment_available=["oven", "stovetop", "microwave"]
            )

            # Generate recipe using AI
            ai_recipe = await self.ai_generator.generate_recipe(requirements)

            # Convert to Recipe dataclass
            recipe = Recipe(
                id=ai_recipe.get('id', f"{menu_type}_{meal_category}_{day_number}"),
                name=ai_recipe.get('name', f"AI {meal_category.title()}"),
                category=meal_category,
                cuisine=ai_recipe.get('cuisine', 'International'),
                prep_time=ai_recipe.get('prep_time', '15 minutes'),
                cook_time=ai_recipe.get('cook_time', ''),
                calories=ai_recipe.get('calories_per_serving', 400),
                protein=ai_recipe.get('protein_per_serving', '20g'),
                carbs=ai_recipe.get('carbs_per_serving', '40g'),
                fat=ai_recipe.get('fat_per_serving', '15g'),
                ingredients=ai_recipe.get('ingredients', []),
                instructions=ai_recipe.get('instructions', []),
                meal_type=meal_category,
                difficulty=ai_recipe.get('difficulty', 'easy')
            )

            recipes[meal_category] = recipe

        # Build DayMenu
        return DayMenu(
            date=date_str,
            breakfast=recipes.get('breakfast') or recipes.get('break_fast'),
            morning_snack=recipes.get('morning_snack'),
            lunch=recipes.get('lunch') or recipes.get('main_meal'),
            afternoon_snack=recipes.get('afternoon_snack') or recipes.get('snack'),
            dinner=recipes.get('dinner'),
            prep_notes=self._generate_ai_prep_notes(recipes)
        )

    def _get_cuisine_rotation(self, menu_type: str, day_number: int) -> str:
        """Get cuisine style based on rotation"""
        rotations = {
            "mediterranean": ["Greek", "Italian", "Spanish", "Turkish", "North African", "French", "Lebanese"],
            "intermittent_fasting": ["International", "Asian", "Mediterranean", "American", "Mexican"],
            "keto": ["American", "Italian", "Asian", "Mexican"],
            "family_friendly": ["American", "Italian", "Mexican", "Asian", "Comfort"]
        }

        cuisine_list = rotations.get(menu_type, ["International"])
        return cuisine_list[day_number % len(cuisine_list)]

    def _get_meal_calories(self, menu_type: str, meal_category: str) -> int:
        """Get target calories for meal"""
        targets = {
            "mediterranean": {
                "breakfast": 300,
                "lunch": 450,
                "dinner": 500,
                "snack": 150
            },
            "intermittent_fasting": {
                "break_fast": 400,
                "main_meal": 700,
                "snack": 300
            }
        }

        return targets.get(menu_type, {}).get(meal_category, 400)

    def _get_meal_protein(self, menu_type: str, meal_category: str) -> int:
        """Get target protein for meal"""
        targets = {
            "mediterranean": {
                "breakfast": 15,
                "lunch": 25,
                "dinner": 35,
                "snack": 10
            },
            "intermittent_fasting": {
                "break_fast": 30,
                "main_meal": 45,
                "snack": 15
            }
        }

        return targets.get(menu_type, {}).get(meal_category, 20)

    def _generate_ai_prep_notes(self, recipes: Dict[str, Recipe]) -> List[str]:
        """Generate intelligent prep notes based on AI recipes"""
        notes = []

        # Analyze recipes for prep optimization
        total_prep_time = sum(
            self._parse_time(r.prep_time)
            for r in recipes.values()
            if r and r.prep_time
        )

        if total_prep_time > 60:
            notes.append(f"Consider batch prepping - total prep time: {total_prep_time} minutes")

        # Check for common ingredients
        all_ingredients = []
        for recipe in recipes.values():
            if recipe and recipe.ingredients:
                all_ingredients.extend(recipe.ingredients)

        # Find duplicate ingredients for efficiency
        ingredient_counts = {}
        for ingredient in all_ingredients:
            base = self._extract_base_ingredient(ingredient)
            ingredient_counts[base] = ingredient_counts.get(base, 0) + 1

        for ingredient, count in ingredient_counts.items():
            if count > 1:
                notes.append(f"Prep all {ingredient} at once - used in {count} recipes")

        return notes

    def _parse_time(self, time_str: str) -> int:
        """Parse time string to minutes"""
        if not time_str:
            return 0

        import re
        match = re.search(r'(\d+)', time_str)
        if match:
            return int(match.group(1))
        return 0

    def _extract_base_ingredient(self, ingredient_str: str) -> str:
        """Extract base ingredient from full ingredient string"""
        if isinstance(ingredient_str, dict):
            return ingredient_str.get('item', '')

        # Simple extraction - could be enhanced
        import re
        # Remove quantities and units
        cleaned = re.sub(r'^\d+[\d/\s]*\w*\s*', '', str(ingredient_str))
        # Take first few words
        words = cleaned.split()[:2]
        return ' '.join(words).lower().strip(',')

    def _generate_enhanced_shopping_list(
        self,
        monthly_plan: Dict,
        week_days: List[int],
        week_number: int
    ) -> ShoppingList:
        """Generate enhanced shopping list with AI insights"""

        all_ingredients = []

        # Collect ingredients from all meals in the week
        for day in week_days:
            day_menu = monthly_plan["daily_menus"][f"day_{day}"]

            for meal_type in ["breakfast", "lunch", "dinner", "morning_snack", "afternoon_snack"]:
                meal = day_menu.get(meal_type)
                if meal and meal.get("ingredients"):
                    all_ingredients.extend(meal["ingredients"])

        # Smart categorization
        categorized = self._smart_categorize_ingredients(all_ingredients)

        # Generate shopping tips based on ingredients
        tips = self._generate_shopping_tips(categorized, week_number)

        # Estimate cost more accurately
        estimated_cost = self._estimate_shopping_cost(categorized)

        return ShoppingList(
            week_number=week_number,
            categories=categorized,
            estimated_cost=estimated_cost,
            notes=tips
        )

    def _smart_categorize_ingredients(self, ingredients: List) -> Dict[str, List[str]]:
        """Smart ingredient categorization with deduplication"""

        categories = {
            "Fresh Produce": [],
            "Proteins": [],
            "Dairy & Eggs": [],
            "Pantry Staples": [],
            "Herbs & Spices": [],
            "Frozen": [],
            "Bakery": [],
            "Other": []
        }

        # Process and deduplicate ingredients
        processed = set()

        for ingredient in ingredients:
            # Handle both string and dict ingredients
            if isinstance(ingredient, dict):
                ingredient_str = f"{ingredient.get('amount', '')} {ingredient.get('unit', '')} {ingredient.get('item', '')}"
            else:
                ingredient_str = str(ingredient)

            # Extract base ingredient for deduplication
            base = self._extract_base_ingredient(ingredient_str)

            if base not in processed:
                processed.add(base)

                # Categorize based on keywords
                ingredient_lower = ingredient_str.lower()

                if any(word in ingredient_lower for word in
                      ["chicken", "beef", "fish", "salmon", "turkey", "pork", "lamb", "shrimp"]):
                    categories["Proteins"].append(ingredient_str)
                elif any(word in ingredient_lower for word in
                        ["yogurt", "cheese", "milk", "egg", "cream", "butter"]):
                    categories["Dairy & Eggs"].append(ingredient_str)
                elif any(word in ingredient_lower for word in
                        ["lettuce", "tomato", "cucumber", "carrot", "onion", "pepper",
                         "broccoli", "spinach", "kale", "fruit", "apple", "banana"]):
                    categories["Fresh Produce"].append(ingredient_str)
                elif any(word in ingredient_lower for word in
                        ["oil", "vinegar", "rice", "pasta", "quinoa", "beans", "flour"]):
                    categories["Pantry Staples"].append(ingredient_str)
                elif any(word in ingredient_lower for word in
                        ["oregano", "basil", "thyme", "cumin", "paprika", "garlic", "ginger"]):
                    categories["Herbs & Spices"].append(ingredient_str)
                elif any(word in ingredient_lower for word in ["bread", "roll", "tortilla"]):
                    categories["Bakery"].append(ingredient_str)
                elif "frozen" in ingredient_lower:
                    categories["Frozen"].append(ingredient_str)
                else:
                    categories["Other"].append(ingredient_str)

        # Remove empty categories
        return {k: v for k, v in categories.items() if v}

    def _generate_shopping_tips(self, categorized: Dict, week_number: int) -> List[str]:
        """Generate smart shopping tips based on ingredients"""

        tips = [f"Shopping list for Week {week_number}"]

        # Analyze categories for tips
        if "Fresh Produce" in categorized and len(categorized["Fresh Produce"]) > 10:
            tips.append("Consider farmers market for fresh produce - better prices and quality")

        if "Proteins" in categorized:
            tips.append("Buy proteins in bulk and freeze portions for later weeks")

        if "Herbs & Spices" in categorized and len(categorized["Herbs & Spices"]) > 5:
            tips.append("Check spice rack before shopping - many herbs may already be available")

        # Seasonal tip
        import datetime
        month = datetime.datetime.now().month
        if month in [6, 7, 8]:
            tips.append("Summer produce is at peak - look for local seasonal deals")
        elif month in [12, 1, 2]:
            tips.append("Winter root vegetables and citrus are in season")

        return tips

    def _estimate_shopping_cost(self, categorized: Dict) -> str:
        """More accurate cost estimation based on categories"""

        cost_per_category = {
            "Fresh Produce": 3,
            "Proteins": 8,
            "Dairy & Eggs": 4,
            "Pantry Staples": 2,
            "Herbs & Spices": 2,
            "Frozen": 3,
            "Bakery": 2,
            "Other": 2
        }

        total_min = 40  # Base cost
        total_max = 40

        for category, items in categorized.items():
            item_cost = cost_per_category.get(category, 2)
            total_min += len(items) * item_cost * 0.8
            total_max += len(items) * item_cost * 1.2

        return f"${int(total_min)}-${int(total_max)}"

    def _generate_enhanced_prep_guide(
        self,
        monthly_plan: Dict,
        week_number: int,
        menu_type: str
    ) -> MealPrepGuide:
        """Generate enhanced prep guide with AI insights"""

        # Analyze week's recipes
        week_recipes = []
        for day in range((week_number - 1) * 7 + 1, min(week_number * 7 + 1, 32)):
            if f"day_{day}" in monthly_plan["daily_menus"]:
                day_menu = monthly_plan["daily_menus"][f"day_{day}"]
                for meal in ["breakfast", "lunch", "dinner"]:
                    if meal in day_menu and day_menu[meal]:
                        week_recipes.append(day_menu[meal])

        # Generate smart prep tasks
        tasks = self._generate_smart_prep_tasks(week_recipes, menu_type)

        # Generate storage tips based on ingredients
        storage_tips = self._generate_storage_tips(week_recipes)

        # Calculate total prep time
        total_time = self._calculate_total_prep_time(tasks)

        return MealPrepGuide(
            week_number=week_number,
            total_time=total_time,
            tasks=tasks,
            storage_tips=storage_tips
        )

    def _generate_smart_prep_tasks(self, recipes: List[Dict], menu_type: str) -> List[Dict]:
        """Generate intelligent prep tasks based on recipes"""

        tasks = []

        # Analyze recipes for common prep needs
        proteins = set()
        vegetables = set()
        grains = set()

        for recipe in recipes:
            if recipe and recipe.get('ingredients'):
                for ingredient in recipe['ingredients']:
                    ingredient_str = str(ingredient).lower()

                    if any(word in ingredient_str for word in ["chicken", "beef", "fish"]):
                        proteins.add(self._extract_base_ingredient(ingredient))
                    elif any(word in ingredient_str for word in ["rice", "quinoa", "pasta"]):
                        grains.add(self._extract_base_ingredient(ingredient))
                    elif any(word in ingredient_str for word in ["onion", "pepper", "carrot"]):
                        vegetables.add(self._extract_base_ingredient(ingredient))

        # Create tasks based on findings
        if proteins:
            tasks.append({
                "task": "Protein Preparation",
                "time": "45 minutes",
                "steps": [
                    f"Marinate {', '.join(list(proteins)[:3])}",
                    "Portion into meal-sized containers",
                    "Label with dates"
                ],
                "storage": "Refrigerate for up to 4 days or freeze for later"
            })

        if vegetables:
            tasks.append({
                "task": "Vegetable Prep",
                "time": "30 minutes",
                "steps": [
                    "Wash all vegetables thoroughly",
                    f"Chop {', '.join(list(vegetables)[:3])}",
                    "Store in airtight containers"
                ],
                "storage": "Keep in crisper drawer, use within 5 days"
            })

        if grains:
            tasks.append({
                "task": "Grain Cooking",
                "time": "30 minutes",
                "steps": [
                    f"Cook {', '.join(grains)} in bulk",
                    "Cool completely before storing",
                    "Portion into containers"
                ],
                "storage": "Refrigerate for up to 5 days"
            })

        # Add menu-type specific tasks
        if menu_type == "mediterranean":
            tasks.append({
                "task": "Mediterranean Staples",
                "time": "15 minutes",
                "steps": [
                    "Prepare herb oil blend",
                    "Make tzatziki or hummus",
                    "Portion olives and feta"
                ],
                "storage": "Store dressings in glass jars"
            })

        return tasks

    def _generate_storage_tips(self, recipes: List[Dict]) -> List[str]:
        """Generate storage tips based on recipe ingredients"""

        tips = [
            "Use glass containers for best freshness",
            "Label everything with prep date",
            "Store raw meats on bottom shelf"
        ]

        # Check for specific ingredients that need special storage
        has_herbs = False
        has_leafy_greens = False
        has_berries = False

        for recipe in recipes:
            if recipe and recipe.get('ingredients'):
                ingredients_str = ' '.join(str(i) for i in recipe['ingredients']).lower()

                if any(herb in ingredients_str for herb in ["basil", "cilantro", "parsley"]):
                    has_herbs = True
                if any(green in ingredients_str for green in ["lettuce", "spinach", "kale"]):
                    has_leafy_greens = True
                if any(berry in ingredients_str for berry in ["berries", "strawberr", "blueberr"]):
                    has_berries = True

        if has_herbs:
            tips.append("Store fresh herbs like flowers in water, cover with plastic bag")
        if has_leafy_greens:
            tips.append("Wrap leafy greens in paper towels to absorb moisture")
        if has_berries:
            tips.append("Don't wash berries until ready to use")

        return tips

    def _calculate_total_prep_time(self, tasks: List[Dict]) -> str:
        """Calculate total prep time from tasks"""

        total_minutes = 0

        for task in tasks:
            time_str = task.get('time', '0 minutes')
            minutes = self._parse_time(time_str)
            total_minutes += minutes

        hours = total_minutes // 60
        minutes = total_minutes % 60

        if hours > 0:
            return f"{hours} hours {minutes} minutes"
        else:
            return f"{minutes} minutes"

    def _generate_enhanced_summary(
        self,
        monthly_plan: Dict,
        ai_recipes: int,
        template_recipes: int
    ) -> Dict:
        """Generate enhanced summary with AI metrics"""

        # Get base summary
        base_summary = self.generate_month_summary(monthly_plan)

        # Add AI-specific metrics
        base_summary.update({
            "ai_generated_recipes": ai_recipes,
            "template_recipes": template_recipes,
            "ai_generation_rate": f"{(ai_recipes / (ai_recipes + template_recipes) * 100):.1f}%" if (ai_recipes + template_recipes) > 0 else "0%",
            "variety_score": self._calculate_variety_score(monthly_plan),
            "difficulty_distribution": self._analyze_difficulty(monthly_plan),
            "estimated_total_prep_time": self._estimate_total_prep_time(monthly_plan)
        })

        return base_summary

    def _calculate_variety_score(self, monthly_plan: Dict) -> float:
        """Calculate menu variety score (0-10)"""

        unique_recipes = set()
        unique_cuisines = set()
        unique_ingredients = set()

        for day_menu in monthly_plan["daily_menus"].values():
            for meal in ["breakfast", "lunch", "dinner"]:
                if meal in day_menu and day_menu[meal]:
                    recipe = day_menu[meal]
                    unique_recipes.add(recipe.get('name', ''))
                    unique_cuisines.add(recipe.get('cuisine', ''))

                    if recipe.get('ingredients'):
                        for ingredient in recipe['ingredients']:
                            unique_ingredients.add(self._extract_base_ingredient(ingredient))

        # Calculate scores
        recipe_variety = min(len(unique_recipes) / 30, 1.0) * 3.3
        cuisine_variety = min(len(unique_cuisines) / 7, 1.0) * 3.3
        ingredient_variety = min(len(unique_ingredients) / 50, 1.0) * 3.4

        return round(recipe_variety + cuisine_variety + ingredient_variety, 1)

    def _analyze_difficulty(self, monthly_plan: Dict) -> Dict[str, int]:
        """Analyze difficulty distribution of recipes"""

        difficulty_count = {"easy": 0, "medium": 0, "hard": 0}

        for day_menu in monthly_plan["daily_menus"].values():
            for meal in ["breakfast", "lunch", "dinner"]:
                if meal in day_menu and day_menu[meal]:
                    difficulty = day_menu[meal].get('difficulty', 'easy')
                    difficulty_count[difficulty] = difficulty_count.get(difficulty, 0) + 1

        return difficulty_count

    def _estimate_total_prep_time(self, monthly_plan: Dict) -> str:
        """Estimate total prep time for the month"""

        total_minutes = 0

        for week_guide in monthly_plan["weekly_prep_guides"].values():
            time_str = week_guide.get('total_time', '0 minutes')
            total_minutes += self._parse_time(time_str) * 60  # Convert hours to minutes if needed

        hours = total_minutes // 60

        return f"{hours} hours total"

    def save_plan(self, plan: Dict, filename: str = None) -> str:
        """Save enhanced plan with proper formatting"""

        if not filename:
            menu_type = plan["meta"]["menu_type"]
            month = plan["meta"]["month"]
            year = plan["meta"]["year"]
            ai_tag = "_ai" if plan["meta"].get("ai_enabled") else "_template"
            filename = f"{menu_type}_{month}_{year}{ai_tag}_meal_plan.json"

        # Ensure data directory exists
        os.makedirs("data", exist_ok=True)
        filepath = os.path.join("data", filename)

        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(plan, f, indent=2, ensure_ascii=False)

        logging.info(f"Saved meal plan to {filepath}")
        return filepath

# Synchronous wrapper for compatibility
def generate_plan_sync(
    menu_type: str,
    month: int,
    year: int,
    custom_requirements: Dict = None,
    use_ai: bool = True
) -> Dict:
    """Synchronous wrapper for async plan generation"""

    agent = EnhancedMealPlanningAgent()

    # Create event loop and run async function
    import asyncio
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)

    try:
        plan = loop.run_until_complete(
            agent.generate_ai_monthly_plan(
                menu_type, month, year, custom_requirements, use_ai
            )
        )
        return plan
    finally:
        loop.close()

if __name__ == "__main__":
    # Example usage
    import sys

    if len(sys.argv) > 1:
        menu_type = sys.argv[1]

        # Run synchronously for CLI
        plan = generate_plan_sync(menu_type, 12, 2024, use_ai=True)

        print(f"Generated {menu_type} plan")
        print(f"AI recipes: {plan['month_summary'].get('ai_generated_recipes', 0)}")
        print(f"Variety score: {plan['month_summary'].get('variety_score', 0)}")
    else:
        print("Usage: python enhanced_agent.py <menu_type>")
        print("Menu types: mediterranean, intermittent_fasting, keto, family_friendly")