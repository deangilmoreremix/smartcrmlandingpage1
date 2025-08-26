/*
  # Create avatar storage bucket for instructor images

  1. New Storage
    - Creates 'avatar' storage bucket for instructor profile images
    - Sets appropriate permissions for authenticated and anonymous users
    - Configures file size limits and allowed MIME types for images
  
  2. Security
    - Sets appropriate RLS policies for the bucket
    - Allows public access for reading images
    - Restricts upload/update/delete permissions to authenticated users
*/

-- Create the avatar storage bucket for instructor images
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatar', 'avatar', true)
ON CONFLICT (id) DO NOTHING;

-- Set up security policies for the avatar bucket
-- First drop any existing policies to avoid conflicts
DO $$
BEGIN
    -- Drop policies if they exist
    IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public can view avatar' AND tablename = 'objects') THEN
        DROP POLICY "Public can view avatar" ON storage.objects;
    END IF;
    
    IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can upload avatar' AND tablename = 'objects') THEN
        DROP POLICY "Authenticated users can upload avatar" ON storage.objects;
    END IF;
    
    IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can update avatar' AND tablename = 'objects') THEN
        DROP POLICY "Authenticated users can update avatar" ON storage.objects;
    END IF;
    
    IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can delete avatar' AND tablename = 'objects') THEN
        DROP POLICY "Authenticated users can delete avatar" ON storage.objects;
    END IF;
    
    IF EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow anon view access for avatar' AND tablename = 'objects') THEN
        DROP POLICY "Allow anon view access for avatar" ON storage.objects;
    END IF;
END $$;

-- Create new policies
CREATE POLICY "Public can view avatar" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'avatar');

CREATE POLICY "Authenticated users can upload avatar" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'avatar');

CREATE POLICY "Authenticated users can update avatar" ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'avatar');

CREATE POLICY "Authenticated users can delete avatar" ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'avatar');

-- Ensure anonymous users can at least view avatar content
CREATE POLICY "Allow anon view access for avatar" ON storage.objects
  FOR SELECT
  TO anon
  USING (bucket_id = 'avatar');

-- Set up bucket configuration for avatar
UPDATE storage.buckets
SET file_size_limit = 5242880, -- 5MB file size limit
    allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml']
WHERE id = 'avatar';