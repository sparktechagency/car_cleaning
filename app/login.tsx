import { View, Text, TextInput, Button } from "react-native";
import React from "react";
import tw from "@/lib/tailwind";
import { useForm, Controller } from "react-hook-form";
import { Checkbox } from "react-native-ui-lib";
import TButton from "@/lib/buttons/TButton";
import InputText from "@/lib/inputs/InputText";
import { IconEmail } from "@/assets/icon/icon";

const login = () => {
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

        <View style={tw`w-full`}>
          <Text style={tw`mb-1`}>Email</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="richard344@gmail.com"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={tw`h-11 w-full border  rounded-lg p-3 mb-4`}
              />
            )}
            name="email"
          />
          {errors.email && <Text>This is required.</Text>}

          <Text style={tw`mb-1`}>Password</Text>
          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              //   <TextInput
              //     placeholder="*****"
              //     onBlur={onBlur}
              //     onChangeText={onChange}
              //     value={value}
              //     style={tw`h-11 w-full border rounded-lg p-3 mb-4`}
              //   />
              <InputText
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                // placeholderStyle={tw`bg-transparent`}
                textInputProps={{
                  placeholder: "Email",
                }}
                svgFirstIcon={IconEmail}
                containerStyle={tw`mb-3`}
              />
            )}
            name="password"
          />

          <View style={tw`flex-row justify-between mb-10`}>
            <View style={tw`flex-row gap-1 items-center rounded-none`}>
              <Checkbox style={tw`w-4 h-4`} />
              <Text>Remember me</Text>
            </View>
            <Text>Forget password?</Text>
          </View>

          <View style={tw`rounded-full h-12`}>
            <TButton title="Sign in" containerStyle={tw``} />
          </View>
        </View>
      </View>
    </>
  );
};

export default login;
