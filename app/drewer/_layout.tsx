import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "react-native";
import { Base } from "@/utils/utils";



const CustomDrawerContent = () => {

}


export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: false,
        }}
        drawerContent={(props) => }
      >
        <Drawer.Screen name="login" />
      </Drawer>
      <StatusBar backgroundColor={Base} animated barStyle={"dark-content"} />
    </GestureHandlerRootView>
  );
}
