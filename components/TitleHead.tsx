import { View, Text } from "react-native";
import React from "react";
import tw from "@/lib/tailwind";

interface HeasdrProps {
  title: string;
}

const Heading = ({ title }: HeasdrProps) => {
  return (
    <Text
      style={tw`text-3xl font-bold font-DegularDisplayRegular text-black mb-4`}
    >
      {title}
    </Text>
  );
};

export default Heading;
