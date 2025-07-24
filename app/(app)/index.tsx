import Logout from "@/src/components/Logout";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import { useAuth } from "@/src/context/auth-context";
import { supabase } from "@/src/supabase/client";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

type ChatPreview = {
  id: string;
  content: string;
  created_at: string;
  sender_id: string;
  receiver_id: string;
  partner: {
    id: string;
    avatar_url: string;
    full_name: string;
  };
};

export default function Index() {
  const { session } = useAuth();
  const myId = session?.user.id;
  const router = useRouter();
  const [chats, setChats] = useState<ChatPreview[]>([]);

  useEffect(() => {
    if (!myId) return;

    const fetchChats = async () => {
      const { data: messages, error } = await supabase
        .from("latest_user_chats")
        .select("*")
        .or(`sender_id.eq.${myId},receiver_id.eq.${myId}`)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching inbox:", error.message);
        return;
      }

      const partnerIds = messages.map((msg: any) =>
        msg.sender_id === myId ? msg.receiver_id : msg.sender_id
      );

      const { data: profiles, error: profileErr } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url")
        .in("id", partnerIds);

      if (profileErr) {
        console.error("Error fetching profiles:", profileErr.message);
        return;
      }

      const chatsWithProfiles = messages.map((msg: any) => {
        const partnerId = msg.sender_id === myId ? msg.receiver_id : msg.sender_id;
        const partner = profiles.find(p => p.id === partnerId);
        return {
          ...msg,
          partner,
        };
      });

      setChats(chatsWithProfiles);
    };

    fetchChats();


    const channelName = `messages-channel-${myId}`;

    const messageChannel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          const message = payload.new;
          if (message.sender_id === myId || message.receiver_id === myId) {
            fetchChats();
          }
        }
      )
      .subscribe();

    // Clean up on unmount
    return () => {
      supabase.removeChannel(messageChannel);
    };
  }, [myId]);


  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <Logout />

      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/chats/[userId]",
                params: { userId: item.partner.id },
              })
            }
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 12,
                borderBottomColor: "#333",
                borderBottomWidth: 1,
              }}
            >
              <Image
                source={{ uri: item.partner.avatar_url }}
                style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }}
              />
              <View>
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {item.partner.full_name}
                </Text>
                <Text style={{ color: "#ccc" }} numberOfLines={1}>
                  {item.content}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
