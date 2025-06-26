import store from "@/redux/store";
import { Base } from "@/utils/utils";
import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { StripeProvider } from "@stripe/stripe-react-native";
export default function RootLayout() {
  return (
    <StripeProvider
      publishableKey={
        "pk_test_51QKAtBKOpUtqOuW1x5VdNqH3vG7CZZl1P6V3VuV1qsRUmPLNk26i34AXeu2zCO3QurFJAOZ9zfb0EkWeCVhqBYgH008X41cXr6"
      }
      // merchantIdentifier="merchant.identifier" // required for Apple Pay
      // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <AlertNotificationRoot>
        <Provider store={store}>
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
          </Stack>
        </Provider>
      </AlertNotificationRoot>

      <StatusBar backgroundColor={Base} animated barStyle={"dark-content"} />
    </StripeProvider>
  );
}
