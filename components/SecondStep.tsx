import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

import InputText from "@/lib/inputs/InputText";
import tw from "@/lib/tailwind";
import React from "react";

const SecondStep = (): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      brand_name: "",
      model_name: "",
    },
  });
  const onSubmit = (data) => console.log(data);

  console.log(errors);

  return (
    <View style={tw`w-full  mt-4`}>
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: "Please enter your brand name",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputText
            label="Vehicle brand name"
            labelStyle={tw`font-DegularDisplaySemibold text-xl`}
            value={value}
            onChangeText={(test) => onChange(test)}
            onBlur={onBlur}
            touched
            errorText={errors?.brand_name?.message}
            textInputProps={{
              placeholder: "Enter the brand name",
            }}
            containerStyle={tw`w-full `}
          />
        )}
        name="brand_name"
      />
      <Controller
        control={control}
        rules={{
          required: {
            value: true,
            message: "Please enter your model name",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputText
            label="Vehicle model name"
            labelStyle={tw`font-DegularDisplaySemibold text-xl`}
            value={value}
            onChangeText={(test) => onChange(test)}
            onBlur={onBlur}
            touched
            errorText={errors?.model_name?.message}
            textInputProps={{
              placeholder: "Enter the model name",
            }}
            containerStyle={tw`w-full`}
          />
        )}
        name="model_name"
      />
    </View>
  );
};

export default SecondStep;
