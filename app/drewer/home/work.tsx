import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import tw from "@/lib/tailwind";
import { useGetPhotosQuery } from "@/redux/apiSlices/homeApiSlices";
import { _HEIGHT } from "@/utils/utils";
import React from "react";

const work = (): JSX.Element => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const itemWidth = isTablet
    ? width / 3 - width * 0.04
    : width / 2 - width * 0.75;
  const { data: photoData, isLoading, refetch } = useGetPhotosQuery({});

  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity disabled style={tw`shadow-sm `}>
        <View style={tw` `}>
          <Image
            key={item?.id}
            style={[
              tw` rounded-lg`,
              {
                width: itemWidth,
                height: _HEIGHT * 0.124,
              },
            ]}
            source={{ uri: item?.photo }}
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={tw`flex-1 w-full bg-primaryBase`}>
      <View style={tw`px-4 py-2`}>
        <Text style={tw`font-DegularDisplayBold text-2xl`}>Photo gallery</Text>
      </View>

      <FlatList
        refreshControl={
          <RefreshControl
            colors={["#0063E5"]}
            refreshing={isLoading}
            onRefresh={refetch}
          />
        }
        data={photoData?.data?.data}
        renderItem={renderItem}
        numColumns={isTablet ? 3 : 2}
        key={isTablet ? "tablet" : "phone"}
        columnWrapperStyle={tw`gap-3 justify-center`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`mt-4 gap-3 pb-30`}
      />
    </View>
  );
};

export default work;
