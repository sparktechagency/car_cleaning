import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import tw from "@/lib/tailwind";
import { useForm, Controller } from "react-hook-form";
import { Checkbox } from "react-native-ui-lib";
import TButton from "@/lib/buttons/TButton";
import InputText from "@/lib/inputs/InputText";
import { IconEmail, IconEyaClose, IconPassword } from "@/assets/icon/icon";

const login = () => {
  const [isSelected, setSelection] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => console.log(data);

  console.log(errors);

  return (
    <>
      <View style={tw`px-6 flex-1 justify-center items-center`}>
        <View style={tw`items-center mb-14`}>
          <Text
            style={tw`text-3xl font-bold font-DegularDisplayRegular text-black mb-4`}
          >
            Welcome back
          </Text>
          <Text style={tw` text-sm tracking-tight font-medium text-[#6D6D6D]`}>
            Please sign in with valid information for access your account.
          </Text>
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
                value: /^[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/,
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

          <Controller
            control={control}
            rules={{
              minLength: {
                value: 8,
                message: "At least 8 character needed ",
              },
              required: {
                value: true,
                message: "Passowrd is required",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                label="Password"
                value={value}
                onChangeText={(test) => onChange(test)}
                onBlur={onBlur}
                touched
                errorText={errors?.password?.message}
                textInputProps={{
                  placeholder: "******",
                }}
                svgFirstIcon={IconPassword}
                svgSecondIcon={IconEyaClose}
                containerLayoutStyle={tw`mb-3`}
              />
            )}
            name="password"
          />

          <View style={tw`flex-row justify-between mb-10`}>
            <View style={tw`flex-row gap-1 items-center rounded-none`}>
              <Checkbox
                value={isSelected}
                onValueChange={setSelection}
                style={tw`w-4 h-4 border-black rounded-none`}
              />
              <Text>Remember me</Text>
            </View>
            <Text
              style={tw`text-primary text-[12px] font-DegularDisplayRegular`}
            >
              Forget password?
            </Text>
          </View>

          <View style={tw`rounded-full h-12`}>
            <TButton
              onPress={handleSubmit(onSubmit)}
              title="Sign in"
              containerStyle={tw``}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default login;
