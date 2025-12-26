import { createClient } from '@supabase/supabase-js'

// Support both Next.js (process.env) and Vite (import.meta.env) environment variables
const getEnvVar = (viteKey: string, nextKey: string): string | undefined => {
  // In browser runtime, check for Vite's import.meta.env
  if (typeof window !== 'undefined') {
    try {
      // @ts-ignore - import.meta exists in Vite but not in Next.js
      const viteValue = import.meta?.env?.[viteKey]
      if (viteValue) {
        return viteValue
      }
    } catch {
      // import.meta not available (Next.js environment)
    }
  }
  // Fall back to process.env (Next.js or Node.js)
  return process.env[nextKey] || process.env[viteKey]
}

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_URL')
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY', 'NEXT_PUBLIC_SUPABASE_ANON_KEY')

// Check if we're in a build environment
const isBuildTime = () => {
  return (
    process.env.NEXT_PHASE === 'phase-production-build' ||
    process.env.NEXT_PHASE === 'phase-export' ||
    (process.env.NODE_ENV === 'production' && typeof window === 'undefined' && !supabaseUrl)
  )
}

// Check if URL is a placeholder
const isPlaceholderUrl = (url: string) => {
  return url.includes('build-placeholder') || url.includes('placeholder')
}

// Get Supabase URL with fallback for build time
const getSupabaseUrl = (): string => {
  // Always return a valid URL during build time
  if (isBuildTime()) {
    return 'https://build-placeholder.supabase.co'
  }
  
  if (!supabaseUrl || isPlaceholderUrl(supabaseUrl)) {
    if (typeof window !== 'undefined') {
      console.warn('NEXT_PUBLIC_SUPABASE_URL is not set. Form submission will not work.')
      return 'https://build-placeholder.supabase.co'
    }
    // Only throw error in server-side runtime (not build time)
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL')
  }
  
  // Validate URL format
  try {
    new URL(supabaseUrl)
    return supabaseUrl
  } catch {
    if (typeof window !== 'undefined') {
      console.warn('Invalid NEXT_PUBLIC_SUPABASE_URL. Using placeholder.')
      return 'https://build-placeholder.supabase.co'
    }
    throw new Error('Invalid NEXT_PUBLIC_SUPABASE_URL: Must be a valid HTTP or HTTPS URL')
  }
}

// Get Supabase anon key with fallback for build time
const getSupabaseAnonKey = (): string => {
  // Always return a valid key during build time
  if (isBuildTime()) {
    // Return a placeholder key that looks valid (starts with eyJ like JWT tokens)
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.build-placeholder-key'
  }
  
  if (!supabaseAnonKey) {
    if (typeof window !== 'undefined') {
      // In browser, return placeholder to avoid errors
      return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.build-placeholder-key'
    }
    // Only throw error in server-side runtime (not build time)
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }
  return supabaseAnonKey
}

// Helper to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  const url = getSupabaseUrl()
  return !url.includes('build-placeholder') && !url.includes('placeholder') && url.includes('.supabase.co')
}

// Lazy initialization to avoid errors during build
let _supabaseClient: ReturnType<typeof createClient> | null = null

// Create Supabase client with lazy initialization
export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(_target, prop) {
    if (!_supabaseClient) {
      try {
        // During build, use placeholder values that won't cause errors
        const url = getSupabaseUrl()
        const key = getSupabaseAnonKey()
        _supabaseClient = createClient(url, key)
      } catch (error) {
        // If client creation fails (e.g., during build), create with minimal valid config
        // This should only happen in edge cases
        const fallbackUrl = 'https://placeholder.supabase.co'
        const fallbackKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.placeholder'
        _supabaseClient = createClient(fallbackUrl, fallbackKey)
      }
    }
    return (_supabaseClient as any)[prop]
  }
})
