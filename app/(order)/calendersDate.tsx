import { useNavigation, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { IconBackArrow } from "@/assets/icon/icon";
import TButton from "@/lib/buttons/TButton";
import InputText from "@/lib/inputs/InputText";
import tw from "@/lib/tailwind";
import React from "react";
import { Calendar } from "react-native-calendars";
import { Dropdown } from "react-native-element-dropdown";
import { SvgXml } from "react-native-svg";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";

const data = [
  { label: "Interior Cleaning ", value: "1", price: 7542.0 },
  { label: "Exterior Cleaning", value: "2", price: 7542.0 },
  { label: "Both", value: "3", price: 7542.0 },
];
const Times = [
  {
    label: "12:00 PM",
    isOpen: false,
  },
  {
    label: "01:00 PM",
    isOpen: true,
  },
  {
    label: "02:00 PM",
    isOpen: true,
  },
  {
    label: "03:00 PM",
    isOpen: true,
  },
  {
    label: "04:00 PM",
    isOpen: true,
  },
  {
    label: "05:00 PM",
    isOpen: true,
  },
  {
    label: "06:00 PM",
    isOpen: true,
  },
  {
    label: "07:00 PM",
    isOpen: false,
  },
];

const calendersDate = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [dropDownValue, setDropValue] = React.useState<{
    index: number;
    label: string;
    value: string;
    price: number;
  } | null>(null);
  // console.log(id, "calnder id ========================");

  const [selectedDate, setSelectedDate] = React.useState("");
  const [markedDates, setMarkedDates] = React.useState({});
  const [selectTime, setSelectTime] = React.useState<{
    label: string;
    isOpen: boolean;
  } | null>(null);

  const today = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format
  // Custom rendering for each day
  const handleDayPress = (day) => {
    // Prevent selecting a day before today
    // if (day.dateString < today) {
    //   return;
    // }

    setSelectedDate(day.dateString);
    setMarkedDates({
      [day.dateString]: {
        selected: true,
        marked: true,
        selectedColor: "#00BFFF",
      },
    });
  };

  const renderDay = (day) => {
    const isPastDate = day.dateString < today;
    return (
      <TouchableOpacity
        onPress={() => handleDayPress(day)}
        disabled={isPastDate} // Disable past dates
        style={{
          backgroundColor: isPastDate
            ? "rgba(0, 0, 0, 0.1)" // Gray out past dates
            : selectedDate === day.dateString
            ? tw.color("bg-primary")
            : "transparent", // Gray out previous dates
          borderRadius: 20,
          width: 35,
          height: 35,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: isPastDate
              ? "rgba(0, 0, 0, 0.5)" // Dim text color for past dates
              : selectedDate === day.dateString
              ? "#FFFFFF"
              : "#000000", // Dim text color for past dates
          }}
        >
          {day.day}
        </Text>
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
      service_type: "",
    },
  });

  const handleServiceData = (item) => {
    console.log(item, "this check out ------------------------------");
  };

  return (
    <View style={tw`px-6 `}>
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

          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please enter your model name",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Dropdown
                style={tw` h-12 bg-[#E7E7E7] w-full rounded-xl border  p-4`}
                placeholderStyle={tw`text-base`}
                containerStyle={tw`rounded-lg p-2`}
                selectedTextStyle={tw`text-base`}
                inputSearchStyle={tw`h-10 text-base`}
                iconStyle={tw`w-5 h-5`}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select service"
                onBlur={onBlur}
                value={value}
                renderItem={(item) => (
                  <TouchableOpacity
                    onPress={() => {
                      setDropValue(item);
                      onChange(item.value);
                      console.log(
                        item,
                        "dropdown data ----------------------------"
                      );
                    }}
                  >
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
                )}
              />
            )}
            name="service_type"
          />
        </View>
        {/* ------------------ calender -------------------- */}
        <View>
          <Text style={tw`font-DegularDisplaySemibold text-xl mt-4 mb-1`}>
            select date
          </Text>

          <Calendar
            // Specify the current date
            current={new Date().toISOString().split("T")[0]}
            // Mark the selected date
            markedDates={markedDates}
            // Callback that gets called when the user selects a day

            dayComponent={({ date, state }) => renderDay(date, state)} // Apply custom day rendering
            style={tw`rounded-lg`}
          />
        </View>
        {/*  ---------------- select time ------------------- */}
        <View>
          <Text
            style={tw`mt-3 font-DegularDisplaySemibold text-xl text-regularText`}
          >
            Select time
          </Text>
          <View style={tw`mt-4`}>
            <View
              style={tw`flex-row flex-wrap justify-start items-center w-full`}
            >
              {Times.map((time, index) => (
                <TouchableOpacity
                  disabled={!time.isOpen}
                  style={tw`${
                    selectTime?.label === time.label
                      ? "bg-primary"
                      : !time.isOpen
                      ? "bg-gray-200"
                      : "bg-transparent"
                  } rounded-lg border w-[32%] border-gray-50`}
                  key={index}
                  onPress={() => setSelectTime(time)}
                >
                  <Text
                    style={tw`font-DegularDisplaySemibold text-base ${
                      selectTime?.label === time.label
                        ? "text-white"
                        : "text-regularText"
                    }   rounded-2xl text-center px-6 py-3`}
                  >
                    {time?.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={tw`flex-row flex-1 items-end gap-2 mt-10 mb-6`}>
          <TButton
            onPress={() => router.back()}
            title="Cancel"
            containerStyle={tw`bg-transparent border rounded-lg border-primary flex-1`}
            titleStyle={tw`text-primary`}
          />
          <TButton
            onPress={handleSubmit(handleServiceData)}
            // onPress={() => router.push("/(order)/paymentSystem")}
            title="checkout"
            containerStyle={tw`flex-1 rounded-lg`}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default calendersDate;
