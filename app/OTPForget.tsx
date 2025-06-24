import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React, { useState } from "react";
import Heading from "@/components/TitleHead";
import SubHeading from "@/components/SubTileHead";
import tw from "@/lib/tailwind";
import { OtpInput } from "react-native-otp-entry";
import { PrimaryColor } from "@/utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { useVerifyOtpMutation } from "@/redux/apiSlices/authSlices";

const OTPForget = () => {
  const [value, setValue] = useState();
  const [otpVerify] = useVerifyOtpMutation();
  const { email } = useLocalSearchParams();
  console.log(email, "this forgate fassword mail -----------------");
  return (
    <>
      <View style={tw`px-6 flex-1 justify-center items-center`}>
        <View style={tw`items-center mb-14`}>
          <Heading title={"Verify OTP"} />
          <SubHeading title={"We have sent  6 digits code in your email."} />
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
                    router?.replace("/reset");
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
            <TouchableOpacity style={tw``}>
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
