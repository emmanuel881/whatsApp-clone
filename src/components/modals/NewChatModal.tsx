import { supabase } from "@/src/supabase/client";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Modal, Pressable, Text, TextInput, View } from "react-native";
import UserListItems from "../list/UserListItems";

interface Props {
    visible: boolean;
    onClose: () => void
}

type UserProfile = {
    id: string;
    username: string;
    avatar_url: string;
    full_name: string;
};

export default function NewChatModal({ visible, onClose }: Props) {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<UserProfile[]>([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()


    useEffect(() => {
        if (query.trim() === "") {
            setResults([])
            return;
        }

        const fetchUsers = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from("profiles")
                .select("id, username, avatar_url, full_name")
                .ilike("username", `%${query}%`)
                .limit(10);

            if (!error) {
                setResults(data)
            }
            else {
                console.error("Error fetching users:", error.message);
            }
            setLoading(false)
        }
        fetchUsers();
        console.log("***********************************")
        console.log("\n\n\n\n\n\n\n\n\n")
        console.log("Results:", results)
        console.log("***********************************")
    }, [query])

    const handleSelectedUser = async (user: UserProfile) => {
        onClose()

        router.push({ pathname: "/chats/[chatId]", params: { chatId: user.id } });
    }

    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View className="text-white rounded-md px-4 py-2 mb-4">
                <Pressable>
                    <Text onPress={onClose} className="text-blue-500 text-lg font-semibold mb-4">Close</Text>
                </Pressable>
                <TextInput
                    placeholder="Search users by username"
                    placeholderTextColor="#aaa"
                    value={query}
                    onChangeText={setQuery}
                    className="bg-slate-800 text-white rounded-md px-4 py-2 mb"

                />

                {loading ? (
                    <Text>Searching...</Text>
                ) : results.length === 0 ? (
                    <Text>No user found</Text>
                ) : (
                    <FlatList
                        data={results}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <UserListItems user={item} onPress={() => handleSelectedUser(item)} />
                        )}
                    />
                )}
            </View>
        </Modal>
    )
}