import { Stack } from "expo-router";
import "../global.css";
//theme
import { AuthProvider } from "@/src/context/auth-context";
//import toastConfig from "@/src/utils/toastConfig";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { StatusBar } from "react-native";
import FlashMessage from "react-native-flash-message";
import "react-native-url-polyfill/auto";

const myTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    card: "#fff",
    primary: "#FF6B00",
    background: "#fff"
  }
}

export default function RootLayout() {
  return (
    <ThemeProvider value={myTheme}>
      <AuthProvider>

        <StatusBar barStyle={"light-content"} />
        <Stack>
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
      {/* <Toast config={toastConfig} /> */}
      <FlashMessage position="top" />
    </ThemeProvider>
  )
}
