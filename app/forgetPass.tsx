import { Controller, useForm } from "react-hook-form";

import { IconEmail } from "@/assets/icon/icon";
import SubHeading from "@/components/SubTileHead";
import Heading from "@/components/TitleHead";
import TButton from "@/lib/buttons/TButton";
import InputText from "@/lib/inputs/InputText";
import tw from "@/lib/tailwind";
import { useForgetPasswordMutation } from "@/redux/apiSlices/authSlices";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

const forgetPass = () => {
  const route = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const [forgetPassResponse] = useForgetPasswordMutation();

  const onSubmit = async (data) => {
    const emailValue = {
      email: data?.email,
    };
    console.log(emailValue, "this forget profile data ------------------->");
    try {
      const res = await forgetPassResponse(emailValue).unwrap();
      if (res) {
        route.navigate({
          pathname: "/OTPForget",
          params: { email: data?.email },
        });
      } else {
        route?.push(`/toaster?content=${res?.message}&time=2000`);
      }
    } catch (error) {
      route?.push(
        `/toaster?content=${(error as any)?.message?.email}&time=2000`
      );
      console.log(error, "Otp don't send Please try.");
    }
  };

  return (
    <>
      <View style={tw`px-6 flex-1 bg-primaryBase justify-center items-center`}>
        <View style={tw`items-center mb-14`}>
          <Heading title={"Forgot password?"} />
          <SubHeading
            title={"You have to verify your email to reset your password."}
          />
        </View>

        <View style={tw`w-full gap-2`}>
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
                  placeholderTextColor: tw.color("gray-400"),
                  placeholder: "Email",
                }}
                svgFirstIcon={IconEmail}
                containerStyle={tw``}
              />
            )}
            name="email"
          />

          <View style={tw`gap-3 mt-10`}>
            <View style={tw`rounded-full h-12`}>
              <TButton
                onPress={handleSubmit(onSubmit)}
                title="Verify"
                containerStyle={tw``}
              />
            </View>
            <View style={tw`rounded-full h-12`}>
              <TButton
                onPress={() => route.back()}
                title="Cancel"
                containerStyle={tw`bg-white border-secondary  `}
                titleStyle={tw`text-black font-DegularDisplaySemibold text-base`}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default forgetPass;
