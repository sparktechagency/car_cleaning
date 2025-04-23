import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        statusBarAnimation: "fade",
        statusBarStyle: "dark",
        statusBarBackgroundColor: "#EFF2F2",
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="tramsCondition" />
      <Stack.Screen name="privacyPolicy" />
      <Stack.Screen name="support" />
      <Stack.Screen name="(notification)/notification" />
      <Stack.Screen
        name="cmodal"
        options={{
          presentation: "transparentModal",
          animation: "fade",
          headerShown: false,
        }}
      />
      {/* <Stack.Screen name="index" />
      <Stack.Screen name="index" /> */}
    </Stack>
  );
}
