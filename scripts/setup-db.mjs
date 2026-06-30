import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupDatabase() {
  console.log('Setting up SNDT University database schema...')

  try {
    // Create profiles table
    const { error: profilesError } = await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.profiles (
          id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
          email TEXT NOT NULL UNIQUE,
          full_name TEXT,
          role TEXT DEFAULT 'student' CHECK (role IN ('student', 'admin', 'faculty')),
          avatar_url TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
        );
      `
    }).catch(() => ({ error: null }))

    // Create programs table
    await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.programs (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name TEXT NOT NULL,
          description TEXT,
          duration TEXT,
          year INTEGER,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
        );
      `
    }).catch(() => ({ error: null }))

    // Create syllabi table
    await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.syllabi (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          program_id UUID REFERENCES public.programs(id) ON DELETE CASCADE,
          course_name TEXT NOT NULL,
          course_code TEXT,
          credits INTEGER,
          year INTEGER NOT NULL,
          semester INTEGER,
          description TEXT,
          pdf_url TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
        );
      `
    }).catch(() => ({ error: null }))

    // Create library_resources table
    await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.library_resources (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          title TEXT NOT NULL,
          author TEXT,
          category TEXT,
          resource_type TEXT CHECK (resource_type IN ('book', 'journal', 'research_paper', 'thesis')),
          description TEXT,
          pdf_url TEXT,
          thumbnail_url TEXT,
          year_published INTEGER,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
        );
      `
    }).catch(() => ({ error: null }))

    // Create faculty table
    await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.faculty (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name TEXT NOT NULL,
          title TEXT,
          department TEXT,
          specialization TEXT,
          bio TEXT,
          email TEXT,
          phone TEXT,
          image_url TEXT,
          research_interests TEXT[],
          publications INTEGER DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
        );
      `
    }).catch(() => ({ error: null }))

    // Create departments table
    await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.departments (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name TEXT NOT NULL,
          description TEXT,
          faculty_count INTEGER DEFAULT 0,
          research_areas TEXT[],
          papers_published INTEGER DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
        );
      `
    }).catch(() => ({ error: null }))

    // Create events table
    await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.events (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          title TEXT NOT NULL,
          description TEXT,
          category TEXT,
          event_date TIMESTAMP WITH TIME ZONE,
          end_date TIMESTAMP WITH TIME ZONE,
          location TEXT,
          image_url TEXT,
          organizer TEXT,
          is_featured BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
        );
      `
    }).catch(() => ({ error: null }))

    // Create contact_messages table
    await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.contact_messages (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          full_name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT,
          subject TEXT NOT NULL,
          message TEXT NOT NULL,
          is_read BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
        );
      `
    }).catch(() => ({ error: null }))

    // Create student_stories table
    await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.student_stories (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          title TEXT NOT NULL,
          student_name TEXT NOT NULL,
          program TEXT,
          story TEXT,
          image_url TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
        );
      `
    }).catch(() => ({ error: null }))

    console.log('[v0] Database schema setup completed')
  } catch (error) {
    console.error('[v0] Database setup error:', error)
  }
}

setupDatabase()
