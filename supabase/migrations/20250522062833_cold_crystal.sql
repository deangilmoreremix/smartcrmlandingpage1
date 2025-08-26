/*
  # Ensure all storage buckets are public with permissive access

  1. Bucket Updates
    - Ensures all storage buckets (webinar-videos, avatar, images) are public
    - Removes file size limits from webinar-videos
    - Configures appropriate MIME types
  
  2. Security
    - Updates all RLS policies to ensure public access
    - Allows anonymous uploads and modifications
    - Ensures all API endpoints are publicly accessible
*/

-- 1. Ensure all buckets exist and are public
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('webinar-videos', 'webinar-videos', true),
  ('avatar', 'avatar', true),
  ('images', 'images', true)
ON CONFLICT (id) DO UPDATE
SET public = true;

-- 2. Update bucket configurations
-- Remove file size limit for webinar-videos
UPDATE storage.buckets
SET file_size_limit = NULL,
    allowed_mime_types = ARRAY['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/*']
WHERE id = 'webinar-videos';

-- Ensure avatar has appropriate settings
UPDATE storage.buckets
SET file_size_limit = 10485760, -- 10MB (increased from 5MB)
    allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml', 'image/*']
WHERE id = 'avatar';

-- Ensure images has appropriate settings
UPDATE storage.buckets
SET file_size_limit = 20971520, -- 20MB (increased from 10MB)
    allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml', 'image/*']
WHERE id = 'images';

-- 3. Remove all existing policies for these buckets to start fresh
DO $$ 
DECLARE
  policy_rec RECORD;
BEGIN
  FOR policy_rec IN 
    SELECT policyname 
    FROM pg_policies 
    WHERE schemaname = 'storage' 
      AND tablename = 'objects' 
      AND (policyname LIKE '%webinar%' 
        OR policyname LIKE '%avatar%' 
        OR policyname LIKE '%image%'
        OR policyname LIKE '%Public%'
        OR policyname LIKE '%Anyone%')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', policy_rec.policyname);
  END LOOP;
END $$;

-- 4. Create new permissive policies for all buckets

-- webinar-videos policies
CREATE POLICY "Public can view webinar videos" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'webinar-videos');

CREATE POLICY "Anyone can upload webinar videos" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'webinar-videos');

CREATE POLICY "Anyone can update webinar videos" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'webinar-videos') 
WITH CHECK (bucket_id = 'webinar-videos');

CREATE POLICY "Anyone can delete webinar videos" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'webinar-videos');

-- avatar policies
CREATE POLICY "Public can view avatar" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'avatar');

CREATE POLICY "Anyone can upload avatar" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'avatar');

CREATE POLICY "Anyone can update avatar" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'avatar') 
WITH CHECK (bucket_id = 'avatar');

CREATE POLICY "Anyone can delete avatar" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'avatar');

-- images policies
CREATE POLICY "Public can view images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'images');

CREATE POLICY "Anyone can upload images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'images');

CREATE POLICY "Anyone can update images" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'images') 
WITH CHECK (bucket_id = 'images');

CREATE POLICY "Anyone can delete images" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'images');

-- 5. Add explicit anon role policies for extra certainty
CREATE POLICY "Anonymous can view all objects" 
ON storage.objects FOR SELECT 
TO anon 
USING (true);

CREATE POLICY "Anonymous can upload to all buckets" 
ON storage.objects FOR INSERT 
TO anon 
WITH CHECK (true);

-- 6. Ensure webinar_transcripts table has public access
DO $$ 
BEGIN
  -- Check if the table exists
  IF EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'webinar_transcripts') THEN
    -- Enable RLS if not already enabled
    ALTER TABLE webinar_transcripts ENABLE ROW LEVEL SECURITY;
    
    -- Create public access policies
    DROP POLICY IF EXISTS "Public can view all webinar_transcripts" ON webinar_transcripts;
    DROP POLICY IF EXISTS "Anyone can insert webinar_transcripts" ON webinar_transcripts;
    DROP POLICY IF EXISTS "Anyone can update webinar_transcripts" ON webinar_transcripts;
    
    CREATE POLICY "Public can view all webinar_transcripts" 
    ON webinar_transcripts FOR SELECT 
    USING (true);
    
    CREATE POLICY "Anyone can insert webinar_transcripts" 
    ON webinar_transcripts FOR INSERT 
    WITH CHECK (true);
    
    CREATE POLICY "Anyone can update webinar_transcripts" 
    ON webinar_transcripts FOR UPDATE 
    USING (true);
    
    CREATE POLICY "Anyone can delete webinar_transcripts" 
    ON webinar_transcripts FOR DELETE 
    USING (true);
  END IF;
END $$;

-- 7. Ensure ai_summaries table has public access
DO $$ 
BEGIN
  -- Check if the table exists
  IF EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'ai_summaries') THEN
    -- Enable RLS if not already enabled
    ALTER TABLE ai_summaries ENABLE ROW LEVEL SECURITY;
    
    -- Create public access policies
    DROP POLICY IF EXISTS "Public can view all ai_summaries" ON ai_summaries;
    DROP POLICY IF EXISTS "Anyone can insert ai_summaries" ON ai_summaries;
    DROP POLICY IF EXISTS "Anyone can update ai_summaries" ON ai_summaries;
    
    CREATE POLICY "Public can view all ai_summaries" 
    ON ai_summaries FOR SELECT 
    USING (true);
    
    CREATE POLICY "Anyone can insert ai_summaries" 
    ON ai_summaries FOR INSERT 
    WITH CHECK (true);
    
    CREATE POLICY "Anyone can update ai_summaries" 
    ON ai_summaries FOR UPDATE 
    USING (true);
    
    CREATE POLICY "Anyone can delete ai_summaries" 
    ON ai_summaries FOR DELETE 
    USING (true);
  END IF;
END $$;

-- 8. Ensure webinar_chapters table has public access
DO $$ 
BEGIN
  -- Check if the table exists
  IF EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'webinar_chapters') THEN
    -- Enable RLS if not already enabled
    ALTER TABLE webinar_chapters ENABLE ROW LEVEL SECURITY;
    
    -- Create public access policies
    DROP POLICY IF EXISTS "Public can view all webinar chapters" ON webinar_chapters;
    DROP POLICY IF EXISTS "Anyone can insert webinar chapters" ON webinar_chapters;
    DROP POLICY IF EXISTS "Anyone can update webinar chapters" ON webinar_chapters;
    
    CREATE POLICY "Public can view all webinar chapters" 
    ON webinar_chapters FOR SELECT 
    USING (true);
    
    CREATE POLICY "Anyone can insert webinar chapters" 
    ON webinar_chapters FOR INSERT 
    WITH CHECK (true);
    
    CREATE POLICY "Anyone can update webinar chapters" 
    ON webinar_chapters FOR UPDATE 
    USING (true);
    
    CREATE POLICY "Anyone can delete webinar chapters" 
    ON webinar_chapters FOR DELETE 
    USING (true);
  END IF;
END $$;

-- 9. Ensure webinar_action_items table has public access
DO $$ 
BEGIN
  -- Check if the table exists
  IF EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'webinar_action_items') THEN
    -- Enable RLS if not already enabled
    ALTER TABLE webinar_action_items ENABLE ROW LEVEL SECURITY;
    
    -- Create public access policies
    DROP POLICY IF EXISTS "Public can view all webinar_action_items" ON webinar_action_items;
    DROP POLICY IF EXISTS "Anyone can insert webinar_action_items" ON webinar_action_items;
    DROP POLICY IF EXISTS "Anyone can update webinar_action_items" ON webinar_action_items;
    
    CREATE POLICY "Public can view all webinar_action_items" 
    ON webinar_action_items FOR SELECT 
    USING (true);
    
    CREATE POLICY "Anyone can insert webinar_action_items" 
    ON webinar_action_items FOR INSERT 
    WITH CHECK (true);
    
    CREATE POLICY "Anyone can update webinar_action_items" 
    ON webinar_action_items FOR UPDATE 
    USING (true);
    
    CREATE POLICY "Anyone can delete webinar_action_items" 
    ON webinar_action_items FOR DELETE 
    USING (true);
  END IF;
END $$;