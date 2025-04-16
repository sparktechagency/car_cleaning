import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  IconCompact,
  IconLargeCar,
  IconSport,
  IconSubCar,
  IconTrack,
} from "@/assets/icon/icon";
import { SvgXml } from "react-native-svg";
import tw from "@/lib/tailwind";

const CarType = (): JSX.Element => {
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

  return (
    <View style={tw`flex-row flex-wrap justify-start items-center gap-4 `}>
      <Text style={tw`font-DegularDisplaySemibold text-xl mt-2`}>
        Which type of vehicle you want to wash?
      </Text>
      {servicesItem.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={tw`w-[30%] h-28 mb-4 rounded-2xl bg-white items-center text-center  justify-center`}
        >
          <View style={tw`p-4 rounded-full mb-1 bg-[#0063E51A]`}>
            <SvgXml xml={item.icon} />
          </View>
          <Text
            style={tw`font-DegularDisplaySemibold text-base text-[#262626]`}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CarType;
