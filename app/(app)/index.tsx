import Logout from "@/src/components/Logout";
import { Text, View } from "react-native";


export default function Index() {
  return (
    <View>
      <Text className="text-2xl text-center m-4 text-blue-500 font-bold">
        Welcome to the App!

      </Text>
      <Logout />
    </View>
  );
}
