import { createClient } from '@supabase/supabase-js';

//initializing client with environment variables

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase env variables');
}


export const supabase = createClient(supabaseUrl, supabaseAnonKey)