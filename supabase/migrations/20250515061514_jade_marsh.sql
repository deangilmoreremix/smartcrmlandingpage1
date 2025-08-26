/*
  # Add OpenAI integration for webinar recap

  1. New Tables
    - `ai_summaries` stores generated summaries and key points for webinar videos
    - `webinar_transcripts` stores transcription results from video content
  
  2. Security
    - Enable RLS on new tables
    - Add policies for authenticated users and service role
*/

-- Create table for AI-generated webinar summaries
CREATE TABLE IF NOT EXISTS ai_summaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  webinar_day_number INTEGER NOT NULL,
  webinar_title TEXT NOT NULL,
  summary_text TEXT NOT NULL,
  key_points TEXT[] DEFAULT '{}',
  video_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create table for webinar transcripts
CREATE TABLE IF NOT EXISTS webinar_transcripts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  webinar_day_number INTEGER NOT NULL,
  transcript_text TEXT NOT NULL,
  segments JSON DEFAULT '[]',
  video_url TEXT,
  processing_status TEXT DEFAULT 'completed',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT webinar_transcripts_processing_status_check CHECK (
    processing_status IN ('pending', 'processing', 'completed', 'error')
  )
);

-- Add trigger for updated_at
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers to tables
CREATE TRIGGER update_ai_summaries_updated_at
  BEFORE UPDATE ON ai_summaries
  FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_webinar_transcripts_updated_at
  BEFORE UPDATE ON webinar_transcripts
  FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- Enable Row Level Security
ALTER TABLE ai_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE webinar_transcripts ENABLE ROW LEVEL SECURITY;

-- Set up RLS policies

-- AI Summaries policies
CREATE POLICY "Public can view all ai_summaries" 
  ON ai_summaries FOR SELECT 
  USING (true);

CREATE POLICY "Service role can manage all ai_summaries" 
  ON ai_summaries FOR ALL 
  TO service_role 
  USING (true) 
  WITH CHECK (true);

-- Webinar Transcripts policies
CREATE POLICY "Public can view all webinar_transcripts" 
  ON webinar_transcripts FOR SELECT 
  USING (true);

CREATE POLICY "Service role can manage all webinar_transcripts" 
  ON webinar_transcripts FOR ALL 
  TO service_role 
  USING (true) 
  WITH CHECK (true);

-- Add table comment
COMMENT ON TABLE ai_summaries IS 'Stores AI-generated summaries of webinar videos';
COMMENT ON TABLE webinar_transcripts IS 'Stores transcripts of webinar videos processed through speech-to-text';

-- Create index on webinar day for faster lookups
CREATE INDEX ai_summaries_webinar_day_idx ON ai_summaries (webinar_day_number);
CREATE INDEX webinar_transcripts_webinar_day_idx ON webinar_transcripts (webinar_day_number);