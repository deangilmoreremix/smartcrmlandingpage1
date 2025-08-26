-- Add new columns to webinar_transcripts for additional AI features

-- First, check if the column exists before adding
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'webinar_transcripts' 
                AND column_name = 'key_moments') THEN
    ALTER TABLE webinar_transcripts 
    ADD COLUMN key_moments jsonb DEFAULT '[]'::jsonb;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'webinar_transcripts' 
                AND column_name = 'qa_content') THEN
    ALTER TABLE webinar_transcripts 
    ADD COLUMN qa_content jsonb DEFAULT '[]'::jsonb;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                WHERE table_name = 'webinar_transcripts' 
                AND column_name = 'sentiment_analysis') THEN
    ALTER TABLE webinar_transcripts 
    ADD COLUMN sentiment_analysis jsonb DEFAULT '{}'::jsonb;
  END IF;
END $$;

-- Create table for AI-generated action items if it doesn't exist
CREATE TABLE IF NOT EXISTS webinar_action_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  webinar_day_number INTEGER NOT NULL,
  action_items jsonb DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add trigger for updated_at
CREATE TRIGGER update_webinar_action_items_updated_at
  BEFORE UPDATE ON webinar_action_items
  FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- Enable Row Level Security
ALTER TABLE webinar_action_items ENABLE ROW LEVEL SECURITY;

-- Set up RLS policies
CREATE POLICY "Public can view all webinar_action_items" 
  ON webinar_action_items FOR SELECT 
  USING (true);

CREATE POLICY "Service role can manage all webinar_action_items" 
  ON webinar_action_items FOR ALL 
  TO service_role 
  USING (true) 
  WITH CHECK (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS webinar_action_items_day_idx 
  ON webinar_action_items (webinar_day_number);

-- Add unique constraint to prevent duplicates
ALTER TABLE webinar_action_items 
  ADD CONSTRAINT webinar_action_items_day_key 
  UNIQUE (webinar_day_number);