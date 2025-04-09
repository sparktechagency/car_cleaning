import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack 
      screenOptions={{
      statusBarAnimation: "fade",
      statusBarStyle: "dark",
      statusBarBackgroundColor: "#EFF2F2",
      headerShown: false,
    }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="welcome" />
    </Stack>
  );
}
