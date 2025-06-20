import { Text, View } from "react-native";

import tw from "@/lib/tailwind";
import React from "react";
import { Checkbox } from "react-native-ui-lib";
import { IBookingData } from "@/interface/interfaces";
import { useGetServicesQuery } from "@/redux/apiSlices/homeApiSlices";
interface Props {
  setBookingInfo: React.Dispatch<React.SetStateAction<IBookingData | null>>;
  bookingInfo: IBookingData;
}
const ThreeStep = ({ bookingInfo, setBookingInfo }: Props) => {
  const [typeValue, setTypeValue] = React.useState<
    "interior" | "exterior" | "both"
  >("interior");

  const { data, isError, isLoading } = useGetServicesQuery({});

  return (
    <View style={tw`w-full mt-4`}>
      <Text style={tw`font-DegularDisplaySemibold text-xl mt-2`}>
        Select the service that you want
      </Text>

      <View style={tw`mt-4 gap-4`}>
        <View style={tw`flex-row justify-between gap-2`}>
          <Checkbox
            size={18}
            color="black"
            borderRadius={100}
            label="Interior Cleaning"
            labelStyle={tw`font-DegularDisplaySemibold text-base text-[#262626]`}
            value={typeValue === "interior"}
            onValueChange={() => {
              setTypeValue("interior");
              setBookingInfo({
                ...bookingInfo,
                price: 55,
              });
            }}
          />
          <Text
            style={tw`font-DegularDisplaySemibold text-base text-[#0063E5]`}
          >
            $7542.00
          </Text>
        </View>
        <View style={tw`flex-row justify-between gap-2`}>
          <Checkbox
            size={18}
            color="black"
            borderRadius={100}
            label="Exterior Cleaning"
            labelStyle={tw`font-DegularDisplaySemibold text-base text-[#262626]`}
            value={typeValue === "exterior"}
            onValueChange={() => {
              setTypeValue("exterior");
              setBookingInfo({
                ...bookingInfo,
                price: 60,
              });
            }}
          />
          <Text
            style={tw`font-DegularDisplaySemibold text-base text-[#0063E5]`}
          >
            $7542.00
          </Text>
        </View>
        <View style={tw`flex-row justify-between gap-2`}>
          <Checkbox
            size={18}
            color="black"
            borderRadius={100}
            label="Both"
            labelStyle={tw`font-DegularDisplaySemibold text-base text-[#262626]`}
            value={typeValue === "both"}
            onValueChange={() => {
              setTypeValue("both");
              setBookingInfo({
                ...bookingInfo,
                price: 65,
              });
            }}
          />
          <Text
            style={tw`font-DegularDisplaySemibold text-base text-[#0063E5]`}
          >
            $7542.00
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ThreeStep;
