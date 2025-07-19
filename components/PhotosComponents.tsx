import { _HEIGHT, _WIDTH } from "@/utils/utils";
import {
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  View,
} from "react-native";

import tw from "@/lib/tailwind";
import { useGetPhotosQuery } from "@/redux/apiSlices/homeApiSlices";
import React from "react";
const PhotosComponents = () => {
  const { data: photoData, isLoading } = useGetPhotosQuery({});

  const workRenderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity style={tw`m-1.5`}>
        <View style={tw``}>
          <Image
            // contentFit="scale-down"
            resizeMethod="resize"
            resizeMode="cover"
            key={item?.id}
            style={[
              tw` rounded-lg `,

              {
                width: _WIDTH / 2 - _WIDTH * 0.075,
                height: _HEIGHT * 0.124,
              },
            ]}
            source={{ uri: item?.photo }}
          />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      refreshControl={<RefreshControl refreshing={isLoading} />}
      data={photoData?.data?.data}
      renderItem={workRenderItem}
      numColumns={2}
      centerContent={true}
      // columnWrapperStyle={tw`justify-between px-4`}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={tw` pb-30 `}
    />
  );
};

export default PhotosComponents;
