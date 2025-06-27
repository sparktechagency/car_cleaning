import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import tw from "@/lib/tailwind";
import React from "react";
import { useGetPhotosQuery } from "@/redux/apiSlices/homeApiSlices";
import { _HEIGHT, _WIDTH, PrimaryColor } from "@/utils/utils";

const work = (): JSX.Element => {
  const { data: photoData } = useGetPhotosQuery({});

  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity disabled style={tw`shadow-sm `}>
        <View style={tw` `}>
          <Image
            key={item?.id}
            style={[
              tw` rounded-lg`,
              {
                width: _WIDTH / 2 - _WIDTH * 0.04,
                height: _HEIGHT * 0.124,
              },
            ]}
            source={{ uri: item?.photo }}
            contentFit="fill"
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={tw`flex-1`}>
      <View style={tw`px-4 py-2`}>
        <Text style={tw`font-DegularDisplayBold text-2xl`}>Photo gallery</Text>
      </View>

      <FlatList
        data={photoData?.data?.data}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={tw`gap-3 justify-center`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`mt-4 gap-3 pb-30`}
      />
    </View>
  );
};

export default work;
