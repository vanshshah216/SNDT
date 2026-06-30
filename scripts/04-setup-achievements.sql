-- Create achievements table
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image TEXT,
  achievement TEXT NOT NULL,
  description TEXT,
  skills TEXT[] DEFAULT ARRAY[]::TEXT[],
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create achievement media table for photos and videos
CREATE TABLE IF NOT EXISTS public.achievement_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  achievement_id UUID NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('photo', 'video')),
  url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievement_media ENABLE ROW LEVEL SECURITY;

-- Create public read-only policies
CREATE POLICY "achievements_select_public" ON public.achievements FOR SELECT USING (true);
CREATE POLICY "achievement_media_select_public" ON public.achievement_media FOR SELECT USING (true);

-- Create admin policies for insert/update/delete
CREATE POLICY "achievements_insert_admin" ON public.achievements FOR INSERT WITH CHECK (true);
CREATE POLICY "achievements_update_admin" ON public.achievements FOR UPDATE USING (true);
CREATE POLICY "achievements_delete_admin" ON public.achievements FOR DELETE USING (true);
CREATE POLICY "achievement_media_insert_admin" ON public.achievement_media FOR INSERT WITH CHECK (true);
CREATE POLICY "achievement_media_delete_admin" ON public.achievement_media FOR DELETE USING (true);
