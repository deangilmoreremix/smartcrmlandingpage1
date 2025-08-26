/*
  # Create avatar storage bucket

  1. New Storage
    - Creates 'avatar' storage bucket for instructor profile images
    - Sets appropriate permissions for authenticated and anonymous users
    - Configures file size limits and allowed MIME types
  
  2. Security
    - Sets appropriate RLS policies for the bucket
    - Allows public access for reading avatar images
    - Restricts upload/delete permissions to authenticated users
*/

-- Create the avatar storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatar', 'avatar', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to download/view avatar images (read access)
CREATE POLICY "Public can view avatar" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'avatar');

-- Only authenticated users can upload avatar images
CREATE POLICY "Authenticated users can upload avatar" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'avatar');

-- Only authenticated users can update avatar images
CREATE POLICY "Authenticated users can update avatar" ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'avatar');

-- Only authenticated users can delete avatar images
CREATE POLICY "Authenticated users can delete avatar" ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'avatar');

-- Set up bucket configuration for avatar
UPDATE storage.buckets
SET file_size_limit = 5242880, -- 5MB file size limit
    allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml']
WHERE id = 'avatar';