import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";

import { IconLogOut } from "@/assets/icon/icon";
import tw from "@/lib/tailwind";
import { Base } from "@/utils/utils";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useGetProfileQuery } from "@/redux/apiSlices/authSlices";

const CustomDrawerContent = (props) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [isToken, setIsToken] = useState();

  const { data, isLoading, isError } = useGetProfileQuery(isToken);

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
      contentContainerStyle={tw`flex-1 pb-[${insets.bottom}px]`}
    >
      {/* User Profile Section */}
      <View style={tw`flex-row p-4 justify-start items-center gap-3`}>
        <Image
          source={{
            uri: data?.data?.photo,
          }}
          style={tw`w-12 h-12 rounded-full mt-4`}
          resizeMode="contain"
        />
        <View>
          <Text style={tw`text-lg font-bold `}>{data?.data?.name}</Text>
          <Text style={tw`text-sm text-gray-600`}>{data?.data?.email}</Text>
        </View>
      </View>

      <View style={tw`gap-4 px-4 mt-10`}>
        <TouchableOpacity
          onPress={() => router?.push("/drewer/tramsConditions")}
        >
          <View>
            <Text style={tw`capitalize`}>Terms & conditions</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router?.push("/drewer/privacyPolicy")}>
          <View>
            <Text style={tw`capitalize`}>Privacy policy</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router?.push("/drewer/aboutUs")}>
          <View>
            <Text style={tw`capitalize`}>About us</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router?.push("/drewer/support")}>
          <View>
            <Text style={tw`capitalize`}>Support</Text>
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
    </DrawerContentScrollView>
  );
};

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: false,
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        {/* <Drawer.Screen name="login" /> */}
      </Drawer>
      <StatusBar backgroundColor={Base} animated barStyle={"dark-content"} />
    </GestureHandlerRootView>
  );
}
