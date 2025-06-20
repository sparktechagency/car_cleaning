import { View, Text } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import InputText from "@/lib/inputs/InputText";
import tw from "@/lib/tailwind";

const Fifth = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      booking_name: "",
    },
  });

  const onSubmit = (value) => {
    console.log(value, ";alslsllslslsl ************");
  };

  return (
    <View>
      <Text
        style={tw`mt-3 font-DegularDisplaySemibold text-xl text-regularText`}
      >
        Appointment note
      </Text>
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: "Please booking Note name",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputText
            value={value}
            onChangeText={(test) => onChange(test)}
            // inputStyle={tw`justify-start items-start text-start`}
            onBlur={onBlur}
            touched
            errorText={errors?.booking_name?.message}
            textInputProps={{
              placeholder: "Enter the Appointment note",
              verticalAlign: "top",
              textAlignVertical: "top",
            }}
            inputStyle={tw`h-28`}
            containerStyle={tw`h-36 justify-center`}
          />
        )}
        name="booking_name"
      />
    </View>
  );
};

export default Fifth;
