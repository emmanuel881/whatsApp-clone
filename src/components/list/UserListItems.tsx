import { Pressable, Text } from "react-native"

interface Props {
    user: {
        id: string,
        username: string,
        full_name?: string,
        avatar_url?: string,
        email?: string
    }
    onPress: () => void
}

export default function UserListItems({ user, onPress }: Props) {
    return (
        <Pressable onPress={onPress}>
            <Text>{user.username}</Text>
            {user.email && <Text>{user.email}</Text>}
        </Pressable>
    )
}