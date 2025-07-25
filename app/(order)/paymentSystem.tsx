import { IconCamera, IconMaster, IconVisa } from "@/assets/icon/icon";
import { router, useLocalSearchParams } from "expo-router";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import TButton from "@/lib/buttons/TButton";
import tw from "@/lib/tailwind";
import { PrimaryColor } from "@/utils/utils";
import React from "react";
import { SvgXml } from "react-native-svg";

const data = [
  { label: "United States", value: "1" },
  { label: "Bangladesh", value: "2" },
  { label: "Canada", value: "3" },
  { label: "France", value: "4" },
  { label: "Italy", value: "5" },
  { label: "Japan", value: "6" },
  { label: "Dubai", value: "7" },
];

const paymentSystem = () => {
  const {
    car_brand,
    car_model,
    service_name,
    service_id,
    service_type,
    booking_date,
    booking_time,
    booking_note,
    price,
  } = useLocalSearchParams();

  const [checkBox, setCheckBox] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [isFocus, setIsFocus] = React.useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text
          style={[
            styles.label,
            isFocus && { color: "#788498" },
            tw`bg-[#ecf0f1] rounded-lg`,
          ]}
        >
          Card number
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={tw`px-6 pt-3 bg-primaryBase `}>
      <Text style={tw`text-[#262626] font-DegularDisplayBold text-2xl`}>
        Payment procedure
      </Text>

      <View style={tw`mt-6`}>
        <View style={tw`flex-row justify-between `}>
          <Text style={tw`font-bold text-sm font-DegularDisplayRegular`}>
            Card Information
          </Text>
          <TouchableOpacity style={tw`flex-row items-center gap-1`}>
            <SvgXml xml={IconCamera} />
            <Text
              style={tw`text-primary  font-bold text-sm font-DegularDisplayRegular`}
            >
              Scan card
            </Text>
          </TouchableOpacity>
        </View>

        <View style={tw`my-1`}>
          <View style={tw`border border-gray-300 rounded-lg p-3`}>
            <View style={tw`flex-row justify-between items-center`}>
              <TextInput
                placeholderTextColor={"#a1a1a1"}
                placeholder="card number"
                keyboardType="numeric"
                style={tw`text-lg flex-1`}
              />
              <SvgXml style={tw`w-6 h-4 mr-1`} xml={IconVisa} />
              <SvgXml style={tw`w-6 h-4 mr-1`} xml={IconMaster} />
            </View>
          </View>
          <View style={tw`flex-row mt-3`}>
            <View style={tw`flex-1 border border-gray-300 rounded-lg p-3 mr-2`}>
              <TextInput
                placeholderTextColor={"#a1a1a1"}
                placeholder="MM / YY"
                keyboardType="numeric"
                style={tw`text-lg`}
              />
            </View>
            <View style={tw`flex-1 border border-gray-300 rounded-lg p-3`}>
              <TextInput
                placeholderTextColor={"#a1a1a1"}
                placeholder="CVC"
                keyboardType="numeric"
                secureTextEntry
                style={tw`text-lg`}
              />
            </View>
          </View>

          <Text style={tw`text-lg font-semibold mt-5`}>Billing address</Text>

          <View style={tw`mt-2`}></View>
          <View style={tw`border border-gray-300 rounded-lg p-3 mt-2`}>
            <TextInput
              placeholderTextColor={"#a1a1a1"}
              placeholder="ZIP"
              keyboardType="numeric"
              style={tw`text-lg`}
            />
          </View>

          <View style={tw`flex-row items-center my-6`}>
            <Checkbox
              style={tw`w-5 h-5 border border-gray-400 rounded mr-2`}
              value={checkBox}
              onValueChange={setCheckBox}
              color={PrimaryColor}
            />
            <Text style={tw`text-sm font-medium text-gray-700`}>
              Save this card for future RideAlongJr. payments
            </Text>
          </View>

          <TButton
            onPress={() => router.push("/cmodal")}
            title="Pay $2563.00"
          />
        </View>
      </View>
      {/*  ========== modal open ============ */}
    </View>
  );
};

export default paymentSystem;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
  },
  label: {
    position: "absolute",
    left: 22,
    top: -8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 18,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
