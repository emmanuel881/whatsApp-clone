import { Stack } from "expo-router";
import "../global.css";
//theme
import { AuthProvider } from "@/src/context/auth-context";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { StatusBar } from "react-native";
import "react-native-url-polyfill/auto";

const myTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    card: "#121B22",
    primary: "#E9EBEC",
    background: "#121B22"
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
    </ThemeProvider>
  )
}
