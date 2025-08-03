import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { IconBackArrow, IconWaring } from "@/assets/icon/icon";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

import InputText from "@/lib/inputs/InputText";
import StarRating from "react-native-star-rating-widget";
import { SvgXml } from "react-native-svg";
import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";
import { useFeedBackSendMutation } from "@/redux/apiSlices/notificatinApiSlices";
import { useGetServicesByIdQuery } from "@/redux/apiSlices/servicesApiSlices";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useNavigation } from "expo-router";

const notificationReview = () => {
  const navigation = useNavigation();
  const { service_id } = useLocalSearchParams();
  const [feedBack, setFeedBack] = useState("");
  const [rating, setRating] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const [data] = useFeedBackSendMutation();

  const { data: singleSeviceData } = useGetServicesByIdQuery(service_id);

  useEffect(() => {
    const checkIsService = async () => {
      if (singleSeviceData?.data?.id === undefined) return;
      try {
        if (!singleSeviceData?.data?.id) {
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
            navigation.goBack();
          }, 3000);
        }
      } catch (error) {
        console.log(error, "this not match notification review ------->");
      }
    };
    checkIsService();
  }, [singleSeviceData]);

  const handleFeedBack = async () => {
    const feedBackData = {
      comment: feedBack,
      service_id: Number(service_id),
      rating: rating,
    };

    try {
      const res = await data(feedBackData).unwrap();
      if (res?.status) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "Thank you for your feedback.",
        });
        navigation.goBack();
      }
    } catch (error) {
      console.log(error, "Feed back not send Please try again --------");
      setFeedBack("");
      setRating(0);
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Field",
        textBody: "Something is Wrong. Please Try again",
      });
    }
  };

  return (
    <View style={tw`px-6 bg-primaryBase`}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={tw`flex-row items-center mt-5 gap-2`}
      >
        <SvgXml xml={IconBackArrow} />
        <Text style={tw`text-[#262626] font-DegularDisplayBold text-2xl`}>
          Notification
        </Text>
      </TouchableOpacity>

      <View>
        <Text style={tw`font-DegularDisplaySemibold text-xl mt-6`}>
          Share your experience
        </Text>
        <Text style={tw`font-DegularDisplayRegular text-base mt-6`}>
          How was the service?
        </Text>

        <View style={tw`flex-row items-center my-3`}>
          <StarRating rating={rating} onChange={setRating} />
        </View>
        <InputText
          label="Comments"
          onChangeText={(test) => {
            setFeedBack(test);
          }}
          touched
          textInputProps={{
            placeholderTextColor: tw.color("gray-400"),
            placeholder: "Write your review here",
            verticalAlign: "top",
            textAlignVertical: "top",
            multiline: true,
          }}
          inputStyle={tw`h-28`}
          containerStyle={tw`h-36`}
          placeholderStyle={tw` items-start font-medium text-base  text-[#262626]`}
        />
      </View>
      <View style={tw`rounded-full  w-full h-12 mt-6 `}>
        <TButton
          onPress={() => handleFeedBack()}
          title="Submit"
          containerStyle={tw``}
        />
      </View>

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

export default notificationReview;
