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
import { useGetAboutUsQuery } from "@/redux/apiSlices/draweApiSlices";
import { PrimaryColor } from "@/utils/utils";
import { useNavigation } from "expo-router";
import React from "react";
import RenderHtml from "react-native-render-html";
import { SvgXml } from "react-native-svg";

const aboutUs = () => {
  const router = useNavigation();
  const { data, isLoading } = useGetAboutUsQuery({});
  return (
    <>
      {isLoading ? (
        <View style={tw`flex-1 justify-center items-center bg-primaryBase`}>
          <ActivityIndicator color={PrimaryColor} size="large" />
        </View>
      ) : (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={tw`flex-1 bg-primaryBase px-6`}
        >
          <Pressable
            onPress={() => {
              router.goBack();
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
            <View style={tw`  w-full h-32 rounded-2xl my-6 bg-black`}>
              <Image
                height={100}
                width={100}
                style={tw`relative  w-full h-32 mx-auto opacity-55 rounded-2xl`}
                source={require("@/assets/images/bg-car.jpg")}
              />
            </View>

            <View
              style={tw`absolute w-full h-full justify-center items-center p-4 `}
            >
              <Text
                style={tw`font-DegularDisplayBold text-3xl text-white mb-1`}
              >
                About Us
              </Text>
              {/* <Text style={tw`font-DegularDisplaySemibold text-sm text-white`}>
                Welcome to FULL CIRCLE Detailing. Our name comes from our
                mission to transform challenges into shining successes.
              </Text> */}
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

export default aboutUs;
