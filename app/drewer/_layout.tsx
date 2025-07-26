import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import { IconCross, IconDeleteRed, IconLogOut } from "@/assets/icon/icon";
import tw from "@/lib/tailwind";
import {
  useDeleteUserAccountMutation,
  useGetProfileQuery,
} from "@/redux/apiSlices/authSlices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const CustomDrawerContent = (props) => {
  const { setIsModalVisible, isModalVisible } = props;
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isToken, setIsToken] = useState();
  const [userPass, serUserPass] = useState("");

  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const { data, isLoading, isError } = useGetProfileQuery(isToken);
  const [deleteAccount] = useDeleteUserAccountMutation();

  const handleUserDelete = async () => {
    setIsModalVisible(false);
    try {
      const res = await deleteAccount({ password: userPass }).unwrap();
      await AsyncStorage.removeItem("token");
      router.replace("/login");
      if (res) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,

          textBody: "User Deleted",
        });
      }
    } catch (error) {
      console.log(error, "user not delete successful");
      setIsModalVisible(false);
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning",
        textBody: "something Is Wrong",
      });
    }
  };

  const handleUserInfo = async () => {
    const token = await AsyncStorage.getItem("token");
    setIsToken(token);
  };

  useEffect(() => {
    handleUserInfo();
  }, []);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={[
        tw`flex-1 `,
        {
          paddingTop: Platform.OS === "android" ? 40 : insets.top,
        },
      ]}
    >
      {/* User Profile Section */}
      <Pressable
        onPress={() => router.push("/drewer/home/profile")}
        style={tw`flex-row p-4 justify-start items-center gap-3`}
      >
        <Image
          source={{
            uri: data?.data?.photo,
          }}
          style={tw`w-12 h-12 rounded-full `}
          resizeMode="cover"
        />
        <View>
          <Text style={tw`text-lg font-bold `}>{data?.data?.name}</Text>
          <Text style={tw`text-sm text-gray-600`}>{data?.data?.email}</Text>
        </View>
      </Pressable>

      <View style={tw`gap-4 px-4 mt-10`}>
        <TouchableOpacity
          onPress={() => router?.push("/drewer/tramsConditions")}
        >
          <View>
            <Text style={tw`capitalize font-DegularDisplayMedium text-black`}>
              Terms & conditions
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router?.push("/drewer/privacyPolicy")}>
          <View>
            <Text style={tw`capitalize font-DegularDisplayMedium text-black`}>
              Privacy policy
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router?.push("/drewer/aboutUs")}>
          <View>
            <Text style={tw`capitalize font-DegularDisplayMedium text-black`}>
              About us
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router?.push("/drewer/support")}>
          <View>
            <Text style={tw`capitalize font-DegularDisplayMedium text-black`}>
              Support
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <View>
            <Text
              style={tw`capitalize text-red-700 font-DegularDisplayMedium text-base`}
            >
              Delete account
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={tw`mt-auto px-4 pt-5 pl-2`}>
        <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.removeItem("token");
            router.push("/login");
          }}
          style={tw`py-5  flex-row items-center gap-2`}
        >
          <SvgXml xml={IconLogOut} />
          <Text
            style={tw`text-base capitalize text-red-500 font-DegularDisplayBold`}
          >
            Log out
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
      >
        <View
          style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
        >
          <View
            style={[
              tw`bg-white  max-w-[80%] rounded-2xl p-6 ${
                isTablet ? `h-88` : ``
              }`,
            ]}
          >
            <View style={tw`flex-row justify-between`}>
              <View />
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={tw`p-3 rounded-full justify-center items-center bg-gray-300 shadow-md`}
              >
                <SvgXml xml={IconCross} />
              </TouchableOpacity>
            </View>
            <View style={tw`justify-center items-center mb-4`}>
              <SvgXml xml={IconDeleteRed} />
              <Text style={tw`text-center font-DegularDisplayBold  text-2xl `}>
                You are going to delete your account
              </Text>

              <Text
                style={tw`text-center font-DegularDisplayMedium  text-sm text-regularText my-2`}
              >
                For deleting please enter your password
              </Text>
            </View>

            <View style={tw`my-5`}>
              <TextInput
                placeholder="Password"
                style={tw`w-full border rounded-lg h-11 bg-secondary px-2`}
                onChangeText={(i) => serUserPass(i)}
              />
            </View>

            <TouchableOpacity
              onPress={() => handleUserDelete()}
              style={tw` rounded-full bg-red-500`}
            >
              <Text
                style={tw`font-DegularDisplayMedium text-xl text-center p-3 text-white`}
              >
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </DrawerContentScrollView>
  );
};

export default function Layout() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  return (
    <View style={tw`flex-1`}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          screenOptions={{
            headerShown: false,
          }}
          drawerContent={(props) => (
            <CustomDrawerContent
              {...props}
              setIsModalVisible={setIsModalVisible}
              isModalVisible={isModalVisible}
            />
          )}
        >
          {/* <Drawer.Screen name="login" /> */}
        </Drawer>
        {/* <StatusBar backgroundColor={Base} animated barStyle={"dark-content"} /> */}
      </GestureHandlerRootView>
    </View>
  );
}
