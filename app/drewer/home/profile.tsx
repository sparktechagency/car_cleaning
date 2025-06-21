import {
  IconAdd,
  IconCameraProfile,
  IconCar,
  IconEdit,
} from "@/assets/icon/icon";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { SvgXml } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetProfileQuery } from "@/redux/apiSlices/authSlices";

const profile = () => {
  const router = useRouter();
  const [isToken, setIsToken] = useState("");

  const { data, isLoading, isError } = useGetProfileQuery(isToken);
  //  = service history data =======================
  const serviceHistoryData = [
    {
      id: 1,
      car_name: "BMW X1 SUV",
      price: 4523.0,
      date: new Date(Date.now()),
    },
    {
      id: 2,
      car_name: "BMW X1 SUV",
      price: 4523.0,
      date: new Date(Date.now()),
    },
    {
      id: 3,
      car_name: "BMW X1 SUV",
      price: 4523.0,
      date: new Date(Date.now()),
    },
    {
      id: 4,
      car_name: "BMW X1 SUV",
      price: 4523.0,
      date: new Date(Date.now()),
    },
    {
      id: 5,
      car_name: "BMW X1 SUV",
      price: 4523.0,
      date: new Date(Date.now()),
    },
    {
      id: 6,
      car_name: "BMW X1 SUV",
      price: 4523.0,
      date: new Date(Date.now()),
    },
  ];

  const handleUserInfo = async () => {
    const token = await AsyncStorage.getItem("token");
    setIsToken(token);
  };

  useEffect(() => {
    handleUserInfo();
  }, []);

  return (
    <View style={tw`flex-1 `}>
      <View style={tw`flex-row px-6 justify-between items-center my-6`}>
        <Text style={tw`font-DegularDisplayBold text-2xl`}>My Profile</Text>
        <TouchableOpacity onPress={() => router.push("/editProfile")}>
          <View
            style={tw`bg-primary w-28 h-8 rounded-full mx-auto flex-row justify-center items-center gap-2 `}
          >
            <SvgXml xml={IconEdit} />
            <Text style={tw`text-sm font-DegularDisplayBold text-white`}>
              Edit profile
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-2 px-6`}
      >
        <View style={tw`w-full   items-center`}>
          <View style={tw`relative`}>
            <Image
              source={{
                uri: data?.data?.photo,
              }}
              style={{ width: 124, height: 124, borderRadius: 100 }}
              resizeMode="contain"
            />
            <TouchableOpacity
              onPress={() => router.push("/editProfile")}
              style={tw`absolute p-2 rounded-full bg-primary bottom-0 right-0`}
            >
              <SvgXml xml={IconCameraProfile} />
            </TouchableOpacity>
          </View>
          <Text
            style={tw`font-DegularDisplayBold text-base text-[#262626] my-2`}
          >
            {data?.data?.name}
          </Text>
          <Text style={tw`font-DegularDisplayMedium text-xs text-[#6D6D6D]`}>
            {data?.data?.email}
          </Text>
        </View>

        {/* ========= car details ==================== */}

        <View style={tw` mb-6`}>
          <Text
            style={tw`font-DegularDisplaySemibold text-xl text-regularText mb-4`}
          >
            Car Details
          </Text>
          {data?.data?.car_model ? (
            <View style={tw`flex-row gap-2 mb-2`}>
              <SvgXml xml={IconCar} />
              <Text
                style={tw`font-DegularDisplayMedium text-base text-regularText`}
              >
                {data?.data?.car_model}
              </Text>
            </View>
          ) : null}

          <View style={tw`flex-row flex-wrap justify-between`}>
            {data?.data?.car_photos?.length === 0 ? (
              <View>
                <Text style={tw`font-bold text-xl text-center`}>
                  No Car Available..!
                </Text>
                <TouchableOpacity
                  style={tw`border border-black rounded-xl flex justify-center items-center w-[30%] h-16 `}
                >
                  <SvgXml xml={IconAdd} />
                </TouchableOpacity>
              </View>
            ) : (
              data?.data?.car_photos.map((item) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={tw`w-[30%] h-16 my-2 justify-center items-center text-center`}
                  >
                    <Image
                      style={tw`w-full h-full rounded-lg`}
                      source={item?.photo}
                    />
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        </View>

        {/* ========== service history ============== */}

        <View style={tw`mb-40`}>
          <Text
            style={tw`font-DegularDisplaySemibold text-xl text-regularText mb-4`}
          >
            Service history
          </Text>
          <View>
            {serviceHistoryData.map((item) => (
              <TouchableOpacity key={item?.id}>
                <View
                  style={tw`flex-row justify-between px-4 py-2 my-2 rounded-lg bg-[#FFFFFF]`}
                >
                  <View>
                    <Text
                      style={tw`font-DegularDisplayMedium text-base text-regularText`}
                    >
                      {item?.car_name}
                    </Text>
                    <Text style={tw` text-xs mt-4 `}>
                      Interior:{" "}
                      <Text
                        style={tw`text-[#0063E5] font-DegularDisplaySemibold`}
                      >
                        ${item?.price}
                      </Text>
                    </Text>
                  </View>
                  <View>
                    <View
                      style={tw`flex-row justify-center items-center gap-2`}
                    >
                      <Text
                        style={tw`font-DegularDisplayMedium text-base text-[#262626] `}
                      >
                        {item?.date.toLocaleTimeString()}
                      </Text>
                    </View>
                    <Text
                      style={tw`font-DegularDisplayRegular text-xs text-[#262626] mt-4`}
                    >
                      {item?.date.toDateString()}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default profile;
