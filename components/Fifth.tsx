import { Text, View } from "react-native";

import InputText from "@/lib/inputs/InputText";
import tw from "@/lib/tailwind";
import React from "react";

const Fifth = ({ bookingInfo, setBookingInfo }) => {
  return (
    <View>
      <Text
        style={tw`mt-3 font-DegularDisplaySemibold text-xl text-regularText`}
      >
        Appointment note
      </Text>

      <InputText
        value={bookingInfo?.booking_note}
        onChangeText={(test) => {
          setBookingInfo({
            ...bookingInfo,
            booking_note: test,
          });
        }}
        touched
        textInputProps={{
          placeholderTextColor: tw.color("gray-400"),
          placeholder: "Enter the Appointment note",
          verticalAlign: "top",
          textAlignVertical: "top",
        }}
        inputStyle={tw`h-28`}
        containerStyle={tw`h-36 justify-center`}
      />
    </View>
  );
};

export default Fifth;
