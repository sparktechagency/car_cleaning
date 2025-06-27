import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";
import React from "react";
import { SvgXml } from "react-native-svg";
import { useGetServicesQuery } from "@/redux/apiSlices/homeApiSlices";
import { PrimaryColor } from "@/utils/utils";
import { Image } from "expo-image";

const services = (): JSX.Element => {
  const router = useRouter();

  const { data, isLoading, isError, isSuccess } = useGetServicesQuery({});

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={tw`w-1/3 `}
        onPress={() => {
          handleServiceDetails(item);
        }}
      >
        <View
          style={tw`w-28 h-28 m-2 flex-col justify-center items-center text-center rounded-2xl bg-white`}
        >
          <View style={tw`p-4 rounded-full items-center mb-1 bg-[#0063E51A]`}>
            <Image
              key={item?.id}
              style={tw`w-10 h-10 rounded-full `}
              contentFit="fill"
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

  const handleServiceDetails = (item) => {
    router.push({
      pathname: "/(order)/calendersDate",
      params: { id: item?.id },
    });
  };

  return (
    <View style={tw`p-4 `}>
      <Text style={tw`font-DegularDisplayBold text-2xl`}>
        Quick access for get service
      </Text>
      {isLoading ? (
        <ActivityIndicator size="large" color={PrimaryColor} style={tw`py-6`} />
      ) : (
        <View style={tw``}>
          <FlatList
            data={data?.data}
            renderItem={renderItem}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.title}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

export default services;
