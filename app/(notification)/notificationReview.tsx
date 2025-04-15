import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation, useRouter } from "expo-router";
import tw from "@/lib/tailwind";
import { SvgXml } from "react-native-svg";
import { IconBackArrow, IconStart, IconStartColor } from "@/assets/icon/icon";
import InputText from "@/lib/inputs/InputText";
import { Controller, useForm } from "react-hook-form";
import TButton from "@/lib/buttons/TButton";

const notificationReview = () => {
  const navigation = useNavigation();
  const route = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      review: "",
    },
  });
  const onSubmit = (data) => console.log(data);

  console.log(errors);
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
          <SvgXml xml={IconStartColor} />
          <SvgXml xml={IconStartColor} />
          <SvgXml xml={IconStartColor} />
          <SvgXml xml={IconStartColor} />
          <SvgXml xml={IconStart} />
        </View>

        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: "Email is required",
            },
            //   pattern: {
            //     value:
            //       /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            //     message: "Please input valid email",
            //   },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputText
              label="Any sentence?"
              value={value}
              onChangeText={(test) => onChange(test)}
              onBlur={onBlur}
              touched
              errorText={errors?.review?.message}
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
          )}
          name="review"
        />
      </View>
      <View style={tw`rounded-full  w-full h-12 mt-6 `}>
        <TButton
          // onPress={handleSubmit(onSubmit)}
          title="Submit"
          containerStyle={tw``}
        />
      </View>
    </View>
  );
};

export default notificationReview;
