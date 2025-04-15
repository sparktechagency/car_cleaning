import {
  View,
  Text,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import tw from "@/lib/tailwind";
import { useNavigation, useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";
import { IconBackArrow } from "@/assets/icon/icon";

const notification = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const notification = [
    {
      id: 1,
      n_name: "Your car is ready for drive.",
      status: "Order completed",
      date: new Date(Date.now()),
      in_view: "clicked",
    },
    {
      id: 1,
      n_name: "Your car is ready for drive.",
      status: "Order completed",
      date: new Date(Date.now()),
      in_view: "clicked",
    },
    {
      id: 1,
      n_name: "LWR accept your order.",
      status: "Booking successful",
      date: new Date(Date.now()),
      in_view: "",
    },
    {
      id: 1,
      n_name: "Your car is ready for drive.",
      status: "Order completed",
      date: new Date(Date.now()),
      in_view: "clicked",
    },
    {
      id: 1,
      n_name: "LWR accept your order.",
      status: "Booking successful",
      date: new Date(Date.now()),
      in_view: "",
    },
    {
      id: 1,
      n_name: "Your car is ready for drive.",
      status: "Order completed",
      date: new Date(Date.now()),
      in_view: "",
    },
  ];

  const date = new Date(Date.now());
  console.log(date.toLocaleDateString(), "time now");
  return (
    <View style={tw`px-6`}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={tw`flex-row items-center mt-5 gap-2`}
      >
        <SvgXml xml={IconBackArrow} />
        <Text style={tw`text-[#262626] font-DegularDisplayBold text-2xl`}>
          Notification
        </Text>
      </Pressable>

      {/*  */}

      <ScrollView>
        {notification.map((item) => (
          <TouchableOpacity
            onPress={() => {
              if (item.status === "Order completed") {
                router.push("/(notification)/notificationReview");
              } else if (item.status === "Booking successful") {
                router.push("/(notification)/notificationDetails");
              }
            }}
            key={item?.id}
          >
            <View
              style={[
                tw`flex-row justify-between px-4 py-2 my-2 mt-4 rounded-lg`,
                item?.in_view === "clicked"
                  ? tw`bg-[#FFFFFF]`
                  : tw`bg-[#E7E7E7]`,
              ]}
            >
              <View>
                <Text
                  style={tw`font-DegularDisplayMedium text-base text-[#262626]`}
                >
                  {item?.n_name}
                </Text>
                <Text
                  style={[
                    tw`font-DegularDisplaySemibold text-xs mt-4`,
                    item?.status === "Order completed" && tw`text-[#319F43]`,
                    item?.status === "Booking successful" && tw`text-[#0063E5]`,
                  ]}
                >
                  {item?.status}
                </Text>
              </View>
              <View>
                <View style={tw`flex-row justify-center items-center gap-2`}>
                  <Text
                    style={tw`font-DegularDisplayMedium text-base text-[#262626] `}
                  >
                    {item?.date.toLocaleTimeString()}
                  </Text>
                  {item.in_view === "clicked" || (
                    <Text style={tw`w-2 h-2 rounded-full bg-red-700`}></Text>
                  )}
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
      </ScrollView>
    </View>
  );
};

export default notification;
