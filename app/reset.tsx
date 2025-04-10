import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import SubHeading from "@/components/SubTileHead";
import Heading from "@/components/TitleHead";
import tw from "@/lib/tailwind";
import { IconEyaClose, IconPassword } from "@/assets/icon/icon";
import InputText from "@/lib/inputs/InputText";
import { Controller, useForm } from "react-hook-form";
import TButton from "@/lib/buttons/TButton";

const Reset = () => {
  const [modalVisible, setModalVisible] = useState(false);
  console.log(modalVisible, "modal showing");

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
    <>
      <View style={tw`px-6 flex-1 justify-center items-center`}>
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
              pattern: {
                value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                message: "Please special char password",
              },
              required: {
                value: true,
                message: "password is required",
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
                  placeholder: "Enter a new password",
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
                  placeholder: "Retype new password",
                }}
                svgFirstIcon={IconPassword}
                svgSecondIcon={IconEyaClose}
                containerLayoutStyle={tw`mb-3`}
              />
            )}
            name="confirm_password"
          />

          <View style={tw`rounded-full h-12`}>
            <TButton
              onPress={() => setModalVisible(true)}
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
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={tw`bg-primary px-5 py-2 rounded-lg mt-5`}
              >
                <Text style={tw`text-white text-lg font-bold`}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default Reset;
