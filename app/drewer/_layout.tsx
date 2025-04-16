import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { Base } from "@/utils/utils";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import tw from "@/lib/tailwind";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { SvgXml } from "react-native-svg";
import { IconLogOut } from "@/assets/icon/icon";

const CustomDrawerContent = (props) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={tw`flex-1 pb-[${insets.bottom}px]`}
    >
      <View style={tw`gap-2 mt-10`}>
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

      <TouchableOpacity
        // onPress={() => {
        //   router?.replace("/auth/login");
        // }}
        style={tw`py-5 border-t border-gray-200 flex-row items-center gap-2`}
      >
        <SvgXml xml={IconLogOut} />
        <Text style={tw`text-base text-red-500`}>Log out</Text>
      </TouchableOpacity>
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
