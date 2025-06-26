import { useAuth } from "@/src/context/auth-context";
import { supabase } from "@/src/supabase/client";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";

// Simple email validation regex
const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function SignUpScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const [sending, setSending] = useState(false);
    const router = useRouter();
    const { session, loading } = useAuth();

    useEffect(() => {
        if (session) {
            router.replace("/");
        }
    }, [session]);

    // Validation logic
    const allFieldsFilled =
        email.trim() !== "" &&
        password.trim() !== "" &&
        confirmPassword.trim() !== "" &&
        isValidEmail(email) &&
        password === confirmPassword &&
        password.length >= 6;

    const handleSignUp = async () => {
        setSending(true);
        setMessage(null);

        if (!allFieldsFilled) {
            setMessage("Please fill in all fields correctly.");
            setSending(false);
            return;
        }

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: undefined }
        });

        if (error) {
            setMessage(error.message);
        } else {
            setMessage("Account created! You can now sign in.");
        }
        setSending(false);
    };

    if (loading) {
        return (
            <View className="flex-1 bg-[#121B22] justify-center items-center">
                <ActivityIndicator color="#25D366" size="large" />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-[#121B22] justify-center px-8"
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View className="items-center mb-10">
                <Text className="text-4xl font-bold text-[#E9EBEC] mb-2">WhatsApp</Text>
                <Text className="text-base text-[#8696A0]">Sign up with your email and password</Text>
            </View>
            <View className="mb-6">
                <Text className="text-[#E9EBEC] mb-2 text-lg">Email Address</Text>
                <TextInput
                    className="bg-[#222C33] rounded-lg px-4 py-3 text-[#E9EBEC] text-base mb-4"
                    placeholder="Enter your email"
                    placeholderTextColor="#8696A0"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
                <Text className="text-[#E9EBEC] mb-2 text-lg">Password</Text>
                <TextInput
                    className="bg-[#222C33] rounded-lg px-4 py-3 text-[#E9EBEC] text-base mb-4"
                    placeholder="Enter a password"
                    placeholderTextColor="#8696A0"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <Text className="text-[#E9EBEC] mb-2 text-lg">Confirm Password</Text>
                <TextInput
                    className="bg-[#222C33] rounded-lg px-4 py-3 text-[#E9EBEC] text-base"
                    placeholder="Confirm your password"
                    placeholderTextColor="#8696A0"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
            </View>
            {message && (
                <Text className="text-center mb-4 text-[#25D366]">{message}</Text>
            )}
            <TouchableOpacity
                className={`rounded-lg py-3 items-center ${allFieldsFilled
                    ? "bg-[#25D366]"
                    : "bg-[#374151]"
                    }`}
                onPress={handleSignUp}
                disabled={sending || !allFieldsFilled}
            >
                {sending ? (
                    <ActivityIndicator color="#121B22" />
                ) : (
                    <Text
                        className={`font-bold text-lg ${allFieldsFilled ? "text-[#121B22]" : "text-[#8696A0]"
                            }`}
                    >
                        Sign Up
                    </Text>
                )}
            </TouchableOpacity>
            <TouchableOpacity
                className="mt-8 items-center"
                onPress={() => router.replace("/sign-in")}
            >
                <Text className="text-[#8696A0]">
                    Already have an account? <Text className="text-[#25D366]">login</Text>
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
}