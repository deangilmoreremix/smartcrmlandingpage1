-- Create the avatar storage bucket for instructor images
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatar', 'avatar', true)
ON CONFLICT (id) DO NOTHING;

-- Set up security policies for the avatar bucket in a way that handles duplicates

-- Allow anyone to download/view avatar images (read access)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Public can view avatar'
  ) THEN
    CREATE POLICY "Public can view avatar" ON storage.objects
      FOR SELECT
      USING (bucket_id = 'avatar');
  END IF;
END $$;

-- Only authenticated users can upload avatar images
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Authenticated users can upload avatar'
  ) THEN
    CREATE POLICY "Authenticated users can upload avatar" ON storage.objects
      FOR INSERT
      TO authenticated
      WITH CHECK (bucket_id = 'avatar');
  END IF;
END $$;

-- Only authenticated users can update avatar images
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Authenticated users can update avatar'
  ) THEN
    CREATE POLICY "Authenticated users can update avatar" ON storage.objects
      FOR UPDATE
      TO authenticated
      USING (bucket_id = 'avatar');
  END IF;
END $$;

-- Only authenticated users can delete avatar images
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Authenticated users can delete avatar'
  ) THEN
    CREATE POLICY "Authenticated users can delete avatar" ON storage.objects
      FOR DELETE
      TO authenticated
      USING (bucket_id = 'avatar');
  END IF;
END $$;

-- Ensure anonymous users can at least view avatar content
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Allow anon view access for avatar'
  ) THEN
    CREATE POLICY "Allow anon view access for avatar" ON storage.objects
      FOR SELECT
      TO anon
      USING (bucket_id = 'avatar');
  END IF;
END $$;

-- Set up bucket configuration for avatar
UPDATE storage.buckets
SET file_size_limit = 5242880, -- 5MB file size limit
    allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml']
WHERE id = 'avatar';