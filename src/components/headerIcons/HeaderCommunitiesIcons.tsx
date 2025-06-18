import { MoreVertical } from 'lucide-react-native'
import React from 'react'
import { Pressable, View } from 'react-native'

const HeaderCommunitiesIcons = () => {
    return (
        <View className='flex-row items-center gap-8'>
            <Pressable>
                <MoreVertical size={24} color="black" />
            </Pressable>
        </View>
    )
}

export default HeaderCommunitiesIcons