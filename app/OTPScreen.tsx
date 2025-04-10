import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import SubHeading from "@/components/SubTileHead";
import Heading from "@/components/TitleHead";
import tw from "@/lib/tailwind";
import TButton from "@/lib/buttons/TButton";
import { Link, useRouter } from "expo-router";
import { PrimaryColor } from "@/utils/utils";
import { OtpInput } from "react-native-otp-entry";

const OTPScreen = () => {
  const route = useRouter();
  const [isValue, setIsValue] = useState(0);
  return (
    <>
      <View style={tw`px-6 flex-1 justify-center items-center`}>
        <View style={tw`items-center mb-14`}>
          <Heading title={"Verify OTP"} />
          <SubHeading title={"We have sent  6 digits code in your email."} />
        </View>

        <View style={tw`w-full`}>
          <Text style={tw`mb-1`}>Password</Text>
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
              // onFocus={() => console.log("Focused")}
              // onBlur={() => console.log("Blurred")}
              // onTextChange={(text) => console.log(text)}
              onFilled={async (text) => {
                console.log(`OTP is ${text}`);
                route.push("/");
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
              <Link
                href={"/"}
                style={tw`text-primary font-semibold text-[12px]`}
              >
                Send Again
              </Link>
            </TouchableOpacity>
          </View>
        </View>

        <View style={tw`rounded-full h-12 w-full mt-10`}>
          <TButton
            onPress={() => route.navigate("/reset")}
            title="Verify"
            containerStyle={tw``}
          />
        </View>
      </View>
    </>
  );
};

export default OTPScreen;
