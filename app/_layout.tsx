import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="(app)" options={{ headerShown: false }} />
  </Stack>;
}
