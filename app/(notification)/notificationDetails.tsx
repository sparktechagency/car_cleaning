import { View, Text, Pressable, ActivityIndicator, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "@/lib/tailwind";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { SvgXml } from "react-native-svg";
import { IconBackArrow, IconWaring } from "@/assets/icon/icon";
import { useGetNotificationDetailsQuery } from "@/redux/apiSlices/notificatinApiSlices";
import { PrimaryColor } from "@/utils/utils";

const notificationDetails = () => {
  const [details, setDetails] = useState<any>(null);
  const navigation = useNavigation();
  const { booking_id } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);

  const { data, isLoading, error } = useGetNotificationDetailsQuery(booking_id);

  useEffect(() => {
    const checkIsService = async () => {
      if (data === undefined) return;
      try {
        if (!data) {
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
            navigation.goBack();
          }, 2000);
        }
      } catch (error) {
        console.log(error, "notification not match ---------->");
      }
    };
    checkIsService();
  }, [data]);

  useEffect(() => {
    if (data) {
      setDetails(data);
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

      {/*  ========================== successful modal ======================= */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={tw` flex-1 bg-black bg-opacity-50 justify-center items-center`}
        >
          <View
            style={tw`w-8/9 bg-white p-5 rounded-2xl items-center shadow-lg`}
          >
            {/* Check Icon */}
            <SvgXml xml={IconWaring} />

            {/* Success Message */}
            <Text style={tw`text-4xl font-DegularDisplayBold mt-3`}>
              Warning!
            </Text>
            <Text style={tw`text-base text-gray-500 text-center mt-2`}>
              Your service currently not available.
            </Text>

            {/* Close Button */}
            {/* <TouchableOpacity
                      onPress={() => setModalVisible(false)}
                      style={tw`bg-primary px-5 py-2 rounded-lg mt-5`}
                    >
                      <Text style={tw`text-white text-lg font-bold`}>Done</Text>
                    </TouchableOpacity> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default notificationDetails;
