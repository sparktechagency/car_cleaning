import { Text, TouchableOpacity, View } from "react-native";

import { IconArrayRight } from "@/assets/icon/Icon";
import React from "react";
import { SvgXml } from "react-native-svg";
import tw from "../tailwind";

interface BackButtonProps {
  onPress?: () => void;
  titleStyle?: any;
  title?: any;
  containerStyle?: any;
  ComponentBtn?: React.ReactNode;
  offBack?: boolean;
  togather?: boolean;
}

const BackWithComponent = ({
  onPress,
  containerStyle,
  titleStyle,
  ComponentBtn,
  title,
  offBack,
  togather,
}: BackButtonProps) => {
  return (
    <View
      style={[
        tw`flex-row items-center justify-between gap-2 p-[4%] `,
        containerStyle,
      ]}
    >
      {!togather ? (
        <>
          {!offBack ? (
            <TouchableOpacity
              onPress={onPress}
              style={tw`flex-row items-center gap-2 pr-4`}
            >
              <View
                style={tw`bg-white w-10 h-10 justify-center items-center rounded-lg`}
              >
                <SvgXml xml={IconArrayRight} />
              </View>
            </TouchableOpacity>
          ) : (
            <View style={tw`w-10 h-10`} />
          )}
          <Text
            numberOfLines={1}
            style={[tw`text-black font-NunitoSansBold text-base`, titleStyle]}
          >
            {title ? title : "Back"}
          </Text>
        </>
      ) : (
        <>
          {!offBack ? (
            <TouchableOpacity
              onPress={onPress}
              style={tw`flex-row items-center gap-2 pr-4`}
            >
              <View
                style={tw`bg-white w-10 h-10 justify-center items-center rounded-lg`}
              >
                <SvgXml xml={IconArrayRight} />
              </View>
              <Text
                numberOfLines={1}
                style={[tw`text-black font- text-base`, titleStyle]}
              >
                {title ? title : "Back"}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={tw`w-10 h-10`} />
          )}
        </>
      )}

      {ComponentBtn ? ComponentBtn : <View style={tw`w-10 h-10`} />}
    </View>
  );
};

export default BackWithComponent;
