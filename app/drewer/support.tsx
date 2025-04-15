import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation, useRouter } from "expo-router";
import tw from "@/lib/tailwind";
import { SvgXml } from "react-native-svg";
import { IconBackArrow } from "@/assets/icon/icon";
import { Controller, useForm } from "react-hook-form";
import InputText from "@/lib/inputs/InputText";
import TButton from "@/lib/buttons/TButton";

const support = () => {
  const router = useNavigation();
  const route = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      subject: "",
      question: "",
    },
  });
  const onSubmit = (data) => console.log(data);

  console.log(errors);
  return (
    <View style={tw`px-6`}>
      <Pressable
        onPress={() => {
          router.goBack();
        }}
        style={tw`flex-row items-center mt-5 gap-2`}
      >
        <SvgXml xml={IconBackArrow} />
        <Text style={tw`text-[#262626] font-DegularDisplayBold text-2xl`}>
          Back
        </Text>
      </Pressable>

      <View>
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
              label="Full Name"
              value={value}
              onChangeText={(test) => onChange(test)}
              onBlur={onBlur}
              touched
              errorText={errors?.name?.message}
              textInputProps={{
                placeholder: "Enter your full name",
              }}
              containerStyle={tw``}
            />
          )}
          name="name"
        />
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
              label="Subject"
              value={value}
              onChangeText={(test) => onChange(test)}
              onBlur={onBlur}
              touched
              errorText={errors?.subject?.message}
              textInputProps={{
                placeholder: "Enter Subject",
              }}
              containerStyle={tw``}
            />
          )}
          name="subject"
        />
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
              label="Questions"
              value={value}
              onChangeText={(test) => onChange(test)}
              onBlur={onBlur}
              touched
              errorText={errors?.question?.message}
              textInputProps={{
                placeholder: "Write your thoughts or questions",
                verticalAlign: "top",
                textAlignVertical: "top",

                multiline: true,
              }}
              inputStyle={tw`h-28`}
              containerStyle={tw`h-36 justify-center`}
            />
          )}
          name="question"
        />
      </View>

      <View style={tw`rounded-full w-full h-12 mt-6 `}>
        <TButton
          // onPress={handleSubmit(onSubmit)}
          title="Send"
          containerStyle={tw``}
        />
      </View>
    </View>
  );
};

export default support;
