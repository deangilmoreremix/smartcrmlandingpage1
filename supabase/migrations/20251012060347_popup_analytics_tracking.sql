/*
  # Popup Analytics and Conversion Tracking

  1. New Tables
    - `popup_interactions`
      - `id` (uuid, primary key)
      - `session_id` (text) - Browser session identifier
      - `interaction_type` (text) - Type: view, expand, dismiss, click_cta, conversion
      - `popup_variant` (text) - Which popup variant was shown
      - `time_on_page` (integer) - Seconds on page before popup shown
      - `scroll_depth` (integer) - Percentage scrolled before popup shown
      - `spots_remaining` (integer) - Number displayed when interaction occurred
      - `days_remaining` (integer) - Days until deadline when shown
      - `device_type` (text) - mobile, tablet, desktop
      - `referrer_source` (text) - Where user came from
      - `created_at` (timestamptz)

    - `popup_conversions`
      - `id` (uuid, primary key)
      - `session_id` (text)
      - `email` (text) - If provided
      - `conversion_type` (text) - purchase, signup, masterclass
      - `time_to_conversion` (integer) - Seconds from popup view to conversion
      - `popup_variant` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Allow anonymous inserts for tracking (public can insert their own data)
    - Only authenticated admins can read analytics data

  3. Indexes
    - Add indexes on session_id, interaction_type, and created_at for fast queries
*/

-- Create popup_interactions table
CREATE TABLE IF NOT EXISTS popup_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  interaction_type text NOT NULL CHECK (interaction_type IN ('view', 'expand', 'dismiss', 'click_cta', 'conversion')),
  popup_variant text DEFAULT 'floating_cta',
  time_on_page integer DEFAULT 0,
  scroll_depth integer DEFAULT 0,
  spots_remaining integer,
  days_remaining integer,
  device_type text CHECK (device_type IN ('mobile', 'tablet', 'desktop', 'unknown')),
  referrer_source text,
  created_at timestamptz DEFAULT now()
);

-- Create popup_conversions table
CREATE TABLE IF NOT EXISTS popup_conversions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  email text,
  conversion_type text NOT NULL CHECK (conversion_type IN ('purchase', 'signup', 'masterclass', 'early_access')),
  time_to_conversion integer DEFAULT 0,
  popup_variant text DEFAULT 'floating_cta',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE popup_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE popup_conversions ENABLE ROW LEVEL SECURITY;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_popup_interactions_session ON popup_interactions(session_id);
CREATE INDEX IF NOT EXISTS idx_popup_interactions_type ON popup_interactions(interaction_type);
CREATE INDEX IF NOT EXISTS idx_popup_interactions_created ON popup_interactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_popup_conversions_session ON popup_conversions(session_id);
CREATE INDEX IF NOT EXISTS idx_popup_conversions_created ON popup_conversions(created_at DESC);

-- RLS Policies: Allow anonymous users to insert their own tracking data
CREATE POLICY "Anyone can insert their popup interactions"
  ON popup_interactions FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can insert their conversions"
  ON popup_conversions FOR INSERT
  TO anon
  WITH CHECK (true);

-- RLS Policies: Only authenticated users can view analytics (admin dashboard)
CREATE POLICY "Authenticated users can view all interactions"
  ON popup_interactions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can view all conversions"
  ON popup_conversions FOR SELECT
  TO authenticated
  USING (true);