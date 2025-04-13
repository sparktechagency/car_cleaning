import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import React from "react";
import image1 from "../../../assets/images/work/image1.png";
import image2 from "../../../assets/images/work/image2.png";
import image3 from "../../../assets/images/work/image3.png";
import image4 from "../../../assets/images/work/image4.png";
import image5 from "../../../assets/images/work/image5.png";
import image6 from "../../../assets/images/work/image6.png";
import tw from "@/lib/tailwind";

const work = (): JSX.Element => {
  const work = [
    {
      id: 1,
      image: image1,
    },
    {
      id: 2,
      image: image2,
    },
    {
      id: 3,
      image: image3,
    },
    {
      id: 4,
      image: image4,
    },
    {
      id: 5,
      image: image5,
    },
    {
      id: 6,
      image: image6,
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <View style={tw`mb-4 mr-4`}>
          <Image style={tw`w-44 h-44 rounded-3xl`} source={item.image} />
        </View>
      </TouchableOpacity>
    );
  };

  // console.log(renderItem);

  return (
    <>
      <ScrollView contentContainerStyle={tw`pb-16`}>
        <View style={tw`p-4 bg-[#F6F6F6]`}>
          <Text style={tw`font-DegularDisplayBold text-2xl`}>
            Quick access for get service
          </Text>

          <FlatList
            data={work}
            renderItem={renderItem}
            numColumns={2}
            keyExtractor={(item) => item.id}
            contentContainerStyle={tw`mt-4`}
          />
          <FlatList
            data={work}
            renderItem={renderItem}
            numColumns={2}
            keyExtractor={(item) => item.id}
            contentContainerStyle={tw`mt-4`}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default work;
