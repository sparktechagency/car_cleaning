import {
  IconCompact,
  IconLargeCar,
  IconSport,
  IconSubCar,
  IconTrack,
} from "@/assets/icon/icon";
import { Image, Text, TouchableOpacity, View } from "react-native";

import tw from "@/lib/tailwind";
import React, { useEffect } from "react";
import { useGetServicesQuery } from "@/redux/apiSlices/homeApiSlices";
import { IBookingData } from "@/interface/interfaces";

interface Props {
  setBookingInfo: React.Dispatch<React.SetStateAction<IBookingData | null>>;
  bookingInfo: IBookingData;
}

const CarType = ({ setBookingInfo, bookingInfo }: Props): JSX.Element => {
  const [selected, setSelected] = React.useState<number>(0);
  const { data, isError, isLoading } = useGetServicesQuery({});

  return (
    <View style={tw`flex-row flex-wrap justify-start items-center gap-4 `}>
      <Text style={tw`font-DegularDisplaySemibold text-xl mt-2`}>
        Which type of vehicle you want to wash?
      </Text>
      {data?.data?.map((item, index) => {
        useEffect(() => {
          if (data?.data?.length > 0) {
            setSelected(0);
            setBookingInfo({
              ...bookingInfo,
              service_id: data?.data[0]?.id,
            });
          }
        }, [data]);
        return (
          <TouchableOpacity
            onPress={() => {
              setSelected(index);
              setBookingInfo({
                ...bookingInfo,
                service_id: item?.id,
              });
            }}
            activeOpacity={0.7}
            key={item?.id}
            style={tw`w-[30%] h-32  rounded-2xl 
            bg-white
             items-center text-center  justify-center shadow-sm `}
          >
            <View style={tw`p-4 rounded-full mb-1 bg-[#0063E51A]`}>
              <Image
                width={32}
                height={30}
                resizeMode="contain"
                source={{ uri: item?.icon }}
              />
            </View>
            <Text
              numberOfLines={1}
              style={tw`font-DegularDisplaySemibold text-base  text-[#262626]
               `}
            >
              {item?.car_type}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CarType;
