// lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://alkqawimiavqthkmance.supabase.co' // Tu la trouves dans Settings > API
const supabaseKey = 'sb_publishable_ilPvwhmgV1bW8gB3WT8AXg_FKF3ROXK'   // anon/public key

export const supabase = createClient(supabaseUrl, supabaseKey)