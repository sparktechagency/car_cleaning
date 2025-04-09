import { View, Text } from "react-native";
import React from "react";
import tw from "@/lib/tailwind";

interface HeasdrProps {
  titile: string;
}

const Heading = ({ titile }: HeasdrProps) => {
  return (
    <Text
      style={tw`text-3xl font-bold font-DegularDisplayRegular text-black mb-4`}
    >
      {titile}
    </Text>
  );
};

export default Heading;
