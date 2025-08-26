/*
  # Fix storage permissions for webinar videos

  1. Security Updates
    - Updates RLS policies for webinar-videos bucket
    - Allows public access for uploading files
    - Removes authentication requirements for basic operations
  
  2. Configuration
    - Ensures proper bucket configuration
    - Maintains existing file type restrictions
*/

-- Update policies for the webinar-videos bucket to allow unauthenticated uploads
DO $$ 
BEGIN
  -- First, drop any existing policies for the webinar-videos bucket
  DROP POLICY IF EXISTS "Public can view webinar videos" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can upload webinar videos" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can update their own webinar videos" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated users can delete their own webinar videos" ON storage.objects;
  
  -- Create new policies that are more permissive
  -- Allow anyone to view webinar videos
  CREATE POLICY "Public can view webinar videos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'webinar-videos');
  
  -- Allow anyone to upload webinar videos (no authentication required)
  CREATE POLICY "Anyone can upload webinar videos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'webinar-videos');
  
  -- Allow anyone to update webinar videos
  CREATE POLICY "Anyone can update webinar videos"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'webinar-videos')
  WITH CHECK (bucket_id = 'webinar-videos');
  
  -- Allow anyone to delete webinar videos
  CREATE POLICY "Anyone can delete webinar videos"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'webinar-videos');
END $$;

-- Ensure the webinar-videos bucket exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('webinar-videos', 'webinar-videos', true)
ON CONFLICT (id) DO NOTHING;

-- Update bucket configuration if needed
UPDATE storage.buckets
SET public = true,
    file_size_limit = 1000000000, -- 1GB file size limit
    allowed_mime_types = ARRAY['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime']
WHERE id = 'webinar-videos';