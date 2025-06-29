import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import tw from "@/lib/tailwind";
import { useForm, Controller } from "react-hook-form";
import { Checkbox } from "react-native-ui-lib";
import TButton from "@/lib/buttons/TButton";
import InputText from "@/lib/inputs/InputText";
import {
  IconEmail,
  IconEyaClose,
  IconEyeShow,
  IconPassword,
} from "@/assets/icon/icon";
import { Link, router, useRouter } from "expo-router";
import Heading from "@/components/TitleHead";
import SubHeading from "@/components/SubTileHead";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLoginMutation } from "@/redux/apiSlices/authSlices";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const login = () => {
  const [isSelected, setSelection] = useState<boolean>(false);
  const [isShow, setIsShow] = useState(false);
  const [loginInfo, setLoginInfo] = useState<any>(null);
  const [login, { isLoading }] = useLoginMutation();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleLogin = async (loginUserData: any) => {
    try {
      if (isSelected === true) {
        await AsyncStorage.setItem("loginInfo", JSON.stringify(loginUserData));
      }
      const res = await login(loginUserData).unwrap();
      if (res.status) {
        await AsyncStorage.setItem("token", res?.data?.access_token);
        router.replace("/drewer/home");
      } else {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: "Failed !",
          textBody: "Login failed. Please check your credentials.",
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

  const handleSaveLoginInfo = async () => {
    const loginInfoStr = await AsyncStorage.getItem("loginInfo");
    const checkedStr = await AsyncStorage.getItem("check");

    const savedLoginInfo = loginInfoStr ? JSON.parse(loginInfoStr) : null;
    const checked = checkedStr ? JSON.parse(checkedStr) : false;

    setSelection(checked);
    setLoginInfo(savedLoginInfo);

    // Reset form with saved login info
    reset({
      email: savedLoginInfo?.email || "",
      password: savedLoginInfo?.password || "",
    });
  };

  React.useEffect(() => {
    handleSaveLoginInfo();
  }, []);

  return (
    <>
      <View style={tw`px-6 flex-1 justify-center items-center`}>
        <View style={tw`items-center mb-14`}>
          <Heading title={"Welcome Back"} />
          <SubHeading title={"Please sign in to access your account."} />
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
                value: /^[0-9]+$/,
                message: "Please spacial char password",
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
                  placeholder: "++++++++",
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

          <View style={tw`flex-row justify-between mb-10`}>
            <View style={tw`flex-row gap-2 items-center rounded-none`}>
              <Checkbox
                value={isSelected}
                onValueChange={async (value) => {
                  await AsyncStorage.setItem("check", JSON.stringify(value));
                  setSelection(value);
                }}
                style={tw`w-4 h-4 border-black rounded-none`}
              />
              <Text>Remember me</Text>
            </View>
            <Text
              style={tw`text-primary text-[12px] font-DegularDisplayRegular`}
            >
              <Link href={"/forgetPass"}>Forgot password?</Link>
            </Text>
          </View>

          <View style={tw`rounded-full h-12`}>
            <TButton
              onPress={handleSubmit(handleLogin)}
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
