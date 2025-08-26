/*
  # Create images storage bucket

  1. New Storage
    - Creates 'images' storage bucket for uploaded images
    - Sets appropriate permissions for authenticated and anonymous users
    - Configures file size limits and allowed MIME types for images
  
  2. Security
    - Sets appropriate RLS policies for the bucket
    - Allows public access for reading images
    - Restricts upload/delete permissions to authenticated users
*/

-- Create the images storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up security policies for the images bucket

-- Allow anyone to download/view images (read access)
CREATE POLICY "Public can view images" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'images');

-- Only authenticated users can upload images
CREATE POLICY "Authenticated users can upload images" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'images');

-- Only authenticated users can update their own uploaded images
CREATE POLICY "Authenticated users can update their own images" ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner AND bucket_id = 'images');

-- Only authenticated users can delete their own uploaded images
CREATE POLICY "Authenticated users can delete their own images" ON storage.objects
  FOR DELETE
  TO authenticated
  USING (auth.uid() = owner AND bucket_id = 'images');

-- Set up bucket configuration
UPDATE storage.buckets
SET file_size_limit = 10485760, -- 10MB file size limit
    allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml']
WHERE id = 'images';