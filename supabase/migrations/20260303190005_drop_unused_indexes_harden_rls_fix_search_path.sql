/*
  # Security Hardening: Unused Indexes, RLS Policies, and Function Search Path

  1. Dropped Indexes (unused, wasting write overhead)
    - `idx_popup_interactions_session` on popup_interactions
    - `idx_popup_interactions_type` on popup_interactions
    - `idx_popup_interactions_created` on popup_interactions
    - `idx_popup_conversions_session` on popup_conversions
    - `idx_popup_conversions_created` on popup_conversions
    - `idx_trainers_active` on trainers
    - `idx_trainers_display_order` on trainers

  2. Fixed function search_path
    - Recreated `update_updated_at_column` with immutable search_path (`SET search_path = ''`)

  3. Fixed multiple permissive SELECT policies on trainers
    - Dropped overlapping "Public can view active trainers" (role: public) which shadowed
      "Authenticated can view all trainers" (role: authenticated)
    - Replaced with anon-only policy so anonymous visitors see active trainers only,
      while authenticated users see all trainers

  4. Hardened RLS policies
    - popup_interactions INSERT: now requires non-empty session_id and interaction_type
    - popup_conversions INSERT: now requires non-empty session_id and conversion_type
    - trainers: added `created_by` column (uuid, references auth.users)
      - INSERT requires auth.uid() match on created_by
      - UPDATE restricted to records owned by auth.uid()
      - DELETE restricted to records owned by auth.uid()

  5. Security notes
    - All changes are additive or replace existing policies; no data is deleted
    - Trainer records created before this migration will have created_by = NULL;
      they can be claimed by updating the column manually
*/

-- ============================================================
-- 1. Drop unused indexes
-- ============================================================
DROP INDEX IF EXISTS idx_popup_interactions_session;
DROP INDEX IF EXISTS idx_popup_interactions_type;
DROP INDEX IF EXISTS idx_popup_interactions_created;
DROP INDEX IF EXISTS idx_popup_conversions_session;
DROP INDEX IF EXISTS idx_popup_conversions_created;
DROP INDEX IF EXISTS idx_trainers_active;
DROP INDEX IF EXISTS idx_trainers_display_order;

-- ============================================================
-- 2. Fix mutable search_path on update_updated_at_column
-- ============================================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ============================================================
-- 3. Fix overlapping SELECT policies on trainers
-- ============================================================

-- Drop the public (all roles) policy that overlaps with authenticated
DROP POLICY IF EXISTS "Public can view active trainers" ON public.trainers;

-- Replace with anon-only policy so anon sees only active, authenticated sees all
CREATE POLICY "Anon can view active trainers"
  ON public.trainers
  FOR SELECT
  TO anon
  USING (is_active = true);

-- ============================================================
-- 4. Harden popup_interactions INSERT policy
-- ============================================================

DROP POLICY IF EXISTS "Anyone can insert their popup interactions" ON public.popup_interactions;

CREATE POLICY "Anon can insert popup interactions with valid data"
  ON public.popup_interactions
  FOR INSERT
  TO anon
  WITH CHECK (
    session_id IS NOT NULL
    AND length(trim(session_id)) > 0
    AND interaction_type IS NOT NULL
    AND length(trim(interaction_type)) > 0
  );

-- ============================================================
-- 5. Harden popup_conversions INSERT policy
-- ============================================================

DROP POLICY IF EXISTS "Anyone can insert their conversions" ON public.popup_conversions;

CREATE POLICY "Anon can insert conversions with valid data"
  ON public.popup_conversions
  FOR INSERT
  TO anon
  WITH CHECK (
    session_id IS NOT NULL
    AND length(trim(session_id)) > 0
    AND conversion_type IS NOT NULL
    AND length(trim(conversion_type)) > 0
  );

-- ============================================================
-- 6. Harden trainers write policies with ownership
-- ============================================================

-- Add created_by column for ownership tracking
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'trainers'
      AND column_name = 'created_by'
  ) THEN
    ALTER TABLE public.trainers
      ADD COLUMN created_by uuid REFERENCES auth.users(id);
  END IF;
END $$;

-- Drop overly permissive write policies
DROP POLICY IF EXISTS "Authenticated can create trainers" ON public.trainers;
DROP POLICY IF EXISTS "Authenticated can update trainers" ON public.trainers;
DROP POLICY IF EXISTS "Authenticated can delete trainers" ON public.trainers;

-- Ownership-based INSERT
CREATE POLICY "Authenticated can create own trainers"
  ON public.trainers
  FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

-- Ownership-based UPDATE
CREATE POLICY "Authenticated can update own trainers"
  ON public.trainers
  FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

-- Ownership-based DELETE
CREATE POLICY "Authenticated can delete own trainers"
  ON public.trainers
  FOR DELETE
  TO authenticated
  USING (created_by = auth.uid());
