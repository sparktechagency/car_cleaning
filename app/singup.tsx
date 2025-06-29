import {
  IconEmail,
  IconEyaClose,
  IconEyeShow,
  IconFacebook,
  IconGoogle,
  IconPassword,
  IconUser,
} from "@/assets/icon/icon";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";

import SubHeading from "@/components/SubTileHead";
import Heading from "@/components/TitleHead";
import IwtButton from "@/lib/buttons/IwtButton";
import TButton from "@/lib/buttons/TButton";
import InputText from "@/lib/inputs/InputText";
import tw from "@/lib/tailwind";
import { Checkbox } from "react-native-ui-lib";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  useGoogleLoginMutation,
  useRegisterMutation,
} from "@/redux/apiSlices/authSlices";

GoogleSignin.configure({
  webClientId:
    "841070320562-hs5hc7at9gu3kcu71efp6tm2jkipsg6d.apps.googleusercontent.com", // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

const singup = () => {
  const [isSelected, setSelection] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);

  const [register, { isLoading }] = useRegisterMutation();
  const [googleLogin] = useGoogleLoginMutation();

  const handleGoogleLogin = async () => {
    try {
      // Ensure Google Play services are available
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      console.log("125", response);
    } catch (error) {
      console.error("Google Sign-In Error:", error);

      // Handle specific Google Sign-In errors
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      c_password: "",
    },
  });
  const onRegisterInfoSubmit = async (registerValue: any) => {
    const registerData = {
      name: registerValue?.name,
      email: registerValue?.email,
      password: registerValue?.password,
      c_password: registerValue?.c_password,
    };
    console.log(
      registerData,
      "register data ---------------------------->723009"
    );
    try {
      const res = await register(registerData).unwrap();
      if (res.status) {
        router?.replace({
          pathname: "/OTPScreen",
          params: { email: res?.data?.email },
        });
      } else {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: "Failed !",
          textBody: "Register failed. Please check your credentials.",
        });
      }
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error!",
        textBody: "Something went wrong.",
      });
    }
  };

  return (
    <ScrollView style={tw`px-6 flex-1`}>
      <View style={tw`py-4 justify-center items-center`}>
        <View style={tw`items-center mb-8`}>
          <Heading title={"Welcome Back"} />
          <SubHeading
            title={
              "Please sign in with valid information for access your account."
            }
          />
        </View>

        <View style={tw`w-full gap-1`}>
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
                errorText={errors?.name?.message}
                textInputProps={{
                  placeholder: "Enter your user name",
                }}
                svgFirstIcon={IconUser}
                containerStyle={tw``}
              />
            )}
            name="name"
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
                value: /^[0-9]+$/,
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
                  secureTextEntry: isShow ? false : true,
                }}
                svgFirstIcon={IconPassword}
                svgSecondIcon={isShow ? IconEyeShow : IconEyaClose}
                svgSecondOnPress={() => setIsShow(!isShow)}
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
                value: /^[0-9]+$/,
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
                errorText={errors?.c_password?.message}
                textInputProps={{
                  placeholder: "******",
                  secureTextEntry: isShowConfirm ? false : true,
                }}
                svgFirstIcon={IconPassword}
                svgSecondIcon={isShowConfirm ? IconEyeShow : IconEyaClose}
                svgSecondOnPress={() => setIsShowConfirm(!isShow)}
                containerLayoutStyle={tw`mb-3`}
              />
            )}
            name="c_password"
          />

          <View
            style={tw`flex-row gap-1 justify-start items-center rounded-none mb-8`}
          >
            <Checkbox
              value={isSelected}
              onValueChange={async (value) => {
                await AsyncStorage.setItem("check", JSON.stringify(value));
                setSelection(value);
              }}
              style={tw`w-4 h-4 border-black rounded-none`}
            />
            <Text style={tw`font-normal  text-xs`}>
              By creating this account you agree to our{" "}
              <Text style={tw`text-primary `}>terms of use</Text>
              {""} & {""}
              <Text style={tw`text-primary `}>privacy policy</Text>.
            </Text>
          </View>

          <View style={tw`rounded-full h-12`}>
            <TButton
              onPress={handleSubmit(onRegisterInfoSubmit)}
              title="Sign up"
              containerStyle={tw``}
            />
          </View>
          {/* <View style={tw`flex-row items-center my-5`}>
            <View style={tw`flex-1 h-px bg-gray-300`} />
            <Text style={tw`text-gray-400 px-2`}>Or</Text>
            <View style={tw`flex-1 h-px bg-gray-300`} />
          </View> */}

          {/* <View style={tw`rounded-full h-12`}>
            <IwtButton
              svg={IconGoogle}
              // onPress={() => handleGoogleLogin()}
              title="Continue with google"
              containerStyle={tw`border-secondary border bg-white rounded-lg text-black`}
              titleStyle={tw`text-black`}
            />
          </View> */}
          {/* <View style={tw`rounded-full mt-2 h-12`}>
            <IwtButton
              svg={IconFacebook}
              // onPress={handleSubmit(onSubmit)}
              title="Continue with facebook"
              containerStyle={tw` rounded-lg text-black`}
            />
          </View> */}
        </View>
        <Text
          style={tw`font-normal mt-10 mb-2 text-sm font-DegularDisplayMedium`}
        >
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
