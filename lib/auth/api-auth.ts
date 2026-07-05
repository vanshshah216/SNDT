import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import type { User } from '@supabase/supabase-js'

type AuthSuccess = {
  authorized: true
  user: User
}

type AuthFailure = {
  authorized: false
  response: NextResponse
}

export async function requireAuth(): Promise<AuthSuccess | AuthFailure> {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return {
      authorized: false,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    }
  }

  return { authorized: true, user }
}
