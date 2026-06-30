-- Enable RLS on achievements table
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access"
  ON public.achievements
  FOR SELECT
  USING (true);

-- Create policy to allow all users to insert
CREATE POLICY "Allow all insert"
  ON public.achievements
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow all users to update
CREATE POLICY "Allow all update"
  ON public.achievements
  FOR UPDATE
  USING (true);

-- Create policy to allow all users to delete
CREATE POLICY "Allow all delete"
  ON public.achievements
  FOR DELETE
  USING (true);

-- Enable RLS on faculty table
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access"
  ON public.faculty
  FOR SELECT
  USING (true);

-- Create policy to allow all users to insert
CREATE POLICY "Allow all insert"
  ON public.faculty
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow all users to update
CREATE POLICY "Allow all update"
  ON public.faculty
  FOR UPDATE
  USING (true);

-- Create policy to allow all users to delete
CREATE POLICY "Allow all delete"
  ON public.faculty
  FOR DELETE
  USING (true);
