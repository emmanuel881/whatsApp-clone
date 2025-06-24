import type { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';

interface UseAuthReturn {
    session: Session | null;
    loading: boolean;
}

export function useAuth(): UseAuthReturn {
    // object to hold session or null if not authenticated
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error fetching session:', error);
            }
            setSession(data.session);
            setLoading(false);
        };

        getSession();

        // Subscribe to auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    return { session, loading };
}
