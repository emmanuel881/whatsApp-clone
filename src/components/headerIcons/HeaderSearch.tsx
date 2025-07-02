import { X } from 'lucide-react-native';
import React from 'react';
import { Pressable, TextInput, View } from 'react-native';

interface Props {
    value: string;
    onChangeText: (text: string) => void;
    onCancel: () => void;
}

const SearchHeader: React.FC<Props> = ({ value, onChangeText, onCancel }) => {
    return (
        <View className="flex-row items-center bg-[#1F2C34] px-2 py-1 rounded-md flex-1">
            <TextInput
                autoFocus
                placeholder="Search..."
                placeholderTextColor="#ccc"
                value={value}
                onChangeText={onChangeText}
                className="flex-1 text-white"
                style={{ fontSize: 16 }}
            />
            <Pressable onPress={onCancel}>
                <X size={22} color="#ccc" />
            </Pressable>
        </View>
    );
};

export default SearchHeader;
