/*
  # Add chapter support to webinar content

  1. New Columns
    - Add chapters column to webinar_transcripts table
    - Add duration field to ai_summaries table
  
  2. Storage Updates
    - Ensure proper storage for chapter segmentation data
*/

-- Add chapters column to webinar_transcripts if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'webinar_transcripts' 
                 AND column_name = 'chapters') 
  THEN
    ALTER TABLE webinar_transcripts 
    ADD COLUMN chapters jsonb DEFAULT '[]'::jsonb;
    
    COMMENT ON COLUMN webinar_transcripts.chapters IS 'AI-generated chapter markers for video navigation';
  END IF;
END $$;

-- Add duration field to ai_summaries if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name = 'ai_summaries' 
                 AND column_name = 'duration') 
  THEN
    ALTER TABLE ai_summaries 
    ADD COLUMN duration integer;
    
    COMMENT ON COLUMN ai_summaries.duration IS 'Duration of the webinar in seconds';
  END IF;
END $$;

-- Create new table for chapter data if needed
CREATE TABLE IF NOT EXISTS webinar_chapters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  webinar_day_number INTEGER NOT NULL,
  chapter_title TEXT NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL, 
  description TEXT,
  chapter_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS webinar_chapters_day_idx ON webinar_chapters (webinar_day_number);

-- Add trigger for updated_at
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger
    WHERE tgname = 'update_webinar_chapters_updated_at'
  ) THEN
    CREATE TRIGGER update_webinar_chapters_updated_at
    BEFORE UPDATE ON webinar_chapters
    FOR EACH ROW EXECUTE FUNCTION update_modified_column();
  END IF;
END $$;

-- Enable RLS
ALTER TABLE webinar_chapters ENABLE ROW LEVEL SECURITY;

-- Set RLS policies
CREATE POLICY "Public can view all webinar chapters"
  ON webinar_chapters FOR SELECT
  USING (true);

CREATE POLICY "Service role can manage all webinar chapters"
  ON webinar_chapters FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);