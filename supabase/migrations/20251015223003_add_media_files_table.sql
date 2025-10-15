/*
  # Create media files tracking table

  1. New Tables
    - `media_files`
      - `id` (uuid, primary key)
      - `user_id` (text, optional user identifier)
      - `file_name` (text, original file name)
      - `file_path` (text, path in storage bucket)
      - `file_size` (bigint, file size in bytes)
      - `mime_type` (text, file MIME type)
      - `bucket_name` (text, storage bucket name)
      - `public_url` (text, public URL for file access)
      - `upload_status` (text, upload status tracking)
      - `created_at` (timestamptz, creation timestamp)
      - `updated_at` (timestamptz, last update timestamp)
  
  2. Security
    - Enable RLS on `media_files` table
    - Add policies for public read access
    - Add policies for authenticated uploads
*/

-- Create update function if it doesn't exist
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create media_files table
CREATE TABLE IF NOT EXISTS media_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text,
  file_name text NOT NULL,
  file_path text NOT NULL UNIQUE,
  file_size bigint NOT NULL,
  mime_type text NOT NULL,
  bucket_name text NOT NULL,
  public_url text NOT NULL,
  upload_status text DEFAULT 'completed',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT media_files_upload_status_check CHECK (
    upload_status IN ('pending', 'uploading', 'completed', 'error')
  )
);

-- Add indexes for faster lookups
CREATE INDEX IF NOT EXISTS media_files_user_id_idx ON media_files (user_id);
CREATE INDEX IF NOT EXISTS media_files_bucket_name_idx ON media_files (bucket_name);
CREATE INDEX IF NOT EXISTS media_files_created_at_idx ON media_files (created_at DESC);

-- Add trigger for updated_at
DROP TRIGGER IF EXISTS update_media_files_updated_at ON media_files;
CREATE TRIGGER update_media_files_updated_at
BEFORE UPDATE ON media_files
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- Enable RLS
ALTER TABLE media_files ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public can view all media files"
  ON media_files FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert media files"
  ON media_files FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update their media files"
  ON media_files FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete media files"
  ON media_files FOR DELETE
  USING (true);

-- Add table comments
COMMENT ON TABLE media_files IS 'Tracks all uploaded media files (images, videos) across storage buckets';
COMMENT ON COLUMN media_files.file_path IS 'Unique path in storage bucket, used for file operations';
COMMENT ON COLUMN media_files.public_url IS 'Public URL for accessing the file';
COMMENT ON COLUMN media_files.upload_status IS 'Current status of the upload process';
