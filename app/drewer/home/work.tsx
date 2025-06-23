import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import tw from "@/lib/tailwind";
import React from "react";
import { useGetPhotosQuery } from "@/redux/apiSlices/homeApiSlices";

const work = (): JSX.Element => {
  const { data: photoData } = useGetPhotosQuery({});

  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity>
        <View style={tw`mb-4 mr-4`}>
          <Image
            style={tw`w-44 h-44 rounded-3xl`}
            source={{ uri: item?.photo }}
            contentFit="contain"
          />
        </View>
      </TouchableOpacity>
    );
  };

  // console.log(renderItem);

  return (
    <View style={tw`flex-1`}>
      <View style={tw`p-4 bg-[#F6F6F6]`}>
        <Text style={tw`font-DegularDisplayBold text-2xl`}>
          Quick access for get service
        </Text>

        <FlatList
          data={photoData?.data?.data}
          renderItem={renderItem}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`mt-4 pb-30`}
        />
      </View>
    </View>
  );
};

export default work;
