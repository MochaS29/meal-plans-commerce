#!/usr/bin/env python3
"""
Generate 4 months of meal plans for all 7 menu types
Total: 28 complete monthly meal plans with recipes, shopping lists, and prep guides
"""

import json
import os
from datetime import datetime, timedelta
import random

# Base directory for meal plans
OUTPUT_DIR = "../data/meal-plans"

# Menu types
MENU_TYPES = [
    "mediterranean",
    "intermittent-fasting",
    "family-focused",
    "paleo",
    "vegetarian",
    "vegan",
    "global-cuisine"
]

# Recipe templates for each menu type
RECIPE_TEMPLATES = {
    "mediterranean": {
        "breakfast": [
            {"name": "Greek Yogurt Parfait with Honey", "calories": 320, "protein": "18g", "prepTime": "5 min"},
            {"name": "Shakshuka with Whole Grain Pita", "calories": 340, "protein": "20g", "prepTime": "20 min"},
            {"name": "Mediterranean Omelet", "calories": 310, "protein": "22g", "prepTime": "15 min"},
            {"name": "Whole Grain Toast with Avocado and Feta", "calories": 330, "protein": "15g", "prepTime": "10 min"},
            {"name": "Mediterranean Smoothie Bowl", "calories": 350, "protein": "16g", "prepTime": "10 min"},
            {"name": "Spinach and Feta Frittata", "calories": 320, "protein": "24g", "prepTime": "25 min"},
            {"name": "Overnight Oats with Greek Yogurt", "calories": 340, "protein": "18g", "prepTime": "5 min"},
            {"name": "Turkish Breakfast Platter", "calories": 360, "protein": "19g", "prepTime": "15 min"},
            {"name": "Ricotta Pancakes with Berry Compote", "calories": 380, "protein": "20g", "prepTime": "20 min"},
            {"name": "Mediterranean Egg Bites", "calories": 280, "protein": "22g", "prepTime": "25 min"}
        ],
        "lunch": [
            {"name": "Mediterranean Chickpea Salad", "calories": 420, "protein": "16g", "prepTime": "15 min"},
            {"name": "Greek Lentil Soup", "calories": 380, "protein": "18g", "prepTime": "30 min"},
            {"name": "Tabbouleh with Grilled Halloumi", "calories": 440, "protein": "20g", "prepTime": "20 min"},
            {"name": "Mediterranean Quinoa Bowl", "calories": 450, "protein": "18g", "prepTime": "25 min"},
            {"name": "Stuffed Bell Peppers", "calories": 420, "protein": "22g", "prepTime": "40 min"},
            {"name": "Mediterranean Tuna Salad", "calories": 390, "protein": "30g", "prepTime": "15 min"},
            {"name": "Falafel Wrap with Tahini", "calories": 460, "protein": "16g", "prepTime": "20 min"},
            {"name": "Greek Orzo Salad", "calories": 410, "protein": "15g", "prepTime": "25 min"},
            {"name": "Mezze Platter with Hummus", "calories": 430, "protein": "18g", "prepTime": "15 min"},
            {"name": "Spanakopita with Greek Salad", "calories": 440, "protein": "17g", "prepTime": "30 min"}
        ],
        "dinner": [
            {"name": "Grilled Lemon Herb Salmon", "calories": 480, "protein": "35g", "prepTime": "25 min"},
            {"name": "Chicken Souvlaki with Tzatziki", "calories": 460, "protein": "38g", "prepTime": "30 min"},
            {"name": "Seafood Paella", "calories": 490, "protein": "28g", "prepTime": "45 min"},
            {"name": "Baked Cod with Tomatoes and Olives", "calories": 420, "protein": "32g", "prepTime": "30 min"},
            {"name": "Lamb Kofta with Mint Yogurt", "calories": 480, "protein": "30g", "prepTime": "35 min"},
            {"name": "Ratatouille with Grilled Chicken", "calories": 460, "protein": "35g", "prepTime": "45 min"},
            {"name": "Mediterranean Baked Fish", "calories": 440, "protein": "38g", "prepTime": "30 min"},
            {"name": "Moussaka", "calories": 520, "protein": "28g", "prepTime": "60 min"},
            {"name": "Chicken Tagine with Couscous", "calories": 470, "protein": "32g", "prepTime": "40 min"},
            {"name": "Grilled Vegetable and Halloumi Skewers", "calories": 410, "protein": "24g", "prepTime": "25 min"}
        ]
    },
    "intermittent-fasting": {
        "breakfast": [  # First meal at 12pm
            {"name": "Protein Power Bowl", "calories": 520, "protein": "35g", "prepTime": "15 min"},
            {"name": "Egg and Veggie Scramble", "calories": 480, "protein": "32g", "prepTime": "15 min"},
            {"name": "Tuna Avocado Salad", "calories": 490, "protein": "38g", "prepTime": "10 min"},
            {"name": "Chicken Buddha Bowl", "calories": 510, "protein": "36g", "prepTime": "20 min"},
            {"name": "Protein Pancakes", "calories": 480, "protein": "30g", "prepTime": "15 min"},
            {"name": "Mediterranean Omelette", "calories": 460, "protein": "28g", "prepTime": "15 min"},
            {"name": "Loaded Cauliflower Bowl", "calories": 470, "protein": "32g", "prepTime": "20 min"},
            {"name": "Steak and Eggs", "calories": 540, "protein": "42g", "prepTime": "20 min"},
            {"name": "Smoked Salmon Platter", "calories": 460, "protein": "35g", "prepTime": "10 min"},
            {"name": "Turkey Meatball Bowl", "calories": 500, "protein": "38g", "prepTime": "25 min"}
        ],
        "dinner": [
            {"name": "Salmon with Roasted Vegetables", "calories": 580, "protein": "40g", "prepTime": "30 min"},
            {"name": "Turkey Meatballs with Zucchini Noodles", "calories": 520, "protein": "38g", "prepTime": "35 min"},
            {"name": "Grilled Steak with Asparagus", "calories": 560, "protein": "42g", "prepTime": "25 min"},
            {"name": "Baked Cod with Quinoa", "calories": 540, "protein": "38g", "prepTime": "30 min"},
            {"name": "Shrimp Stir-Fry", "calories": 520, "protein": "35g", "prepTime": "20 min"},
            {"name": "Pork Tenderloin with Brussels Sprouts", "calories": 550, "protein": "40g", "prepTime": "35 min"},
            {"name": "Baked Chicken Thighs", "calories": 580, "protein": "38g", "prepTime": "40 min"},
            {"name": "Beef and Broccoli", "calories": 540, "protein": "36g", "prepTime": "25 min"},
            {"name": "Lemon Garlic Shrimp", "calories": 500, "protein": "34g", "prepTime": "20 min"},
            {"name": "Herb-Crusted Lamb Chops", "calories": 560, "protein": "38g", "prepTime": "30 min"}
        ],
        "snack": [
            {"name": "Greek Yogurt with Berries", "calories": 180, "protein": "15g"},
            {"name": "Protein Smoothie", "calories": 240, "protein": "25g"},
            {"name": "Hard-Boiled Eggs", "calories": 140, "protein": "12g"},
            {"name": "Cottage Cheese with Nuts", "calories": 200, "protein": "18g"},
            {"name": "Turkey Roll-Ups", "calories": 180, "protein": "20g"},
            {"name": "Protein Bar", "calories": 200, "protein": "20g"},
            {"name": "Almond Butter with Apple", "calories": 220, "protein": "8g"},
            {"name": "Beef Jerky", "calories": 140, "protein": "22g"},
            {"name": "String Cheese with Almonds", "calories": 210, "protein": "14g"},
            {"name": "Chia Pudding", "calories": 180, "protein": "10g"}
        ]
    },
    "family-focused": {
        "breakfast": [
            {"name": "Pancake Bar Sunday", "calories": 380, "protein": "12g", "prepTime": "20 min"},
            {"name": "French Toast Sticks", "calories": 360, "protein": "14g", "prepTime": "15 min"},
            {"name": "Breakfast Burritos", "calories": 420, "protein": "18g", "prepTime": "20 min"},
            {"name": "Waffle Sandwiches", "calories": 400, "protein": "16g", "prepTime": "10 min"},
            {"name": "Egg Muffin Cups", "calories": 320, "protein": "20g", "prepTime": "25 min"},
            {"name": "Smoothie Bowls", "calories": 340, "protein": "12g", "prepTime": "10 min"},
            {"name": "Breakfast Pizza", "calories": 380, "protein": "18g", "prepTime": "20 min"},
            {"name": "Cinnamon Roll Oatmeal", "calories": 350, "protein": "10g", "prepTime": "15 min"},
            {"name": "Bagel Bar", "calories": 360, "protein": "14g", "prepTime": "5 min"},
            {"name": "Breakfast Quesadillas", "calories": 380, "protein": "16g", "prepTime": "15 min"}
        ],
        "lunch": [
            {"name": "DIY Pizza Pockets", "calories": 440, "protein": "18g", "prepTime": "25 min"},
            {"name": "Mac and Cheese with Veggies", "calories": 420, "protein": "16g", "prepTime": "20 min"},
            {"name": "Chicken Nuggets and Sweet Potato Fries", "calories": 460, "protein": "22g", "prepTime": "25 min"},
            {"name": "Grilled Cheese and Tomato Soup", "calories": 400, "protein": "14g", "prepTime": "15 min"},
            {"name": "Taco Cups", "calories": 430, "protein": "20g", "prepTime": "20 min"},
            {"name": "Mini Meatball Subs", "calories": 450, "protein": "24g", "prepTime": "25 min"},
            {"name": "Quesadilla Triangles", "calories": 410, "protein": "18g", "prepTime": "15 min"},
            {"name": "Chicken Wraps", "calories": 420, "protein": "26g", "prepTime": "15 min"},
            {"name": "Pasta Salad Bar", "calories": 440, "protein": "16g", "prepTime": "20 min"},
            {"name": "Build-Your-Own Sandwich Station", "calories": 400, "protein": "20g", "prepTime": "10 min"}
        ],
        "dinner": [
            {"name": "Taco Tuesday Fiesta", "calories": 480, "protein": "24g", "prepTime": "30 min"},
            {"name": "Spaghetti and Meatballs", "calories": 520, "protein": "26g", "prepTime": "35 min"},
            {"name": "BBQ Chicken with Corn", "calories": 460, "protein": "32g", "prepTime": "30 min"},
            {"name": "Shepherd's Pie", "calories": 490, "protein": "22g", "prepTime": "45 min"},
            {"name": "Chicken Alfredo", "calories": 510, "protein": "28g", "prepTime": "25 min"},
            {"name": "Burger Night", "calories": 480, "protein": "26g", "prepTime": "20 min"},
            {"name": "Chicken Stir-Fry", "calories": 440, "protein": "30g", "prepTime": "25 min"},
            {"name": "Baked Ziti", "calories": 470, "protein": "20g", "prepTime": "40 min"},
            {"name": "Fish Sticks with Fries", "calories": 450, "protein": "18g", "prepTime": "25 min"},
            {"name": "Chicken Fajitas", "calories": 460, "protein": "28g", "prepTime": "30 min"}
        ]
    },
    "paleo": {
        "breakfast": [
            {"name": "Primal Power Bowl", "calories": 420, "protein": "35g", "prepTime": "15 min"},
            {"name": "Sweet Potato Hash with Eggs", "calories": 380, "protein": "24g", "prepTime": "20 min"},
            {"name": "Paleo Pancakes", "calories": 360, "protein": "18g", "prepTime": "15 min"},
            {"name": "Breakfast Skillet", "calories": 440, "protein": "28g", "prepTime": "25 min"},
            {"name": "Coconut Flour Waffles", "calories": 340, "protein": "16g", "prepTime": "20 min"},
            {"name": "Meat and Veggie Scramble", "calories": 420, "protein": "32g", "prepTime": "15 min"},
            {"name": "Chia Seed Pudding", "calories": 320, "protein": "12g", "prepTime": "5 min"},
            {"name": "Paleo Breakfast Muffins", "calories": 360, "protein": "20g", "prepTime": "25 min"},
            {"name": "Bacon and Eggs", "calories": 400, "protein": "28g", "prepTime": "15 min"},
            {"name": "Almond Flour Crepes", "calories": 380, "protein": "22g", "prepTime": "20 min"}
        ],
        "lunch": [
            {"name": "Hunter's Salad", "calories": 380, "protein": "28g", "prepTime": "15 min"},
            {"name": "Lettuce Wrap Burgers", "calories": 420, "protein": "32g", "prepTime": "20 min"},
            {"name": "Cauliflower Rice Bowl", "calories": 400, "protein": "26g", "prepTime": "25 min"},
            {"name": "Zucchini Noodle Bolognese", "calories": 440, "protein": "30g", "prepTime": "30 min"},
            {"name": "Paleo Chicken Soup", "calories": 360, "protein": "24g", "prepTime": "35 min"},
            {"name": "Tuna Salad Lettuce Cups", "calories": 380, "protein": "34g", "prepTime": "10 min"},
            {"name": "Beef and Vegetable Stir-Fry", "calories": 460, "protein": "32g", "prepTime": "20 min"},
            {"name": "Paleo Meatballs", "calories": 420, "protein": "28g", "prepTime": "25 min"},
            {"name": "Grilled Chicken Salad", "calories": 400, "protein": "36g", "prepTime": "20 min"},
            {"name": "Salmon Salad", "calories": 440, "protein": "32g", "prepTime": "15 min"}
        ],
        "dinner": [
            {"name": "Caveman Steak & Veggies", "calories": 520, "protein": "42g", "prepTime": "25 min"},
            {"name": "Herb-Roasted Chicken", "calories": 480, "protein": "38g", "prepTime": "45 min"},
            {"name": "Grilled Salmon with Asparagus", "calories": 460, "protein": "36g", "prepTime": "25 min"},
            {"name": "Beef Short Ribs", "calories": 540, "protein": "35g", "prepTime": "120 min"},
            {"name": "Pork Chops with Apple Slaw", "calories": 480, "protein": "32g", "prepTime": "30 min"},
            {"name": "Lamb Kebabs", "calories": 500, "protein": "34g", "prepTime": "35 min"},
            {"name": "Baked Cod with Vegetables", "calories": 420, "protein": "38g", "prepTime": "30 min"},
            {"name": "Turkey Meatloaf", "calories": 460, "protein": "30g", "prepTime": "60 min"},
            {"name": "Shrimp Scampi over Zoodles", "calories": 440, "protein": "32g", "prepTime": "20 min"},
            {"name": "Beef Stew", "calories": 480, "protein": "28g", "prepTime": "90 min"}
        ]
    },
    "vegetarian": {
        "breakfast": [
            {"name": "Garden Scramble & Toast", "calories": 380, "protein": "18g", "prepTime": "15 min"},
            {"name": "Avocado Toast Deluxe", "calories": 360, "protein": "14g", "prepTime": "10 min"},
            {"name": "Veggie Breakfast Burrito", "calories": 420, "protein": "16g", "prepTime": "20 min"},
            {"name": "Greek Yogurt Parfait", "calories": 340, "protein": "20g", "prepTime": "5 min"},
            {"name": "Spinach Mushroom Frittata", "calories": 360, "protein": "22g", "prepTime": "25 min"},
            {"name": "Protein Smoothie Bowl", "calories": 380, "protein": "18g", "prepTime": "10 min"},
            {"name": "Cottage Cheese Pancakes", "calories": 400, "protein": "24g", "prepTime": "15 min"},
            {"name": "Overnight Oats", "calories": 350, "protein": "14g", "prepTime": "5 min"},
            {"name": "Egg White Veggie Wrap", "calories": 340, "protein": "20g", "prepTime": "15 min"},
            {"name": "Chia Pudding with Fruit", "calories": 320, "protein": "12g", "prepTime": "5 min"}
        ],
        "lunch": [
            {"name": "Buddha Bowl Delight", "calories": 420, "protein": "22g", "prepTime": "20 min"},
            {"name": "Caprese Sandwich", "calories": 400, "protein": "18g", "prepTime": "10 min"},
            {"name": "Lentil Soup", "calories": 380, "protein": "20g", "prepTime": "30 min"},
            {"name": "Quinoa Salad", "calories": 440, "protein": "16g", "prepTime": "25 min"},
            {"name": "Veggie Wrap", "calories": 380, "protein": "14g", "prepTime": "15 min"},
            {"name": "Chickpea Curry", "calories": 460, "protein": "18g", "prepTime": "30 min"},
            {"name": "Greek Salad with Feta", "calories": 360, "protein": "14g", "prepTime": "10 min"},
            {"name": "Minestrone Soup", "calories": 340, "protein": "12g", "prepTime": "35 min"},
            {"name": "Falafel Bowl", "calories": 440, "protein": "16g", "prepTime": "25 min"},
            {"name": "Margherita Pizza", "calories": 420, "protein": "18g", "prepTime": "20 min"}
        ],
        "dinner": [
            {"name": "Mushroom Stroganoff", "calories": 460, "protein": "16g", "prepTime": "30 min"},
            {"name": "Eggplant Parmesan", "calories": 480, "protein": "20g", "prepTime": "45 min"},
            {"name": "Vegetable Pad Thai", "calories": 440, "protein": "14g", "prepTime": "25 min"},
            {"name": "Black Bean Enchiladas", "calories": 460, "protein": "18g", "prepTime": "35 min"},
            {"name": "Stuffed Portobello Mushrooms", "calories": 420, "protein": "16g", "prepTime": "30 min"},
            {"name": "Vegetable Lasagna", "calories": 480, "protein": "22g", "prepTime": "60 min"},
            {"name": "Thai Green Curry", "calories": 440, "protein": "12g", "prepTime": "30 min"},
            {"name": "Spinach and Ricotta Cannelloni", "calories": 460, "protein": "20g", "prepTime": "40 min"},
            {"name": "Vegetable Stir-Fry with Tofu", "calories": 420, "protein": "18g", "prepTime": "20 min"},
            {"name": "Ratatouille with Polenta", "calories": 400, "protein": "12g", "prepTime": "45 min"}
        ]
    },
    "vegan": {
        "breakfast": [
            {"name": "Overnight Oats & Berries", "calories": 340, "protein": "12g", "prepTime": "5 min"},
            {"name": "Tofu Scramble", "calories": 360, "protein": "20g", "prepTime": "15 min"},
            {"name": "Smoothie Bowl", "calories": 380, "protein": "14g", "prepTime": "10 min"},
            {"name": "Avocado Toast with Hemp Seeds", "calories": 360, "protein": "12g", "prepTime": "10 min"},
            {"name": "Chickpea Flour Pancakes", "calories": 340, "protein": "16g", "prepTime": "15 min"},
            {"name": "Chia Seed Pudding", "calories": 320, "protein": "10g", "prepTime": "5 min"},
            {"name": "Quinoa Breakfast Bowl", "calories": 380, "protein": "14g", "prepTime": "15 min"},
            {"name": "Banana Walnut Muffins", "calories": 360, "protein": "8g", "prepTime": "25 min"},
            {"name": "Green Power Smoothie", "calories": 320, "protein": "12g", "prepTime": "5 min"},
            {"name": "Sweet Potato Toast", "calories": 340, "protein": "10g", "prepTime": "15 min"}
        ],
        "lunch": [
            {"name": "Rainbow Power Bowl", "calories": 450, "protein": "18g", "prepTime": "20 min"},
            {"name": "Lentil Walnut Bolognese", "calories": 440, "protein": "20g", "prepTime": "30 min"},
            {"name": "Buddha Bowl", "calories": 460, "protein": "16g", "prepTime": "25 min"},
            {"name": "Chickpea Salad Sandwich", "calories": 400, "protein": "14g", "prepTime": "10 min"},
            {"name": "Thai Peanut Noodles", "calories": 440, "protein": "16g", "prepTime": "20 min"},
            {"name": "Black Bean Burrito Bowl", "calories": 460, "protein": "18g", "prepTime": "20 min"},
            {"name": "Mediterranean Wrap", "calories": 420, "protein": "14g", "prepTime": "15 min"},
            {"name": "Miso Soup with Tofu", "calories": 340, "protein": "16g", "prepTime": "15 min"},
            {"name": "Quinoa Tabbouleh", "calories": 380, "protein": "12g", "prepTime": "20 min"},
            {"name": "Vegan Sushi Bowl", "calories": 440, "protein": "14g", "prepTime": "25 min"}
        ],
        "dinner": [
            {"name": "Thai Coconut Curry", "calories": 480, "protein": "15g", "prepTime": "30 min"},
            {"name": "Stuffed Bell Peppers", "calories": 440, "protein": "16g", "prepTime": "40 min"},
            {"name": "Mushroom Wellington", "calories": 460, "protein": "14g", "prepTime": "60 min"},
            {"name": "Lentil Shepherd's Pie", "calories": 480, "protein": "18g", "prepTime": "45 min"},
            {"name": "Pad Thai with Tofu", "calories": 460, "protein": "16g", "prepTime": "25 min"},
            {"name": "Vegan Lasagna", "calories": 480, "protein": "20g", "prepTime": "60 min"},
            {"name": "Chickpea Tikka Masala", "calories": 440, "protein": "16g", "prepTime": "35 min"},
            {"name": "Black Bean Enchiladas", "calories": 460, "protein": "18g", "prepTime": "35 min"},
            {"name": "Teriyaki Tempeh Bowl", "calories": 440, "protein": "22g", "prepTime": "25 min"},
            {"name": "Vegan Chili", "calories": 420, "protein": "20g", "prepTime": "40 min"}
        ]
    },
    "global-cuisine": {
        "breakfast": [
            {"name": "Japanese Breakfast Set", "calories": 380, "protein": "18g", "prepTime": "20 min"},
            {"name": "Mexican Chilaquiles", "calories": 420, "protein": "16g", "prepTime": "25 min"},
            {"name": "French Crepes", "calories": 360, "protein": "14g", "prepTime": "20 min"},
            {"name": "Indian Masala Dosa", "calories": 400, "protein": "12g", "prepTime": "30 min"},
            {"name": "Turkish Menemen", "calories": 380, "protein": "18g", "prepTime": "20 min"},
            {"name": "Chinese Congee", "calories": 340, "protein": "14g", "prepTime": "40 min"},
            {"name": "Israeli Shakshuka", "calories": 360, "protein": "20g", "prepTime": "25 min"},
            {"name": "Korean Kimchi Fried Rice", "calories": 420, "protein": "16g", "prepTime": "20 min"},
            {"name": "Brazilian Acai Bowl", "calories": 380, "protein": "10g", "prepTime": "10 min"},
            {"name": "Vietnamese Banh Mi", "calories": 440, "protein": "22g", "prepTime": "15 min"}
        ],
        "lunch": [
            {"name": "Italian Caprese Salad", "calories": 420, "protein": "18g", "prepTime": "10 min"},
            {"name": "Thai Tom Yum Soup", "calories": 380, "protein": "24g", "prepTime": "25 min"},
            {"name": "Mexican Tacos Al Pastor", "calories": 460, "protein": "26g", "prepTime": "30 min"},
            {"name": "Japanese Bento Box", "calories": 440, "protein": "28g", "prepTime": "35 min"},
            {"name": "Greek Moussaka", "calories": 480, "protein": "22g", "prepTime": "45 min"},
            {"name": "Indian Tikka Masala", "calories": 460, "protein": "24g", "prepTime": "35 min"},
            {"name": "Vietnamese Pho", "calories": 380, "protein": "26g", "prepTime": "40 min"},
            {"name": "Moroccan Tagine", "calories": 440, "protein": "20g", "prepTime": "45 min"},
            {"name": "Spanish Paella", "calories": 480, "protein": "28g", "prepTime": "40 min"},
            {"name": "Korean Bibimbap", "calories": 460, "protein": "22g", "prepTime": "30 min"}
        ],
        "dinner": [
            {"name": "French Coq au Vin", "calories": 520, "protein": "34g", "prepTime": "60 min"},
            {"name": "Italian Osso Buco", "calories": 540, "protein": "38g", "prepTime": "90 min"},
            {"name": "Japanese Teriyaki Salmon", "calories": 480, "protein": "36g", "prepTime": "25 min"},
            {"name": "Indian Butter Chicken", "calories": 500, "protein": "32g", "prepTime": "40 min"},
            {"name": "Thai Green Curry", "calories": 460, "protein": "28g", "prepTime": "35 min"},
            {"name": "Mexican Mole Poblano", "calories": 520, "protein": "30g", "prepTime": "60 min"},
            {"name": "Greek Lamb Kleftiko", "calories": 540, "protein": "36g", "prepTime": "120 min"},
            {"name": "Chinese Kung Pao Chicken", "calories": 480, "protein": "32g", "prepTime": "25 min"},
            {"name": "Brazilian Feijoada", "calories": 520, "protein": "34g", "prepTime": "90 min"},
            {"name": "Moroccan Lamb Couscous", "calories": 500, "protein": "30g", "prepTime": "45 min"}
        ]
    }
}

