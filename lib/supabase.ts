import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only throw error at runtime, not during build
// During static export build, provide placeholder values
const getSupabaseUrl = () => {
  if (!supabaseUrl) {
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      return 'https://placeholder.supabase.co'
    }
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL')
  }
  return supabaseUrl
}

const getSupabaseAnonKey = () => {
  if (!supabaseAnonKey) {
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      return 'placeholder-key'
    }
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }
  return supabaseAnonKey
}

export const supabase = createClient(getSupabaseUrl(), getSupabaseAnonKey())

// Server-side Supabase client (uses service role key for admin operations)
export const createServerClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  // During static export build, API routes won't work anyway
  // Return a placeholder client that will fail gracefully
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return createClient(
      getSupabaseUrl(),
      serviceRoleKey || 'placeholder-service-key',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )
  }

  if (!serviceRoleKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY')
  }

  return createClient(getSupabaseUrl(), serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

