import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  useGetNotificationQuery,
  useMarkNotificationMutation,
} from "@/redux/apiSlices/notificatinApiSlices";
import { useNavigation, useRouter } from "expo-router";

import { IconBackArrow } from "@/assets/icon/icon";
import { PrimaryColor } from "@/utils/utils";
import React from "react";
import { SvgXml } from "react-native-svg";
import moment from "moment";
import tw from "@/lib/tailwind";

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
    <View style={tw`flex-1 px-6 bg-primaryBase`}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={tw`flex-row items-center mt-5 gap-2`}
      >
        <SvgXml xml={IconBackArrow} />
        <Text style={tw`text-[#262626] font-DegularDisplayBold text-2xl`}>
          Notifications
        </Text>
      </TouchableOpacity>

      {isLoading ? (
        <View style={tw`my-4 flex justify-center items-center`}>
          <ActivityIndicator
            size="large"
            color={PrimaryColor}
            style={tw`my-6 `}
          />
        </View>
      ) : (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {data?.data?.length === 0 ? (
            <Text
              style={tw`font-semibold text-xl text-gray-700 flex-1 justify-center items-center text-center mt-6`}
            >
              No notifications.
            </Text>
          ) : (
            data?.data.map((item) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    handleMark(item?.id);
                    if (item?.data?.type === "Order Completed") {
                      router.push({
                        pathname: "/notification/notificationReview",
                        params: {
                          service_id: item?.data?.service_id,
                        },
                      });
                    } else if (item?.data?.type === "Booking successful") {
                      router.push({
                        pathname: "/notification/notificationDetails",
                        params: { booking_id: item?.data?.booking_id },
                      });
                    }
                  }}
                  key={item?.id}
                >
                  <View
                    style={[
                      tw`flex-row justify-between px-4 py-2 my-1 mt-3 rounded-lg`,
                      item?.read_at ? tw`bg-[#FFFFFF]` : tw`bg-[#E7E7E7]`,
                    ]}
                  >
                    <View style={tw`flex-1`}>
                      <Text
                        style={tw`font-DegularDisplayMedium text-base flex-1 text-[#262626]`}
                      >
                        {item?.data?.title}
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
                        {moment(item?.created_at).format("MMMM D, YYYY")}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default notification;
