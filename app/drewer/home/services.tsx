import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { PrimaryColor } from "@/utils/utils";
import React from "react";
import tw from "@/lib/tailwind";
import { useGetServicesQuery } from "@/redux/apiSlices/homeApiSlices";
import { useRouter } from "expo-router";
import { useTokenCheckMutation } from "@/redux/apiSlices/authSlices";

const services = (): JSX.Element => {
  const router = useRouter();

  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const { data, isLoading, refetch } = useGetServicesQuery({});
  const [isToken] = useTokenCheckMutation();

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        // style={tw`w-1/3 `}
        onPress={() => {
          handlePathDecision(item);
        }}
      >
        <View
          style={tw`w-28 h-28 m-2 flex-col justify-center items-center text-center rounded-2xl bg-white`}
        >
          <View style={tw`p-2  rounded-full items-center mb-1 bg-[#0063E51A]`}>
            <Image
              key={item?.id}
              style={tw`w-12 h-12 rounded-full`}
              resizeMode="stretch"
              source={{ uri: item?.icon }}
            />
          </View>
          <Text
            numberOfLines={1}
            style={tw`font-DegularDisplaySemibold text-base text-[#262626]`}
          >
            {item?.car_type}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // ============================== services booking path name declaration ------------

  const handlePathDecision = async (item: any) => {
    try {
      const localToken = await AsyncStorage.getItem("token");

      if (localToken) {
        router.push({
          pathname: "/order/calendersDate",
          params: { id: item?.id },
        });
      } else {
        router.push("/login");
      }
    } catch (e) {
      console.error("Error in handlePathDecision:", e);
      router.push("/login");
    }
  };

  return (
    <View style={tw`flex-1 w-full p-4 bg-primaryBase`}>
      <Text style={tw`font-DegularDisplayBold text-2xl`}>
        Quick service access
      </Text>
      {isLoading ? (
        <ActivityIndicator size="large" color={PrimaryColor} style={tw`py-6`} />
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              colors={["#0063E5"]}
              refreshing={isLoading}
              onRefresh={refetch}
            />
          }
          data={data?.data}
          renderItem={renderItem}
          numColumns={isTablet ? 6 : 3}
          key={isTablet ? "tablet" : "phone"}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.title}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default services;
