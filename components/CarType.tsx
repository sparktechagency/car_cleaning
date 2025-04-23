import {
  IconCompact,
  IconLargeCar,
  IconSport,
  IconSubCar,
  IconTrack,
} from "@/assets/icon/icon";
import { Text, TouchableOpacity, View } from "react-native";

import tw from "@/lib/tailwind";
import React from "react";
import { SvgXml } from "react-native-svg";

const CarType = (): JSX.Element => {
  const [selected, setSelected] = React.useState<number>(0);

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

  // console.log(selected);

  return (
    <View style={tw`flex-row flex-wrap justify-start items-center gap-4 `}>
      <Text style={tw`font-DegularDisplaySemibold text-xl mt-2`}>
        Which type of vehicle you want to wash?
      </Text>
      {servicesItem.map((item, index) => (
        <TouchableOpacity
          onPress={() => setSelected(index)}
          activeOpacity={0.7}
          key={index}
          style={tw`w-[30%] h-28 mb-4 rounded-2xl ${
            selected === index ? "bg-[#0063E5]" : "bg-white "
          } items-center text-center  justify-center`}
        >
          <View style={tw`p-4 rounded-full mb-1 bg-[#0063E51A]`}>
            <SvgXml xml={item.icon} />
          </View>
          <Text
            style={tw`font-DegularDisplaySemibold text-base ${
              selected === index ? "text-white" : "text-[#262626]"
            } `}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CarType;
