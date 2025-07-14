import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { IconBackArrow } from "@/assets/icon/icon";
import tw from "@/lib/tailwind";
import { useGetTermsAndConditionsQuery } from "@/redux/apiSlices/draweApiSlices";
import { useNavigation } from "expo-router";
import React from "react";
import RenderHtml from "react-native-render-html";
import { SvgXml } from "react-native-svg";

const tramsandcondition = () => {
  const navigation = useNavigation();
  const { data, isLoading } = useGetTermsAndConditionsQuery({});

  return (
    <>
      {isLoading ? (
        <View style={tw`flex-1 justify-center items-center bg-primaryBase`}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={tw`px-6 flex-1 bg-primaryBase`}
        >
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={tw`flex-row items-center mt-5 gap-2`}
          >
            <SvgXml xml={IconBackArrow} />
            <Text style={tw`text-[#262626] font-DegularDisplayBold text-2xl`}>
              Back
            </Text>
          </Pressable>

          {/* ======== banner section ================= */}
          <View style={tw``}>
            <Image
              style={tw`relative w-full h-32 mx-auto rounded-2xl my-6`}
              source={require("../../assets/images/bg-car.jpg")}
            />

            <View style={tw`absolute bottom-5 p-4 `}>
              <Text style={tw`font-DegularDisplayBold text-xl text-white mb-1`}>
                Terms & Conditions
              </Text>
              <Text style={tw`font-DegularDisplaySemibold text-sm text-white`}>
                Before using our services, please take a moment to read our
                Terms & Conditions. This section outlines your rights and
                responsibilities, as well as our policies to ensure a clear
                understanding of our mutual obligations.
              </Text>
            </View>
          </View>
          {data?.data?.length ? (
            data?.data?.map((item: any) => {
              const htmlContent = item?.text;
              return (
                <View key={item?.id}>
                  <RenderHtml
                    contentWidth={500}
                    source={{ html: htmlContent }}
                  />
                </View>
              );
            })
          ) : (
            <View style={tw`h-full`}>
              <Text
                style={tw`text-center text-3xl font-DegularDisplaySemibold text-gray-200 mt-10`}
              >
                No data available
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </>
  );
};

export default tramsandcondition;
