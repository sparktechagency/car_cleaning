import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const NotificationLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="notification" />
      <Stack.Screen name="notificationDetails" />
      <Stack.Screen name="notificationReview" />
    </Stack>
  );
};

export default NotificationLayout;
