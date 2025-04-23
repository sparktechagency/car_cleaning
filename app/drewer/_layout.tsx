import { StatusBar, Text, TouchableOpacity, View } from "react-native";

import { IconLogOut } from "@/assets/icon/icon";
import tw from "@/lib/tailwind";
import { Base } from "@/utils/utils";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { Avatar } from "react-native-ui-lib";

const CustomDrawerContent = (props) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={tw`flex-1 pb-[${insets.bottom}px]`}
    >
      {/* User Profile Section */}
      <View style={tw`flex-row pt-4 items-center px-4  gap-3`}>
        {/* <View
              style={tw`w-15 h-15 rounded-full bg-gray-300 justify-center items-center mb-2.5`}
            >
              <Text style={tw`text-xl font-bold text-white`}>LY</Text>
            </View> */}
        <View style={tw`mb-2.5`}>
          <Avatar
            containerStyle={tw` bg-gray-300 justify-center items-center `}
            source={{
              uri: "https://s3-alpha-sig.figma.com/img/fbb8/532e/d272017fa267924482614c10a5ce37ab?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=MoRpVAEIp7K7XrD7zI19RIrRR3e95w5cqz1wOo1rwIxN2g1NXX6tCFG30bMo0yky6gnbdKkIW2b3wOYyxsR8QKlRMLiYbNls47p-Yz8JeqcKSJa1Z1z~RPUloELQK0fPYnIxFAILmQgOWH7JHsmeLojjwWhg6E7ieOu44RnWC0wma2pdwe9YLz0x9LGqpWixZiQuP6qAsrSmU6icAYiMFp-pVQ4bUQ6wPTP~NfeYahPbBJGGVRW54JagtRbD1lLtmkqZkC~XXogyb6wjHFhiKqMaukUN9esjMZq0Nxpoqyv7k1WzAs0hcwqaWcYFHSrCbrMFAyuzHNetCIacyxe3OA__",
            }}
          />
        </View>
        <View>
          <Text style={tw`text-lg font-bold `}>Richard Mark</Text>
          <Text style={tw`text-sm text-gray-600`}>richard125@gmail.com</Text>
        </View>
      </View>

      <View style={tw`gap-3 px-4 mt-10`}>
        <TouchableOpacity
          onPress={() => router?.push("/drewer/tramsConditions")}
        >
          <View>
            <Text>Terms & conditions</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router?.push("/drewer/privacyPolicy")}>
          <View>
            <Text>Privacy policy</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router?.push("/drewer/aboutUs")}>
          <View>
            <Text>About us</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router?.push("/drewer/support")}>
          <View>
            <Text>Support</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={tw`mt-auto px-4 pt-5 pl-2`}>
        <TouchableOpacity
          // onPress={() => {
          //   router?.replace("/auth/login");
          // }}
          style={tw`py-5  flex-row items-center gap-2`}
        >
          <SvgXml xml={IconLogOut} />
          <Text style={tw`text-base text-red-500`}>Log out</Text>
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
