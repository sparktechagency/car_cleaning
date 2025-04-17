import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import tw from "@/lib/tailwind";
import { SvgXml } from "react-native-svg";
import { IconCameraProfile, IconCar, IconEdit } from "@/assets/icon/icon";

import { FlatList } from "react-native-gesture-handler";
import { Car1, Car2, Car3, Car4, Car5, Car6 } from "@/assets/images/images";
import { useRouter } from "expo-router";

const profile = () => {
  const router = useRouter();
  const carImage = [
    {
      id: 1,
      image: Car1,
    },
    {
      id: 2,
      image: Car2,
    },
    {
      id: 3,
      image: Car3,
    },
    {
      id: 4,
      image: Car4,
    },
    {
      id: 5,
      image: Car5,
    },
    {
      id: 6,
      image: Car6,
    },
  ];

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

  return (
    <View style={tw`px-6`}>
      <View style={tw`flex-row justify-between items-center my-6`}>
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

      <ScrollView>
        <View style={tw`w-full mx-auto  items-center`}>
          <View style={tw`relative`}>
            <Image
              source={{
                uri: "https://s3-alpha-sig.figma.com/img/fbb8/532e/d272017fa267924482614c10a5ce37ab?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=MoRpVAEIp7K7XrD7zI19RIrRR3e95w5cqz1wOo1rwIxN2g1NXX6tCFG30bMo0yky6gnbdKkIW2b3wOYyxsR8QKlRMLiYbNls47p-Yz8JeqcKSJa1Z1z~RPUloELQK0fPYnIxFAILmQgOWH7JHsmeLojjwWhg6E7ieOu44RnWC0wma2pdwe9YLz0x9LGqpWixZiQuP6qAsrSmU6icAYiMFp-pVQ4bUQ6wPTP~NfeYahPbBJGGVRW54JagtRbD1lLtmkqZkC~XXogyb6wjHFhiKqMaukUN9esjMZq0Nxpoqyv7k1WzAs0hcwqaWcYFHSrCbrMFAyuzHNetCIacyxe3OA__",
              }}
              style={{ width: 124, height: 124, borderRadius: 100 }}
            />
            <TouchableOpacity
              style={tw`absolute p-2 rounded-full bg-primary bottom-0 right-0`}
            >
              <SvgXml xml={IconCameraProfile} />
            </TouchableOpacity>
          </View>
          <Text
            style={tw`font-DegularDisplayBold text-base text-[#262626] my-2`}
          >
            Richard Williams
          </Text>
          <Text style={tw`font-DegularDisplayMedium text-xs text-[#6D6D6D]`}>
            richard235@gmail.com
          </Text>
        </View>

        {/* ========= car details ==================== */}

        <View style={tw` mb-6`}>
          <Text
            style={tw`font-DegularDisplaySemibold text-xl text-regularText mb-4`}
          >
            Car Details
          </Text>
          <View style={tw`flex-row gap-2 mb-2`}>
            <SvgXml xml={IconCar} />
            <Text
              style={tw`font-DegularDisplayMedium text-base text-regularText`}
            >
              BMW X2 Coupe Suv
            </Text>
          </View>
          <View style={tw`flex-row flex-wrap justify-between`}>
            {carImage.map((item) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  style={tw`w-[30%] h-16 my-2 justify-center items-center text-center`}
                >
                  <Image
                    style={tw`w-full h-full rounded-lg`}
                    source={item.image}
                  />
                </TouchableOpacity>
              );
            })}
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
