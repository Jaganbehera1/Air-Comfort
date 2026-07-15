/*
  # Update to Supabase Authentication

  ## Overview
  Migrates from custom admin_users table to Supabase built-in authentication.

  ## Changes
  1. Updates gallery_items to reference auth.users instead of admin_users
  2. Removes admin_users table (no longer needed with Supabase auth)
  3. Updates RLS policies to use auth.uid()

  ## Security
  - All policies updated to use Supabase auth functions
  - Maintains public read access for customer views
  - Admin write access restricted to authenticated users
*/

-- Drop existing foreign key constraint
ALTER TABLE gallery_items DROP CONSTRAINT IF EXISTS gallery_items_created_by_fkey;

-- Rename created_by to admin_id for clarity and update to reference auth.users
ALTER TABLE gallery_items RENAME COLUMN created_by TO admin_id;

-- Add foreign key to auth.users
ALTER TABLE gallery_items ADD CONSTRAINT gallery_items_admin_id_fkey 
  FOREIGN KEY (admin_id) REFERENCES auth.users(id) ON DELETE SET NULL;

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view gallery items" ON gallery_items;
DROP POLICY IF EXISTS "Admins can insert gallery items" ON gallery_items;
DROP POLICY IF EXISTS "Admins can update gallery items" ON gallery_items;
DROP POLICY IF EXISTS "Admins can delete gallery items" ON gallery_items;

-- Create new policies with proper Supabase auth
CREATE POLICY "Anyone can view gallery items"
  ON gallery_items FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert gallery items"
  ON gallery_items FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = admin_id);

CREATE POLICY "Authenticated users can update their gallery items"
  ON gallery_items FOR UPDATE
  TO authenticated
  USING (auth.uid() = admin_id)
  WITH CHECK (auth.uid() = admin_id);

CREATE POLICY "Authenticated users can delete their gallery items"
  ON gallery_items FOR DELETE
  TO authenticated
  USING (auth.uid() = admin_id);

-- Update contact_info policies
DROP POLICY IF EXISTS "Anyone can view contact info" ON contact_info;
DROP POLICY IF EXISTS "Admins can update contact info" ON contact_info;

CREATE POLICY "Anyone can view contact info"
  ON contact_info FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can update contact info"
  ON contact_info FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Drop admin_users table as we're using Supabase auth
DROP TABLE IF EXISTS admin_users CASCADE;