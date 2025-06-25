import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "@/lib/tailwind";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { SvgXml } from "react-native-svg";
import { IconBackArrow } from "@/assets/icon/icon";
import { useGetNotificationDetailsQuery } from "@/redux/apiSlices/notificatinApiSlices";
import { PrimaryColor } from "@/utils/utils";

const notificationDetails = () => {
  const [details, setDetails] = useState<any>(null);
  const navigation = useNavigation();
  const { booking_id } = useLocalSearchParams();

  console.log(details?.data, "----------------------------------------");
  const { data, isLoading, error } = useGetNotificationDetailsQuery(booking_id);

  useEffect(() => {
    if (data) {
      setDetails(data);
      console.log(data, "notification details loaded");
    }

    if (error) {
      console.log("Notification not read ", error);
    }
  }, [data, error]);
  return (
    <View style={tw`px-6`}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={tw`flex-row items-center mt-5 gap-2`}
      >
        <SvgXml xml={IconBackArrow} />
        <Text style={tw`text-[#262626] font-DegularDisplayBold text-2xl`}>
          Notification
        </Text>
      </Pressable>
      <Text
        style={tw`font-DegularDisplaySemibold text-xl text-regularText mt-6 mb-4`}
      >
        Booking Details
      </Text>
      {isLoading ? (
        <ActivityIndicator size="large" color={PrimaryColor} style={tw`my-6`} />
      ) : (
        <View>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text
              style={tw`font-DegularDisplayRegular text-base text-[#6D6D6D]`}
            >
              Service name:
            </Text>
            <Text
              style={tw`font-DegularDisplayBold text-base text-regularText`}
            >
              {details?.data?.service_name}
            </Text>
          </View>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text
              style={tw`font-DegularDisplayRegular text-base text-[#6D6D6D]`}
            >
              Service Type:
            </Text>
            <Text
              style={tw`font-DegularDisplayBold text-base text-regularText`}
            >
              {details?.data?.service_type}
            </Text>
          </View>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text
              style={tw`font-DegularDisplayRegular text-base text-[#6D6D6D]`}
            >
              Service Price:
            </Text>
            <Text
              style={tw`font-DegularDisplayBold text-base text-regularText`}
            >
              ${details?.data?.price}
            </Text>
          </View>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text
              style={tw`font-DegularDisplayRegular text-base text-[#6D6D6D]`}
            >
              Selected date:
            </Text>
            <Text
              style={tw`font-DegularDisplayBold text-base text-regularText`}
            >
              {details?.data?.booking_date}
            </Text>
          </View>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text
              style={tw`font-DegularDisplayRegular text-base text-[#6D6D6D]`}
            >
              Selected time:
            </Text>
            <Text
              style={tw`font-DegularDisplayBold text-base text-regularText`}
            >
              {details?.data?.booking_time}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default notificationDetails;
