import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
} from "react-native";
import React from "react";
import { SvgXml } from "react-native-svg";
import tw from "@/lib/tailwind";
import {
  IconCompact,
  IconHi,
  IconLocation,
  IconMenu,
  IconNotification,
  IconSubCar,
  IconTrack,
} from "@/assets/icon/icon";
import { useNavigation } from "expo-router";
import Services from "./services";

const Home = () => {
  const navigation = useNavigation();

  const servicesItem = [
    {
      title: "Truck",
      icon: IconTrack,
    },
    {
      title: "Compact",
      icon: IconCompact,
    },
    {
      title: "Suv car",
      icon: IconSubCar,
    },
  ];

  const renderItem = ({ item }): JSX.Element => (
    <TouchableOpacity>
      <View
        style={tw`w-28 h-28 m-2 flex-col justify-center items-center text-center rounded-2xl bg-white`}
      >
        <View style={tw`p-4 rounded-full items-center mb-1 bg-[#0063E51A]`}>
          <SvgXml xml={item.icon} />
        </View>
        <Text style={tw`font-DegularDisplaySemibold text-base text-[#262626]`}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={tw`px-6 bg-[#F6F6F6]`}>
      {/* header parts  */}
      <View style={tw`py-4 flex-row items-center justify-between mb-11`}>
        <View style={tw`flex-row items-center gap-4`}>
          <TouchableOpacity
            onPress={() => {
              (navigation as any)?.openDrawer();
            }}
            style={tw`mb-4`}
          >
            <SvgXml xml={IconMenu} />
          </TouchableOpacity>
          <View>
            <View style={tw`flex-row items-start gap-2`}>
              <Text
                style={tw`font-DegularDisplayBold flex-row items-center text-black text-2xl`}
              >
                Hi Richard,
              </Text>
              <SvgXml xml={IconHi} />
            </View>
            <View
              style={tw`font-NunitoSansBold flex-row items-center gap-1 text-black text-base`}
            >
              <SvgXml xml={IconLocation} />
              <Text>31/2 Los Angles, USA</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={tw`w-12 h-12 p-3 items-center text-center text-white bg-primary rounded-full`}
        >
          <SvgXml xml={IconNotification} />
        </TouchableOpacity>
      </View>

      {/* ========== Banner section =========== */}
      <View>
        <ImageBackground
          source={require("../../../assets/images/banner-bg.png")}
          resizeMethod="cover"
          style={tw`h-56 rounded-full`}
        >
          <Image
            style={tw`w-[220px] h-40 mx-auto mb-1`}
            source={require("../../../assets/images/car-white.png")}
          />
          <View style={tw`mx-auto items-center`}>
            <Text style={tw`font-DegularDisplayBold text-2xl`}>
              Keep your <Text style={tw`text-primary`}> car clean</Text> always
            </Text>
            <Text
              style={tw`text-sm  text-center font-DegularDisplayMedium mb-4`}
            >
              Car wash is a brand which is latterly going to change the people
              think about car cleaning.
            </Text>
            <TouchableOpacity>
              <View
                style={tw`bg-primary w-28 h-11 rounded-full mx-auto justify-center items-center`}
              >
                <Text style={tw`text-sm font-DegularDisplayBold text-white`}>
                  Book now!
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      {/* ======== service category section ============= */}
      <View>
        <View style={tw`mt-6 bg-[#F6F6F6]`}>
          <Text style={tw`font-DegularDisplayBold text-2xl`}>
            Quick access for get service
          </Text>
          <View style={tw``}>
            <FlatList
              data={servicesItem}
              renderItem={renderItem}
              numColumns={3}
              keyExtractor={(item) => item.title}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={tw`flex  items-center`}
            />
          </View>
        </View>
      </View>

      {/*  */}
    </View>
  );
};

export default Home;
