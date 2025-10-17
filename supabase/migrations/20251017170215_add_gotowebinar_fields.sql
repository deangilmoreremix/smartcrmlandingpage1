/*
  # Add GoToWebinar Integration Fields

  ## Purpose
  Add columns to track GoToWebinar registration details and status.

  ## Changes
  1. Add GoToWebinar tracking columns:
     - `gotowebinar_registrant_key` (text) - Unique registrant identifier from GoToWebinar
     - `gotowebinar_join_url` (text) - Join URL for the webinar
     - `gotowebinar_registered_at` (timestamptz) - When registered with GoToWebinar
     - `registration_status` (text) - Overall registration status

  ## Notes
  - GoToWebinar is now the primary webinar platform
  - Zoom remains as backup
  - All existing records remain intact
*/

-- Add GoToWebinar tracking columns
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'webinar_registrations' AND column_name = 'gotowebinar_registrant_key'
  ) THEN
    ALTER TABLE webinar_registrations 
    ADD COLUMN gotowebinar_registrant_key text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'webinar_registrations' AND column_name = 'gotowebinar_join_url'
  ) THEN
    ALTER TABLE webinar_registrations 
    ADD COLUMN gotowebinar_join_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'webinar_registrations' AND column_name = 'gotowebinar_registered_at'
  ) THEN
    ALTER TABLE webinar_registrations 
    ADD COLUMN gotowebinar_registered_at timestamptz;
  END IF;
END $$;

-- Create index for GoToWebinar registrant key
CREATE INDEX IF NOT EXISTS idx_webinar_registrations_gtw_key 
  ON webinar_registrations(gotowebinar_registrant_key);

-- Add comment
COMMENT ON COLUMN webinar_registrations.gotowebinar_registrant_key IS 'GoToWebinar registrant key for tracking registration status';
COMMENT ON COLUMN webinar_registrations.gotowebinar_join_url IS 'GoToWebinar join URL for the registered attendee';
COMMENT ON COLUMN webinar_registrations.gotowebinar_registered_at IS 'Timestamp when successfully registered with GoToWebinar';
