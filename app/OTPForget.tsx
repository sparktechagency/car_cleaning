import {
  useForgetPasswordMutation,
  useVerifyOtpMutation,
} from "@/redux/apiSlices/authSlices";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

import SubHeading from "@/components/SubTileHead";
import Heading from "@/components/TitleHead";
import tw from "@/lib/tailwind";
import { PrimaryColor } from "@/utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OtpInput } from "react-native-otp-entry";

const OTPForget = () => {
  const [value, setValue] = useState(null);
  const [otpVerify, { reset }] = useVerifyOtpMutation();
  const { email } = useLocalSearchParams();

  const [forgetPassResponse] = useForgetPasswordMutation();

  const handleAgainSentOTP = async () => {
    try {
      const res = await forgetPassResponse({ email }).unwrap();

      if (res?.status) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "Send again OTP number.",
        });
      }
    } catch (error) {
      console.log(error, "Otp don't send Please try.");
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Filed!",
        textBody: "Something is wrong please try again.",
      });
    }
  };
  return (
    <>
      <View style={tw`px-6 bg-primaryBase flex-1 justify-center items-center`}>
        <View style={tw`items-center mb-14`}>
          <Heading title={"Verify OTP"} />
          <SubHeading title={"We have sent a 6-digit code to your email."} />
        </View>

        <View style={tw`w-full`}>
          <Text style={tw`mb-1`}>OTP</Text>
          <View style={tw`flex-row gap-5`}>
            <OtpInput
              numberOfDigits={6}
              focusColor={PrimaryColor}
              autoFocus={false}
              hideStick={true}
              placeholder="0"
              blurOnFilled={true}
              disabled={false}
              type="numeric"
              secureTextEntry={false}
              focusStickBlinkingDuration={500}
              value={value}
              onTextChange={(text) => {
                setValue(text);
              }}
              onFilled={async (text) => {
                try {
                  const res = await otpVerify({
                    email: email,
                    otp: text,
                  }).unwrap();
                  if (res.status) {
                    await AsyncStorage.setItem(
                      "token",
                      res?.data?.access_token
                    );
                    router?.replace({
                      pathname: "/reset",
                      params: { email: email },
                    });
                  } else {
                    Toast.show({
                      type: ALERT_TYPE.DANGER,
                      title: "Error!",
                      textBody: "Wrong OTP",
                    });
                  }
                } catch (error) {}
              }}
              textInputProps={{
                placeholderTextColor: tw.color("gray-400"),
                accessibilityLabel: "One-Time Password",
              }}
              theme={{
                containerStyle: tw`rounded-full mb-2`,
                pinCodeContainerStyle: tw`h-12 w-[46px] justify-center items-center bg-white rounded-lg `,
                pinCodeTextStyle: tw`text-[#262626] text-2xl font-DegularDisplaySemibold `,
                placeholderTextStyle: tw`text-[#6D6D6D] text-2xl font-DegularDisplaySemibold`,
              }}
            />
          </View>

          <View style={tw`w-full items-end mt-1`}>
            <TouchableOpacity onPress={() => handleAgainSentOTP()} style={tw``}>
              <Text style={tw`text-primary font-semibold text-[12px]`}>
                Send Again
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default OTPForget;
