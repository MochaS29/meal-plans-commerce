#!/usr/bin/env python3
"""
Command line runner for meal planning agent
"""

import argparse
import sys
from datetime import datetime
import calendar
import json
from meal_planning_agent import MealPlanningAgent

def main():
    parser = argparse.ArgumentParser(
        description="Generate automated meal plans",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python run_agent.py mediterranean
  python run_agent.py intermittent_fasting --month 12 --year 2024
  python run_agent.py mediterranean --output my_meal_plan.json --format summary
        """
    )

    parser.add_argument("menu_type",
                       choices=["mediterranean", "intermittent_fasting", "keto", "family_friendly"],
                       help="Type of meal plan to generate")

    parser.add_argument("--month", type=int, default=datetime.now().month,
                       help="Month number (1-12)")

    parser.add_argument("--year", type=int, default=datetime.now().year,
                       help="Year")

    parser.add_argument("--output", type=str,
                       help="Output filename (optional)")

    parser.add_argument("--format", choices=["json", "summary", "detailed"], default="summary",
                       help="Output format")

    parser.add_argument("--quiet", action="store_true",
                       help="Minimal output")

    args = parser.parse_args()

    # Validate month
    if not 1 <= args.month <= 12:
        print("Error: Month must be between 1 and 12")
        sys.exit(1)

    # Initialize agent
    if not args.quiet:
        print(f"🚀 Initializing meal planning agent...")
    agent = MealPlanningAgent()

    # Generate plan
    if not args.quiet:
        print(f"📅 Generating {args.menu_type} meal plan for {calendar.month_name[args.month]} {args.year}...")

    try:
        monthly_plan = agent.generate_monthly_plan(args.menu_type, args.month, args.year)

        # Save plan
        filename = agent.save_monthly_plan(monthly_plan, args.output)
        if not args.quiet:
            print(f"✅ Meal plan saved to: {filename}")

        # Display output based on format
        if args.format == "json":
            print(json.dumps(monthly_plan, indent=2))

        elif args.format == "summary":
            summary = monthly_plan["month_summary"]
            print(f"\n📊 Plan Summary:")
            print(f"   • Menu Type: {args.menu_type}")
            print(f"   • Month: {calendar.month_name[args.month]} {args.year}")
            print(f"   • {summary['total_unique_recipes']} unique recipes")
            if summary.get('cuisine_variety'):
                print(f"   • Cuisines: {', '.join(summary['cuisine_variety'])}")
            print(f"   • Average {summary['average_daily_calories']} calories per day")
            print(f"   • {summary['weekly_shopping_trips']} weekly shopping trips")
            print(f"   • Estimated prep time: {summary['estimated_monthly_prep_time']}")

        elif args.format == "detailed":
            # Display detailed plan information
            print(f"\n📋 Detailed Meal Plan")
            print(f"{'='*60}")
            print(f"Menu Type: {args.menu_type}")
            print(f"Month: {calendar.month_name[args.month]} {args.year}")
            print(f"{'='*60}")

            # Week 1 sample
            print(f"\n📅 Week 1 Sample:")
            for day in range(1, min(8, len(monthly_plan["daily_menus"]) + 1)):
                day_menu = monthly_plan["daily_menus"][f"day_{day}"]
                print(f"\nDay {day} ({day_menu['date']}):")
                if day_menu.get('breakfast'):
                    print(f"  🍳 Breakfast: {day_menu['breakfast']['name']}")
                if day_menu.get('lunch'):
                    print(f"  🥗 Lunch: {day_menu['lunch']['name']}")
                if day_menu.get('dinner'):
                    print(f"  🍽️  Dinner: {day_menu['dinner']['name']}")
                print(f"  📊 Daily Calories: {day_menu['daily_calories']}")

            # Shopping list preview
            if "week_1" in monthly_plan["weekly_shopping_lists"]:
                week1_list = monthly_plan["weekly_shopping_lists"]["week_1"]
                print(f"\n🛒 Week 1 Shopping List Preview:")
                print(f"   Estimated Cost: {week1_list['estimated_cost']}")
                print(f"   Categories:")
                for category, items in list(week1_list['categories'].items())[:3]:
                    print(f"   • {category}: {len(items)} items")

        if not args.quiet:
            print(f"\n🎉 Successfully generated {args.menu_type} meal plan!")
            print(f"📁 Full plan saved to: {filename}")

    except Exception as e:
        print(f"❌ Error generating meal plan: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()