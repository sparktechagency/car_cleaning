import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SvgXml } from "react-native-svg";
import tw from "@/lib/tailwind";
import { Avatar } from "react-native-ui-lib";
import { IconMenu, IconNotification } from "@/assets/icon/icon";
import { useNavigation } from "expo-router";

const Home = () => {
  const navigation = useNavigation();
  return (
    <View>
      {/* header parts  */}
      <View style={tw`p-4 flex-row items-center  justify-between`}>
        <TouchableOpacity
          onPress={() => {
            (navigation as any)?.openDrawer();
          }}
        >
          <SvgXml xml={IconMenu} />
        </TouchableOpacity>
        <View style={tw`flex-row items-center gap-2`}>
          <Text style={tw`font-NunitoSansRegular text-black text-xl`}>
            Welcome back,
          </Text>
          <Text style={tw`font-NunitoSansBold text-black text-xl`}>Lana</Text>
        </View>
        <TouchableOpacity
        //   onPress={() => {
        //     router?.push("/passenger/profile");
        //   }}
        >
          <TouchableOpacity style={tw`w-12 h-12 p-3 bg-primary rounded-full`}>
            {IconNotification}
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
