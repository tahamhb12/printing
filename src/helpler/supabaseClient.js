import {createClient} from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonkey = import.meta.env.VITE_SUPABASE_ANON_KEY


const supabase = createClient(supabaseUrl,supabaseAnonkey)
export default supabase;