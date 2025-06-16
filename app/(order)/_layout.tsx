import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const OrderLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="calendersDate" />
      <Stack.Screen name="paymentSystem" />
    </Stack>
  );
};

export default OrderLayout;
