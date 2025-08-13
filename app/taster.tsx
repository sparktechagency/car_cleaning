import { router, useGlobalSearchParams } from "expo-router";
import { Text, View } from "react-native";

import tw from "@/lib/tailwind";
import React from "react";

const taster = () => {
  const prams = useGlobalSearchParams();

  setTimeout(() => {
    router.back();
  }, Number(prams?.time) || 5000);

  return (
    <View style={tw`p-4 bg-gray-900`}>
      <Text style={tw`text-white`}>{prams?.content}</Text>
    </View>
  );
};

export default taster;
