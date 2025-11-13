-- Add multi-phase support to meal_plan_jobs table
-- This allows recipe generation to be split across multiple cron runs

ALTER TABLE meal_plan_jobs
ADD COLUMN IF NOT EXISTS current_phase INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS total_phases INTEGER DEFAULT 5,
ADD COLUMN IF NOT EXISTS generated_recipes JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS phase_progress TEXT DEFAULT '';

-- Update existing jobs to have phase info
UPDATE meal_plan_jobs
SET current_phase = 1,
    total_phases = 5,
    generated_recipes = '[]'::jsonb
WHERE current_phase IS NULL;

COMMENT ON COLUMN meal_plan_jobs.current_phase IS 'Current phase of recipe generation (1-5)';
COMMENT ON COLUMN meal_plan_jobs.total_phases IS 'Total number of phases in the workflow';
COMMENT ON COLUMN meal_plan_jobs.generated_recipes IS 'JSONB array of generated recipes accumulated across phases';
COMMENT ON COLUMN meal_plan_jobs.phase_progress IS 'Human-readable description of current phase';
