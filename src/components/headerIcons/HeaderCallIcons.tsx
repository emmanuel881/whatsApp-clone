import { useTheme } from '@react-navigation/native'; // Import the hook
import { MoreVertical, Search } from "lucide-react-native";
import React from 'react';
import { Pressable, View } from 'react-native';

const HeaderCallIcons = () => {
    const { colors } = useTheme(); // Get theme colors

    return (
        <View className='flex-row items-center gap-8'>
            <Pressable>
                <Search size={24} color={colors.primary} />
            </Pressable>
            <Pressable>
                <MoreVertical size={24} color={colors.primary} />
            </Pressable>
        </View>
    )
}

export default HeaderCallIcons