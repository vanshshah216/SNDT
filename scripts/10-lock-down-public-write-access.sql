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
-- every name used across the earlier scripts) and replaces them with public
-- SELECT-only access. There are no new INSERT/UPDATE/DELETE policies for
-- anon/authenticated roles: with RLS enabled and no matching policy,
-- Postgres denies those actions by default. The Supabase dashboard (SQL
-- editor, Table editor, Storage) connects with the service_role key, which
-- bypasses RLS entirely -- so you can keep managing content exactly as
-- planned, through the dashboard only.
--
-- Every table is skipped entirely if it doesn't exist in your database
-- (your earlier run failed on achievement_media, which your project never
-- had), so this is safe to run regardless of which earlier scripts actually
-- got applied. Safe to run multiple times.
-- ============================================================================

DO $$
DECLARE
  tbl text;
  pol text;
  read_only_tables text[] := ARRAY[
    'achievements', 'achievement_media', 'faculty', 'books', 'events',
    'testimonials', 'subjects', 'library_resources'
  ];
  locked_down_tables text[] := ARRAY[
    'profiles', 'contact_messages', 'student_stories', 'programs',
    'syllabi', 'departments'
  ];
  known_policy_names text[] := ARRAY[
    'Allow public read access', 'Allow all insert', 'Allow all update', 'Allow all delete',
    'Allow public read achievements', 'Allow public read faculty',
    'achievements_select_public', 'achievements_insert_admin', 'achievements_update_admin', 'achievements_delete_admin',
    'achievement_media_select_public', 'achievement_media_insert_admin', 'achievement_media_delete_admin',
    'faculty_select_public', 'faculty_insert_admin', 'faculty_update_admin', 'faculty_delete_admin',
    'Public read access', 'Authenticated insert', 'Authenticated update', 'Authenticated delete',
    'Allow authenticated insert', 'Allow authenticated update', 'Allow authenticated delete',
    'books_select_public', 'events_select_public',
    'testimonials_select_public', 'testimonials_insert_admin', 'testimonials_update_admin', 'testimonials_delete_admin',
    'Public can view library resources', 'Public can view profiles', 'Users can update own profile',
    'Anyone can insert contact messages', 'Admin can view contact messages',
    'public_read_select'
  ];
BEGIN
  -- Tables that should stay publicly READABLE, writable only via service_role.
  FOREACH tbl IN ARRAY read_only_tables LOOP
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = tbl) THEN
      EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', tbl);

      FOREACH pol IN ARRAY known_policy_names LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pol, tbl);
      END LOOP;

      EXECUTE format('CREATE POLICY %I ON public.%I FOR SELECT USING (true)', 'public_read_select', tbl);

      RAISE NOTICE 'Locked down %: public SELECT only.', tbl;
    ELSE
      RAISE NOTICE 'Skipped % (table does not exist in this project).', tbl;
    END IF;
  END LOOP;

  -- Tables belonging to the removed visitor-login/admin-panel feature set.
  -- Nothing in the app reads or writes them anymore. Left in place (no data
  -- dropped) but fully locked down: no public policy at all, so RLS denies
  -- every anon/authenticated access by default. Only service_role can see them.
  FOREACH tbl IN ARRAY locked_down_tables LOOP
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = tbl) THEN
      EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', tbl);

      FOREACH pol IN ARRAY known_policy_names LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pol, tbl);
      END LOOP;

      RAISE NOTICE 'Locked down % entirely (no public policy; unused by the app).', tbl;
    ELSE
      RAISE NOTICE 'Skipped % (table does not exist in this project).', tbl;
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
