import { IconEyaClose, IconEyeShow, IconPassword } from "@/assets/icon/icon";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, Modal, Text, View } from "react-native";

import SubHeading from "@/components/SubTileHead";
import Heading from "@/components/TitleHead";
import TButton from "@/lib/buttons/TButton";
import InputText from "@/lib/inputs/InputText";
import tw from "@/lib/tailwind";
import { useResetPasswordMutation } from "@/redux/apiSlices/authSlices";

const Reset = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isShowConfirmPass, setIsShowConfirmPass] = useState(false);
  const { email } = useLocalSearchParams();

  const [resetPass, { reset }] = useResetPasswordMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });
  const onSubmit = async (data) => {
    const newPassword = {
      email: email,
      password: data?.password,
      c_password: data?.confirm_password,
    };
    try {
      const res = await resetPass(newPassword).unwrap();
      if (res?.status) {
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
          router.push("/login");
        }, 3000);
      }
    } catch (error) {
      router?.push(
        `/toaster?content=${
          (error as any)?.message?.password || (error as any)?.message?.email
        }&time=3000`
      );
    }
    console.log(newPassword, "this reset pass user");
  };

  return (
    <>
      <View style={tw`px-6 bg-primaryBase flex-1 justify-center items-center`}>
        <View style={tw`items-center mb-14`}>
          <Heading title={"Reset password"} />
          <SubHeading
            title={"You have to create a new password after reset."}
          />
        </View>

        <View style={tw`w-full gap-2`}>
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
                label="New Password"
                value={value}
                onChangeText={(test) => onChange(test)}
                onBlur={onBlur}
                touched
                errorText={errors?.password?.message}
                textInputProps={{
                  placeholderTextColor: tw.color("gray-400"),
                  placeholder: "Enter a new password",
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
                label="Confirm New Password"
                value={value}
                onChangeText={(test) => onChange(test)}
                onBlur={onBlur}
                touched
                errorText={errors?.confirm_password?.message}
                textInputProps={{
                  placeholderTextColor: tw.color("gray-400"),
                  placeholder: "Retype new password",
                  secureTextEntry: isShowConfirmPass ? false : true,
                }}
                svgFirstIcon={IconPassword}
                svgSecondIcon={isShowConfirmPass ? IconEyeShow : IconEyaClose}
                svgSecondOnPress={() =>
                  setIsShowConfirmPass(!isShowConfirmPass)
                }
                containerLayoutStyle={tw`mb-3`}
              />
            )}
            name="confirm_password"
          />

          <View style={tw`rounded-full h-12`}>
            <TButton
              onPress={handleSubmit(onSubmit)}
              title="Reset"
              containerStyle={tw``}
            />
          </View>
        </View>
        {/*  ========================== successful modal ======================= */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View
            style={tw` flex-1 bg-black bg-opacity-50 justify-center items-center`}
          >
            <View
              style={tw`w-8/9 bg-white p-5 rounded-2xl items-center shadow-lg`}
            >
              {/* Check Icon */}
              <Image
                style={tw`mt-6 mb-2`}
                source={require("../assets/images/success_modal.png")}
              />

              {/* Success Message */}
              <Text style={tw`text-4xl font-DegularDisplayBold mt-3`}>
                Success!
              </Text>
              <Text style={tw`text-base text-gray-500 text-center mt-2`}>
                Your password updated successfully
              </Text>

              {/* Close Button */}
              {/* <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={tw`bg-primary px-5 py-2 rounded-lg mt-5`}
              >
                <Text style={tw`text-white text-lg font-bold`}>Done</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default Reset;
