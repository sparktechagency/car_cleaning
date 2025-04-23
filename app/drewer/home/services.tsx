import {
  IconCompact,
  IconLargeCar,
  IconSport,
  IconSubCar,
  IconTrack,
} from "@/assets/icon/icon";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";
import React from "react";
import { SvgXml } from "react-native-svg";

const services = (): JSX.Element => {
  const router = useRouter();
  const servicesItem = [
    {
      title: "Truck",
      icon: IconTrack,
    },
    {
      title: "Compact",
      icon: IconCompact,
    },
    {
      title: "Suv car",
      icon: IconSubCar,
    },
    {
      title: "Large car",
      icon: IconLargeCar,
    },
    {
      title: "Sport car",
      icon: IconSport,
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={tw`w-1/3 `}
        onPress={() => router.push("/(order)/calendersDate")}
      >
        <View
          style={tw`w-28 h-28 m-2 flex-col justify-center items-center text-center rounded-2xl bg-white`}
        >
          <View style={tw`p-4 rounded-full items-center mb-1 bg-[#0063E51A]`}>
            <SvgXml xml={item.icon} />
          </View>
          <Text
            style={tw`font-DegularDisplaySemibold text-base text-[#262626]`}
          >
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={tw`p-4 `}>
      <Text style={tw`font-DegularDisplayBold text-2xl`}>
        Quick access for get service
      </Text>
      <View style={tw``}>
        <FlatList
          data={servicesItem}
          renderItem={renderItem}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.title}
          showsHorizontalScrollIndicator={false}
          // contentContainerStyle={tw`gap-5`}
        />
      </View>
    </View>
  );
};

export default services;
