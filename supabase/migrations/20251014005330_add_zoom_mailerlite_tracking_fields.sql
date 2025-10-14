/*
  Add Zoom and MailerLite Tracking Fields to Webinar Registrations

  Purpose:
  This migration adds tracking fields to manage dual registration with Zoom webinars 
  and MailerLite email marketing platform, enabling complete audit trails and retry 
  mechanisms for failed registrations.

  Changes Made:
  1. New Columns Added to webinar_registrations table:
     - zoom_registrant_id (text) - Unique identifier from Zoom API for the registrant
     - zoom_join_url (text) - Personal join URL provided by Zoom for the registrant
     - mailerlite_subscriber_id (text) - MailerLite subscriber ID
     - registration_status (text) - Tracks overall registration progress
     - error_log (jsonb) - Stores detailed error information for debugging
     - retry_count (integer) - Number of retry attempts made
     - last_retry_at (timestamptz) - Timestamp of last retry attempt
     - zoom_registered_at (timestamptz) - Timestamp when Zoom registration succeeded
     - mailerlite_registered_at (timestamptz) - Timestamp when MailerLite registration succeeded

  2. Indexes Created:
     - Index on registration_status for filtering failed/partial registrations
     - Index on zoom_registrant_id for quick lookups
     - Index on mailerlite_subscriber_id for quick lookups
     - Index on retry_count for identifying registrations needing retry

  Security:
  - Existing RLS policies remain in effect
  - No changes to access control

  Notes:
  - Default registration_status is 'pending' for all new registrations
  - error_log uses JSONB for flexible error tracking
  - Timestamps help track registration timing and identify delays
*/

-- Add tracking columns for Zoom integration
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'webinar_registrations' AND column_name = 'zoom_registrant_id'
  ) THEN
    ALTER TABLE webinar_registrations ADD COLUMN zoom_registrant_id text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'webinar_registrations' AND column_name = 'zoom_join_url'
  ) THEN
    ALTER TABLE webinar_registrations ADD COLUMN zoom_join_url text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'webinar_registrations' AND column_name = 'zoom_registered_at'
  ) THEN
    ALTER TABLE webinar_registrations ADD COLUMN zoom_registered_at timestamptz;
  END IF;
END $$;

-- Add tracking columns for MailerLite integration
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'webinar_registrations' AND column_name = 'mailerlite_subscriber_id'
  ) THEN
    ALTER TABLE webinar_registrations ADD COLUMN mailerlite_subscriber_id text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'webinar_registrations' AND column_name = 'mailerlite_registered_at'
  ) THEN
    ALTER TABLE webinar_registrations ADD COLUMN mailerlite_registered_at timestamptz;
  END IF;
END $$;

-- Add general tracking columns
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'webinar_registrations' AND column_name = 'registration_status'
  ) THEN
    ALTER TABLE webinar_registrations ADD COLUMN registration_status text DEFAULT 'pending';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'webinar_registrations' AND column_name = 'error_log'
  ) THEN
    ALTER TABLE webinar_registrations ADD COLUMN error_log jsonb DEFAULT '[]'::jsonb;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'webinar_registrations' AND column_name = 'retry_count'
  ) THEN
    ALTER TABLE webinar_registrations ADD COLUMN retry_count integer DEFAULT 0;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'webinar_registrations' AND column_name = 'last_retry_at'
  ) THEN
    ALTER TABLE webinar_registrations ADD COLUMN last_retry_at timestamptz;
  END IF;
END $$;

-- Create indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_webinar_registrations_status 
  ON webinar_registrations(registration_status);

CREATE INDEX IF NOT EXISTS idx_webinar_registrations_zoom_id 
  ON webinar_registrations(zoom_registrant_id) 
  WHERE zoom_registrant_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_webinar_registrations_mailerlite_id 
  ON webinar_registrations(mailerlite_subscriber_id) 
  WHERE mailerlite_subscriber_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_webinar_registrations_retry 
  ON webinar_registrations(retry_count, last_retry_at) 
  WHERE registration_status != 'both_success';

-- Add constraint to ensure valid registration statuses
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'valid_registration_status'
  ) THEN
    ALTER TABLE webinar_registrations
    ADD CONSTRAINT valid_registration_status 
    CHECK (registration_status IN (
      'pending',
      'db_only',
      'zoom_success',
      'mailerlite_success',
      'both_success',
      'partial_failure',
      'failed'
    ));
  END IF;
END $$;

-- Add helpful comment
COMMENT ON COLUMN webinar_registrations.registration_status IS 'Tracks registration progress: pending, db_only, zoom_success, mailerlite_success, both_success, partial_failure, failed';
COMMENT ON COLUMN webinar_registrations.error_log IS 'JSONB array storing error details from Zoom and MailerLite API calls';
COMMENT ON COLUMN webinar_registrations.retry_count IS 'Number of retry attempts for failed registrations';
