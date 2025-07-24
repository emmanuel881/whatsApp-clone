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

    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState('');
    const flatListRef = useRef<FlatList>(null);
    const myId = session?.user.id;

    useEffect(() => {
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
        setText('');
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View
                        style={{
                            alignSelf: item.sender_id === myId ? 'flex-end' : 'flex-start',
                            backgroundColor: item.sender_id === myId ? '#FF6B00' : '#F0F0F0',
                            padding: 10,
                            borderRadius: 8,
                            marginVertical: 4,
                            maxWidth: '70%',
                            marginHorizontal: 10,
                        }}
                    >
                        <Text style={{ color: item.sender_id === myId ? '#fff' : '#222222' }}>{item.content}</Text>
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
                        placeholderTextColor="#999999"
                        style={{
                            flex: 1,
                            backgroundColor: '#F9F9F9',
                            color: '#222222',
                            paddingHorizontal: 15,
                            paddingVertical: 10,
                            borderRadius: 25,
                            marginRight: 10,
                            borderWidth: 1,
                            borderColor: '#DDDDDD',
                        }}
                    />
                    <TouchableOpacity onPress={sendMessage} style={{ justifyContent: 'center', backgroundColor: '#FF6B00', borderRadius: 25, paddingHorizontal: 18, paddingVertical: 8 }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Send</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ChatScreen;