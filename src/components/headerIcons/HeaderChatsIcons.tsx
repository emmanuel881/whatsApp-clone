import { useTheme } from '@react-navigation/native';
import { MoreVertical, UserPlus } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Pressable,
    Text,
    View
} from 'react-native';
import Logout from '../Logout';
import NewChatModal from '../modals/NewChatModal';

const HeaderChatsIcons = () => {
    const { colors } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => setMenuVisible(!menuVisible);
    const closeMenu = () => setMenuVisible(false);

    return (
        <>
            <View className="flex-row items-center gap-6 relative">
                {/* New Chat Button */}
                <Pressable
                    onPress={() => setModalVisible(true)}
                    className="border border-gray-300 rounded-full p-2"
                >
                    <UserPlus size={24} color={colors.primary} />
                </Pressable>

                {/* More Options Button */}
                <Pressable onPress={toggleMenu} className="p-2">
                    <MoreVertical size={24} color={colors.primary} />
                </Pressable>
            </View>

            {/* Floating Menu Overlay */}
            {menuVisible && (
                <Pressable
                    onPress={closeMenu}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 9,
                    }}
                >
                    {/* Menu Box */}
                    <View
                        style={{
                            position: 'absolute',
                            top: 40, // adjust to match your header height
                            right: 12,
                            backgroundColor: '#fff',
                            borderRadius: 8,
                            paddingVertical: 8,
                            width: 160,
                            elevation: 5,
                            shadowColor: '#000',
                            shadowOpacity: 0.1,
                            shadowOffset: { width: 0, height: 2 },
                            shadowRadius: 8,
                        }}
                    >
                        <Pressable onPress={() => {
                            closeMenu();
                            // Handle New Group action
                        }}>
                            <Text style={{ padding: 12, color: '#333' }}>New Group</Text>
                        </Pressable>

                        <Pressable onPress={() => {
                            closeMenu();
                            // Navigate to Settings
                        }}>
                            <Text style={{ padding: 12, color: '#333' }}>Settings</Text>
                        </Pressable>

                        <Pressable onPress={() => {
                            closeMenu();
                            // Handle Logout
                        }}>
                            <Logout />
                        </Pressable>
                    </View>
                </Pressable>
            )}

            {/* New Chat Modal */}
            <NewChatModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />
        </>
    );
};

export default HeaderChatsIcons;
