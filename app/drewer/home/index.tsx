import { IconHi, IconMenu, IconNotification } from "@/assets/icon/icon";
import { useNavigation, useRouter } from "expo-router";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Dialog, PanningProvider } from "react-native-ui-lib";

import tw from "@/lib/tailwind";
import React, { useState } from "react";
import { SvgXml } from "react-native-svg";

import {
  useGetPhotosQuery,
  useGetServicesQuery,
} from "@/redux/apiSlices/homeApiSlices";
import { useGetProfileQuery } from "@/redux/apiSlices/authSlices";

const Home = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [modalVisible, setModalVisible] = React.useState(false);

  // ============================ services data =-======================================================================

  const { data, isLoading, isError, isSuccess } = useGetServicesQuery({});
  const { data: photoData } = useGetPhotosQuery({});
  const { data: userInfo } = useGetProfileQuery({});

  const renderItem = ({ item }: { item: any }): JSX.Element => {
    return (
      <TouchableOpacity onPress={() => handleServiceDetails(item)}>
        <View
          style={tw`w-28 h-28 m-2 flex-col justify-center items-center text-center rounded-2xl bg-white`}
        >
          <View style={tw`p-4 rounded-full items-center mb-1 bg-[#0063E51A]`}>
            <Image
              width={32}
              height={30}
              resizeMode="contain"
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

  const workRenderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity>
        <View style={tw`mb-4 mr-2`}>
          <Image
            key={item?.id}
            style={tw`w-[45%] h-32 rounded-2xl`}
            source={{ uri: item?.photo }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const handleServiceDetails = (item: any) => {
    router.push({
      pathname: "/(order)/calendersDate",
      params: { id: item?.id },
    });
  };

  return (
    <View style={tw`flex-1 px-6 `}>
      {/* header parts  */}
      <View style={tw`py-4 flex-row items-center justify-between `}>
        <View style={tw`flex-row justify-start items-center  gap-4`}>
          <TouchableOpacity
            onPress={() => {
              (navigation as any)?.openDrawer();
            }}
            style={tw` items-center justify-center `}
          >
            <SvgXml xml={IconMenu} />
          </TouchableOpacity>
          <View>
            <View style={tw`flex-row items-start gap-2`}>
              <Text
                style={tw`font-DegularDisplayBold flex-row items-center text-black text-2xl`}
              >
                Hi {userInfo?.data?.name},
              </Text>
              <SvgXml xml={IconHi} />
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.push("/(notification)/notification")}
          style={tw`w-12 h-12 p-3 items-center text-center text-white bg-primary rounded-full`}
        >
          <SvgXml xml={IconNotification} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-20`}
      >
        {/* ========== Banner section =========== */}
        <View>
          <View style={tw`relative w-full items-center min-h-72 mt-8`}>
            <View style={tw`top-10`}>
              <Image
                source={require("../../../assets/images/banner-bg.png")}
                style={tw`h-56 w-full rounded-3xl`}
              />
            </View>

            <View style={tw`absolute z-50`}>
              <Image
                style={tw` h-40 mx-auto mb-1`}
                source={require("../../../assets/images/car-white.png")}
              />
              <View style={tw`mx-auto w-full text-center items-center`}>
                <Text style={tw`font-DegularDisplayBold text-2xl`}>
                  Keep your <Text style={tw`text-primary`}> car clean</Text>{" "}
                  always
                </Text>
                <Text
                  style={tw`text-sm items-center text-center font-DegularDisplayMedium mb-4`}
                >
                  Car wash is a brand which is latterly going to change the
                  people think about car cleaning.
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <View
                    style={tw`bg-primary w-28 h-11 rounded-full mx-auto justify-center items-center`}
                  >
                    <Text
                      style={tw`text-sm font-DegularDisplayBold text-white`}
                    >
                      Book now!
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* ======== service category section ============= */}
        <View>
          <View style={tw`mt-6 `}>
            <Text style={tw`font-DegularDisplayBold text-2xl`}>
              Quick access for get service
            </Text>
            <View style={tw``}>
              <FlatList
                data={data?.data}
                renderItem={renderItem}
                numColumns={3}
                scrollEnabled={false}
                keyExtractor={(item) => item?.id.toLocaleString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={tw`flex  items-center bg-transparent `}
              />
            </View>
          </View>
        </View>

        {/* ========= work section with home page  ====== */}

        <View>
          <Text style={tw`font-DegularDisplayBold text-2xl`}>
            Photo gallery
          </Text>

          <FlatList
            scrollEnabled={false}
            data={photoData?.data?.data}
            renderItem={workRenderItem}
            numColumns={2}
            contentContainerStyle={tw`mt-4`}
          />
        </View>
      </ScrollView>

      {/* ============= booking modal ====================== */}
      <Dialog
        width={"100%"}
        height={"60%"}
        containerStyle={tw`flex-1 bg-gray-50 rounded-t-3xl `}
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        panDirection={PanningProvider.Directions.DOWN}
        bottom={true}
        renderPannableHeader={() => {
          return (
            <View
              style={tw`bg-[#F6F6F6] z-50 flex-1 items-center  py-4  rounded-l-3xl rounded-r-3xl rounded-b-none`}
            >
              <View style={tw`w-12 h-0.5 rounded-full bg-gray-800`} />
            </View>
          );
        }}
      >
        <ScrollView keyboardShouldPersistTaps="always" style={tw`px-4`}>
          <View
            style={tw`flex-row flex-wrap justify-start items-center gap-4 `}
          >
            <Text style={tw`font-DegularDisplaySemibold text-xl mt-2`}>
              Which type of vehicle you want to wash?
            </Text>
            {data?.data?.length === 0 ? (
              <Text style={tw`font-bold text-xl text-center`}>
                No Date Available..!
              </Text>
            ) : (
              data?.data?.map((item) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                      handleServiceDetails(item);
                    }}
                    activeOpacity={0.7}
                    key={item?.id}
                    style={tw`w-[30%] h-32  rounded-2xl 
            bg-white
             items-center text-center  justify-center shadow-sm `}
                  >
                    <View style={tw`p-4 rounded-full mb-1 bg-[#0063E51A]`}>
                      <Image
                        width={32}
                        height={30}
                        resizeMode="contain"
                        source={{ uri: item?.icon }}
                      />
                    </View>
                    <Text
                      numberOfLines={1}
                      style={tw`font-DegularDisplaySemibold text-base  text-[#262626]
               `}
                    >
                      {item?.car_type}
                    </Text>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        </ScrollView>
      </Dialog>
    </View>
  );
};

export default Home;
