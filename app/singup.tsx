import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { Controller, useForm } from "react-hook-form";
import {
  IconBackArrow,
  IconEmail,
  IconEyaClose,
  IconEyeShow,
  IconPassword,
  IconPhone,
  IconUser,
} from "@/assets/icon/icon";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  useGoogleLoginMutation,
  useRegisterMutation,
} from "@/redux/apiSlices/authSlices";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import Heading from "@/components/TitleHead";
import { ImgLogo } from "@/assets/images/images";
import InputText from "@/lib/inputs/InputText";
import SubHeading from "@/components/SubTileHead";
import { SvgXml } from "react-native-svg";
import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";

GoogleSignin.configure({
  webClientId:
    "841070320562-hs5hc7at9gu3kcu71efp6tm2jkipsg6d.apps.googleusercontent.com", // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

const singup = () => {
  const [isShow, setIsShow] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleCheckBox = async () => {
    setIsChecked(!isChecked);
    try {
      await AsyncStorage.setItem("check", JSON.stringify(isChecked));
    } catch (error) {
      console.log(error, "User Info Storage not save ---->");
    }
  };

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
      phone: "",
    },
  });
  const onRegisterInfoSubmit = async (registerValue: any) => {
    const registerData = {
      name: registerValue?.name,
      email: registerValue?.email,
      password: registerValue?.password,
      c_password: registerValue?.c_password,
      phone: registerValue?.phone,
    };
    console.log(registerData, " register data ------------------------> ");

    try {
      const res = await register(registerData).unwrap();
      console.log(
        res,
        "this is response with user info ------------------------->"
      );
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
      console.log(error, "dj dj djd djd jd jd djd ");
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error!",
        textBody: "Something went wrong.",
      });
    }
  };

  return (
    <ScrollView style={tw` bg-primaryBase flex-1`}>
      {router?.canGoBack() && (
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
          style={tw`absolute flex-row items-center  px-6 mt-5 mb-6 gap-2`}
        >
          <SvgXml xml={IconBackArrow} />
          <Text style={tw`text-[#262626] font-DegularDisplayBold text-xl`}>
            Back
          </Text>
        </TouchableOpacity>
      )}
      <View style={tw`py-4 px-6 justify-center mt-6 items-center`}>
        <View style={tw`justify-center items-center`}>
          <Image resizeMode="contain" style={tw`w-56 h-40`} source={ImgLogo} />
        </View>
        <View style={tw`items-center  mb-8`}>
          <Heading title={"Get started now"} />
          <SubHeading
            title={"Create an account to explore the app & get car service."}
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
                  placeholderTextColor: tw.color("gray-400"),
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
                  placeholderTextColor: tw.color("gray-400"),
                  placeholder: "Email",
                }}
                svgFirstIcon={IconEmail}
                containerStyle={tw``}
              />
            )}
            name="email"
          />
          {/* Phone */}
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Phone number is required",
              },
              pattern: {
                value: /^[0-9]+$/,
                message: "Please input valid Phone",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                label="Phone Number"
                value={value}
                onChangeText={(test) => onChange(test)}
                onBlur={onBlur}
                touched
                errorText={errors?.phone?.message}
                textInputProps={{
                  placeholderTextColor: tw.color("gray-400"),
                  placeholder: "Phone Number",
                }}
                svgFirstIcon={IconPhone}
                containerStyle={tw``}
              />
            )}
            name="phone"
          />
          {/* password */}
          <Controller
            control={control}
            rules={{
              minLength: {
                value: 4,
                message: "Password must be at least 6 characters",
              },
              required: {
                value: true,
                message: "Password is required",
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
                  placeholderTextColor: tw.color("gray-400"),
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
              minLength: {
                value: 4,
                message: "Password must be at least 6 characters",
              },
              required: {
                value: true,
                message: "Password is required",
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
                  placeholderTextColor: tw.color("gray-400"),
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
            <TouchableOpacity
              onPress={() => handleCheckBox()}
              style={tw.style(
                `border w-5 h-5  justify-center items-center rounded-sm`,
                isChecked ? `bg-primary border-0` : `bg-transparent`
              )}
            >
              {isChecked ? <Text style={tw`text-white text-sm`}>✔</Text> : null}
            </TouchableOpacity>
            <Text style={tw`font-normal  text-xs`}>
              By creating this account you agree to our{" "}
              <Text style={tw`text-primary `}>terms of use</Text>
              {""} & {""}
              <Text style={tw`text-primary `}>privacy policy</Text>.
            </Text>
          </View>
          {isChecked ? (
            <View style={tw`rounded-full h-12`}>
              <TButton
                onPress={handleSubmit(onRegisterInfoSubmit)}
                title="Sign up"
                containerStyle={[tw``]}
              />
            </View>
          ) : (
            <View style={tw`rounded-full h-12`}>
              <TButton
                disabled
                // onPress={handleSubmit(onRegisterInfoSubmit)}
                title="Sign up"
                containerStyle={[tw``]}
              />
            </View>
          )}
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
          Have an account?{" "}
          <Link style={tw`text-primary font-bold underline`} href={"/login"}>
            Sign In
          </Link>
        </Text>
      </View>
    </ScrollView>
  );
};

export default singup;
