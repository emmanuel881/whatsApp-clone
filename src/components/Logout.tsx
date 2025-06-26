import { supabase } from '@/src/supabase/client'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Pressable, Text, View } from 'react-native'

const Logout = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleLogout = async () => {
        setLoading(true)
        setError(null)
        const { error } = await supabase.auth.signOut()
        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            try {
                router.replace("/sign-in")
            } catch (navError) {
                setError("Navigation error. Please try again.")
                setLoading(false)
            }
        }
    }

    return (
        <View>
            <Pressable
                onPress={handleLogout}
                className={`bg-red-600 p-4 rounded-lg m-4 ${loading ? "opacity-60" : ""}`}
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
    )
}

export default Logout