import { Camera, MoreVertical, Search } from "lucide-react-native";
import React from 'react';
import { Pressable, View } from 'react-native';

const HeaderChatsIcons = () => {
    return (
        <View className="flex-row items-center gap-8">
            <Pressable>
                <Camera size={24} color="black" />
            </Pressable>
            <Pressable>
                <Search size={24} color="black" />
            </Pressable>
            <Pressable>
                <MoreVertical size={24} color="black" />
            </Pressable>
        </View>
    )
}

export default HeaderChatsIcons