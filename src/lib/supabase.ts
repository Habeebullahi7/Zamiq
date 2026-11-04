import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

export function genZamiqNumber() {
  // Real US area codes - not toll free 800
  const areas = [
    '415', // San Francisco
    '650', // Silicon Valley  
    '213', // Los Angeles
    '312', // Chicago
    '646', // New York
    '305', // Miami
  ]
  const area = areas[Math.floor(Math.random()*areas.length)]
  const mid = Math.floor(100 + Math.random()*900) // 100-999
  const last = Math.floor(1000 + Math.random()*9000) // 1000-9999
  return `+1 (${area}) ${mid}-${last}`
}

export function isSupabaseConfigured() {
  return !!process.env.NEXT_PUBLIC_SUPABASE_URL && 
         process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co' &&
         !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
}

// WhatsApp features helpers
export const EMOJIS = ['😊','😂','❤️','🔥','👍','🙏','😭','🥺','😍','🎉','💀','✨']
export function formatTime(){ return new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) }
export function genId(){ return Math.random().toString(36).slice(2,9) }

// For eSIM upgrade - real number
export function genRealZamiqNumber() {
  const area = ['415','650'][Math.floor(Math.random()*2)]
  const mid = Math.floor(200 + Math.random()*800)
  const last = Math.floor(1000 + Math.random()*9000)
  return `+1 (${area}) ${mid}-${last}`
}
