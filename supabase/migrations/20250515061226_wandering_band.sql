/*
  # Create webinar videos storage bucket

  1. New Storage
    - Creates 'webinar-videos' storage bucket for uploaded webinar content
    - Sets appropriate permissions for authenticated and anonymous users
    - Configures file size limits and allowed MIME types for videos
  
  2. Security
    - Sets appropriate RLS policies for the bucket
    - Allows public access for reading videos
    - Restricts upload/delete permissions to authenticated users
*/

-- Create the webinar-videos storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('webinar-videos', 'webinar-videos', true)
ON CONFLICT (id) DO NOTHING;

-- Set up security policies for the webinar-videos bucket

-- Allow anyone to download/view videos (read access)
CREATE POLICY "Public can view webinar videos" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'webinar-videos');

-- Only authenticated users can upload webinar videos
CREATE POLICY "Authenticated users can upload webinar videos" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'webinar-videos');

-- Only authenticated users can update their own uploaded videos
CREATE POLICY "Authenticated users can update their own webinar videos" ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner AND bucket_id = 'webinar-videos');

-- Only authenticated users can delete their own uploaded videos
CREATE POLICY "Authenticated users can delete their own webinar videos" ON storage.objects
  FOR DELETE
  TO authenticated
  USING (auth.uid() = owner AND bucket_id = 'webinar-videos');

-- Set up bucket configuration
UPDATE storage.buckets
SET file_size_limit = 1000000000, -- 1GB file size limit
    allowed_mime_types = ARRAY['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime']
WHERE id = 'webinar-videos';