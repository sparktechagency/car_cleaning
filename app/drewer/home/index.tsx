import {
  IconHi,
  IconLocation,
  IconMenu,
  IconNotification,
} from "@/assets/icon/icon";
import { useNavigation, useRouter } from "expo-router";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Dialog, PanningProvider, Wizard } from "react-native-ui-lib";

import CarType from "@/components/CarType";
import FourthStep from "@/components/FourthStep";
import SecondStep from "@/components/SecondStep";
import ThreeStep from "@/components/ThreeStep";
import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";
import { PrimaryColor } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import { SvgXml } from "react-native-svg";

import {
  useGetPhotosQuery,
  useGetServicesQuery,
} from "@/redux/apiSlices/homeApiSlices";
import { IBookingData } from "@/interface/interfaces";
import Fifth from "@/components/Fifth";
import {
  useGetProfileQuery,
  useGetTokenCheckQuery,
} from "@/redux/apiSlices/authSlices";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [isToken, setIsToken] = useState();

  // ============================ services data =-======================================================================
  const [bookingInfo, setBookingInfo] = useState<IBookingData | null>(null);

  const { data, isLoading, isError, isSuccess } = useGetServicesQuery({});
  const { data: photoData } = useGetPhotosQuery({});
  const { data: userInfo } = useGetProfileQuery(isToken);

  const handleUserInfo = async () => {
    const token = await AsyncStorage.getItem("token");
    setIsToken(token);
  };

  useEffect(() => {
    handleUserInfo();
  }, []);

  const renderItem = ({ item }: { item: any }): JSX.Element => {
    return (
      <TouchableOpacity onPress={() => handleServiceDetails(item)}>
        <View
          style={tw`w-28 h-28 m-2 flex-col justify-center items-center text-center rounded-2xl bg-white`}
        >
          <View style={tw`p-4 rounded-full items-center mb-1 bg-[#0063E51A]`}>
            <Image
              width={32}
              height={30}
              resizeMode="contain"
              source={{ uri: item?.icon }}
            />
          </View>
          <Text
            style={tw`font-DegularDisplaySemibold text-base text-[#262626]`}
          >
            {item?.car_type}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const workRenderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity>
        <View style={tw`mb-4 mr-2`}>
          <Image
            style={tw`w-44 h-32 rounded-2xl`}
            source={{ uri: item?.photo }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const handleServiceDetails = (item: any) => {
    router.push({
      pathname: "/(order)/calendersDate",
      params: { id: item?.id },
    });
  };

  console.log(
    bookingInfo,
    "this is home index booking index --------- line number 92"
  );

  return (
    <View style={tw`flex-1 px-6 `}>
      {/* header parts  */}
      <View style={tw`py-4 flex-row items-center justify-between `}>
        <View style={tw`flex-row justify-start items-center  gap-4`}>
          <TouchableOpacity
            onPress={() => {
              (navigation as any)?.openDrawer();
            }}
            style={tw` items-center justify-center `}
          >
            <SvgXml xml={IconMenu} />
          </TouchableOpacity>
          <View>
            <View style={tw`flex-row items-start gap-2`}>
              <Text
                style={tw`font-DegularDisplayBold flex-row items-center text-black text-2xl`}
              >
                Hi {userInfo?.data?.name},
              </Text>
              <SvgXml xml={IconHi} />
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/(notification)/notification")}
          style={tw`w-12 h-12 p-3 items-center text-center text-white bg-primary rounded-full`}
        >
          <SvgXml xml={IconNotification} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-20`}
      >
        {/* ========== Banner section =========== */}
        <View>
          <View style={tw`relative w-full items-center min-h-72 mt-8`}>
            <View style={tw`top-10`}>
              <Image
                source={require("../../../assets/images/banner-bg.png")}
                style={tw`h-56 w-full rounded-3xl`}
              />
            </View>

            <View style={tw`absolute z-50`}>
              <Image
                style={tw` h-40 mx-auto mb-1`}
                source={require("../../../assets/images/car-white.png")}
              />
              <View style={tw`mx-auto w-full text-center items-center`}>
                <Text style={tw`font-DegularDisplayBold text-2xl`}>
                  Keep your <Text style={tw`text-primary`}> car clean</Text>{" "}
                  always
                </Text>
                <Text
                  style={tw`text-sm items-center text-center font-DegularDisplayMedium mb-4`}
                >
                  Car wash is a brand which is latterly going to change the
                  people think about car cleaning.
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <View
                    style={tw`bg-primary w-28 h-11 rounded-full mx-auto justify-center items-center`}
                  >
                    <Text
                      style={tw`text-sm font-DegularDisplayBold text-white`}
                    >
                      Book now!
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* ======== service category section ============= */}
        <View>
          <View style={tw`mt-6 `}>
            <Text style={tw`font-DegularDisplayBold text-2xl`}>
              Quick access for get service
            </Text>
            <View style={tw``}>
              <FlatList
                data={data?.data}
                renderItem={renderItem}
                numColumns={3}
                scrollEnabled={false}
                keyExtractor={(item) => item?.id.toLocaleString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={tw`flex  items-center bg-transparent `}
              />
            </View>
          </View>
        </View>

        {/* ========= work section with home page  ====== */}

        <View>
          <Text style={tw`font-DegularDisplayBold text-2xl`}>
            Photo gallery
          </Text>

          <FlatList
            scrollEnabled={false}
            data={photoData?.data?.data}
            renderItem={workRenderItem}
            numColumns={2}
            contentContainerStyle={tw`mt-4`}
          />
        </View>
      </ScrollView>

      {/* ============= booking modal ====================== */}
      <Dialog
        width={"100%"}
        height={"70%"}
        containerStyle={tw`flex-1 bg-white rounded-t-3xl `}
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        panDirection={PanningProvider.Directions.DOWN}
        bottom={true}
        renderPannableHeader={() => {
          return (
            <View
              style={tw`bg-[#F6F6F6] z-50 flex-1 items-center p-6  py-10  rounded-l-3xl rounded-r-3xl rounded-b-none`}
            >
              <Wizard
                containerStyle={tw`bg-transparent pb-4 border-0 border-b-0 shadow-none`}
                activeIndex={step}
                onActiveIndexChanged={(index) => setStep(index)}
                activeConfig={{
                  circleColor: PrimaryColor,
                  state: "enabled",
                  color: PrimaryColor,
                  icon: require("@/assets/images/check_circle.png"),
                }}
              >
                <Wizard.Step
                  circleColor={PrimaryColor}
                  circleSize={20}
                  state={
                    step > 0 ? Wizard.States.COMPLETED : Wizard.States.ENABLED
                  }
                  icon={require("@/assets/images/check_circle.png")}
                />
                <Wizard.Step
                  circleColor={PrimaryColor}
                  circleSize={20}
                  state={
                    step > 1
                      ? Wizard.States.COMPLETED
                      : step === 1
                      ? Wizard.States.ENABLED
                      : Wizard.States.DISABLED
                  }
                  icon={require("@/assets/images/check_circle.png")}
                />
                <Wizard.Step
                  circleColor={PrimaryColor}
                  circleSize={20}
                  state={
                    step > 2
                      ? Wizard.States.COMPLETED
                      : step === 2
                      ? Wizard.States.ENABLED
                      : Wizard.States.DISABLED
                  }
                  icon={require("@/assets/images/check_circle.png")}
                />
                <Wizard.Step
                  circleColor={PrimaryColor}
                  circleSize={20}
                  state={
                    step > 3
                      ? Wizard.States.COMPLETED
                      : step === 3
                      ? Wizard.States.ENABLED
                      : Wizard.States.DISABLED
                  }
                  icon={require("@/assets/images/check_circle.png")}
                />
                <Wizard.Step
                  circleColor={PrimaryColor}
                  circleSize={20}
                  state={
                    step === 4 ? Wizard.States.ENABLED : Wizard.States.DISABLED
                  }
                  icon={require("@/assets/images/check_circle.png")}
                />
              </Wizard>
            </View>
          );
        }}
      >
        <ScrollView keyboardShouldPersistTaps="always" style={tw`px-4`}>
          {step === 0 && (
            <CarType
              setBookingInfo={setBookingInfo}
              bookingInfo={bookingInfo as any}
            />
          )}
          {step === 1 && (
            <SecondStep
              setBookingInfo={setBookingInfo}
              bookingInfo={bookingInfo as any}
            />
          )}
          {step === 2 && (
            <ThreeStep
              setBookingInfo={setBookingInfo}
              bookingInfo={bookingInfo as any}
            />
          )}
          {step === 3 && (
            <FourthStep
              setBookingInfo={setBookingInfo}
              bookingInfo={bookingInfo as any}
            />
          )}
          {step === 4 && (
            <Fifth
              setBookingInfo={setBookingInfo}
              bookingInfo={bookingInfo as any}
            />
          )}
        </ScrollView>
        <View style={tw`flex-row flex-1 py-6 px-4 items-end gap-2 mt-10`}>
          <TButton
            onPress={() => {
              if (step > 0) {
                setStep(step - 1);
              } else {
                setModalVisible(false);
              }
            }}
            title={step > 0 ? "Previous" : "Cancel"}
            containerStyle={tw`bg-transparent border rounded-lg border-primary flex-1`}
            titleStyle={tw`text-primary`}
          />
          <TButton
            disabled={
              (step == 1 &&
                (!bookingInfo?.car_brand || !bookingInfo?.car_model)) ||
              (step == 3 &&
                (!bookingInfo?.booking_time || !bookingInfo?.booking_time)) ||
              (step == 4 && !bookingInfo?.booking_note)
                ? true
                : false
            }
            onPress={() => {
              if (step < 4) {
                setStep(step + 1);
              } else {
                router?.push("/paymentSystem");
                setModalVisible(false);
              }
            }}
            title={step < 4 ? "Next" : "Checkout"}
            containerStyle={tw`flex-1 rounded-lg`}
          />
        </View>
      </Dialog>
    </View>
  );
};

export default Home;
