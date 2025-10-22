-- Create member_resources table for exclusive content
CREATE TABLE IF NOT EXISTS public.member_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Content Info
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  content_type TEXT NOT NULL CHECK (content_type IN ('article', 'guide', 'video', 'pdf', 'checklist', 'template')),

  -- Content
  content TEXT, -- Markdown or HTML content
  file_url TEXT, -- For PDFs, videos, downloadable files
  thumbnail_url TEXT,

  -- Categorization
  category TEXT, -- e.g., 'meal-prep', 'nutrition', 'cooking-techniques', 'meal-planning'
  tags TEXT[] DEFAULT '{}',
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),

  -- Access Control
  is_premium BOOLEAN DEFAULT true, -- If false, available to all authenticated users
  required_subscription TEXT, -- 'monthly-calendar', 'any', etc.

  -- Metadata
  author TEXT,
  read_time_minutes INTEGER,
  view_count INTEGER DEFAULT 0,

  -- Publishing
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  -- Ordering
  display_order INTEGER DEFAULT 0
);

-- Create member_resource_views table to track engagement
CREATE TABLE IF NOT EXISTS public.member_resource_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id UUID REFERENCES public.member_resources(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  viewed_at TIMESTAMP DEFAULT NOW(),
  completed BOOLEAN DEFAULT false,

  UNIQUE(resource_id, user_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_member_resources_slug ON public.member_resources(slug);
CREATE INDEX IF NOT EXISTS idx_member_resources_category ON public.member_resources(category);
CREATE INDEX IF NOT EXISTS idx_member_resources_published ON public.member_resources(published);
CREATE INDEX IF NOT EXISTS idx_member_resource_views_user ON public.member_resource_views(user_id);
CREATE INDEX IF NOT EXISTS idx_member_resource_views_resource ON public.member_resource_views(resource_id);

-- Enable RLS
ALTER TABLE public.member_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_resource_views ENABLE ROW LEVEL SECURITY;

-- RLS Policies for member_resources
CREATE POLICY "Anyone can view published non-premium resources"
  ON public.member_resources
  FOR SELECT
  USING (published = true AND is_premium = false);

CREATE POLICY "Authenticated users can view published premium resources"
  ON public.member_resources
  FOR SELECT
  USING (
    published = true
    AND is_premium = true
    AND auth.uid() IS NOT NULL
  );

-- RLS Policies for member_resource_views
CREATE POLICY "Users can view own resource views"
  ON public.member_resource_views
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own resource views"
  ON public.member_resource_views
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own resource views"
  ON public.member_resource_views
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Trigger to auto-update updated_at
CREATE TRIGGER update_member_resources_updated_at
  BEFORE UPDATE ON public.member_resources
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to increment view count
CREATE OR REPLACE FUNCTION increment_resource_view_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.member_resources
  SET view_count = view_count + 1
  WHERE id = NEW.resource_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER increment_view_count_trigger
  AFTER INSERT ON public.member_resource_views
  FOR EACH ROW
  EXECUTE FUNCTION increment_resource_view_count();

-- TODO: USER INPUT NEEDED
-- Insert sample/placeholder content below
-- You can add your actual content later using the admin panel or API

-- Example: Meal Prep Guide
INSERT INTO public.member_resources (
  title,
  slug,
  description,
  content_type,
  category,
  tags,
  difficulty_level,
  is_premium,
  published,
  read_time_minutes,
  content
) VALUES (
  'Sunday Meal Prep Guide for Beginners',
  'sunday-meal-prep-guide',
  'Step-by-step guide to preparing a week of healthy meals in just 2-3 hours',
  'guide',
  'meal-prep',
  ARRAY['meal-prep', 'batch-cooking', 'time-saving'],
  'beginner',
  true,
  true,
  10,
  '# Sunday Meal Prep Guide

## Getting Started

[TODO: Add your content here]

This is a placeholder. Replace with your actual meal prep strategies, tips, and step-by-step instructions.'
);

-- Example: Nutrition Guide
INSERT INTO public.member_resources (
  title,
  slug,
  description,
  content_type,
  category,
  tags,
  difficulty_level,
  is_premium,
  published,
  read_time_minutes,
  content
) VALUES (
  'Understanding Macros: A Wellness Guide',
  'understanding-macros',
  'Learn how to balance proteins, carbs, and fats for optimal health',
  'article',
  'nutrition',
  ARRAY['nutrition', 'macros', 'health'],
  'beginner',
  true,
  true,
  8,
  '# Understanding Macros

## What Are Macronutrients?

[TODO: Add your content here]

This is a placeholder. Replace with your nutritional guidance.'
);

-- Example: Cooking Technique
INSERT INTO public.member_resources (
  title,
  slug,
  description,
  content_type,
  category,
  tags,
  difficulty_level,
  is_premium,
  published,
  read_time_minutes,
  content
) VALUES (
  '10 Essential Cooking Techniques Every Home Chef Should Master',
  'essential-cooking-techniques',
  'Master these fundamental techniques to elevate your cooking game',
  'guide',
  'cooking-techniques',
  ARRAY['cooking', 'techniques', 'skills'],
  'intermediate',
  true,
  true,
  12,
  '# Essential Cooking Techniques

## 1. Proper Knife Skills

[TODO: Add your content here]

This is a placeholder. Add your cooking technique instructions with photos/videos.'
);
