import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import tw from "@/lib/tailwind";
import { useForm, Controller } from "react-hook-form";
import { Checkbox } from "react-native-ui-lib";
import TButton from "@/lib/buttons/TButton";
import InputText from "@/lib/inputs/InputText";
import { IconEmail, IconEyaClose, IconPassword } from "@/assets/icon/icon";
import { Link } from "expo-router";
import Heading from "@/components/TitleHead";
import SubHeading from "@/components/SubTileHead";

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
          <Heading titile={"Welcome Back"} />
          <SubHeading
            title={
              "Please sign in with valid information for access your account."
            }
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

          <Controller
            control={control}
            rules={{
              pattern: {
                value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                message: "Please speacial char password",
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
            <View style={tw`flex-row gap-2 items-center rounded-none`}>
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
              <Link href={"/forgetPass"}>Forget password?</Link>
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
      <View style={tw`justify-end items-center mb-2`}>
        <Text style={tw`font-normal text-sm font-DegularDisplayMedium`}>
          Don’t have an account?{" "}
          <Link style={tw`text-primary font-bold`} href={"/singup"}>
            Sign up
          </Link>
        </Text>
      </View>
    </>
  );
};

export default login;
