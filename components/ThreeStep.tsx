import { View, Text } from "react-native";
import React from "react";
import tw from "@/lib/tailwind";
import { Checkbox } from "react-native-ui-lib";

const ThreeStep = () => {
  const [interiorValue, setInteriorValue] = React.useState(false);
  const [exteriorValue, setExteriorValue] = React.useState(false);
  const [bothValue, setBothValue] = React.useState(false);

  return (
    <View style={tw`w-full space-y-2 mt-4`}>
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
            value={interiorValue}
            onValueChange={setInteriorValue}
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
            value={exteriorValue}
            onValueChange={setExteriorValue}
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
            value={bothValue}
            onValueChange={setBothValue}
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
