import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import React from "react";
import { SvgXml } from "react-native-svg";
import tw from "@/lib/tailwind";
import {
  IconCompact,
  IconHi,
  IconLocation,
  IconMenu,
  IconNotification,
  IconSubCar,
  IconTrack,
} from "@/assets/icon/icon";
import { useNavigation } from "expo-router";
import image1 from "../../../assets/images/photo1.png";
import image2 from "../../../assets/images/photo2.png";
import { Dialog, PanningProvider, Wizard } from "react-native-ui-lib";
import { PrimaryColor } from "@/utils/utils";
import CarType from "@/components/CarType";
import TButton from "@/lib/buttons/TButton";
import SecondStep from "@/components/SecondStep";
import ThreeStep from "@/components/ThreeStep";
import FourthStep from "@/components/FourthStep";

const Home = () => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = React.useState(false);
  const [step, setStep] = React.useState(0);

  //  services data ===============================
  const servicesItem = [
    {
      title: "Truck",
      icon: IconTrack,
    },
    {
      title: "Compact",
      icon: IconCompact,
    },
    {
      title: "Suv car",
      icon: IconSubCar,
    },
  ];

  // work section data =====================
  const work = [
    {
      id: 1,
      image: image1,
    },
    {
      id: 2,
      image: image2,
    },
  ];

  const renderItem = ({ item }): JSX.Element => (
    <TouchableOpacity>
      <View
        style={tw`w-28 h-28 m-2 flex-col justify-center items-center text-center rounded-2xl bg-white`}
      >
        <View style={tw`p-4 rounded-full items-center mb-1 bg-[#0063E51A]`}>
          <SvgXml xml={item.icon} />
        </View>
        <Text style={tw`font-DegularDisplaySemibold text-base text-[#262626]`}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const workRenderItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <View style={tw`mb-4 mr-2`}>
          <Image style={tw`w-44 h-32 rounded-2xl`} source={item.image} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={tw`flex-1 px-6 bg-[#F6F6F6]`}>
      {/* header parts  */}
      <View style={tw`py-4 flex-row items-center justify-between `}>
        <View style={tw`flex-row items-center gap-4`}>
          <TouchableOpacity
            onPress={() => {
              (navigation as any)?.openDrawer();
            }}
            style={tw`mb-4`}
          >
            <SvgXml xml={IconMenu} />
          </TouchableOpacity>
          <View>
            <View style={tw`flex-row items-start gap-2`}>
              <Text
                style={tw`font-DegularDisplayBold flex-row items-center text-black text-2xl`}
              >
                Hi Richard,
              </Text>
              <SvgXml xml={IconHi} />
            </View>
            <View
              style={tw`font-NunitoSansBold flex-row items-center gap-1 text-black text-base`}
            >
              <SvgXml xml={IconLocation} />
              <Text>31/2 Los Angles, USA</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={tw`w-12 h-12 p-3 items-center text-center text-white bg-primary rounded-full`}
        >
          <SvgXml xml={IconNotification} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-20`}
      >
        {/* ========== Banner section =========== */}
        <View>
          <View style={tw`relative min-h-72 mt-8`}>
            <View style={tw`top-10`}>
              <Image
                source={require("../../../assets/images/banner-bg.png")}
                style={tw`h-56 w-full rounded-3xl`}
              />
            </View>

            <View style={tw`absolute z-50`}>
              <Image
                style={tw`w-[220px] h-40 mx-auto mb-1`}
                source={require("../../../assets/images/car-white.png")}
              />
              <View style={tw`mx-auto items-center`}>
                <Text style={tw`font-DegularDisplayBold text-2xl`}>
                  Keep your <Text style={tw`text-primary`}> car clean</Text>{" "}
                  always
                </Text>
                <Text
                  style={tw`text-sm  text-center font-DegularDisplayMedium mb-4`}
                >
                  Car wash is a brand which is latterly going to change the
                  people think about car cleaning.
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <View
                    style={tw`bg-primary w-28 h-11 rounded-full mx-auto justify-center items-center`}
                  >
                    <Text
                      style={tw`text-sm font-DegularDisplayBold text-white`}
                    >
                      Book now!
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* ======== service category section ============= */}
        <View>
          <View style={tw`mt-6 bg-[#F6F6F6]`}>
            <Text style={tw`font-DegularDisplayBold text-2xl`}>
              Quick access for get service
            </Text>
            <View style={tw``}>
              <FlatList
                data={servicesItem}
                renderItem={renderItem}
                numColumns={3}
                keyExtractor={(item) => item.title}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={tw`flex  items-center`}
              />
            </View>
          </View>
        </View>

        {/* ========= work section with home page  ====== */}

        <View>
          <Text style={tw`font-DegularDisplayBold text-2xl`}>
            Quick access for get service
          </Text>

          <FlatList
            data={work}
            renderItem={workRenderItem}
            numColumns={2}
            keyExtractor={(item) => item.id}
            contentContainerStyle={tw`mt-4`}
          />
          <FlatList
            data={work}
            renderItem={workRenderItem}
            numColumns={2}
            keyExtractor={(item) => item.id}
            contentContainerStyle={tw`mt-4`}
          />
        </View>
      </ScrollView>

      {/* ============= booking modal ====================== */}
      <Dialog
        width={"100%"}
        height={"70%"}
        containerStyle={tw`bg-[#F6F6F6] flex-1 items-center py-10  rounded-l-3xl rounded-r-3xl rounded-b-none`}
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        panDirection={PanningProvider.Directions.DOWN}
        bottom={true}
      >
        <View style={tw`px-4`}>
          <Wizard
            containerStyle={tw`bg-transparent border-0 shadow-none`}
            activeIndex={step}
            onActiveIndexChanged={(index) => setStep(index)}
            activeConfig={{
              circleColor: PrimaryColor,
              state: "enabled",
              color: PrimaryColor,
              icon: require("@/assets/images/check_circle.png"),
            }}
          >
            <Wizard.Step
              circleColor={PrimaryColor}
              circleSize={20}
              state={step > 0 ? Wizard.States.COMPLETED : Wizard.States.ENABLED}
              icon={require("@/assets/images/check_circle.png")}
            />
            <Wizard.Step
              circleColor={PrimaryColor}
              circleSize={20}
              state={
                step > 1
                  ? Wizard.States.COMPLETED
                  : step === 1
                  ? Wizard.States.ENABLED
                  : Wizard.States.DISABLED
              }
              icon={require("@/assets/images/check_circle.png")}
            />
            <Wizard.Step
              circleColor={PrimaryColor}
              circleSize={20}
              state={
                step > 2
                  ? Wizard.States.COMPLETED
                  : step === 2
                  ? Wizard.States.ENABLED
                  : Wizard.States.DISABLED
              }
              icon={require("@/assets/images/check_circle.png")}
            />
            <Wizard.Step
              circleColor={PrimaryColor}
              circleSize={20}
              state={
                step === 3 ? Wizard.States.ENABLED : Wizard.States.DISABLED
              }
              icon={require("@/assets/images/check_circle.png")}
            />
          </Wizard>
        </View>
        {step === 0 && <CarType />}
        {step === 1 && <SecondStep />}
        {step === 2 && <ThreeStep />}
        {step === 3 && <FourthStep />}

        <View style={tw`flex-row flex-1 items-end px-4 gap-2 mt-10`}>
          <TButton
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            title="Cancel"
            containerStyle={tw`bg-transparent border rounded-lg border-primary flex-1`}
            titleStyle={tw`text-primary`}
          />
          <TButton
            onPress={() => {
              setStep(step + 1);
            }}
            title="Next"
            containerStyle={tw`flex-1 rounded-lg`}
          />
        </View>
      </Dialog>
    </View>
  );
};

export default Home;
