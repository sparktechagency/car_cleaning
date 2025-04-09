import { Text, TouchableOpacity } from "react-native";

import { IconRightArray } from "@/assets/icon/Icon";
import React from "react";
import { SvgXml } from "react-native-svg";
import { View } from "react-native-ui-lib";
import tw from "../tailwind";

interface BackButtonProps {
  onPress?: () => void;
  titleStyle?: any;
  title?: any;
  containerStyle?: any;
}

const BackButton = ({
  onPress,
  containerStyle,
  titleStyle,
  title,
}: BackButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={[tw`flex-row items-center gap-2 p-[4%] `, containerStyle]}
    >
      <View style={tw`flex-row items-center gap-2`}>
        <SvgXml xml={IconRightArray} />

        {title && (
          <Text style={[tw`text-black900 font-RobotoBold text-lg`, titleStyle]}>
            {" "}
            {title}{" "}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default BackButton;
