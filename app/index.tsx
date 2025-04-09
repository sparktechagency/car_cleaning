import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { ActivityIndicator, Image, LogBox, View } from "react-native";

import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { PrimaryColor } from "@/utils/utils";

SplashScreen.preventAutoHideAsync(); // Prevent Expo's splash screen from auto-hiding

LogBox.ignoreLogs([""]);

export default function App() {
  const route = useRouter();

  useEffect(() => {
    Font.loadAsync({
      DegularDisplayBlack: require("@/assets/fonts/DegularDisplay-Black.otf"),
      DegularDisplayBlackItalic: require("@/assets/fonts/DegularDisplay-BlackItalic.otf"),
      DegularDisplayBold: require("@/assets/fonts/DegularDisplay-Bold.otf"),
      DegularDisplayBoldItalic: require("@/assets/fonts/DegularDisplay-BoldItalic.otf"),
      DegularDisplayLight: require("@/assets/fonts/DegularDisplay-Light.otf"),
      DegularDisplayLightItalic: require("@/assets/fonts/DegularDisplay-LightItalic.otf"),
      DegularDisplayMedium: require("@/assets/fonts/DegularDisplay-Medium.otf"),
      DegularDisplayMediumItalic: require("@/assets/fonts/DegularDisplay-MediumItalic.otf"),
      DegularDisplayRegular: require("@/assets/fonts/DegularDisplay-Regular.otf"),
      DegularDisplayRegularItalic: require("@/assets/fonts/DegularDisplay-RegularItalic.otf"),
      DegularDisplaySemibold: require("@/assets/fonts/DegularDisplay-Semibold.otf"),
      DegularDisplaySemiboldItalic: require("@/assets/fonts/DegularDisplay-SemiboldItalic.otf"),
      DegularDisplayThin: require("@/assets/fonts/DegularDisplay-Thin.otf"),
      DegularDisplayThinItalic: require("@/assets/fonts/DegularDisplay-ThinItalic.otf"),
    });
    SplashScreen.hideAsync();
    setTimeout(() => {
      route?.replace("/login");
    }, 1000);
  }, []);

  return (
    <View style={tw`flex-1 justify-center items-center bg-white pb-[25%]`}>
      <Image source={require("@/assets/images/logo.png")} />
      <ActivityIndicator
        size="large"
        color={PrimaryColor}
        style={tw`absolute bottom-16`}
      />
    </View>
  );
}
