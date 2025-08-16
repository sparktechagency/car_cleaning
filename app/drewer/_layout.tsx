import { IconCross, IconDeleteRed, IconLogOut } from "@/assets/icon/icon";
import {
  Image,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";

import tw from "@/lib/tailwind";
import { useDeleteUserAccountMutation } from "@/redux/apiSlices/authSlices";
import { removeUser } from "@/redux/service/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";

const CustomDrawerContent = (props) => {
  const user = useSelector((state: any) => state?.user?.user);
  const { setIsModalVisible, isModalVisible } = props;
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [userPass, serUserPass] = useState("");
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const dispatch = useDispatch();
  const [deleteAccount] = useDeleteUserAccountMutation();

  const handleUserDelete = async () => {
    setIsModalVisible(false);
    try {
      const res = await deleteAccount({ password: userPass }).unwrap();
      await AsyncStorage.removeItem("token");
      dispatch(removeUser());
      router.replace("/login");
      if (res) {
        router.push(`/toaster?content=${res?.message}&time=2000`);
      }
    } catch (error) {
      console.log(error, "user not delete successful");
      setIsModalVisible(false);
      router.push(`/toaster?content=Something went wrong&time=2000`);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    dispatch(removeUser());
    router.push("/drewer/home");
  };

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
      {user?.id && (
        <TouchableOpacity
          onPress={() => router.push("/drewer/home/profile")}
          style={tw`flex-row p-4 justify-start items-center gap-3`}
        >
          <Image
            source={{
              uri: user?.photo,
            }}
            style={tw`w-12 h-12 rounded-full `}
            resizeMode="cover"
          />
          <View>
            <Text style={tw`text-lg font-bold `}>{user?.name}</Text>
            <Text style={tw`text-sm text-gray-600`}>{user?.email}</Text>
          </View>
        </TouchableOpacity>
      )}

      <View style={tw`gap-4 px-4 `}>
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
        {user?.id && (
          <TouchableOpacity onPress={() => router?.push("/drewer/support")}>
            <View>
              <Text style={tw`capitalize font-DegularDisplayMedium text-black`}>
                Support
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {user?.id && (
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <View>
              <Text
                style={tw`capitalize text-red-700 font-DegularDisplayMedium text-base`}
              >
                Delete account
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      <View style={tw`mt-auto px-4 pt-5 pl-2`}>
        {user?.id ? (
          <TouchableOpacity
            onPress={async () => {
              handleLogout();
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
        ) : (
          <TouchableOpacity
            onPress={() => router.push("/login")}
            style={tw`py-5  `}
          >
            <Text
              style={tw`text-base capitalize text-primary  font-DegularDisplayBold`}
            >
              Log in
            </Text>
          </TouchableOpacity>
        )}
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
        />
      </GestureHandlerRootView>
    </View>
  );
}
