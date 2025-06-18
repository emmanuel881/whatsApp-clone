import { Stack } from "expo-router";
import "../global.css";
//theme
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { StatusBar } from "react-native";

const myTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    card: "#121B22",
    primary: "#E9EBEC"
  }
}

export default function RootLayout() {
  return (
    <ThemeProvider value={myTheme}>
      <StatusBar barStyle={"light-content"} />
      <Stack>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  )
}
