import tw from "@/lib/tailwind";
import store from "@/redux/store";
import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <AlertNotificationRoot>
      <SafeAreaView style={tw`flex-1 w-full bg-primaryBase`}>
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
            <Stack.Screen
              name="toaster"
              options={{
                presentation: "formSheet",
                sheetAllowedDetents: "fitToContents",
              }}
            />

            {/* <Stack.Screen name="editProfile" />
            <Stack.Screen name="forgetPass" />
            <Stack.Screen name="login" />
            <Stack.Screen name="OTPScreen" />
            <Stack.Screen name="reset" />
            <Stack.Screen name="singup" />
            <Stack.Screen name="order" />
            <Stack.Screen name="notification" />
            <Stack.Screen
              name="cmodal"
              options={{
                presentation: "transparentModal",
                animation: "fade",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="vehicle_type_modal"
              options={{
                presentation: "formSheet",
                // sheetAllowedDetents: "fitToContents",
                animation: "fade",
                headerShown: false,
              }}
            /> */}
          </Stack>
        </Provider>
      </SafeAreaView>
    </AlertNotificationRoot>
  );
}
