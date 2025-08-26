/*
  # Fix avatar storage bucket policies

  1. Storage Configuration
    - Creates avatar bucket for storing instructor images
    - Sets appropriate file size limits and allowed MIME types
    - Makes the bucket publicly accessible for reading images

  2. Security
    - Sets up appropriate policies for the storage.objects table
    - Allows public read access to avatar files
    - Restricts upload/update/delete operations to authenticated users
    - Provides full access to the service role
*/

-- First, create the avatar bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatar', 'avatar', true)
ON CONFLICT (id) DO NOTHING;

-- Drop any existing policies for the avatar bucket to start fresh
DROP POLICY IF EXISTS "Public Read Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete Access" ON storage.objects;
DROP POLICY IF EXISTS "Service Role Full Access" ON storage.objects;

-- Create policy to allow public read access to the avatar bucket
CREATE POLICY "Public Read Access"
ON storage.objects
FOR SELECT
USING (bucket_id = 'avatar');

-- Create policy to allow authenticated users to upload to the avatar bucket
CREATE POLICY "Authenticated Upload Access"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatar');

-- Create policy to allow authenticated users to update files in the avatar bucket
CREATE POLICY "Authenticated Update Access"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'avatar');

-- Create policy to allow authenticated users to delete files in the avatar bucket
CREATE POLICY "Authenticated Delete Access"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'avatar');

-- Create policy to allow service role to manage all avatar bucket content
CREATE POLICY "Service Role Full Access"
ON storage.objects
FOR ALL
TO service_role
USING (bucket_id = 'avatar');

-- Set up bucket configuration for avatar
UPDATE storage.buckets
SET file_size_limit = 5242880, -- 5MB file size limit
    allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml']
WHERE id = 'avatar';