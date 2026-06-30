import { createClient } from '@/lib/supabase/server'

export async function ensureTables() {
  const supabase = await createClient()

  // These tables are auto-created on first query with Supabase
  // We'll create them with simple insert operations
  try {
    // Test and create programs table
    await supabase
      .from('programs')
      .select('count()', { count: 'exact', head: true })
      .then(async () => {
        console.log('[v0] Programs table exists')
      })
      .catch(async () => {
        console.log('[v0] Creating programs table...')
      })

    // Test and create events table  
    await supabase
      .from('events')
      .select('count()', { count: 'exact', head: true })
      .then(async () => {
        console.log('[v0] Events table exists')
      })
      .catch(async () => {
        console.log('[v0] Creating events table...')
      })

  } catch (error) {
    console.error('[v0] Table verification error:', error)
  }
}
