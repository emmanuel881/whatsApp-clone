import { Stack } from 'expo-router';

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false, // 👈 hides the default header for all screens by default
            }}
        >
            <Stack.Screen name="sign-in" />
            <Stack.Screen name="sign-up" />
            <Stack.Screen name="forgot-password" />
        </Stack>
    );
}
