import { createClient } from '@supabase/supabase-js'

// Soporte tanto para entorno Vite (import.meta.env) como para scripts/Node (process.env)
const env = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {}
const procEnv = typeof process !== 'undefined' && process.env ? process.env : {}

const supabaseUrl =
  env.VITE_SUPABASE_URL ||
  env.SUPABASE_URL ||
  procEnv.VITE_SUPABASE_URL ||
  procEnv.SUPABASE_URL ||
  'https://tjdnfmfxbugafeaogshu.supabase.co'

const supabaseAnonKey =
  env.VITE_SUPABASE_ANON_KEY ||
  env.SUPABASE_ANON_KEY ||
  procEnv.VITE_SUPABASE_ANON_KEY ||
  procEnv.SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqZG5mbWZ4YnVnYWZlYW9nc2h1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE0OTUwNzksImV4cCI6MjEwNzA3MTA3OX0.zEqv_ZPK0uCy3aim8TZ4dl-7mzsHobWmeMYYUf6ZszE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
