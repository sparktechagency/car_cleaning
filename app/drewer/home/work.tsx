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
import { Modal } from "react-native-ui-lib";
import { SvgXml } from "react-native-svg";
import { IconCross } from "@/assets/icon/icon";

const work = (): JSX.Element => {
  const [workDetailsModalVisible, setWorkDetailsModalVisible] =
    React.useState(false);

  console.log(workDetailsModalVisible, "work modal");

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
    {
      id: 7,
      image: image1,
    },
    {
      id: 8,
      image: image2,
    },
    {
      id: 9,
      image: image3,
    },
    {
      id: 10,
      image: image4,
    },
    {
      id: 11,
      image: image5,
    },
    {
      id: 12,
      image: image6,
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => setWorkDetailsModalVisible(true)}>
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
        </View>
      </ScrollView>

      {/*  ------- modal section ------------------- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={workDetailsModalVisible}
        onRequestClose={() => setWorkDetailsModalVisible(false)}
      >
        <View
          style={tw`flex-1 bg-black bg-opacity-50 justify-center items-center`}
        >
          <View
            style={tw`w-7/8 bg-white p-6 rounded-2xl items-center shadow-lg`}
          >
            {/* Close Button */}
            <TouchableOpacity
              onPress={() => setWorkDetailsModalVisible(false)}
              style={tw` mb-3 rounded-lg  w-full flex-row justify-end text-end `}
            >
              <SvgXml xml={IconCross} />
            </TouchableOpacity>
            {/* Check Icon */}
            <Image
              style={tw`w-full h-32 rounded-2xl`}
              source={require("../../../assets/images/work/image1.png")}
            />

            {/* Success Message */}
            <View style={tw`w-full flex-row justify-between items-center mt-6`}>
              <Text style={tw`text-xl font-DegularDisplaySemibold `}>
                Interior & Exterior Cleaning
              </Text>
              <Text style={tw`text-xl font-DegularDisplayBold text-primary`}>
                $542.00
              </Text>
            </View>
            <Text
              style={tw`text-base text-[#6D6D6D] font-DegularDisplayMedium mt-2`}
            >
              Step into a realm of luxury and innovation with our expertly
              designed car interiors, where every detail is meticulously crafted
              to elevate your driving experience. Imagine plush seating that
              cradles you in comfort, seamlessly integrated technology that
              enhances convenience, and ambient lighting that sets the perfect
              mood for your journey. Our interiors are not just about
              aesthetics; they are designed with functionality in mind,
              featuring intuitive layouts and smart storage solutions that cater
              to your every need.
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default work;
