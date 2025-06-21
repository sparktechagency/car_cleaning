import { Text, View } from "react-native";

import tw from "@/lib/tailwind";
import React from "react";
import { Checkbox } from "react-native-ui-lib";
import { IBookingData } from "@/interface/interfaces";
import { useGetServicesByIdQuery } from "@/redux/apiSlices/servicesApiSlices";
interface Props {
  setBookingInfo: React.Dispatch<React.SetStateAction<IBookingData | null>>;
  bookingInfo: IBookingData;
}
const ThreeStep = ({ bookingInfo, setBookingInfo }: Props) => {
  const [typeValue, setTypeValue] = React.useState<
    "interior" | "exterior" | "both"
  >("interior");

  const { data, isError, isLoading } = useGetServicesByIdQuery(
    bookingInfo?.service_id
  );

  const interiorPrice = data?.data?.interior ?? 0;
  const exteriorPrice = data?.data?.exterior ?? 0;
  const bothPrice = data?.data?.both ?? 0;

  React.useEffect(() => {
    if (data) {
      const price =
        typeValue === "interior"
          ? data?.data?.interior
          : typeValue === "exterior"
          ? data?.data?.exterior
          : data?.data?.both;

      setBookingInfo({
        ...bookingInfo,
        price: price,
      });
    }
  }, [data, typeValue]);

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
                price: interiorPrice,
              });
            }}
          />
          <Text
            style={tw`font-DegularDisplaySemibold text-base text-[#0063E5]`}
          >
            {isLoading ? "Loading..." : `$ ${interiorPrice}`}
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
                price: exteriorPrice,
              });
            }}
          />
          <Text
            style={tw`font-DegularDisplaySemibold text-base text-[#0063E5]`}
          >
            {isLoading ? "Loading..." : `$ ${exteriorPrice}`}
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
                price: bothPrice,
              });
            }}
          />
          <Text
            style={tw`font-DegularDisplaySemibold text-base text-[#0063E5]`}
          >
            {isLoading ? "Loading..." : `$ ${bothPrice}`}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ThreeStep;