def get_shopping_list(menu_type):
    """Generate appropriate shopping list based on menu type"""
    shopping_lists = {
        "mediterranean": {
            "produce": ["Tomatoes - 3 lbs", "Cucumbers - 6", "Bell Peppers - 8", "Spinach - 2 bags", "Lemons - 10"],
            "proteins": ["Salmon - 1.5 lbs", "Chicken breast - 2 lbs", "Ground lamb - 1 lb", "Eggs - 1 dozen"],
            "pantry": ["Olive oil - 1 bottle", "Chickpeas - 3 cans", "Quinoa - 1 bag", "Olives - 2 jars"],
            "dairy": ["Greek yogurt - 2 containers", "Feta cheese - 1 lb", "Halloumi - 8 oz"]
        },
        "intermittent-fasting": {
            "produce": ["Spinach - 2 bags", "Broccoli - 2 heads", "Asparagus - 2 bunches", "Avocados - 6"],
            "proteins": ["Chicken - 3 lbs", "Salmon - 1.5 lbs", "Ground turkey - 2 lbs", "Eggs - 2 dozen"],
            "pantry": ["Protein powder - 1 container", "Almond butter - 1 jar", "Quinoa - 1 bag"],
            "dairy": ["Greek yogurt - 2 containers", "Cottage cheese - 1 container"]
        },
        "family-focused": {
            "produce": ["Potatoes - 5 lbs", "Carrots - 2 lbs", "Corn - 6 ears", "Lettuce - 2 heads"],
            "proteins": ["Ground beef - 2 lbs", "Chicken - 3 lbs", "Turkey - 1 lb", "Eggs - 2 dozen"],
            "pantry": ["Pasta - 3 boxes", "Bread - 2 loaves", "Rice - 2 lbs", "Tortillas - 2 packs"],
            "dairy": ["Cheese - 2 lbs", "Milk - 1 gallon", "Yogurt - 6 cups"]
        },
        "paleo": {
            "produce": ["Sweet potatoes - 3 lbs", "Cauliflower - 2 heads", "Zucchini - 6", "Kale - 2 bunches"],
            "proteins": ["Grass-fed beef - 2 lbs", "Wild salmon - 1.5 lbs", "Chicken - 3 lbs", "Eggs - 2 dozen"],
            "pantry": ["Coconut oil - 1 jar", "Almond flour - 1 bag", "Nuts - 2 lbs", "Coconut milk - 4 cans"],
            "dairy": []  # No dairy in paleo
        },
        "vegetarian": {
            "produce": ["Mixed vegetables - 5 lbs", "Mushrooms - 2 lbs", "Spinach - 3 bags", "Tomatoes - 2 lbs"],
            "proteins": ["Eggs - 2 dozen", "Tofu - 2 blocks", "Tempeh - 1 package"],
            "pantry": ["Lentils - 2 bags", "Chickpeas - 4 cans", "Quinoa - 2 bags", "Nuts - 1 lb"],
            "dairy": ["Cheese - 1.5 lbs", "Greek yogurt - 2 containers", "Milk - 1/2 gallon"]
        },
        "vegan": {
            "produce": ["Vegetables - 7 lbs", "Fruits - 5 lbs", "Herbs - 4 bunches", "Mushrooms - 2 lbs"],
            "proteins": ["Tofu - 3 blocks", "Tempeh - 2 packages", "Beans - 6 cans"],
            "pantry": ["Nutritional yeast - 1 container", "Tahini - 1 jar", "Quinoa - 2 bags", "Nuts - 2 lbs"],
            "dairy": []  # No dairy in vegan
        },
        "global-cuisine": {
            "produce": ["Mixed vegetables - 6 lbs", "Herbs - 6 bunches", "Ginger - 4 oz", "Lemongrass - 4 stalks"],
            "proteins": ["Chicken - 2 lbs", "Fish - 1.5 lbs", "Beef - 1 lb", "Shrimp - 1 lb"],
            "pantry": ["Rice - 3 lbs", "Noodles - 2 packs", "Spices - various", "Coconut milk - 3 cans"],
            "dairy": ["Yogurt - 1 container", "Cheese - 1 lb"]
        }
    }

    base_list = shopping_lists.get(menu_type, shopping_lists["mediterranean"])

    # Add estimated cost based on menu type
    costs = {
        "mediterranean": "$125-150",
        "intermittent-fasting": "$140-165",
        "family-focused": "$100-130",
        "paleo": "$160-185",
        "vegetarian": "$80-100",
        "vegan": "$75-95",
        "global-cuisine": "$130-155"
    }

    return {
        **base_list,
        "estimatedCost": costs.get(menu_type, "$100-150")
    }

