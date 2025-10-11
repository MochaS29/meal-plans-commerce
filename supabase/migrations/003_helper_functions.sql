-- Function to get complete recipe with all details
CREATE OR REPLACE FUNCTION get_complete_recipe(recipe_uuid UUID)
RETURNS JSON AS $$
  SELECT json_build_object(
    'id', r.id,
    'name', r.name,
    'description', r.description,
    'prep_time', r.prep_time,
    'cook_time', r.cook_time,
    'servings', r.servings,
    'difficulty', r.difficulty,
    'diet_plans', r.diet_plans,
    'image_url', (SELECT url FROM images WHERE entity_type = 'recipe' AND entity_id = r.id AND is_primary = true LIMIT 1),
    'images', (SELECT json_agg(json_build_object('url', url, 'alt_text', alt_text, 'caption', caption)) FROM images WHERE entity_type = 'recipe' AND entity_id = r.id),
    'ingredients', (
      SELECT json_agg(
        json_build_object(
          'ingredient', ingredient,
          'amount', amount,
          'unit', unit,
          'notes', notes
        ) ORDER BY order_index
      ) FROM recipe_ingredients WHERE recipe_id = r.id
    ),
    'instructions', (
      SELECT json_agg(
        json_build_object(
          'step', step_number,
          'instruction', instruction
        ) ORDER BY step_number
      ) FROM recipe_instructions WHERE recipe_id = r.id
    ),
    'nutrition', (
      SELECT json_build_object(
        'calories', calories,
        'protein', protein,
        'carbs', carbs,
        'fat', fat,
        'fiber', fiber
      ) FROM recipe_nutrition WHERE recipe_id = r.id LIMIT 1
    )
  )
  FROM recipes r
  WHERE r.id = recipe_uuid;
$$ LANGUAGE SQL;

-- Function to generate shopping list from meal plan
CREATE OR REPLACE FUNCTION generate_shopping_list(meal_plan_uuid UUID)
RETURNS TABLE (
  item TEXT,
  total_quantity TEXT,
  category TEXT,
  recipe_count INTEGER
) AS $$
  WITH week_recipes AS (
    SELECT DISTINCT unnest(ARRAY[
      breakfast_recipe_id,
      lunch_recipe_id,
      dinner_recipe_id,
      snack_recipe_id
    ]) as recipe_id
    FROM daily_meals
    WHERE meal_plan_id = meal_plan_uuid
      AND unnest(ARRAY[breakfast_recipe_id, lunch_recipe_id, dinner_recipe_id, snack_recipe_id]) IS NOT NULL
  ),
  aggregated_ingredients AS (
    SELECT
      ri.ingredient,
      string_agg(DISTINCT ri.amount || ' ' || COALESCE(ri.unit, ''), ' + ') as total_quantity,
      COUNT(DISTINCT wr.recipe_id) as recipe_count,
      CASE
        -- Proteins
        WHEN ri.ingredient ILIKE ANY(ARRAY['%chicken%', '%beef%', '%pork%', '%lamb%', '%turkey%', '%fish%', '%salmon%', '%tuna%', '%shrimp%']) THEN 'Protein'
        -- Dairy
        WHEN ri.ingredient ILIKE ANY(ARRAY['%milk%', '%cheese%', '%yogurt%', '%butter%', '%cream%']) THEN 'Dairy'
        -- Produce
        WHEN ri.ingredient ILIKE ANY(ARRAY['%tomato%', '%lettuce%', '%spinach%', '%kale%', '%carrot%', '%onion%', '%garlic%', '%pepper%', '%apple%', '%banana%', '%orange%', '%berry%', '%berries%']) THEN 'Produce'
        -- Grains
        WHEN ri.ingredient ILIKE ANY(ARRAY['%rice%', '%pasta%', '%bread%', '%flour%', '%oats%', '%quinoa%']) THEN 'Grains'
        -- Pantry
        WHEN ri.ingredient ILIKE ANY(ARRAY['%oil%', '%vinegar%', '%sauce%', '%spice%', '%salt%', '%pepper%', '%sugar%']) THEN 'Pantry'
        -- Frozen
        WHEN ri.ingredient ILIKE '%frozen%' THEN 'Frozen'
        ELSE 'Other'
      END as category
    FROM week_recipes wr
    JOIN recipe_ingredients ri ON ri.recipe_id = wr.recipe_id
    GROUP BY ri.ingredient
  )
  SELECT
    ingredient as item,
    total_quantity,
    category,
    recipe_count
  FROM aggregated_ingredients
  ORDER BY category, ingredient;
