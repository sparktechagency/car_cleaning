import tw from "@/lib/tailwind";
import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";

const FourthStep = () => {
  return (
    <ScrollView style={tw`pb-32`} showsVerticalScrollIndicator={false}>
      <View style={tw`mb-6`}>
        <Text style={tw`font-DegularDisplaySemibold text-xl text-regularText`}>
          Select time
        </Text>
        <Calendar style={tw`rounded-lg`} />

        <View style={tw`mt-4`}>
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
      </View>
    </ScrollView>
  );
};

export default FourthStep;
