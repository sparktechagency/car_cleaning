import { View, Text } from "react-native";
import React, { useState } from "react";
import tw from "@/lib/tailwind";
import Heading from "@/components/TitleHead";
import SubHeading from "@/components/SubTileHead";
import { Controller, useForm } from "react-hook-form";
import InputText from "@/lib/inputs/InputText";
import { IconEmail } from "@/assets/icon/icon";
import TButton from "@/lib/buttons/TButton";
import { useRouter } from "expo-router";

const forgetPass = () => {
  const route = useRouter();
  const [email, setEmail] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (data) => {
    setEmail(data.email);
    route.navigate({
      pathname: "/OTPForget",
      params: { email: data.email },
    });
  };

  return (
    <>
      <View style={tw`px-6 flex-1 justify-center items-center`}>
        <View style={tw`items-center mb-14`}>
          <Heading title={"Forget password?"} />
          <SubHeading
            title={"You have to verify your email for reset your password."}
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
                title="cancel"
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
