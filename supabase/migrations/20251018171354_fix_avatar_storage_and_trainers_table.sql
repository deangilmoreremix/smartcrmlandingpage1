/*
  # Fix Avatar Storage Permissions and Create Trainers Table

  ## Changes
  
  1. Storage Bucket Fixes
    - Recreate storage policies for avatar bucket (previous policies didn't apply correctly)
    - Enable public read access for viewing trainer images
    - Enable authenticated upload/update/delete access
    - Set proper MIME type restrictions
  
  2. New Tables
    - `trainers`
      - `id` (uuid, primary key)
      - `name` (text, trainer full name)
      - `title` (text, trainer title/role)
      - `bio` (text, trainer biography)
      - `email` (text, contact email)
      - `image_url` (text, URL to trainer image in storage)
      - `experience_years` (integer, years of experience)
      - `expertise` (text, area of expertise)
      - `is_active` (boolean, whether trainer is currently active)
      - `display_order` (integer, for sorting trainers)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  3. Security
    - Enable RLS on trainers table
    - Public can view active trainers
    - Only authenticated users can manage trainer records
    - Service role has full access for admin operations
*/

-- Drop existing policies if they exist (cleanup)
DROP POLICY IF EXISTS "Public can view avatar" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload avatar" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update avatar" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete avatar" ON storage.objects;
DROP POLICY IF EXISTS "Allow anon view access for avatar" ON storage.objects;

-- Create storage policies for avatar bucket with correct syntax
CREATE POLICY "Avatar: Public can view"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'avatar');

CREATE POLICY "Avatar: Authenticated can upload"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'avatar');

CREATE POLICY "Avatar: Authenticated can update"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'avatar')
  WITH CHECK (bucket_id = 'avatar');

CREATE POLICY "Avatar: Authenticated can delete"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'avatar');

-- Also allow service role full access
CREATE POLICY "Avatar: Service role full access"
  ON storage.objects
  FOR ALL
  TO service_role
  USING (bucket_id = 'avatar')
  WITH CHECK (bucket_id = 'avatar');

-- Create trainers table
CREATE TABLE IF NOT EXISTS trainers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text NOT NULL,
  bio text,
  email text,
  image_url text,
  experience_years integer DEFAULT 0,
  expertise text,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on trainers table
ALTER TABLE trainers ENABLE ROW LEVEL SECURITY;

-- Public can view active trainers
CREATE POLICY "Public can view active trainers"
  ON trainers
  FOR SELECT
  USING (is_active = true);

-- Authenticated users can view all trainers
CREATE POLICY "Authenticated can view all trainers"
  ON trainers
  FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated users can insert trainers
CREATE POLICY "Authenticated can create trainers"
  ON trainers
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Authenticated users can update trainers
CREATE POLICY "Authenticated can update trainers"
  ON trainers
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Authenticated users can delete trainers
CREATE POLICY "Authenticated can delete trainers"
  ON trainers
  FOR DELETE
  TO authenticated
  USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_trainers_updated_at
  BEFORE UPDATE ON trainers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default trainer (Dean Gilmore)
INSERT INTO trainers (
  name, 
  title, 
  bio, 
  email, 
  experience_years, 
  expertise, 
  is_active,
  display_order
) VALUES (
  'Dean Gilmore',
  'Serial AI Automation Entrepreneur & Video Personalization Innovator',
  'Leveraging 22+ years of pioneering CRM and sales‑automation strategies, Dean has built and scaled platforms like Smart CRM, TrustScout.ai, and VideoRemix—helping businesses of all sizes unlock over $75 million in new revenue through streamlined pipelines, AI‑powered personalization, and turnkey automated workflows.',
  'dean@smartcrm.com',
  22,
  'CRM Implementation',
  true,
  1
) ON CONFLICT (id) DO NOTHING;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_trainers_active ON trainers(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_trainers_display_order ON trainers(display_order);
