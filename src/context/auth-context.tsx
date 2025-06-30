import { supabase } from '@/src/supabase/client';
import type { Session } from '@supabase/supabase-js';
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';

interface UseAuthReturn {
    session: Session | null;
    loading: boolean;
}

const AuthContext = createContext<UseAuthReturn | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Get the current session
        const getSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (!error) {
                setSession(data.session);
            }
            setLoading(false);
        };

        getSession();

        // 2. Listen for auth state changes (login/logout)
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (_event, newSession) => {
                setSession(newSession);
            }
        );

        return () => {
            authListener?.subscription?.unsubscribe();
        };
    }, []);

    // 3. Check if user profile exists and create it if missing
    useEffect(() => {
        let isMounted = true;

        const ensureProfile = async () => {
            if (!isMounted || !session?.user) return;

            const userId = session.user.id;
            const email = session.user.email;

            const { data, error: selectError } = await supabase
                .from('profiles')
                .select('id')
                .eq('id', userId)
                .single();

            // If no profile exists (error code PGRST116), create one
            if (selectError?.code === 'PGRST116') {
                const { error: insertError } = await supabase.from('profiles').insert({
                    id: userId,
                    username: email?.split('@')[0] ?? '',
                    full_name: '',
                    avatar_url: '',
                });

                if (insertError) {
                    console.error('⚠️ Failed to insert profile:', insertError.message);
                } else {
                    console.log('✅ Profile created successfully');
                }
            } else if (selectError) {
                console.error('⚠️ Profile select error:', selectError.message);
            } else {
                console.log('✅ Profile already exists for user.');
            }
        };

        ensureProfile();

        return () => {
            isMounted = false;
        };
    }, [session]);

    return (
        <AuthContext.Provider value={{ session, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): UseAuthReturn {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
