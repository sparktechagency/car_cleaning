import { Base } from "@/utils/utils";
import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";

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

      <Stack.Screen name="editProfile" />
      <Stack.Screen name="forgetPass" />
      <Stack.Screen name="login" />
      <Stack.Screen name="OTPScreen" />
      <Stack.Screen name="reset" />
      <Stack.Screen name="singup" />
      <Stack.Screen name="(order)" />
      <Stack.Screen name="(notification)" />
      <Stack.Screen
        name="cmodal"
        options={{
          presentation: "transparentModal",
          animation: "fade",
          headerShown: false,
        }}
      />
      <StatusBar backgroundColor={Base} animated barStyle={"dark-content"} />
    </Stack>
  );
}
