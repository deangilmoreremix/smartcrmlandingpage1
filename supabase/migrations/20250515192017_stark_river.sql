/*
  # Create avatar storage bucket with public access

  1. New Storage
    - Creates 'avatar' storage bucket with public access
    - Sets file size limit to 5MB
    - Restricts to image file types only
  
  2. Security
    - Creates policies for public access to view/upload/update/delete
    - Allows anyone to upload images without authentication
*/

-- First, create the avatar bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatar', 'avatar', true)
ON CONFLICT (id) DO NOTHING;

-- Drop any existing policies for avatar bucket to start fresh
DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Insert Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Update Access" ON storage.objects;
DROP POLICY IF EXISTS "Public Delete Access" ON storage.objects;
DROP POLICY IF EXISTS "Public can view avatar" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload to avatar" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update avatar" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete avatar" ON storage.objects;

-- Create policy to allow anyone to view files in the avatar bucket
CREATE POLICY "Public can view avatar"
ON storage.objects
FOR SELECT
USING (bucket_id = 'avatar');

-- Create policy to allow anyone to upload to the avatar bucket
-- For INSERT policies, only WITH CHECK is allowed (not USING)
CREATE POLICY "Anyone can upload to avatar"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'avatar');

-- Create policy to allow anyone to update files in the avatar bucket
CREATE POLICY "Anyone can update avatar"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'avatar')
WITH CHECK (bucket_id = 'avatar');

-- Create policy to allow anyone to delete files in the avatar bucket
CREATE POLICY "Anyone can delete avatar"
ON storage.objects
FOR DELETE
USING (bucket_id = 'avatar');

-- Set up bucket configuration for avatar
UPDATE storage.buckets
SET file_size_limit = 5242880, -- 5MB file size limit
    allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml']
WHERE id = 'avatar';