-- Add meal_type column to recipes table
-- meal_type can be: breakfast, lunch, dinner, snack, or any (flexible for all meals)

ALTER TABLE public.recipes
ADD COLUMN IF NOT EXISTS meal_type TEXT DEFAULT 'any';

-- Add a check constraint to ensure valid meal types
ALTER TABLE public.recipes
ADD CONSTRAINT meal_type_check
CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack', 'any'));

-- Create an index for faster filtering by meal type
CREATE INDEX IF NOT EXISTS idx_recipes_meal_type ON public.recipes(meal_type);

-- Comment on the column
COMMENT ON COLUMN public.recipes.meal_type IS 'The meal type this recipe is suitable for: breakfast, lunch, dinner, snack, or any';
