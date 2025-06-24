import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";


export default function Index() {
  return (
    <View>
      <Text className="text-2xl text-center m-4 text-blue-500 font-bold">
        Welcome to the App!

      </Text>
      <Pressable className="bg-blue-500 p-4 rounded-lg m-4">
        <Link href="/(auth)/sign-up">
          <Text className="text-white text-center">Sign Up</Text>
        </Link>
      </Pressable>
    </View>
  );
}
