import { MoreVertical, Search } from "lucide-react-native";
import React from 'react';
import { Pressable, View } from 'react-native';

const HeaderCallIcons = () => {
    return (
        <View className='flex-row items-center gap-8'>
            <Pressable>
                <Search size={24} />
            </Pressable>
            <Pressable>
                <MoreVertical size={24} />
            </Pressable>
        </View>
    )
}

export default HeaderCallIcons