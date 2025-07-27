import { _HEIGHT, _WIDTH } from "@/utils/utils";
import {
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import tw from "@/lib/tailwind";
import { useGetPhotosQuery } from "@/redux/apiSlices/homeApiSlices";
import React from "react";
const PhotosComponents = () => {
  const { data: photoData, isLoading } = useGetPhotosQuery({});

  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const itemWidth = isTablet
    ? width / 3 - width * 0.04
    : width / 2 - width * 0.075;

  const workRenderItem = ({ item }: { item: any }) => {
    return (
      <View style={tw`flex-1 justify-center items-center m-1.5`}>
        <View style={tw``}>
          <Image
            // contentFit="scale-down"
            resizeMethod="resize"
            resizeMode="cover"
            key={item?.id}
            style={[
              tw` rounded-lg `,

              {
                width: itemWidth,
                height: _HEIGHT * 0.124,
              },
            ]}
            source={{ uri: item?.photo }}
          />
        </View>
      </View>
    );
  };
  return (
    <FlatList
      refreshControl={<RefreshControl refreshing={isLoading} />}
      data={photoData?.data?.data}
      renderItem={workRenderItem}
      numColumns={isTablet ? 3 : 2}
      key={isTablet ? "tablet" : "phone"}
      centerContent={true}
      // columnWrapperStyle={tw`justify-between px-4`}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={tw` pb-30 `}
    />
  );
};

export default PhotosComponents;
