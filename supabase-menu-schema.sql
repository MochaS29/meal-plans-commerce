-- Additional Supabase tables for meal plan content management
-- Run this after the main schema to add menu management capabilities

-- Diet Plans table (Mediterranean, Keto, etc.)
CREATE TABLE IF NOT EXISTS diet_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recipes table
CREATE TABLE IF NOT EXISTS recipes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    prep_time INTEGER, -- in minutes
    cook_time INTEGER, -- in minutes
    servings INTEGER DEFAULT 4,
    difficulty VARCHAR(50), -- easy, medium, hard
    diet_plans UUID[] DEFAULT '{}', -- Array of diet plan IDs this recipe belongs to
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recipe ingredients
CREATE TABLE IF NOT EXISTS recipe_ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    ingredient VARCHAR(255) NOT NULL,
    amount VARCHAR(100),
    unit VARCHAR(50),
    notes TEXT,
    order_index INTEGER DEFAULT 0
);

-- Recipe instructions
CREATE TABLE IF NOT EXISTS recipe_instructions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    step_number INTEGER NOT NULL,
    instruction TEXT NOT NULL
);

-- Recipe nutrition
CREATE TABLE IF NOT EXISTS recipe_nutrition (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    calories INTEGER,
    protein DECIMAL(10,2),
    carbs DECIMAL(10,2),
    fat DECIMAL(10,2),
    fiber DECIMAL(10,2),
    sugar DECIMAL(10,2),
    sodium DECIMAL(10,2)
);

-- Meal Plans (30-day calendars)
CREATE TABLE IF NOT EXISTS meal_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    diet_plan_id UUID REFERENCES diet_plans(id),
    month INTEGER NOT NULL,
    year INTEGER NOT NULL,
    week_number INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(diet_plan_id, year, month, week_number)
);

-- Daily Meals
CREATE TABLE IF NOT EXISTS daily_meals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    meal_plan_id UUID REFERENCES meal_plans(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL, -- 1=Monday, 7=Sunday
    breakfast_recipe_id UUID REFERENCES recipes(id),
    lunch_recipe_id UUID REFERENCES recipes(id),
    dinner_recipe_id UUID REFERENCES recipes(id),
    snack_recipe_id UUID REFERENCES recipes(id),
    UNIQUE(meal_plan_id, day_of_week)
);

-- Shopping Lists
CREATE TABLE IF NOT EXISTS shopping_lists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    meal_plan_id UUID REFERENCES meal_plans(id) ON DELETE CASCADE,
    week_number INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Shopping List Items
CREATE TABLE IF NOT EXISTS shopping_list_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shopping_list_id UUID REFERENCES shopping_lists(id) ON DELETE CASCADE,
    category VARCHAR(100), -- Produce, Dairy, Meat, etc.
    item VARCHAR(255) NOT NULL,
    quantity VARCHAR(100),
    notes TEXT,
    order_index INTEGER DEFAULT 0
);

-- Meal Prep Guides
CREATE TABLE IF NOT EXISTS meal_prep_guides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    meal_plan_id UUID REFERENCES meal_plans(id) ON DELETE CASCADE,
    day_name VARCHAR(50), -- 'Sunday', 'Wednesday', etc.
    prep_tasks TEXT[], -- Array of prep tasks
    time_estimate INTEGER -- in minutes
);

-- Create indexes
CREATE INDEX idx_recipes_diet_plans ON recipes USING GIN(diet_plans);
CREATE INDEX idx_daily_meals_meal_plan ON daily_meals(meal_plan_id);
CREATE INDEX idx_meal_plans_diet_month_year ON meal_plans(diet_plan_id, year, month);

-- Sample data insertion (for testing)
INSERT INTO diet_plans (name, slug, description) VALUES
    ('Mediterranean Diet', 'mediterranean', 'Heart-healthy diet rich in olive oil, fish, and vegetables'),
    ('Keto Diet', 'keto', 'Low-carb, high-fat diet for ketosis'),
    ('Vegan Diet', 'vegan', 'Plant-based diet with no animal products'),
    ('Paleo Diet', 'paleo', 'Whole foods diet based on paleolithic eating'),
    ('Vegetarian Diet', 'vegetarian', 'Plant-based diet with dairy and eggs'),
    ('Intermittent Fasting', 'intermittent-fasting', 'Time-restricted eating patterns'),
    ('Family-Focused', 'family-focused', 'Kid-friendly healthy meals'),
    ('Global Cuisine', 'global', 'International recipes from around the world');

-- Function to get complete meal plan for a user
CREATE OR REPLACE FUNCTION get_meal_plan_for_month(
    p_diet_plan_id UUID,
    p_year INTEGER,
    p_month INTEGER
) RETURNS TABLE (
    week_number INTEGER,
    day_of_week INTEGER,
    day_name TEXT,
    breakfast JSON,
    lunch JSON,
    dinner JSON,
    snack JSON
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        mp.week_number,
        dm.day_of_week,
        CASE dm.day_of_week
            WHEN 1 THEN 'Monday'
            WHEN 2 THEN 'Tuesday'
            WHEN 3 THEN 'Wednesday'
            WHEN 4 THEN 'Thursday'
            WHEN 5 THEN 'Friday'
            WHEN 6 THEN 'Saturday'
            WHEN 7 THEN 'Sunday'
        END as day_name,
        row_to_json(b.*) as breakfast,
        row_to_json(l.*) as lunch,
        row_to_json(d.*) as dinner,
        row_to_json(s.*) as snack
    FROM meal_plans mp
    JOIN daily_meals dm ON dm.meal_plan_id = mp.id
    LEFT JOIN recipes b ON b.id = dm.breakfast_recipe_id
    LEFT JOIN recipes l ON l.id = dm.lunch_recipe_id
    LEFT JOIN recipes d ON d.id = dm.dinner_recipe_id
    LEFT JOIN recipes s ON s.id = dm.snack_recipe_id
    WHERE mp.diet_plan_id = p_diet_plan_id
        AND mp.year = p_year
        AND mp.month = p_month
    ORDER BY mp.week_number, dm.day_of_week;
END;
$$ LANGUAGE plpgsql;

-- View for easy recipe browsing
CREATE OR REPLACE VIEW recipe_details AS
SELECT
    r.*,
    array_agg(DISTINCT dp.name) as diet_plan_names,
    json_agg(DISTINCT ri.*) as ingredients,
    json_agg(DISTINCT inst.*) as instructions,
    n.calories,
    n.protein,
    n.carbs,
    n.fat
FROM recipes r
LEFT JOIN diet_plans dp ON dp.id = ANY(r.diet_plans)
LEFT JOIN recipe_ingredients ri ON ri.recipe_id = r.id
LEFT JOIN recipe_instructions inst ON inst.recipe_id = r.id
LEFT JOIN recipe_nutrition n ON n.recipe_id = r.id
GROUP BY r.id, n.calories, n.protein, n.carbs, n.fat;