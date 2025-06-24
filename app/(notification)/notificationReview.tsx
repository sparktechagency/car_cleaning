import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import tw from "@/lib/tailwind";
import { SvgXml } from "react-native-svg";
import { IconBackArrow } from "@/assets/icon/icon";
import InputText from "@/lib/inputs/InputText";
import TButton from "@/lib/buttons/TButton";
import StarRating from "react-native-star-rating-widget";
import { useFeedBackSendMutation } from "@/redux/apiSlices/notificatinApiSlices";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const notificationReview = () => {
  const navigation = useNavigation();
  const { service_id } = useLocalSearchParams();
  const [feedBack, setFeedBack] = useState("");
  const [rating, setRating] = useState(0);

  const [data] = useFeedBackSendMutation();

  const handleFeedBack = async () => {
    const feedBackData = {
      comment: feedBack,
      service_id: service_id,
      rating: rating,
    };
    console.log(
      feedBackData,
      "this is feed back data ------------------------>"
    );
    try {
      const res = await data(feedBackData).unwrap();
      if (res?.status) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "Congrats! Your Feedback successfully Delivered",
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

      <View>
        <Text style={tw`font-DegularDisplaySemibold text-xl mt-6`}>
          Give review to share your experience
        </Text>
        <Text style={tw`font-DegularDisplayRegular text-base mt-6`}>
          How was the service?
        </Text>

        <View style={tw`flex-row items-center my-3`}>
          <StarRating rating={rating} onChange={setRating} />
        </View>
        <InputText
          label="Any sentence?"
          onChangeText={(test) => {
            setFeedBack(test);
          }}
          touched
          textInputProps={{
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
    </View>
  );
};

export default notificationReview;
