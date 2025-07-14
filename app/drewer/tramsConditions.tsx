import { View, Text, Image, Pressable, ActivityIndicator } from "react-native";
import React from "react";
import tw from "@/lib/tailwind";
import { useNavigation } from "expo-router";
import { SvgXml } from "react-native-svg";
import { IconBackArrow } from "@/assets/icon/icon";
import { useGetTermsAndConditionsQuery } from "@/redux/apiSlices/draweApiSlices";
import RenderHtml from "react-native-render-html";
const tramsConditions = () => {
  const router = useNavigation();
  const { data, isLoading } = useGetTermsAndConditionsQuery({});
  return (
    <>
      {isLoading ? (
        <View style={tw`flex-1 justify-center items-center bg-primaryBase`}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        data?.data.map((item) => {
          const htmlContent = item?.text;
          return (
            <View key={item?.id} style={tw`px-6 bg-primaryBase`}>
              <Pressable
                onPress={() => {
                  router.goBack();
                }}
                style={tw`flex-row items-center mt-5 gap-2`}
              >
                <SvgXml xml={IconBackArrow} />
                <Text
                  style={tw`text-[#262626] font-DegularDisplayBold text-2xl`}
                >
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
                  <Text
                    style={tw`font-DegularDisplayBold text-xl text-white mb-1`}
                  >
                    {item?.type}
                  </Text>
                  <Text
                    style={tw`font-DegularDisplaySemibold text-sm text-white`}
                  >
                    Before using our services, please take a moment to read our
                    Terms & Conditions. This section outlines your rights and
                    responsibilities, as well as our policies to ensure a clear
                    understanding of our mutual obligations.
                  </Text>
                </View>
              </View>

              <View style={tw`gap-4`}>
                <View>
                  <View style={tw`flex-row gap-2`}>
                    <Text
                      style={tw`font-DegularDisplaySemibold text-base text-[#262626]`}
                    >
                      {item?.type}
                    </Text>
                  </View>
                  <View style={tw`flex-row justify-start gap-2`}>
                    <View>
                      <RenderHtml
                        contentWidth={500}
                        source={{ html: htmlContent }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          );
        })
      )}
    </>
  );
};

export default tramsConditions;
