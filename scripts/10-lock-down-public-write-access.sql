-- ============================================================================
-- 10-lock-down-public-write-access.sql
--
-- Why this exists:
-- Earlier scripts in this folder (04, 05, 08, 09, create-books-table.sql,
-- fix-books-rls.sql) were applied at different times and left several tables
-- with RLS policies like:
--     FOR INSERT ... WITH CHECK (true)
--     FOR UPDATE ... USING (true)
--     FOR DELETE ... USING (true)
-- Those grant write access to ANYONE using the public anon key -- i.e. any
-- website visitor, not just you. This script removes every such policy (by
-- every name used across the earlier scripts, so it's safe to run even if
-- you don't know which generation is currently live) and replaces them with
-- public SELECT-only access. There are no new INSERT/UPDATE/DELETE policies
-- for anon/authenticated roles: with RLS enabled and no matching policy,
-- Postgres denies those actions by default. The Supabase dashboard (SQL
-- editor, Table editor, Storage) connects with the service_role key, which
-- bypasses RLS entirely -- so you can keep managing content exactly as
-- planned, through the dashboard only.
--
-- Safe to run multiple times (every DROP uses IF EXISTS, every CREATE drops
-- first). Run this in Supabase Studio -> SQL Editor.
-- ============================================================================

-- ---------- achievements ----------
ALTER TABLE IF EXISTS public.achievements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access" ON public.achievements;
DROP POLICY IF EXISTS "Allow all insert" ON public.achievements;
DROP POLICY IF EXISTS "Allow all update" ON public.achievements;
DROP POLICY IF EXISTS "Allow all delete" ON public.achievements;
DROP POLICY IF EXISTS "Allow public read achievements" ON public.achievements;
DROP POLICY IF EXISTS "achievements_select_public" ON public.achievements;
DROP POLICY IF EXISTS "achievements_insert_admin" ON public.achievements;
DROP POLICY IF EXISTS "achievements_update_admin" ON public.achievements;
DROP POLICY IF EXISTS "achievements_delete_admin" ON public.achievements;
DROP POLICY IF EXISTS "public_read_select" ON public.achievements;

CREATE POLICY "public_read_select" ON public.achievements
  FOR SELECT USING (true);

-- ---------- achievement_media ----------
ALTER TABLE IF EXISTS public.achievement_media ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "achievement_media_select_public" ON public.achievement_media;
DROP POLICY IF EXISTS "achievement_media_insert_admin" ON public.achievement_media;
DROP POLICY IF EXISTS "achievement_media_delete_admin" ON public.achievement_media;
DROP POLICY IF EXISTS "public_read_select" ON public.achievement_media;

CREATE POLICY "public_read_select" ON public.achievement_media
  FOR SELECT USING (true);

-- ---------- faculty ----------
ALTER TABLE IF EXISTS public.faculty ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access" ON public.faculty;
DROP POLICY IF EXISTS "Allow all insert" ON public.faculty;
DROP POLICY IF EXISTS "Allow all update" ON public.faculty;
DROP POLICY IF EXISTS "Allow all delete" ON public.faculty;
DROP POLICY IF EXISTS "Allow public read faculty" ON public.faculty;
DROP POLICY IF EXISTS "faculty_select_public" ON public.faculty;
DROP POLICY IF EXISTS "faculty_insert_admin" ON public.faculty;
DROP POLICY IF EXISTS "faculty_update_admin" ON public.faculty;
DROP POLICY IF EXISTS "faculty_delete_admin" ON public.faculty;
DROP POLICY IF EXISTS "public_read_select" ON public.faculty;

CREATE POLICY "public_read_select" ON public.faculty
  FOR SELECT USING (true);

-- ---------- books ----------
ALTER TABLE IF EXISTS public.books ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read access" ON public.books;
DROP POLICY IF EXISTS "Allow authenticated insert" ON public.books;
DROP POLICY IF EXISTS "Allow authenticated update" ON public.books;
DROP POLICY IF EXISTS "Allow authenticated delete" ON public.books;
DROP POLICY IF EXISTS "Public read access" ON public.books;
DROP POLICY IF EXISTS "Authenticated insert" ON public.books;
DROP POLICY IF EXISTS "Authenticated update" ON public.books;
DROP POLICY IF EXISTS "Authenticated delete" ON public.books;
DROP POLICY IF EXISTS "books_select_public" ON public.books;
DROP POLICY IF EXISTS "public_read_select" ON public.books;

CREATE POLICY "public_read_select" ON public.books
  FOR SELECT USING (true);

-- ---------- events ----------
ALTER TABLE IF EXISTS public.events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "events_select_public" ON public.events;
DROP POLICY IF EXISTS "public_read_select" ON public.events;

CREATE POLICY "public_read_select" ON public.events
  FOR SELECT USING (true);

-- ---------- testimonials ----------
ALTER TABLE IF EXISTS public.testimonials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "testimonials_select_public" ON public.testimonials;
DROP POLICY IF EXISTS "testimonials_insert_admin" ON public.testimonials;
DROP POLICY IF EXISTS "testimonials_update_admin" ON public.testimonials;
DROP POLICY IF EXISTS "testimonials_delete_admin" ON public.testimonials;
DROP POLICY IF EXISTS "public_read_select" ON public.testimonials;

CREATE POLICY "public_read_select" ON public.testimonials
  FOR SELECT USING (true);

-- ---------- subjects (syllabus) ----------
ALTER TABLE IF EXISTS public.subjects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_select" ON public.subjects;

CREATE POLICY "public_read_select" ON public.subjects
  FOR SELECT USING (true);

-- ---------- library_resources ----------
ALTER TABLE IF EXISTS public.library_resources ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view library resources" ON public.library_resources;
DROP POLICY IF EXISTS "public_read_select" ON public.library_resources;

CREATE POLICY "public_read_select" ON public.library_resources
  FOR SELECT USING (true);

-- ============================================================================
-- Tables below belonged to the visitor-login/admin-panel feature set, which
-- has been removed from the application (see the accompanying code changes).
-- Nothing in the app reads or writes them anymore. They are left in place
-- (no data is dropped) but locked down: no public policy at all now means
-- RLS denies every anon/authenticated access by default. Only the
-- service_role key (dashboard, scripts you run yourself) can still see them.
-- If you confirm you don't need this data, you can drop these tables later.
-- ============================================================================

-- ---------- profiles ----------
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- ---------- contact_messages ----------
-- The contact form (app/api/contact/route.ts) emails submissions directly via
-- Gmail SMTP; it never writes to this table. If nothing else inserts into it,
-- it's dead. Locked down rather than dropped, in case you were relying on it.
ALTER TABLE IF EXISTS public.contact_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admin can view contact messages" ON public.contact_messages;

-- ---------- student_stories / programs / syllabi / departments ----------
-- Unused by any current page/query. Locking down defensively in case RLS
-- was never enabled on them.
DO $$
DECLARE
  t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['student_stories', 'programs', 'syllabi', 'departments']
  LOOP
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = t) THEN
      EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    END IF;
  END LOOP;
END $$;

-- ============================================================================
-- Storage: this script only covers the Postgres database. Storage bucket
-- policies (for images/PDFs) are configured separately in
-- Supabase Studio -> Storage -> <bucket> -> Policies. Check each bucket:
--   - Public buckets should allow SELECT (read) for everyone.
--   - There should be NO insert/update/delete policy for the anon role.
-- The app itself never uploads files (no upload UI exists), so the only
-- writer should be you, through the dashboard.
-- ============================================================================
