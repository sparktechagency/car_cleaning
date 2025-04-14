import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import tw from "@/lib/tailwind";
import { useNavigation } from "expo-router";
import { SvgXml } from "react-native-svg";
import { IconBackArrow } from "@/assets/icon/icon";

const tramsConditions = () => {
  const router = useNavigation();
  return (
    <View style={tw`px-6`}>
      <Pressable
        onPress={() => {
          router.goBack();
        }}
        style={tw`flex-row items-center mt-5 gap-2`}
      >
        <SvgXml xml={IconBackArrow} />
        <Text style={tw`text-[#262626] font-DegularDisplayBold text-2xl`}>
          Back
        </Text>
      </Pressable>
      <View style={tw``}>
        <Image
          style={tw`relative w-full h-32 mx-auto rounded-2xl my-6`}
          source={require("../../assets/images/bg-car.jpg")}
        />

        <View style={tw`absolute bottom-5 p-4 `}>
          <Text style={tw`font-DegularDisplayBold text-xl text-white`}>
            Terms & Conditions
          </Text>
          <Text style={tw`font-DegularDisplaySemibold text-sm text-white`}>
            Before using our services, please take a moment to read our Terms &
            Conditions. This section outlines your rights and responsibilities,
            as well as our policies to ensure a clear understanding of our
            mutual obligations.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default tramsConditions;
