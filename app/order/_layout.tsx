import { Stack } from "expo-router";
import React from "react";

const OrderLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="calendersDate" />
      {/* <Stack.Screen name="paymentSystem" /> */}
    </Stack>
  );
};

export default OrderLayout;
