import {
  IconBook,
  IconCross,
  IconHi,
  IconMenu,
  IconNotification,
} from "@/assets/icon/icon";
import { useNavigation, useRouter } from "expo-router";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import PhotosComponents from "@/components/PhotosComponents";
import tw from "@/lib/tailwind";
import {
  useGetProfileQuery,
  useTokenCheckMutation,
} from "@/redux/apiSlices/authSlices";
import { useGetServicesQuery } from "@/redux/apiSlices/homeApiSlices";
import { _HEIGHT } from "@/utils/utils";
import React, { useEffect } from "react";
import { SvgXml } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [currentToken, setCurrentToken] = React.useState(null);
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  // ============================ services data =-======================================================================

  const { data, isLoading, refetch } = useGetServicesQuery({});

  const { data: userInfo, refetch: userRefetch } = useGetProfileQuery({});

  const [isToken, { isLoading: isTokenLoading }] = useTokenCheckMutation();

  const renderItem = ({ item }: { item: any }): JSX.Element => {
    return (
      <TouchableOpacity onPress={() => handlePathDecision(item)}>
        <View
          style={tw`w-28 h-28 m-2 flex-col justify-center items-center text-center rounded-2xl bg-white`}
        >
          <View style={tw`p-2 rounded-full items-center mb-1 bg-[#0063E51A]`}>
            <Image
              key={item?.id}
              style={tw`w-12 h-12 rounded-full`}
              resizeMode="stretch"
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
  // ============================== services booking path name declaration ------------

  const handlePathDecision = async (item: any) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const checkToken = await isToken({ token }).unwrap();
      setCurrentToken(checkToken);
      if (checkToken) {
        router.push({
          pathname: "/order/calendersDate",
          params: { id: item?.id },
        });
      } else {
        router.push("/login");
      }
    } catch (e) {
      console.error("Error in handlePathDecision:", e);
      router.push("/login");
    }
  };
  useEffect(() => {
    userRefetch();
  }, [isToken]);

  return (
    <View style={tw`flex-1 w-full self-center bg-primaryBase px-4 `}>
      {/* header parts  */}
      <View style={tw`py-4 flex-row items-center justify-between `}>
        <View style={tw`flex-row justify-start items-center  `}>
          <TouchableOpacity
            onPress={() => {
              (navigation as any)?.openDrawer();
            }}
            style={tw`p-3 items-center justify-center `}
          >
            <SvgXml xml={IconMenu} />
          </TouchableOpacity>
          <View>
            <View style={tw`flex-row items-start gap-2`}>
              <Text
                style={tw`font-DegularDisplayBold flex-row items-center text-black text-xl`}
              >
                Hi {userInfo?.data?.name}.
              </Text>
              <SvgXml xml={IconHi} />
            </View>
          </View>
        </View>
        <View style={tw`flex-row gap-3`}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={tw`w-12 h-12 p-3 justify-center  items-center text-center bg-primary rounded-full`}
          >
            <SvgXml xml={IconBook} />
          </TouchableOpacity>

          {/* ----------- notification icon -------------- */}

          {currentToken && (
            <TouchableOpacity
              onPress={() => router.push("/notification/notification")}
              style={tw`w-12 h-12 p-3 items-center text-center text-white bg-primary rounded-full`}
            >
              <SvgXml xml={IconNotification} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl
            colors={["#0063E5"]}
            refreshing={isLoading}
            onRefresh={refetch}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw``}
      >
        {/* ========== Banner section =========== */}
        <View style={tw``}>
          <View style={tw`relative w-full items-center min-h-72 mt-8`}>
            <View style={tw`top-10`}>
              <Image
                source={require("../../../assets/images/banner-bg.png")}
                style={tw`h-56 w-full rounded-3xl`}
              />
            </View>

            <View style={tw`absolute z-50`}>
              <Image
                style={tw` h-40 w-full mx-auto mb-1`}
                resizeMode="contain"
                source={require("../../../assets/images/car-white.png")}
              />
              <View style={tw`mx-auto w-full text-center items-center`}>
                <Text style={tw`font-DegularDisplayBold text-2xl`}>
                  Keep your <Text style={tw`text-primary`}>car clean</Text>{" "}
                  anywhere
                </Text>
                <Text
                  style={tw`text-sm items-center text-center font-DegularDisplayMedium mb-4`}
                >
                  Mobile car detailing services in Lakewood Ranch
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <View
                    style={tw`bg-primary w-28 h-11 rounded-full mx-auto justify-center items-center`}
                  >
                    <Text
                      style={tw`text-sm font-DegularDisplayBold text-white`}
                    >
                      Book Now
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
              Quick service access
            </Text>
            <View style={tw``}>
              <FlatList
                data={data?.data}
                renderItem={renderItem}
                numColumns={isTablet ? 6 : 3}
                key={isTablet ? "tablet" : "phone"}
                scrollEnabled={false}
                keyExtractor={(item) => item?.id.toLocaleString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={tw` `}
              />
            </View>
          </View>
        </View>

        {/* ========= work section with home page  ====== */}

        <View>
          <Text style={tw`font-DegularDisplayBold text-2xl`}>
            Photo gallery
          </Text>
          <PhotosComponents />
        </View>
      </ScrollView>

      {/* ============= booking modal ====================== */}
      <Modal
        animationType="slide"
        transparent
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      >
        <Pressable
          onPress={() => {
            setModalVisible(false);
          }}
          style={[
            {
              height: _HEIGHT,
            },
            tw`justify-end items-end bg-black bg-opacity-15  `,
          ]}
        >
          <Pressable
            style={[
              {
                height: _HEIGHT * 0.55,
              },
              tw`bg-gray-50`,
            ]}
          >
            <ScrollView
              keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={tw`pb-10`}
            >
              <View style={tw` px-4`}>
                <View style={tw`flex-row justify-between items-center my-2 `}>
                  <Text> </Text>
                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={tw`w-8 h-8 rounded-full bg-slate-200 justify-center items-center`}
                  >
                    <SvgXml xml={IconCross} />
                  </TouchableOpacity>
                </View>
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
                    <View style={tw`w-full justify-center items-center `}>
                      <View
                        style={tw`w-full   flex-row flex-wrap justify-start items-center gap-3 px-3 pb-10`}
                      >
                        {data?.data?.map((item: any) => (
                          <TouchableOpacity
                            key={item?.id}
                            onPress={() => {
                              setModalVisible(false);
                              handlePathDecision(item);
                            }}
                            activeOpacity={0.7}
                            style={[
                              tw`h-32  bg-white rounded-2xl items-center justify-center shadow-sm `,
                              {
                                width: isTablet
                                  ? (width - 120) / 6
                                  : (width - 100) / 3,
                              },
                            ]}
                          >
                            <View
                              style={tw`p-2 rounded-full  mb-1 bg-[#0063E51A]`}
                            >
                              <Image
                                key={item?.id}
                                style={tw`w-12 h-12 rounded-full`}
                                resizeMode="stretch"
                                source={{ uri: item?.icon }}
                              />
                            </View>
                            <Text
                              numberOfLines={1}
                              style={tw`font-DegularDisplaySemibold text-base text-[#262626]`}
                            >
                              {item?.car_type}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Home;
