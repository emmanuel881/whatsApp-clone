import { useAuth } from '@/src/context/auth-context';
import { supabase } from '@/src/supabase/client';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';

const Logout = () => {
    const router = useRouter();
    const { session } = useAuth(); // ✅ get session from context
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogout = async () => {
        if (!session) {
            showMessage({
                message: "You're already logged out.",
                type: 'info',
                duration: 3000,
            });

            router.replace('/sign-in');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { error: signOutError } = await supabase.auth.signOut();

            if (signOutError) {
                setError(signOutError.message);
                showMessage({
                    message: 'Logout failed',
                    description: signOutError.message,
                    type: 'danger',
                    duration: 3000,
                });
            } else {
                showMessage({
                    message: 'Logout successful',
                    description: 'You have been logged out successfully.',
                    type: 'success',
                    duration: 3000,
                });
                router.replace('/sign-in');
            }
        } catch (err) {
            setError('Unexpected error occurred. Please try again.');
            showMessage({
                message: 'Error',
                description: 'Unexpected error occurred.',
                type: 'danger',
                duration: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <View>
            <Pressable
                onPress={handleLogout}
                className={`bg-red-600 p-4 rounded-lg m-4 ${loading ? 'opacity-60' : ''}`}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text className="text-white text-center">Logout</Text>
                )}
            </Pressable>
            {error && (
                <Text className="text-red-400 text-center mt-2">{error}</Text>
            )}
        </View>
    );
};

export default Logout;
