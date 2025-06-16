import {
  IconHome,
  IconHomeSelect,
  IconProfile,
  IconProfileSelected,
  IconServices,
  IconServicesSelected,
  IconWork,
  IconWorkSelect,
} from "@/assets/icon/icon";
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";

import tw from "@/lib/tailwind";
import { BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import React from "react";
import { SvgXml } from "react-native-svg";

// Define your route params
type RouteParamList = {
  index: undefined;
  services: undefined;
  work: undefined;
  profile: undefined;
};

// Props type for MyTabBar
type MyTabBarProps = {
  state: TabNavigationState<ParamListBase>;
  descriptors: any;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
};

function MyTabBar({ state, descriptors, navigation }: MyTabBarProps) {
  return (
    <View
      style={tw`absolute bottom-3 justify-center items-center w-full flex-1`}
    >
      <View
        style={tw`bg-[#00004C] h-[70px] w-[90%] rounded-full flex-row items-center   flex-1`}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;
          console.log(state);

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          // Get the icon based on route name
          const getIcon = () => {
            switch (route.name) {
              case "index":
                return isFocused ? IconHomeSelect : IconHome;
              case "services":
                return isFocused ? IconServicesSelected : IconServices;
              case "work":
                return isFocused ? IconWorkSelect : IconWork;
              case "profile":
                return isFocused ? IconProfileSelected : IconProfile;
              default:
                return IconHomeSelect;
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={tw`flex-1 w-full items-center justify-between`}
            >
              <View
                style={[
                  tw`items-center justify-center px-4 py-3 rounded-3xl `,
                  tw`${isFocused ? "bg-primary" : "bg-transparent"}`,
                ]}
              >
                <SvgXml
                  xml={getIcon()}
                  width={24}
                  height={24}
                  style={[
                    tw`mb-1`,
                    isFocused ? tw`text-white` : tw`text-[#8E8E93]`,
                  ]}
                />
                {/* <Text
                  style={[
                    tw`text-xs`,
                    isFocused ? tw`text-white font-bold` : tw`text-[#8E8E93]`,
                  ]}
                >
                  {label}
                </Text> */}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={(props: any) => <MyTabBar {...props} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="services" />
      <Tabs.Screen name="work" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
