-- Update the webinar-videos bucket to remove file size limits
UPDATE storage.buckets
SET file_size_limit = NULL, -- Remove file size limit entirely
    allowed_mime_types = ARRAY['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/*'] -- Add generic video/* type
WHERE id = 'webinar-videos';

-- Ensure proper policies are in place for the webinar-videos bucket
DO $$ 
BEGIN
  -- First, drop existing policies to avoid conflicts
  DROP POLICY IF EXISTS "Public can view webinar videos" ON storage.objects;
  DROP POLICY IF EXISTS "Anyone can upload webinar videos" ON storage.objects;
  DROP POLICY IF EXISTS "Anyone can update webinar videos" ON storage.objects;
  DROP POLICY IF EXISTS "Anyone can delete webinar videos" ON storage.objects;
  
  -- Create new, permissive policies
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