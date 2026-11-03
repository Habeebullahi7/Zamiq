import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
// Fake +1 generator - Zangi style FREE
export function genZamiqNumber() {
  return `+1 (800) 736-${Math.floor(7000 + Math.random()*2999)}`
}
