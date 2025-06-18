import { useTheme } from '@react-navigation/native'
import { MoreVertical, Search } from 'lucide-react-native'
import { Pressable, View } from 'react-native'

const HeaderUpdatesIcons = () => {
    const { colors } = useTheme()

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

export default HeaderUpdatesIcons