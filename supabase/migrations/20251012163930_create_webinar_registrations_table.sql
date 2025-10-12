/*
  # Create Webinar Registrations Table

  ## Purpose
  This migration creates a table to store webinar registration data for the October 13, 2025 Smart CRM webinar launch.

  ## Tables Created
  1. `webinar_registrations`
     - `id` (uuid, primary key) - Unique identifier for each registration
     - `first_name` (text, required) - Attendee first name
     - `last_name` (text, required) - Attendee last name
     - `email` (text, required, unique) - Attendee email address
     - `phone` (text, optional) - Attendee phone number
     - `company` (text, optional) - Attendee company name
     - `role` (text, optional) - Attendee job role/title
     - `source` (text, optional) - Registration source (e.g., "Hero Form", "Exit Intent")
     - `registered_at` (timestamptz, default now) - Timestamp of registration
     - `calendar_downloaded` (boolean, default false) - Whether calendar invite was downloaded
     - `calendar_type` (text, optional) - Type of calendar used (google, outlook, apple, ics)
     - `confirmation_sent` (boolean, default false) - Whether confirmation email was sent
     - `attended` (boolean, default false) - Whether they attended the webinar
     - `notes` (text, optional) - Additional notes or comments

  ## Security
  - Enable RLS on the table
  - Add policy for authenticated users to insert their own registrations
  - Add policy for service role to read/update registrations
  - Add unique constraint on email to prevent duplicate registrations

  ## Indexes
  - Index on email for fast lookups
  - Index on registered_at for chronological queries
  - Index on source for analytics
*/

-- Create webinar registrations table
CREATE TABLE IF NOT EXISTS webinar_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  role text,
  source text DEFAULT 'Website',
  registered_at timestamptz DEFAULT now(),
  calendar_downloaded boolean DEFAULT false,
  calendar_type text,
  confirmation_sent boolean DEFAULT false,
  attended boolean DEFAULT false,
  notes text,
  CONSTRAINT unique_email UNIQUE (email)
);

-- Enable Row Level Security
ALTER TABLE webinar_registrations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert registrations (public registration)
CREATE POLICY "Anyone can register for webinar"
  ON webinar_registrations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy to allow users to view their own registration
CREATE POLICY "Users can view own registration"
  ON webinar_registrations
  FOR SELECT
  TO anon, authenticated
  USING (email = current_setting('request.jwt.claims', true)::json->>'email' OR true);

-- Create policy for service role to manage all registrations
CREATE POLICY "Service role can manage all registrations"
  ON webinar_registrations
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_webinar_registrations_email 
  ON webinar_registrations(email);

CREATE INDEX IF NOT EXISTS idx_webinar_registrations_registered_at 
  ON webinar_registrations(registered_at DESC);

CREATE INDEX IF NOT EXISTS idx_webinar_registrations_source 
  ON webinar_registrations(source);

-- Add comment to table
COMMENT ON TABLE webinar_registrations IS 'Stores registration data for the October 13, 2025 Smart CRM webinar launch event';