def generate_month_plan(menu_type, month, year):
    """Generate a complete monthly meal plan"""

    # Get month name
    month_names = ["", "January", "February", "March", "April", "May", "June",
                   "July", "August", "September", "October", "November", "December"]
    month_name = month_names[month]

    # Start date
    start_date = datetime(year, month, 1)

    # Determine number of days in month
    if month == 12:
        days_in_month = 31
    elif month in [1, 3, 5, 7, 8, 10]:
        days_in_month = 31
    elif month in [4, 6, 9, 11]:
        days_in_month = 30
    else:  # February
        days_in_month = 29 if year % 4 == 0 else 28

    # Generate daily meals
    daily_meals = {}
    recipes = RECIPE_TEMPLATES.get(menu_type, RECIPE_TEMPLATES["mediterranean"])

    for day in range(1, days_in_month + 1):
        date = start_date + timedelta(days=day-1)
        date_str = date.strftime("%Y-%m-%d")

        if menu_type == "intermittent-fasting":
            # IF has different structure
            daily_meals[f"day_{day}"] = {
                "date": date_str,
                "fastingPeriod": "8:00 PM - 12:00 PM next day",
                "breakFast": {
                    "time": "12:00 PM",
                    **random.choice(recipes["breakfast"])
                },
                "snack": {
                    "time": "3:00 PM",
                    **random.choice(recipes["snack"])
                },
                "dinner": {
                    "time": "6:30 PM",
                    **random.choice(recipes["dinner"])
                },
                "preClosingSnack": {
                    "time": "7:30 PM",
                    **random.choice(recipes["snack"])
                },
                "totalCalories": random.randint(1350, 1550),
                "totalProtein": f"{random.randint(95, 115)}g"
            }
        else:
            # Standard structure for other menu types
            breakfast = random.choice(recipes["breakfast"])
            lunch = random.choice(recipes["lunch"])
            dinner = random.choice(recipes["dinner"])

            daily_meals[f"day_{day}"] = {
                "date": date_str,
                "breakfast": breakfast,
                "lunch": lunch,
                "dinner": dinner,
                "snacks": [
                    {"name": "Morning Snack", "calories": random.randint(100, 150)},
                    {"name": "Afternoon Snack", "calories": random.randint(100, 150)}
                ],
                "totalCalories": breakfast["calories"] + lunch["calories"] + dinner["calories"] + random.randint(200, 300)
            }

    # Generate weekly shopping lists
    weekly_shopping = {}
    for week in range(1, 5):
        weekly_shopping[f"week_{week}"] = get_shopping_list(menu_type)

    # Create the complete plan
    plan = {
        "menuType": menu_type,
        "month": month,
        "year": year,
        "title": f"{menu_type.replace('-', ' ').title()} - {month_name} {year}",
        "description": get_menu_description(menu_type),
        "nutritionTargets": get_nutrition_targets(menu_type),
        "dailyMeals": daily_meals,
        "weeklyShoppingLists": weekly_shopping,
        "mealPrepGuide": get_prep_guide(menu_type)
    }

    return plan

