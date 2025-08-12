import {
  useGetBlockedServiceDateQuery,
  useGetServicesByIdQuery,
  useLazyGetFreeTimesQuery,
} from "@/redux/apiSlices/servicesApiSlices";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import { IconBackArrow } from "@/assets/icon/icon";
import { ImgSuccess } from "@/assets/images/images";
import TButton from "@/lib/buttons/TButton";
import InputText from "@/lib/inputs/InputText";
import tw from "@/lib/tailwind";
import { useGetProfileQuery } from "@/redux/apiSlices/authSlices";
import { useBookingSuccessMutation } from "@/redux/apiSlices/bookingSlices";
import { PrimaryColor } from "@/utils/utils";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { Calendar } from "react-native-calendars";
import { Dropdown } from "react-native-element-dropdown";
import { SvgXml } from "react-native-svg";

const calendersDate = () => {
  const { id } = useLocalSearchParams();
  const [isTime, setIsTime] = React.useState<any | null>(null);
  const [car_brand, setCarBrand] = useState("");
  const [car_model, setCarModel] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const {
    data: singleServiceData,
    isLoading: singleServiceLoading,
    isFetching: singleServiceFetching,
    refetch: singleServiceRefetch,
  } = useGetServicesByIdQuery(id);

  const {
    data: blockedDate,
    refetch: blockedDateRefetch,
    isLoading: blockedDateLoading,
  } = useGetBlockedServiceDateQuery({});
  const [
    getFreeTimes,
    { data: freeTimes, refetch: freeTimesRefetch, isFetching: timeFetching },
  ] = useLazyGetFreeTimesQuery({});
  const { data: profileData, refetch } = useGetProfileQuery({});

  const handleTimeShow = async () => {};
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
  const [bookingNote, setBookingNote] = useState("");
  const [selectedDate, setSelectedDate] = React.useState("");
  const [markedDates, setMarkedDates] = React.useState({});
  const [selectTime, setSelectTime] = React.useState<any | null>(null);

  const today = new Date().toISOString().split("T")[0];

  const handleDayPress = async (day) => {
    const date = day.dateString;
    setSelectedDate(day.dateString);
    setMarkedDates({
      [day.dateString]: {
        selected: true,
        marked: true,
        selectedColor: "#00BFFF",
      },
    });

    try {
      // await setIsTime(singleServiceData?.data?.service_times);
      const res = await getFreeTimes({
        service_id: id,
        date: date,
      }).unwrap();
      setIsTime(res?.data);
    } catch (error) {
      console.log(error, "❌ Failed to load time slots");
    }
  };

  const renderDay = (day) => {
    const isPastDate = day.dateString < today;
    let blocked = blockedDate?.data?.data.map((item) => item.date) || [];
    const isDisabledDate = blocked.includes(day.dateString);
    const isDisabled = isPastDate || isDisabledDate;
    return (
      <TouchableOpacity
        onPress={() => {
          handleDayPress(day), handleTimeShow();
        }}
        disabled={isDisabled}
        style={{
          backgroundColor: isDisabled
            ? "rgba(0, 0, 0, 0.1)"
            : selectedDate === day.dateString
            ? tw.color("bg-primary")
            : "transparent",
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

  useEffect(() => {
    if (profileData?.data?.car_brand || profileData?.data?.car_model) {
      const brand = profileData?.data?.car_brand || "";
      const model = profileData?.data?.car_model || "";

      setCarBrand(brand);
      setCarModel(model);

      reset({
        brand_name: brand,
        model_name: model,
        service_type: "",
        booking_name: "",
        street_address: "",
      });
    }
  }, [profileData]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      brand_name: "",
      model_name: "",
      street_address: "",
      zip_code: "",
      service_type: "",
      booking_time: "",
      booking_name: "",
    },
  });

  const [bookingSuccess, bookingResult] = useBookingSuccessMutation();

  const handleServiceData = async (item) => {
    console.log("HIST");
    const car_brand = item?.brand_name;
    const car_model = item?.model_name;
    const street_address = item?.street_address;
    const zip_code = item?.zip_code;
    const booking_time = item?.booking_time;
    const booking_note = bookingNote;
    const service_name = singleServiceData?.data?.car_type;
    const service_id = singleServiceData?.data?.id;
    const booking_date = Object.keys(markedDates)[0];

    try {
      const bookingInfo = {
        car_brand,
        car_model,
        street_address,
        zip_code,
        service_name,
        service_id,
        service_type,
        booking_date,
        booking_time,
        booking_note,
        price,
      };
      const res = await bookingSuccess(bookingInfo).unwrap();

      if (res?.status) {
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
          router.push("/drewer/home");
        }, 3000);
      }

      // handleSetupInitialPayment(bookingInfo);
    } catch (error) {
      console.log(error, "please enter the payment info ____");
    }
  };

  // Payment login for booking start ---------------------------------------------------

  return (
    <View style={tw`px-6 flex-1 bg-primaryBase`}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={tw`flex-row items-center mt-5 mb-6 gap-2`}
      >
        <SvgXml xml={IconBackArrow} />
        <Text style={tw`text-[#262626] font-DegularDisplayBold text-2xl`}>
          Back
        </Text>
      </TouchableOpacity>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={blockedDateRefetch}
            colors={[PrimaryColor]}
          />
        }
        contentContainerStyle={tw`pb-20 `}
        showsVerticalScrollIndicator={false}
      >
        <View style={tw`gap-4`}>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please enter the brand name",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                label="Car Make"
                labelStyle={tw`font-DegularDisplaySemibold text-xl`}
                value={value}
                onChangeText={(test) => onChange(test)}
                onBlur={onBlur}
                touched
                errorText={errors?.brand_name?.message}
                textInputProps={{
                  placeholderTextColor: tw.color("gray-400"),
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
                message: "Please enter the model name",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                label="Car Model"
                labelStyle={tw`font-DegularDisplaySemibold text-xl`}
                value={value}
                onChangeText={(test) => onChange(test)}
                onBlur={onBlur}
                touched
                errorText={errors?.model_name?.message}
                textInputProps={{
                  placeholderTextColor: tw.color("gray-400"),
                  placeholder: "Enter the model name",
                }}
                containerStyle={tw`w-full`}
              />
            )}
            name="model_name"
          />
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please enter the street address",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                label="Street Address"
                labelStyle={tw`font-DegularDisplaySemibold text-xl`}
                value={value}
                onChangeText={(test) => onChange(test)}
                onBlur={onBlur}
                touched
                errorText={errors?.street_address?.message}
                textInputProps={{
                  placeholderTextColor: tw.color("gray-400"),
                  placeholder: "Type your street address",
                }}
                containerStyle={tw`w-full`}
              />
            )}
            name="street_address"
          />
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please fill in your zip code.",
              },
              pattern: {
                value: /^[0-9]+$/,
                message: "Zip code must contain only numbers",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputText
                label="Zip Code"
                labelStyle={tw`font-DegularDisplaySemibold text-xl`}
                value={value}
                onChangeText={(test) => onChange(test)}
                onBlur={onBlur}
                touched
                errorText={errors?.zip_code?.message}
                textInputProps={{
                  placeholderTextColor: tw.color("gray-400"),
                  placeholder: "Your zip code",
                  keyboardType: "number-pad",
                  maxLength: 6,
                  autoCapitalize: "none",
                }}
                containerStyle={tw`w-full`}
              />
            )}
            name="zip_code"
          />
          <View style={tw` flex-row items-center gap-2`}>
            <Text style={tw`font-DegularDisplaySemibold text-xl  `}>
              Select Service
            </Text>
            {errors?.service_type?.message && (
              <Text style={tw`text-red-500 text-[10px]`}>
                * ({errors?.service_type?.message})
              </Text>
            )}
          </View>

          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please select a service",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Dropdown
                  style={tw`  bg-[#E7E7E7] w-full rounded-xl border  px-4 py-3`}
                  placeholderStyle={tw`text-base`}
                  containerStyle={tw`rounded-lg pt-2`}
                  selectedTextStyle={tw`text-base`}
                  inputSearchStyle={tw`h-10 text-base`}
                  iconStyle={tw`w-5 h-5`}
                  data={serviceSelectedData}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  onBlur={onBlur}
                  placeholder="Select Service"
                  onChange={(item) => {
                    // console.log(item);
                    onChange(item.value);
                    setDropValue(item);
                  }}
                  value={dropDownValue?.value}
                  renderItem={(item, selected) => (
                    <View
                      style={[
                        tw`p-4 my-1 w-full bg-[#E7E7E7] rounded-xl flex-row justify-between items-center gap-2`,
                        {
                          backgroundColor: selected
                            ? tw.color("gray-50")
                            : "white",
                        },
                      ]}
                    >
                      <Text style={tw`text-base`}>{item.label}</Text>
                      <Text
                        style={tw` font-DegularDisplaySemibold text-base text-[#0063E5]`}
                      >
                        $ {item.price}
                      </Text>
                    </View>
                  )}
                />
              </>
            )}
            name="service_type"
          />
        </View>
        {/* ------------------ calender -------------------- */}

        <View style={tw`py-4 gap-3 `}>
          <View style={tw`flex-row items-center gap-2`}>
            <Text style={tw`font-DegularDisplaySemibold text-xl  `}>
              Select Date
            </Text>
            {errors?.booking_time?.message && (
              <Text style={tw`text-red-500 text-[10px] flex-1`}>
                * (Please select a date)
              </Text>
            )}
          </View>

          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Select a time",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <View style={tw` justify-center`}>
                  {blockedDateLoading ? (
                    <>
                      <ActivityIndicator color={PrimaryColor} size={"large"} />
                      <Text
                        style={tw`text-center font-DegularDisplayMedium text-gray-500`}
                      >
                        Loading...
                      </Text>
                    </>
                  ) : (
                    <Calendar
                      current={new Date().toISOString().split("T")[0]}
                      markedDates={markedDates}
                      dayComponent={({ date, state }) => renderDay(date, state)}
                      style={tw`rounded-lg`}
                    />
                  )}
                </View>
              </>
            )}
            name="booking_time"
          />
        </View>
        <View>
          <View style={tw`flex-row items-center gap-2`}>
            <Text style={tw`font-DegularDisplaySemibold text-xl  `}>
              Select Time
            </Text>
            {errors?.booking_time?.message && (
              <Text style={tw`text-red-500 text-[10px] flex-1`}>
                * ({errors?.booking_time?.message})
              </Text>
            )}
          </View>

          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please select a time",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <View style={tw`py-4`}>
                  <View
                    style={tw`flex-row flex-wrap justify-start items-center gap-1 w-full`}
                  >
                    {timeFetching ? (
                      <View style={tw`flex-1  justify-center items-center`}>
                        <ActivityIndicator
                          color={PrimaryColor}
                          size={"small"}
                        />
                      </View>
                    ) : isTime ? (
                      isTime.map((time, index) => (
                        <TouchableOpacity
                          style={tw`${
                            value === time ? "bg-primary" : "bg-white"
                          } rounded-lg border w-[32%] border-gray-50`}
                          key={index}
                          onPress={() => onChange(time)}
                        >
                          <Text
                            style={tw`font-DegularDisplaySemibold text-base ${
                              value === time ? "text-white" : "text-regularText"
                            }   rounded-2xl text-center px-6 py-3`}
                          >
                            {time}
                          </Text>
                        </TouchableOpacity>
                      ))
                    ) : (
                      <Text
                        style={tw`font-bold text-xl justify-center items-center w-full text-gray-600 text-center`}
                      >
                        No Date Available
                      </Text>
                    )}
                  </View>
                </View>
              </>
            )}
            name="booking_time"
          />
        </View>

        <View>
          <Text
            style={tw`mt-3 font-DegularDisplaySemibold text-xl text-regularText`}
          >
            Appointment Notes
          </Text>

          <InputText
            onChangeText={(text) => setBookingNote(text)}
            touched
            errorText={errors?.booking_name?.message}
            textInputProps={{
              placeholderTextColor: tw.color("gray-400"),
              placeholder: "Add other details.",
              multiline: true,
              numberOfLines: 20,
              verticalAlign: "top",
              textAlignVertical: "top",
            }}
            inputStyle={tw`h-28`}
            containerStyle={[tw`  ${isTablet ? `h-40` : `h-32`}`]}
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
            isLoading={bookingResult?.isLoading}
            onPress={handleSubmit(handleServiceData)}
            // onPress={() => router.push("/order/paymentSystem")}
            title="Book"
            containerStyle={tw`flex-1 rounded-lg`}
          />
        </View>
      </ScrollView>

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
            <Image style={tw`mt-6 mb-2`} source={ImgSuccess} />

            {/* Success Message */}
            <Text style={tw`text-4xl font-DegularDisplayBold mt-3`}>
              Success!
            </Text>
            <Text style={tw`text-base text-gray-500 text-center mt-2`}>
              You Are Booked
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
  );
};

export default calendersDate;
