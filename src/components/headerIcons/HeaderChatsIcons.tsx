import { useTheme } from '@react-navigation/native';
import { MoreVertical, UserPlus } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import NewChatModal from '../modals/NewChatModal';



const HeaderChatsIcons = () => {
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <>
            <View className="flex-row items-center gap-6">

                <Pressable onPress={() => setModalVisible(true)} className='border border-gray-300 rounded-full p-2'>
                    <UserPlus size={24} color={colors.primary} />
                </Pressable>
                <Pressable>
                    <MoreVertical size={24} color={colors.primary} />
                </Pressable>
            </View>
            <NewChatModal visible={modalVisible} onClose={() => setModalVisible(false)} />
        </>
    );
};

export default HeaderChatsIcons;
