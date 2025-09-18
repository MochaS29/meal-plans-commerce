"""
Flask API for meal planning agent
"""

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from meal_planning_agent import MealPlanningAgent
import json
import os
from datetime import datetime
import logging

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

app = Flask(__name__)
CORS(app)

# Initialize components
agent = MealPlanningAgent()

@app.route('/api/generate_meal_plan', methods=['POST'])
def generate_meal_plan():
    """Generate a new meal plan"""
    try:
        data = request.json
        menu_type = data.get('menu_type')
        month = data.get('month', datetime.now().month)
        year = data.get('year', datetime.now().year)

        if not menu_type:
            return jsonify({"error": "menu_type is required"}), 400

        logging.info(f"Generating {menu_type} meal plan for {month}/{year}")
        monthly_plan = agent.generate_monthly_plan(menu_type, month, year)

        # Save plan to file
        filename = agent.save_monthly_plan(monthly_plan)
        logging.info(f"Saved meal plan to {filename}")

        return jsonify({
            "success": True,
            "plan": monthly_plan,
            "filename": filename
        })

    except Exception as e:
        logging.error(f"Error generating meal plan: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/menu_types', methods=['GET'])
def get_menu_types():
    """Get available menu types"""
    return jsonify({
        "menu_types": list(agent.menu_templates.keys()),
        "descriptions": {
            "mediterranean": "Authentic Mediterranean diet with weight loss focus",
            "intermittent_fasting": "16:8 protocol with anti-inflammatory approach",
            "keto": "Low-carb, high-fat ketogenic diet",
            "family_friendly": "Kid-approved, family-oriented meals"
        }
    })

@app.route('/api/recipes/<menu_type>', methods=['GET'])
def get_recipes_by_type(menu_type):
    """Get all recipes for a menu type"""
    recipes = agent.recipe_database.get(menu_type, {})
    return jsonify(recipes)

@app.route('/api/recipe/<menu_type>/<recipe_id>', methods=['GET'])
def get_recipe(menu_type, recipe_id):
    """Get specific recipe by ID"""
    recipes = agent.recipe_database.get(menu_type, {})
    for category in recipes.values():
        for recipe in category:
            if recipe.id == recipe_id:
                return jsonify({
                    "id": recipe.id,
                    "name": recipe.name,
                    "category": recipe.category,
                    "cuisine": recipe.cuisine,
                    "prep_time": recipe.prep_time,
                    "cook_time": recipe.cook_time,
                    "calories": recipe.calories,
                    "protein": recipe.protein,
                    "carbs": recipe.carbs,
                    "fat": recipe.fat,
                    "ingredients": recipe.ingredients,
                    "instructions": recipe.instructions,
                    "meal_type": recipe.meal_type
                })
    return jsonify({"error": "Recipe not found"}), 404

@app.route('/api/shopping_list', methods=['POST'])
def generate_shopping_list():
    """Generate shopping list for a specific week"""
    try:
        data = request.json
        menu_type = data.get('menu_type')
        week_number = data.get('week_number', 1)
        month = data.get('month', datetime.now().month)
        year = data.get('year', datetime.now().year)

        if not menu_type:
            return jsonify({"error": "menu_type is required"}), 400

        # Generate full month plan
        monthly_plan = agent.generate_monthly_plan(menu_type, month, year)

        # Get specific week's shopping list
        shopping_list_key = f"week_{week_number}"
        if shopping_list_key in monthly_plan["weekly_shopping_lists"]:
            shopping_list = monthly_plan["weekly_shopping_lists"][shopping_list_key]
            return jsonify({
                "success": True,
                "shopping_list": shopping_list
            })
        else:
            return jsonify({"error": f"Week {week_number} not found"}), 404

    except Exception as e:
        logging.error(f"Error generating shopping list: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/prep_guide', methods=['POST'])
def get_prep_guide():
    """Get meal prep guide for a specific week"""
    try:
        data = request.json
        menu_type = data.get('menu_type')
        week_number = data.get('week_number', 1)

        if not menu_type:
            return jsonify({"error": "menu_type is required"}), 400

        # Generate prep guide
        prep_guide = agent.generate_prep_guide({}, week_number, menu_type)

        return jsonify({
            "success": True,
            "prep_guide": {
                "week_number": prep_guide.week_number,
                "total_time": prep_guide.total_time,
                "tasks": prep_guide.tasks,
                "storage_tips": prep_guide.storage_tips
            }
        })

    except Exception as e:
        logging.error(f"Error generating prep guide: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/nutrition_targets/<menu_type>', methods=['GET'])
def get_nutrition_targets(menu_type):
    """Get nutrition targets for a menu type"""
    targets = agent.nutrition_targets.get(menu_type)
    if targets:
        return jsonify(targets)
    return jsonify({"error": "Menu type not found"}), 404

@app.route('/api/download_plan/<filename>', methods=['GET'])
def download_plan(filename):
    """Download meal plan as JSON file"""
    filepath = os.path.join('/app/data', filename)
    if os.path.exists(filepath):
        return send_file(filepath, as_attachment=True, mimetype='application/json')
    return jsonify({"error": "Plan not found"}), 404

@app.route('/api/plans', methods=['GET'])
def list_plans():
    """List all generated meal plans"""
    try:
        data_dir = '/app/data'
        if not os.path.exists(data_dir):
            os.makedirs(data_dir)

        plans = []
        for filename in os.listdir(data_dir):
            if filename.endswith('_meal_plan.json'):
                filepath = os.path.join(data_dir, filename)
                with open(filepath, 'r') as f:
                    plan_data = json.load(f)
                    plans.append({
                        "filename": filename,
                        "menu_type": plan_data["meta"]["menu_type"],
                        "month": plan_data["meta"]["month"],
                        "year": plan_data["meta"]["year"],
                        "generated_date": plan_data["meta"]["generated_date"]
                    })

        return jsonify({
            "success": True,
            "plans": plans
        })

    except Exception as e:
        logging.error(f"Error listing plans: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "version": "1.0.0",
        "agent": "meal-planning"
    })

@app.route('/', methods=['GET'])
def index():
    """API information"""
    return jsonify({
        "name": "Meal Planning Agent API",
        "version": "1.0.0",
        "endpoints": [
            "/api/menu_types - GET - List available menu types",
            "/api/generate_meal_plan - POST - Generate new meal plan",
            "/api/recipes/<menu_type> - GET - Get recipes by type",
            "/api/recipe/<menu_type>/<recipe_id> - GET - Get specific recipe",
            "/api/shopping_list - POST - Generate shopping list",
            "/api/prep_guide - POST - Get meal prep guide",
            "/api/nutrition_targets/<menu_type> - GET - Get nutrition targets",
            "/api/plans - GET - List all generated plans",
            "/api/download_plan/<filename> - GET - Download plan",
            "/health - GET - Health check"
        ]
    })

if __name__ == '__main__':
    # Create data directory if it doesn't exist
    os.makedirs('/app/data', exist_ok=True)
    os.makedirs('/app/logs', exist_ok=True)

    # Run the Flask app
    app.run(debug=False, host='0.0.0.0', port=5000)