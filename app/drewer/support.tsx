import { View, Text, Pressable, ScrollView } from "react-native";
import React from "react";
import { router, useNavigation } from "expo-router";
import tw from "@/lib/tailwind";
import { SvgXml } from "react-native-svg";
import { IconBackArrow, IconEmail } from "@/assets/icon/icon";
import { Controller, useForm } from "react-hook-form";
import InputText from "@/lib/inputs/InputText";
import TButton from "@/lib/buttons/TButton";
import { useSupportMutation } from "@/redux/apiSlices/draweApiSlices";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const support = () => {
  const navigation = useNavigation();
  const [supportData, { isLoading, isError, isSuccess }] = useSupportMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: "",
      email: "",
      subject: "",
      message: "",
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await supportData(data).unwrap();
      if (response?.status === true) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "Congrats! Your Message send.",
        });
        router.push("/drewer/home");
      }
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Failed",
        textBody: "Please Try again.",
      });
    }
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={tw`px-6 flex-1`}
    >
      <Pressable
        onPress={() => {
          navigation.goBack();
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
              message: "Please Enter Your Full Name",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputText
              label="Full Name"
              value={value}
              onChangeText={(test) => onChange(test)}
              onBlur={onBlur}
              touched
              errorText={errors?.full_name?.message}
              textInputProps={{
                placeholder: "Enter your full name",
              }}
              containerStyle={tw``}
            />
          )}
          name="full_name"
        />

        {/* Email */}
        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: "Email is required",
            },
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please input valid email",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputText
              label="Email"
              value={value}
              onChangeText={(test) => onChange(test)}
              onBlur={onBlur}
              touched
              errorText={errors?.email?.message}
              textInputProps={{
                placeholder: "Email",
              }}
              containerStyle={tw``}
            />
          )}
          name="email"
        />

        <Controller
          control={control}
          rules={{
            required: {
              value: true,
              message: "Please Fill_up this Filled",
            },
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
              message: "Please Fill_up this Filled",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputText
              label="Questions"
              value={value}
              onChangeText={(test) => onChange(test)}
              onBlur={onBlur}
              touched
              errorText={errors?.message?.message}
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
          name="message"
        />
      </View>

      <View style={tw`rounded-full w-full h-12 mt-6 `}>
        <TButton
          onPress={handleSubmit(onSubmit)}
          title="Send"
          containerStyle={tw``}
        />
      </View>
    </ScrollView>
  );
};

export default support;
