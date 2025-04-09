import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import Heading from "@/components/TitleHead";
import SubHeading from "@/components/SubTileHead";
import tw from "@/lib/tailwind";
import { Controller, useForm } from "react-hook-form";
import InputText from "@/lib/inputs/InputText";
import {
  IconEmail,
  IconEyaClose,
  IconFacebook,
  IconGoogle,
  IconPassword,
  IconUser,
} from "@/assets/icon/icon";
import { Checkbox } from "react-native-ui-lib";
import { Link } from "expo-router";
import TButton from "@/lib/buttons/TButton";
import IwtButton from "@/lib/buttons/IwtButton";

const singup = () => {
  const [isSelected, setSelection] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });
  const onSubmit = (data) => console.log(data);

  console.log(errors);

  return (
    <ScrollView>
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
          {/* User name */}
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Name is required",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                label="User name"
                value={value}
                onChangeText={(test) => onChange(test)}
                onBlur={onBlur}
                touched
                errorText={errors?.user_name?.message}
                textInputProps={{
                  placeholder: "Enter your user name",
                }}
                svgFirstIcon={IconUser}
                containerStyle={tw``}
              />
            )}
            name="user_name"
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
                svgFirstIcon={IconEmail}
                containerStyle={tw``}
              />
            )}
            name="email"
          />

          {/* password */}
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

          {/* confirm password */}
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
                label="Confirm password"
                value={value}
                onChangeText={(test) => onChange(test)}
                onBlur={onBlur}
                touched
                errorText={errors?.confirm_password?.message}
                textInputProps={{
                  placeholder: "******",
                }}
                svgFirstIcon={IconPassword}
                svgSecondIcon={IconEyaClose}
                containerLayoutStyle={tw`mb-3`}
              />
            )}
            name="confirm_password"
          />

          <View style={tw`flex-row gap-1 items-center rounded-none mb-10`}>
            <Checkbox
              value={isSelected}
              onValueChange={setSelection}
              style={tw`w-4 h-4 border-black rounded-none`}
            />
            <Text style={tw`font-normal text-[12px]`}>
              By creating this account, you are agree to our{" "}
              <Link style={tw`text-primary `} href={"/"}>
                terms of use
              </Link>
              &
              <Link style={tw`text-primary `} href={"/"}>
                privacy policy
              </Link>
              .
            </Text>
          </View>

          <View style={tw`rounded-full h-12`}>
            <TButton
              onPress={handleSubmit(onSubmit)}
              title="Sign up"
              containerStyle={tw``}
            />
          </View>
          <View style={tw`flex-row items-center my-5`}>
            <View style={tw`flex-1 h-px bg-gray-300`} />
            <Text style={tw`text-gray-400 px-2`}>Or</Text>
            <View style={tw`flex-1 h-px bg-gray-300`} />
          </View>

          <View style={tw`rounded-full h-12`}>
            <IwtButton
              svg={IconGoogle}
              onPress={handleSubmit(onSubmit)}
              title="Continue with google"
              containerStyle={tw`border-sendary border bg-white rounded-lg text-black`}
            />
          </View>
          <View style={tw`rounded-full mt-2 h-12`}>
            <IwtButton
              svg={IconFacebook}
              onPress={handleSubmit(onSubmit)}
              title="Continue with facebook"
              containerStyle={tw`border-sendary border  rounded-lg text-black`}
            />
          </View>
        </View>
        <Text style={tw`font-normal mt-12 text-sm font-DegularDisplayMedium`}>
          Don’t have an account?{" "}
          <Link style={tw`text-primary font-bold`} href={"/login"}>
            Sign in
          </Link>
        </Text>
      </View>
    </ScrollView>
  );
};

export default singup;
