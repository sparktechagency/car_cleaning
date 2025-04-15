import { View, Text, Pressable } from "react-native";
import React from "react";
import tw from "@/lib/tailwind";
import { useNavigation } from "expo-router";
import { SvgXml } from "react-native-svg";
import { IconBackArrow } from "@/assets/icon/icon";

const notificationDetails = () => {
  const navigation = useNavigation();
  return (
    <View style={tw`px-6`}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={tw`flex-row items-center mt-5 gap-2`}
      >
        <SvgXml xml={IconBackArrow} />
        <Text style={tw`text-[#262626] font-DegularDisplayBold text-2xl`}>
          Notification
        </Text>
      </Pressable>
      <Text
        style={tw`font-DegularDisplaySemibold text-xl text-regularText mt-6 mb-4`}
      >
        Car Details
      </Text>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Text style={tw`font-DegularDisplayRegular text-base text-[#6D6D6D]`}>
          Brand name:
        </Text>
        <Text style={tw`font-DegularDisplayBold text-base text-regularText`}>
          BMW
        </Text>
      </View>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Text style={tw`font-DegularDisplayRegular text-base text-[#6D6D6D]`}>
          Model name:
        </Text>
        <Text style={tw`font-DegularDisplayBold text-base text-regularText`}>
          X1 SUV
        </Text>
      </View>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Text style={tw`font-DegularDisplayRegular text-base text-[#6D6D6D]`}>
          Selected service:
        </Text>
        <Text style={tw`font-DegularDisplayBold text-base text-regularText`}>
          Interior
        </Text>
      </View>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Text style={tw`font-DegularDisplayRegular text-base text-[#6D6D6D]`}>
          Selected date:
        </Text>
        <Text style={tw`font-DegularDisplayBold text-base text-regularText`}>
          14 March, 2025
        </Text>
      </View>
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Text style={tw`font-DegularDisplayRegular text-base text-[#6D6D6D]`}>
          Selected time:
        </Text>
        <Text style={tw`font-DegularDisplayBold text-base text-regularText`}>
          10:00 AM
        </Text>
      </View>
    </View>
  );
};

export default notificationDetails;
