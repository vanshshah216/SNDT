-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read access" ON books;
DROP POLICY IF EXISTS "Allow authenticated insert" ON books;
DROP POLICY IF EXISTS "Allow authenticated update" ON books;
DROP POLICY IF EXISTS "Allow authenticated delete" ON books;

-- Create new RLS policies with proper authentication check
-- Allow public read access
CREATE POLICY "Public read access" ON books
  FOR SELECT
  USING (true);

-- Allow any authenticated user to insert books
CREATE POLICY "Authenticated insert" ON books
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Allow any authenticated user to update books
CREATE POLICY "Authenticated update" ON books
  FOR UPDATE
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- Allow any authenticated user to delete books
CREATE POLICY "Authenticated delete" ON books
  FOR DELETE
  USING (auth.uid() IS NOT NULL);
