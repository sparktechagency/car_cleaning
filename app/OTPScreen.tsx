import { View, Text, TextInput } from "react-native";
import React from "react";
import SubHeading from "@/components/SubTileHead";
import Heading from "@/components/TitleHead";
import tw from "@/lib/tailwind";
import TButton from "@/lib/buttons/TButton";
import { Link, useRouter } from "expo-router";

const OTPScreen = () => {
  const route = useRouter();
  return (
    <>
      <View style={tw`px-6 flex-1 justify-center items-center`}>
        <View style={tw`items-center mb-14`}>
          <Heading title={"Verify OTP"} />
          <SubHeading title={"We have sent  6 digits code in your email."} />
        </View>

        <View>
          <Text style={tw`mb-1`}>Password</Text>
          <View style={tw`flex-row gap-6`}>
            <TextInput
              style={tw`bg-[#E7E7E7] border-none w-[46px] h-12 rounded-lg`}
            />
            <TextInput
              style={tw`bg-[#E7E7E7] border-none w-[46px] h-12 rounded-lg`}
            />
            <TextInput
              style={tw`bg-[#E7E7E7] border-none w-[46px] h-12 rounded-lg`}
            />
            <TextInput
              style={tw`bg-[#E7E7E7] border-none w-[46px] h-12 rounded-lg`}
            />
            <TextInput
              style={tw`bg-[#E7E7E7] border-none w-[46px] h-12 rounded-lg`}
            />
            <TextInput
              style={tw`bg-[#E7E7E7] border-none w-[46px] h-12 rounded-lg`}
            />
          </View>
          <Link
            href={"/"}
            style={tw`mt-1 text-primary flex justify-end items-end font-semibold text-[12px]`}
          >
            Send Again
          </Link>
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
