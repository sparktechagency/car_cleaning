import tw from "@/lib/tailwind";
import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";

const FourthStep = () => {
  return (
    <View style={tw`px-6`}>
      <Text style={tw`font-DegularDisplaySemibold text-xl text-regularText`}>
        Select time
      </Text>
      <View style={tw`flex-row justify-between w-full`}>
        <TouchableOpacity>
          <Text
            style={tw`font-DegularDisplaySemibold text-base text-regularText  border-[#E5EFFC] bg-white rounded-2xl text-center px-6 py-3`}
          >
            10:00 AM
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={tw`font-DegularDisplaySemibold text-base text-regularText border-[#E5EFFC] bg-white rounded-2xl text-center px-6 py-3`}
          >
            11:00AM
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={tw`font-DegularDisplaySemibold text-base text-regularText  border-[#E5EFFC] bg-white rounded-2xl text-center px-6 py-3`}
          >
            12:00PM
          </Text>
        </TouchableOpacity>
      </View>
      <View style={tw`flex-row justify-between w-full mt-2`}>
        <TouchableOpacity>
          <Text
            style={tw`font-DegularDisplaySemibold text-base text-regularText  border-[#E5EFFC] bg-white rounded-2xl text-center px-6 py-3`}
          >
            01:00AM
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={tw`font-DegularDisplaySemibold text-base text-regularText border-[#E5EFFC] bg-white rounded-2xl text-center px-6 py-3`}
          >
            12:00AM
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={tw`font-DegularDisplaySemibold text-base text-regularText  border-[#E5EFFC] bg-white rounded-2xl text-center px-6 py-3`}
          >
            03:00PM
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FourthStep;
