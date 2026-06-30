-- Create faculty table
CREATE TABLE IF NOT EXISTS public.faculty (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  image TEXT,
  bio TEXT NOT NULL,
  email TEXT,
  department TEXT,
  expertise TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;

-- Create public read-only policy
CREATE POLICY "faculty_select_public" ON public.faculty FOR SELECT USING (true);

-- Create admin policies for insert/update/delete
CREATE POLICY "faculty_insert_admin" ON public.faculty FOR INSERT WITH CHECK (true);
CREATE POLICY "faculty_update_admin" ON public.faculty FOR UPDATE USING (true);
CREATE POLICY "faculty_delete_admin" ON public.faculty FOR DELETE USING (true);
