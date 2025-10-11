# Apply Database Migrations

The images table and helper functions need to be created in your Supabase database.

## Option 1: Supabase Dashboard (Recommended)

1. Go to your Supabase dashboard: https://app.supabase.com/project/rnvowqoqqcrimrybuiea/sql

2. Click "New Query" or use the SQL Editor

3. Copy and paste the entire contents of each migration file (in order):

   **Step 1:** Apply `supabase/migrations/002_create_images_table.sql`

   **Step 2:** Apply `supabase/migrations/003_helper_functions.sql`

4. Click "Run" for each migration

## Option 2: Using psql (if you have database credentials)

```bash
# If you have direct database access
psql $DATABASE_URL -f supabase/migrations/002_create_images_table.sql
psql $DATABASE_URL -f supabase/migrations/003_helper_functions.sql
```

## What These Migrations Do

### 002_create_images_table.sql
- Creates `images` table to store recipe images
- Sets up indexes for fast lookups
- Enables Row Level Security (RLS)
- Public can read, authenticated users can write

### 003_helper_functions.sql
- `get_complete_recipe(uuid)` - Get recipe with all details and image
- `generate_shopping_list(uuid)` - Generate shopping list from meal plan
- `save_shopping_list(uuid)` - Save shopping list to database
- `get_weekly_meal_plan(uuid)` - Get weekly plan with all recipes

## Verification

After applying migrations, verify they were created successfully:

```sql
-- Check if images table exists
SELECT EXISTS (
  SELECT FROM pg_tables
  WHERE schemaname = 'public'
  AND tablename = 'images'
);

-- Check if helper functions exist
SELECT routine_name
FROM information_schema.routines
WHERE routine_type = 'FUNCTION'
AND routine_schema = 'public'
AND routine_name IN (
  'get_complete_recipe',
  'generate_shopping_list',
  'save_shopping_list',
  'get_weekly_meal_plan'
);
```

## Next Steps

After migrations are applied, you can:

1. Add recipe images to the `images` table
2. Use the helper functions in your API routes
3. Build frontend components to display recipes and shopping lists
