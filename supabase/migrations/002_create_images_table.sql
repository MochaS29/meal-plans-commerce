-- Create images table
CREATE TABLE IF NOT EXISTS public.images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  alt_text TEXT,
  caption TEXT,
  width INTEGER,
  height INTEGER,
  file_size INTEGER,
  mime_type TEXT,
  storage_path TEXT,
  entity_type TEXT, -- 'recipe', 'diet_plan', 'user', etc.
  entity_id UUID,
  is_primary BOOLEAN DEFAULT FALSE,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster lookups by entity
CREATE INDEX IF NOT EXISTS idx_images_entity ON public.images(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_images_primary ON public.images(entity_type, entity_id, is_primary) WHERE is_primary = TRUE;

-- Enable Row Level Security
ALTER TABLE public.images ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for public read access
CREATE POLICY "Public read access" ON public.images FOR SELECT USING (true);

-- Create policy for authenticated write access (you can customize this)
CREATE POLICY "Authenticated users can insert" ON public.images FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Authenticated users can update" ON public.images FOR UPDATE
  USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

CREATE POLICY "Authenticated users can delete" ON public.images FOR DELETE
  USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_images_updated_at BEFORE UPDATE ON public.images
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
