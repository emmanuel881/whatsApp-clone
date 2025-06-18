import HeaderCallIcons from "@/src/components/headerIcons/HeaderCallIcons";
import HeaderChatsIcons from "@/src/components/headerIcons/HeaderChatsIcons";
import HeaderCommunitiesIcons from "@/src/components/headerIcons/HeaderCommunitiesIcons";
import HeaderUpdatesIcons from "@/src/components/headerIcons/HeaderUpdatesIcons";
import { Tabs } from "expo-router";
import { MessageCircleDashed, MessageSquare, Phone, Users } from "lucide-react-native";




export default function tabsLayout() {
    return <Tabs screenOptions={{
        headerStyle: {
            borderBottomWidth: 1,
            borderBottomColor: "rgba(233, 235, 236, 0.1)",
        }, headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 22,
        }
    }}>
        <Tabs.Screen name="index"
            options={{
                title: "Chats",
                headerTitle: "WhatsApp",

                headerRight: () => (
                    <HeaderChatsIcons />
                ),
                tabBarIcon: ({ color }) => (
                    <MessageSquare size={24} color={color} />
                )
            }} />
        <Tabs.Screen name="updates"
            options={{
                title: "Updates",
                headerTitle: "Updates",

                headerRight: () => (
                    <HeaderUpdatesIcons />
                ),
                tabBarIcon: ({ color }) => (
                    <MessageCircleDashed size={24} color={color} />
                )
            }} />
        <Tabs.Screen name="communities"
            options={{
                title: "Communities",
                headerTitle: "Communities",

                headerRight: () => <HeaderCommunitiesIcons />,
                tabBarIcon: ({ color }) => (
                    <Users size={24} color={color} />
                )
            }} />
        <Tabs.Screen name="calls"
            options={{
                title: "Calls",
                headerTitle: "Calls",

                headerRight: () => <HeaderCallIcons />,
                tabBarIcon: ({ color }) => (
                    <Phone size={24} color={color} />
                )
            }} />


    </Tabs>;
}
