import {
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import InputText from "@/lib/inputs/InputText";
import tw from "@/lib/tailwind";
import { useNavigation, useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";
import { IconBackArrow, IconCongratulation } from "@/assets/icon/icon";
import { Dropdown } from "react-native-element-dropdown";
import FourthStep from "@/components/FourthStep";
import TButton from "@/lib/buttons/TButton";
import { Modal } from "react-native-ui-lib";
import { Calendar } from "react-native-calendars";

const data = [
  { label: "Interior Cleaning ", value: "1", price: 7542.0 },
  { label: "Exterior Cleaning", value: "2", price: 7542.0 },
  { label: "Both", value: "3", price: 7542.0 },
];

const calendersDate = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [value, setValue] = React.useState(null);

  const renderItem = (item: any) => {
    return (
      <TouchableOpacity>
        <View
          style={tw`p-4 my-1 w-full bg-[#E7E7E7] rounded-xl flex-row justify-between items-center gap-2`}
        >
          <Text style={tw`text-base`}>{item.label}</Text>
          <Text
            style={tw` font-DegularDisplaySemibold text-base text-[#0063E5]`}
          >
            $ {item.price}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      brand_name: "",
      model_name: "",
    },
  });
  const onSubmit = (data: any) => console.log(data);

  return (
    <View style={tw`px-6`}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={tw`flex-row items-center mt-5 mb-6 gap-2`}
      >
        <SvgXml xml={IconBackArrow} />
        <Text style={tw`text-[#262626] font-DegularDisplayBold text-2xl`}>
          Back
        </Text>
      </Pressable>

      <ScrollView
        contentContainerStyle={tw`pb-20 `}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please enter your brand name",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                // containerLayoutStyle={tw`bg-black`}
                // containerStyle={tw`bg-black`}
                label="Vehicle brand name"
                labelStyle={tw`font-DegularDisplaySemibold text-xl`}
                value={value}
                onChangeText={(test) => onChange(test)}
                onBlur={onBlur}
                touched
                errorText={errors?.brand_name?.message}
                textInputProps={{
                  placeholder: "Enter the brand name",
                }}
                containerStyle={tw`w-full `}
              />
            )}
            name="brand_name"
          />
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please enter your model name",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                label="Vehicle model name"
                labelStyle={tw`font-DegularDisplaySemibold text-xl`}
                value={value}
                onChangeText={(test) => onChange(test)}
                onBlur={onBlur}
                touched
                errorText={errors?.model_name?.message}
                textInputProps={{
                  placeholder: "Enter the model name",
                }}
                containerStyle={tw`w-full`}
              />
            )}
            name="model_name"
          />

          <Text style={tw`font-DegularDisplaySemibold text-xl mt-4 mb-1`}>
            select service
          </Text>
          <Dropdown
            style={tw` h-12 bg-[#E7E7E7] w-full rounded-xl border-1  p-4`}
            placeholderStyle={tw`text-base`}
            selectedTextStyle={tw`text-base`}
            inputSearchStyle={tw`h-10 text-base`}
            iconStyle={tw`w-5 h-5`}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Interior Cleaning"
            value={value}
            onChange={(item) => {
              setValue(item.value);
            }}
            renderItem={renderItem}
          />
        </View>
        {/* ------------------ calender -------------------- */}
        <View>
          <Text style={tw`font-DegularDisplaySemibold text-xl mt-4 mb-1`}>
            select service
          </Text>

          <Calendar style={tw`rounded-2xl mb-4`} />
        </View>
        {/*  ---------------- select time ------------------- */}
        <View>
          <Text
            style={tw`font-DegularDisplaySemibold text-xl text-regularText`}
          >
            Select time
          </Text>
          <View style={tw`mt-4`}>
            <View style={tw`flex-row justify-between w-full`}>
              <TouchableOpacity>
                <Text
                  style={tw`font-DegularDisplaySemibold text-base text-regularText  border-[#E5EFFC] bg-white rounded-2xl text-center px-6 py-3`}
                >
                  10:00 AM
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={tw`font-DegularDisplaySemibold text-base text-regularText border-[#E5EFFC] bg-white rounded-2xl text-center px-6 py-3`}
                >
                  11:00AM
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={tw`font-DegularDisplaySemibold text-base text-regularText  border-[#E5EFFC] bg-white rounded-2xl text-center px-6 py-3`}
                >
                  12:00PM
                </Text>
              </TouchableOpacity>
            </View>
            <View style={tw`flex-row justify-between w-full mt-2`}>
              <TouchableOpacity>
                <Text
                  style={tw`font-DegularDisplaySemibold text-base text-regularText  border-[#E5EFFC] bg-white rounded-2xl text-center px-6 py-3`}
                >
                  01:00AM
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={tw`font-DegularDisplaySemibold text-base text-regularText border-[#E5EFFC] bg-white rounded-2xl text-center px-6 py-3`}
                >
                  12:00AM
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={tw`font-DegularDisplaySemibold text-base text-regularText  border-[#E5EFFC] bg-white rounded-2xl text-center px-6 py-3`}
                >
                  03:00PM
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={tw`flex-row flex-1 items-end gap-2 mt-10`}>
          <TButton
            onPress={() => router.back()}
            title="Cancel"
            containerStyle={tw`bg-transparent border rounded-lg border-primary flex-1`}
            titleStyle={tw`text-primary`}
          />
          <TButton
            onPress={() => router.push("/(order)/paymentSystem")}
            title="checkout"
            containerStyle={tw`flex-1 rounded-lg`}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default calendersDate;
