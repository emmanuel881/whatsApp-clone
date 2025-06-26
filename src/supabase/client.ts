import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

//initializing client with environment variables

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase env variables');
}


export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    }
})

//auto refresh token enabled, persist session enabled, and detect session in URL disabled,by storing
// the jwt in AsyncStorage(silently) and refreshing it automatically
// its used the long-lived token to authenticate requests and issue new short-lived tokens
// this helps incase where the short-lived token are compromised the person has a limied time to use it
// and the user can log out to invalidate the token