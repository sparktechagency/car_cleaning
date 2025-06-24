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
import {
  useGetNotificationQuery,
  useMarkNotificationMutation,
} from "@/redux/apiSlices/notificatinApiSlices";

const notification = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const { data, isLoading, refetch } = useGetNotificationQuery({});
  const [readNotification] = useMarkNotificationMutation();

  const handleMark = async (id) => {
    try {
      await readNotification(id).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={tw`flex-1 px-6`}>
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

      {isLoading ? (
        <View style={tw`my-4 flex justify-center items-center`}>
          <Text style={tw`font-semibold text-black text-lg`}>
            Loading .........!
          </Text>
        </View>
      ) : (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {data?.data.map((item) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  handleMark(item?.id);
                  if (item?.data?.type === "Order Completed") {
                    router.push({
                      pathname: "/(notification)/notificationReview",
                      params: {
                        service_id: item?.data?.service_id,
                      },
                    });
                  } else if (item?.data?.type === "Booking successful") {
                    router.push("/(notification)/notificationDetails");
                  }
                }}
                key={item?.id}
              >
                <View
                  style={[
                    tw`flex-row justify-between px-4 py-2 my-2 mt-4 rounded-lg`,
                    item?.read_at ? tw`bg-[#FFFFFF]` : tw`bg-[#E7E7E7]`,
                  ]}
                >
                  <View>
                    <Text
                      style={tw`font-DegularDisplayMedium text-base text-[#262626]`}
                    >
                      {item?.data?.title}
                      name
                    </Text>
                    <Text
                      style={[
                        tw`font-DegularDisplaySemibold text-xs mt-4`,
                        item?.data?.type === "Order Completed" &&
                          tw`text-[#319F43]`,
                        item?.data?.type === "Booking successful" &&
                          tw`text-[#0063E5]`,
                      ]}
                    >
                      {item?.data?.type}
                    </Text>
                  </View>
                  <View>
                    <View
                      style={tw`flex-row justify-center items-center gap-2`}
                    >
                      <Text
                        style={tw`font-DegularDisplayMedium text-base text-[#262626] `}
                      >
                        {new Date(item?.created_at).toLocaleTimeString()}
                      </Text>
                      {item?.read_at ? (
                        false
                      ) : (
                        <Text
                          style={tw`w-2 h-2 rounded-full bg-red-700`}
                        ></Text>
                      )}
                    </View>
                    <Text
                      style={tw`font-DegularDisplayRegular text-xs text-[#262626] mt-4`}
                    >
                      {new Date(item?.created_at).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default notification;
