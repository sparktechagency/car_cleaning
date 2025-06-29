import {
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
  Image,
} from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import tw from "@/lib/tailwind";
import { _HEIGHT, _WIDTH } from "@/utils/utils";
import { useGetPhotosQuery } from "@/redux/apiSlices/homeApiSlices";
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
    <FlashList
      refreshControl={<RefreshControl refreshing={isLoading} />}
      data={photoData?.data?.data}
      renderItem={workRenderItem}
      numColumns={2}
      estimatedItemSize={400}
      centerContent={true}
      // columnWrapperStyle={tw`justify-between px-4`}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={tw` pb-30 `}
    />
  );
};

export default PhotosComponents;
