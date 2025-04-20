import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import {
  IconCompact,
  IconLargeCar,
  IconSport,
  IconSubCar,
  IconTrack,
} from "@/assets/icon/icon";
import tw from "@/lib/tailwind";
import { SvgXml } from "react-native-svg";
import { useRouter } from "expo-router";

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
      <TouchableOpacity onPress={() => router.push("/(order)/calendersDate")}>
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
          keyExtractor={(item) => item.title}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={tw`flex  items-center`}
        />
      </View>
    </View>
  );
};

export default services;
