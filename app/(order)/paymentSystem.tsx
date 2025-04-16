import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React from "react";
import tw from "@/lib/tailwind";
import {
  IconCamera,
  IconCongratulation,
  IconMaster,
  IconVisa,
} from "@/assets/icon/icon";
import { SvgXml } from "react-native-svg";
import { Dropdown } from "react-native-element-dropdown";
import { Checkbox, Modal } from "react-native-ui-lib";
import TButton from "@/lib/buttons/TButton";
import { useRouter } from "expo-router";
import { PrimaryColor } from "@/utils/utils";

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
  const [checkBox, setCheckBox] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [isFocus, setIsFocus] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

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
    <View style={tw`px-6`}>
      <Text style={tw`text-[#262626] font-DegularDisplayBold text-2xl`}>
        Payment procedure
      </Text>

      <View style={tw`mt-6`}>
        <View style={tw`flex-row justify-between `}>
          <Text style={tw`font-bold text-sm font-NunitoSansRegular`}>
            Card Information
          </Text>
          <TouchableOpacity style={tw`flex-row items-center gap-1`}>
            <SvgXml xml={IconCamera} />
            <Text
              style={tw`text-primary  font-bold text-sm font-NunitoSansRegular`}
            >
              Scan card
            </Text>
          </TouchableOpacity>
        </View>

        <View style={tw`my-1`}>
          <View style={tw`border border-gray-300 rounded-lg p-3`}>
            <View style={tw`flex-row justify-between items-center`}>
              <TextInput
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
                placeholder="MM / YY"
                keyboardType="numeric"
                style={tw`text-lg`}
              />
            </View>
            <View style={tw`flex-1 border border-gray-300 rounded-lg p-3`}>
              <TextInput
                placeholder="CVC"
                keyboardType="numeric"
                secureTextEntry
                style={tw`text-lg`}
              />
            </View>
          </View>

          <Text style={tw`text-lg font-semibold mt-5`}>Billing address</Text>

          <View style={tw`mt-2`}>
            {renderLabel()}

            <Dropdown
              style={[
                styles.dropdown,
                isFocus && { borderColor: "blue" },
                tw` border border-gray-300 rounded-lg p-3 w-full`,
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Select Country" : "..."}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setValue(item.value);
                setIsFocus(false);
              }}
            />
          </View>
          <View style={tw`border border-gray-300 rounded-lg p-3 mt-2`}>
            <TextInput
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

          <TButton onPress={() => setModalVisible(true)} title="Pay $2563.00" />
        </View>
      </View>
      {/*  ========== modal open ============ */}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={tw`flex-1 bg-black bg-opacity-50 justify-center items-center`}
        >
          <View
            style={tw`w-7/8 bg-white p-5 rounded-2xl items-center shadow-lg`}
          >
            {/* Check Icon */}
            <SvgXml xml={IconCongratulation} />

            {/* Success Message */}
            <Text style={tw`text-2xl font-bold mt-3`}>Congratulations</Text>
            <Text style={tw`text-base text-gray-500 text-center mt-1`}>
              Booking for your service is confirmed
            </Text>

            {/* Close Button */}
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={tw`bg-primary w-full text-center rounded-full px-5 py-2  mt-8`}
            >
              <Text style={tw`text-white text-center text-lg font-bold`}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
