import { View, Text } from "react-native";
import React from "react";
import tw from "@/lib/tailwind";

interface SubHeadingProps {
  title: string;
}

const SubHeading = ({ title }: SubHeadingProps) => {
  return (
    <Text
      style={tw` text-sm tracking-tight font-DegularDisplayMedium text-[#6D6D6D]`}
    >
      {title}
    </Text>
  );
};

export default SubHeading;
