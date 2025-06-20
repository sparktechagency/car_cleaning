import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

import InputText from "@/lib/inputs/InputText";
import tw from "@/lib/tailwind";
import React from "react";
import { IBookingData } from "@/interface/interfaces";
interface Props {
  setBookingInfo: React.Dispatch<React.SetStateAction<IBookingData | null>>;
  bookingInfo: IBookingData;
}
const SecondStep = ({ bookingInfo, setBookingInfo }: Props): JSX.Element => {
  return (
    <View style={tw`w-full  mt-4`}>
      <InputText
        label="Vehicle brand name"
        labelStyle={tw`font-DegularDisplaySemibold text-xl`}
        value={bookingInfo.car_brand}
        onChangeText={(test) => {
          setBookingInfo({
            ...bookingInfo,
            car_brand: test,
          });
        }}
        touched
        textInputProps={{
          placeholder: "Enter the brand name",
        }}
        containerStyle={tw`w-full `}
      />
      <InputText
        label="Vehicle model name"
        labelStyle={tw`font-DegularDisplaySemibold text-xl`}
        value={bookingInfo.car_model}
        onChangeText={(test) => {
          setBookingInfo({
            ...bookingInfo,
            car_model: test,
          });
        }}
        touched
        textInputProps={{
          placeholder: "Enter the model name",
        }}
        containerStyle={tw`w-full`}
      />
    </View>
  );
};

export default SecondStep;