def get_menu_description(menu_type):
    """Get description for each menu type"""
    descriptions = {
        "mediterranean": "Authentic Mediterranean cuisine for healthy weight loss and heart health",
        "intermittent-fasting": "Optimized 16:8 fasting protocol with anti-inflammatory focus",
        "family-focused": "Kid-friendly meals that parents love too - quick, nutritious, and delicious",
        "paleo": "Whole foods, lean proteins, and vegetables - eating like our ancestors",
        "vegetarian": "Plant-powered nutrition with eggs and dairy for complete proteins",
        "vegan": "100% plant-based meals packed with nutrients and flavor",
        "global-cuisine": "A culinary journey around the world - new cuisines every week"
    }
    return descriptions.get(menu_type, "Healthy, balanced meal planning")

def get_nutrition_targets(menu_type):
    """Get nutrition targets for each menu type"""
    targets = {
        "mediterranean": {
            "dailyCalories": "1400-1600",
            "macros": {"protein": "25%", "carbs": "35%", "fats": "40%"},
            "weeklyFish": 3,
            "dailyOliveOil": "2-3 tbsp"
        },
        "intermittent-fasting": {
            "eatingWindow": "12:00 PM - 8:00 PM",
            "dailyCalories": "1400-1600",
            "macros": {"protein": "30%", "carbs": "30%", "fats": "40%"},
            "proteinTarget": "100g minimum"
        },
        "family-focused": {
            "dailyCalories": "1600-2000",
            "macros": {"protein": "20%", "carbs": "45%", "fats": "35%"},
            "familyServings": "4-6 people"
        },
        "paleo": {
            "dailyCalories": "1400-1700",
            "macros": {"protein": "35%", "carbs": "20%", "fats": "45%"},
            "noGrains": True,
            "noDairy": True
        },
        "vegetarian": {
            "dailyCalories": "1400-1600",
            "macros": {"protein": "20%", "carbs": "45%", "fats": "35%"},
            "proteinSources": "eggs, dairy, legumes, nuts"
        },
        "vegan": {
            "dailyCalories": "1400-1600",
            "macros": {"protein": "15%", "carbs": "50%", "fats": "35%"},
            "b12Supplementation": "recommended"
        },
        "global-cuisine": {
            "dailyCalories": "1500-1700",
            "macros": {"protein": "25%", "carbs": "40%", "fats": "35%"},
            "weeklyRotation": "Different cuisine each week"
        }
    }
    return targets.get(menu_type, targets["mediterranean"])