$$ LANGUAGE SQL;

-- Function to save shopping list to database
CREATE OR REPLACE FUNCTION save_shopping_list(meal_plan_uuid UUID)
RETURNS UUID AS $$
DECLARE
  shopping_list_id UUID;
  week_num INTEGER;
BEGIN
  -- Get week number from meal plan
  SELECT week_number INTO week_num FROM meal_plans WHERE id = meal_plan_uuid;

  -- Create shopping list
  INSERT INTO shopping_lists (meal_plan_id, week_number)
  VALUES (meal_plan_uuid, week_num)
  RETURNING id INTO shopping_list_id;

  -- Insert shopping list items
  INSERT INTO shopping_list_items (shopping_list_id, item, quantity, category)
  SELECT
    shopping_list_id,
    item,
    total_quantity,
    category
  FROM generate_shopping_list(meal_plan_uuid);

  RETURN shopping_list_id;
END;
$$ LANGUAGE plpgsql;

-- Function to get weekly meal plan with all recipes
CREATE OR REPLACE FUNCTION get_weekly_meal_plan(meal_plan_uuid UUID)
RETURNS JSON AS $$
  SELECT json_build_object(
    'meal_plan_id', mp.id,
    'diet_plan', (SELECT name FROM diet_plans WHERE id = mp.diet_plan_id),
    'year', mp.year,
    'month', mp.month,
    'week_number', mp.week_number,
    'daily_meals', (
      SELECT json_agg(
        json_build_object(
          'day_of_week', dm.day_of_week,
          'day_name', CASE dm.day_of_week
            WHEN 1 THEN 'Monday'
            WHEN 2 THEN 'Tuesday'
            WHEN 3 THEN 'Wednesday'
            WHEN 4 THEN 'Thursday'
            WHEN 5 THEN 'Friday'
            WHEN 6 THEN 'Saturday'
            WHEN 7 THEN 'Sunday'
          END,
          'breakfast', (SELECT json_build_object('id', r.id, 'name', r.name, 'image_url', (SELECT url FROM images WHERE entity_type = 'recipe' AND entity_id = r.id AND is_primary = true LIMIT 1)) FROM recipes r WHERE r.id = dm.breakfast_recipe_id),
          'lunch', (SELECT json_build_object('id', r.id, 'name', r.name, 'image_url', (SELECT url FROM images WHERE entity_type = 'recipe' AND entity_id = r.id AND is_primary = true LIMIT 1)) FROM recipes r WHERE r.id = dm.lunch_recipe_id),
          'dinner', (SELECT json_build_object('id', r.id, 'name', r.name, 'image_url', (SELECT url FROM images WHERE entity_type = 'recipe' AND entity_id = r.id AND is_primary = true LIMIT 1)) FROM recipes r WHERE r.id = dm.dinner_recipe_id),
          'snack', (SELECT json_build_object('id', r.id, 'name', r.name, 'image_url', (SELECT url FROM images WHERE entity_type = 'recipe' AND entity_id = r.id AND is_primary = true LIMIT 1)) FROM recipes r WHERE r.id = dm.snack_recipe_id)
        ) ORDER BY dm.day_of_week
      )
      FROM daily_meals dm WHERE dm.meal_plan_id = mp.id
    )
  )
  FROM meal_plans mp
  WHERE mp.id = meal_plan_uuid;
$$ LANGUAGE SQL;

-- Add indexes for the new images queries
CREATE INDEX IF NOT EXISTS idx_images_recipe_primary ON public.images(entity_id, is_primary) WHERE entity_type = 'recipe' AND is_primary = true;
