import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { ActivityIndicator, Image, LogBox, View } from "react-native";

import tw from "@/lib/tailwind";
import { useGetTokenCheckQuery } from "@/redux/apiSlices/authSlices";
import { PrimaryColor } from "@/utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

LogBox.ignoreLogs([""]);

export default function App() {
  const route = useRouter();
  const {
    data: tokenCheck,
    isError,
    isFetching,
    isLoading,
  } = useGetTokenCheckQuery({});

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
    // setTimeout(() => {
    //   route?.replace("/login");
    // }, 1000);
  }, []);
  const handlePathDecision = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (isFetching || isLoading) return;

      if (token) {
        if (tokenCheck) {
          route.replace("/drewer/home");
        } else {
          route.replace("/login");
        }
      } else {
        route.replace("/login");
      }
    } catch (e) {
      route.replace("/login");
    }
  };

  useEffect(() => {
    handlePathDecision();
  }, [tokenCheck, isFetching, isLoading]);

  return (
    <View
      style={tw`flex-1 justify-center items-center bg-primaryBase pb-[25%]`}
    >
      <Image
        style={[tw`w-60 h-28`]}
        resizeMode="contain"
        source={require("@/assets/images/brosLogo.png")}
      />
      <ActivityIndicator
        size="large"
        color={PrimaryColor}
        style={tw`absolute bottom-16`}
      />
    </View>
  );
}
