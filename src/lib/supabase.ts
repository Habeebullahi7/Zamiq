import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export type DbProduct = {
  id: number
  name: string
  price: number
  old_price?: number | null
  category: string
  size: string
  tag?: string | null
  in_stock: boolean
  description?: string | null
  images?: string[] | null
  video_url?: string | null
  created_at?: string
}
