import { router, useGlobalSearchParams, usePathname } from "expo-router";
import { Text, View } from "react-native";

import tw from "@/lib/tailwind";
import React from "react";

const Taster = () => {
  const params = useGlobalSearchParams();
  const pathname = usePathname(); // current route path

  React.useEffect(() => {
    const currentPath = pathname; // save the path when modal loads

    const timer = setTimeout(() => {
      // check if user still on this modal page
      if (router.canGoBack() && pathname === currentPath) {
        router.back();
      }
    }, Number(params?.time) || 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={tw`p-4 bg-gray-900`}>
      <Text style={tw`text-white`}>{params?.content}</Text>
    </View>
  );
};

export default Taster;
