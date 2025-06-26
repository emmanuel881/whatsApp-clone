import { supabase } from '@/src/supabase/client';
import type { Session } from '@supabase/supabase-js';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface UseAuthReturn {
    session: Session | null;
    loading: boolean;
}

// 1. Create the context
const AuthContext = createContext<UseAuthReturn | undefined>(undefined);

// 2. AuthProvider wraps your app and tracks session
export function AuthProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch session once on load
        const getSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (!error) setSession(data.session);
            setLoading(false);
        };

        getSession();

        // Listen to session changes (login/logout)
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, newSession) => {
            setSession(newSession);
        });

        return () => {
            authListener?.subscription?.unsubscribe(); // clean up listener
        };
    }, []);

    return (
        <AuthContext.Provider value={{ session, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

// 3. Custom hook for using the context safely
export function useAuth(): UseAuthReturn {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
