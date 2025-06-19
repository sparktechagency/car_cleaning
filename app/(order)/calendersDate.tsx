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
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useGetServicesByIdQuery } from "@/redux/apiSlices/servicesApiSlices";

const calendersDate = () => {
  const { id } = useLocalSearchParams();
  const {
    data: singleServiceData,
    isLoading: singleServiceLoading,
    isFetching: singleServiceFetching,
    refetch: singleServiceRefetch,
  } = useGetServicesByIdQuery(id);

  const navigation = useNavigation();
  const router = useRouter();

  const [dropDownValue, setDropValue] = React.useState<{
    index: number;
    label: string;
    value: string;
    price: number;
  } | null>(null);

  const service_type = dropDownValue?.label;
  const price = dropDownValue?.price;

  const [selectedDate, setSelectedDate] = React.useState("");
  const [markedDates, setMarkedDates] = React.useState({});
  const [selectTime, setSelectTime] = React.useState<any | null>(null);

  const today = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format
  // Custom rendering for each day
  const handleDayPress = (day) => {
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
              ? "rgba(0, 0, 0, 0.5)"
              : selectedDate === day.dateString
              ? "#FFFFFF"
              : "#000000",
          }}
        >
          {day.day}
        </Text>
      </TouchableOpacity>
    );
  };

  const serviceSelectedData = [
    {
      label: "Interior Cleaning ",
      value: "1",
      price: singleServiceData?.data?.interior,
    },
    {
      label: "Exterior Cleaning",
      value: "2",
      price: singleServiceData?.data?.exterior,
    },
    { label: "Both", value: "3", price: singleServiceData?.data?.both },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      brand_name: "",
      model_name: "",
      service_type: "",
      booking_name: "",
    },
  });

  const handleServiceData = (item) => {
    const car_brand = item?.brand_name;
    const car_model = item?.model_name;
    const booking_note = item?.booking_name;
    const service_name = singleServiceData?.data?.car_type;
    const service_id = singleServiceData?.data?.id;
    const booking_date = Object.keys(markedDates)[0];
    const booking_time = selectTime;
    const bookingData = {
      car_brand,
      car_model,
      service_name,
      service_id,
      service_type,
      booking_date,
      booking_time,
      booking_note,
      price,
    };
    router.push({
      pathname: "/(order)/paymentSystem",
      params: {
        car_brand,
        car_model,
        service_name,
        service_id,
        service_type,
        booking_date,
        booking_time,
        booking_note,
        price,
      },
    });
  };

  return (
    <View style={tw`px-6 flex-1`}>
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
                data={serviceSelectedData}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select service"
                onChange={(item) =>
                  console.log(
                    item,
                    "this onchange dropdown value------- line 240"
                  )
                }
                onBlur={onBlur}
                value={value}
                renderItem={(item) => (
                  <TouchableOpacity
                    onPress={() => {
                      setDropValue(item);
                      onChange(item.value);
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
            current={new Date().toISOString().split("T")[0]}
            markedDates={markedDates}
            dayComponent={({ date, state }) => renderDay(date, state)}
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
              {singleServiceData?.data?.time ? (
                singleServiceData?.data?.time?.map((time, index) => (
                  <TouchableOpacity
                    // disabled={!time}
                    style={tw`${
                      selectTime === time ? "bg-primary" : "bg-transparent"
                    } rounded-lg border w-[32%] border-gray-50`}
                    key={index}
                    onPress={() => setSelectTime(time)}
                  >
                    <Text
                      style={tw`font-DegularDisplaySemibold text-base ${
                        selectTime?.label === time
                          ? "text-white"
                          : "text-regularText"
                      }   rounded-2xl text-center px-6 py-3`}
                    >
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={tw`font-bold text-xl text-center`}>
                  No Date Available..!
                </Text>
              )}
            </View>
          </View>
        </View>

        <View>
          <Text
            style={tw`mt-3 font-DegularDisplaySemibold text-xl text-regularText`}
          >
            Appointment note
          </Text>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please booking Note name",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                value={value}
                onChangeText={(test) => onChange(test)}
                inputStyle={tw`justify-start items-start text-start`}
                onBlur={onBlur}
                touched
                errorText={errors?.booking_name?.message}
                textInputProps={{
                  placeholder: "Enter the Appointment note",
                  textAlignVertical: "top",
                }}
                containerStyle={tw`w-full h-28`}
              />
            )}
            name="booking_name"
          />
        </View>

        <View style={tw`flex-row flex-1 items-end gap-2 mt-10 `}>
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
