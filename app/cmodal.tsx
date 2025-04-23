import { Text, TouchableOpacity, View } from "react-native";

import { IconCongratulation } from "@/assets/icon/icon";
import tw from "@/lib/tailwind";
import { router } from "expo-router";
import React from "react";
import { SvgXml } from "react-native-svg";

const confirmationModal = () => {
  return (
    <View style={tw`flex-1 bg-black bg-opacity-50 justify-center items-center`}>
      <View style={tw`w-7/8 bg-white p-5 rounded-2xl items-center shadow-lg`}>
        {/* Check Icon */}
        <SvgXml xml={IconCongratulation} />

        {/* Success Message */}
        <Text style={tw`text-2xl font-bold mt-3`}>Congratulations</Text>
        <Text style={tw`text-base text-gray-500 text-center mt-1`}>
          Booking for your service is confirmed
        </Text>

        {/* Close Button */}
        <TouchableOpacity
          onPress={() => router.dismiss()}
          style={tw`bg-primary w-full text-center rounded-full px-5 py-2  mt-8`}
        >
          <Text style={tw`text-white text-center text-lg font-bold`}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default confirmationModal;
