import HeaderCallIcons from "@/src/components/headerIcons/HeaderCallIcons";
import HeaderChatsIcons from "@/src/components/headerIcons/HeaderChatsIcons";
import HeaderCommunitiesIcons from "@/src/components/headerIcons/HeaderCommunitiesIcons";
import HeaderUpdatesIcons from "@/src/components/headerIcons/HeaderUpdatesIcons";
import { useAuth } from "@/src/context/auth-context";
import { Tabs, useRouter } from "expo-router";
import { MessageCircleDashed, MessageSquare, Phone, Users } from "lucide-react-native";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function TabsLayout() {
    const { session, loading } = useAuth();
    const router = useRouter();



    // 🔐 Redirect after loading finishes
    useEffect(() => {
        if (!loading && !session) {
            router.replace("/sign-in");
        }
    }, [loading, session]);

    // ⏳ Still loading session?
    if (loading || !session) {
        return (
            <View className="flex-1 justify-center items-center bg-[#121B22]">
                <ActivityIndicator color="#25D366" size="large" />
            </View>
        );
    }

    return (
        <Tabs
            screenOptions={{
                headerStyle: {
                    borderBottomWidth: 1,
                    borderBottomColor: "rgba(233, 235, 236, 0.1)",
                },
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: 22,
                    color: "#222222",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Chats",
                    headerTitle: "Mige",
                    headerRight: () => <HeaderChatsIcons />,
                    tabBarIcon: ({ color }) => <MessageSquare size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="updates"
                options={{
                    title: "Updates",
                    headerTitle: "Updates",
                    headerRight: () => <HeaderUpdatesIcons />,
                    tabBarIcon: ({ color }) => <MessageCircleDashed size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="communities"
                options={{
                    title: "Communities",
                    headerTitle: "Communities",
                    headerRight: () => <HeaderCommunitiesIcons />,
                    tabBarIcon: ({ color }) => <Users size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="calls"
                options={{
                    title: "Calls",
                    headerTitle: "Calls",
                    headerRight: () => <HeaderCallIcons />,
                    tabBarIcon: ({ color }) => <Phone size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}
