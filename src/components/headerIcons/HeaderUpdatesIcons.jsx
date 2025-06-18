import { MoreVertical, Search } from 'lucide-react-native'
import { Pressable, View } from 'react-native'

const HeaderUpdatesIcons = () => {
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

export default HeaderUpdatesIcons