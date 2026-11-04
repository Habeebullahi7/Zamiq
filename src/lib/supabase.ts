import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

export function genZamiqNumber() {
  return `+1 (800) 736-${Math.floor(7000 + Math.random()*2999)}`
}

export function isSupabaseConfigured() {
  return !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
}

// WhatsApp features helpers
export const EMOJIS = ['😊','😂','❤️','🔥','👍','🙏','😭','🥺','😍','🎉','💀','✨']
export function formatTime(){ return new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) }
export function genId(){ return Math.random().toString(36).slice(2,9) }
