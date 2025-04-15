import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import tw from "@/lib/tailwind";
import { SvgXml } from "react-native-svg";
import { IconBackArrow } from "@/assets/icon/icon";

const aboutUs = () => {
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

      {/* ======== banner section ================= */}
      <View style={tw``}>
        <Image
          style={tw`relative w-full h-32 mx-auto rounded-2xl my-6`}
          source={require("../../assets/images/bg-car.jpg")}
        />

        <View style={tw`absolute bottom-5 p-4 `}>
          <Text style={tw`font-DegularDisplayBold text-xl text-white mb-1`}>
            About Us
          </Text>
          <Text style={tw`font-DegularDisplaySemibold text-sm text-white`}>
            Welcome to LWR! At LWR, we are passionate about providing
            top-quality car washing services that leave your vehicle looking
            pristine.
          </Text>
        </View>
      </View>

      <View>
        <Text
          style={tw`font-DegularDisplaySemibold text-base text-[#262626] mb-2`}
        >
          Our Mission
        </Text>
        <Text style={tw`font-DegularDisplayRegular text-base text-[#6D6D6D]`}>
          Our mission is to deliver exceptional care and attention to detail,
          ensuring that every car we service shines like new. With a dedicated
          team committed to using eco-friendly products and techniques, we
          strive to make your car wash experience not only effective but also
          convenient and enjoyable. Join us in keeping your vehicle in its best
          condition, one wash at a time!"
        </Text>
      </View>
    </View>
  );
};

export default aboutUs;
