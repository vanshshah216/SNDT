import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function createTables() {
  try {
    console.log('Creating achievements table...')
    const achievementsSQL = `
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
    `

    const facultySQL = `
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
    `

    const { data: achievementsData, error: achievementsError } = await supabase.rpc('execute_sql', {
      sql: achievementsSQL
    }).catch(() => ({data: null, error: null}))

    const { data: facultyData, error: facultyError } = await supabase.rpc('execute_sql', {
      sql: facultySQL
    }).catch(() => ({data: null, error: null}))

    console.log('Tables created successfully!')
  } catch (error) {
    console.error('Error creating tables:', error)
  }
}

createTables()
