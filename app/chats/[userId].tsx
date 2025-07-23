import { useAuth } from '@/src/context/auth-context';
import { supabase } from '@/src/supabase/client';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Message {
    id: string;
    sender_id: string;
    receiver_id: string;
    content: string;
    created_at: string;
}

const ChatScreen = () => {
    const { session } = useAuth();
    const { userId } = useLocalSearchParams<{ userId: string }>();
    // console.log("User ID from params:", userId);

    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState('');
    const flatListRef = useRef<FlatList>(null);
    const myId = session?.user.id;

    useEffect(() => {
        //find existing chat messages
        const fetchMessages = async () => {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .or(`and(sender_id.eq.${myId},receiver_id.eq.${userId}),and(sender_id.eq.${userId},receiver_id.eq.${myId})`)
                .order('created_at', { ascending: true });

            if (!error && data) setMessages(data);
        };

        fetchMessages();
    }, [myId, userId]);

    useEffect(() => {
        const channel = supabase
            .channel('realtime:messages')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
                const newMsg = payload.new as Message;
                if (
                    (newMsg.sender_id === myId && newMsg.receiver_id === userId) ||
                    (newMsg.sender_id === userId && newMsg.receiver_id === myId)
                ) {
                    setMessages(prev => [...prev, newMsg]);
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [myId, userId]);

    const sendMessage = async () => {
        if (!text.trim()) return;
        await supabase.from('messages').insert({
            sender_id: myId,
            receiver_id: userId,
            content: text.trim(),
        });
        console.log("reciever id", userId)
        setText('');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#121B22' }}>
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View
                        style={{
                            alignSelf: item.sender_id === myId ? 'flex-end' : 'flex-start',
                            backgroundColor: item.sender_id === myId ? '#25D366' : '#2A3942',
                            padding: 10,
                            borderRadius: 8,
                            marginVertical: 4,
                            maxWidth: '70%',
                            marginHorizontal: 10,
                        }}
                    >
                        <Text style={{ color: 'white' }}>{item.content}</Text>
                    </View>
                )}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={80}
            >
                <View style={{ flexDirection: 'row', padding: 10 }}>
                    <TextInput
                        value={text}
                        onChangeText={setText}
                        placeholder="Type a message..."
                        placeholderTextColor="#999"
                        style={{
                            flex: 1,
                            backgroundColor: '#1F2C34',
                            color: 'white',
                            paddingHorizontal: 15,
                            paddingVertical: 10,
                            borderRadius: 25,
                            marginRight: 10,
                        }}
                    />
                    <TouchableOpacity onPress={sendMessage} style={{ justifyContent: 'center' }}>
                        <Text style={{ color: '#25D366', fontWeight: 'bold' }}>Send</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ChatScreen;