def get_prep_guide(menu_type):
    """Get meal prep guide for each menu type"""
    if menu_type == "family-focused":
        return {
            "sunday": [
                "Prep snack boxes for the week",
                "Cut vegetables for easy cooking",
                "Make a big batch of pasta sauce",
                "Prepare breakfast muffins"
            ],
            "wednesday": [
                "Refresh fruit and vegetables",
                "Prep taco meat for Friday",
                "Make pizza dough for weekend"
            ],
            "timeEstimate": "1.5 hours Sunday, 30 min Wednesday"
        }
    elif menu_type == "intermittent-fasting":
        return {
            "sunday": [
                "Prep protein portions for the week",
                "Cut and store vegetables",
                "Make overnight oats for 3 days",
                "Prepare protein shake ingredients"
            ],
            "wednesday": [
                "Cook fresh protein for rest of week",
                "Prep vegetables for stir-fries",
                "Make chia pudding"
            ],
            "timeEstimate": "2 hours Sunday, 45 min Wednesday"
        }
    else:
        return {
            "sunday": [
                "Prep vegetables for the week",
                "Cook grains and legumes in bulk",
                "Make sauces and dressings",
                "Marinate proteins"
            ],
            "wednesday": [
                "Mid-week vegetable refresh",
                "Prepare overnight items",
                "Quick pickle vegetables"
            ],
            "timeEstimate": "2.5 hours Sunday, 45 min Wednesday"
        }

def main():
    """Generate all meal plans"""

    # Create output directory if it doesn't exist
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print("🍽️  Generating 4 months of meal plans for 7 menu types...")
    print("=" * 50)

    total_plans = 0

    for menu_type in MENU_TYPES:
        print(f"\n📋 Generating {menu_type} plans...")

        for month in range(1, 5):  # January through April
            plan = generate_month_plan(menu_type, month, 2025)

            # Save to file
            filename = f"{menu_type}-2025-{month:02d}.json"
            filepath = os.path.join(OUTPUT_DIR, filename)

            with open(filepath, 'w') as f:
                json.dump(plan, f, indent=2)

            print(f"   ✅ {filename} created")
            total_plans += 1

    print("\n" + "=" * 50)
    print(f"✨ Successfully generated {total_plans} meal plans!")
    print(f"📁 Plans saved to: {OUTPUT_DIR}")

if __name__ == "__main__":
    main()