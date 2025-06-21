import {
  IconBackArrow,
  IconChange,
  IconCross,
  IconDelete,
  IconEditProfile,
  IconPhone,
  IconSuccess,
  IconSwapImage,
  IconThreeDot,
} from "@/assets/icon/icon";
import {
  EditImage1,
  EditImage2,
  EditImage3,
  EditImage4,
  EditImage5,
  EditImage6,
  ProfileImage,
} from "@/assets/images/images";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import TButton from "@/lib/buttons/TButton";
import InputText from "@/lib/inputs/InputText";
import tw from "@/lib/tailwind";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { SvgXml } from "react-native-svg";
import { Modal } from "react-native-ui-lib";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetProfileQuery } from "@/redux/apiSlices/authSlices";

const editProfile = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectModalVisible, setSelectModalVisible] = React.useState(false);
  const [userName, setUserName] = useState("");
  const [car_brand, setCarBrand] = useState("");
  const [car_model, setCarModel] = useState("");
  const [phone, setPhone] = useState("");
  const [isToken, setIsToken] = useState();

  const userInfo = {
    userName,
    car_brand,
    car_model,
    phone,
  };

  console.log(userInfo, "aulsdfijlksdjfa;lskjdf;laskdjf;lsafja;lskdfj");

  const images = [
    {
      id: 1,
      image: EditImage1,
    },
    {
      id: 2,
      image: EditImage2,
    },
    {
      id: 3,
      image: EditImage3,
    },
    {
      id: 4,
      image: EditImage4,
    },
    {
      id: 5,
      image: EditImage5,
    },
    {
      id: 6,
      image: EditImage6,
    },
  ];
  const { data, isLoading, isError } = useGetProfileQuery(isToken);
  console.log(data, "asldfjalskdjfsajf");
  const handleUserInfo = async () => {
    const token = await AsyncStorage.getItem("token");
    setIsToken(token);
  };

  useEffect(() => {
    handleUserInfo();
  }, []);

  return (
    <View style={tw`flex-1`}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={tw`flex-row items-center  px-6 mt-5 mb-6 gap-2`}
      >
        <SvgXml xml={IconBackArrow} />
        <Text style={tw`text-[#262626] font-DegularDisplayBold text-2xl`}>
          Back
        </Text>
      </Pressable>

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tw`pb-20 px-6`}
      >
        <View style={tw`w-full mx-auto mb-4 items-center`}>
          <Image
            source={ProfileImage}
            style={{ width: 124, height: 124, borderRadius: 100 }}
          />
          <TouchableOpacity
            style={tw`flex-row gap-2 items-center border border-primary px-2 py-1 rounded-lg mt-4`}
          >
            <SvgXml xml={IconChange} />
            <Text
              style={tw`font-DegularDisplaySemibold text-base text-primary`}
            >
              Change
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text
            style={tw`font-DegularDisplaySemibold text-xl text-regularText mt-4 my-2`}
          >
            Basic information
          </Text>

          <InputText
            label="Username"
            onChangeText={(test) => {
              setUserName(test);
            }}
            touched
            textInputProps={{
              placeholder: "Enter Your User Name",
            }}
            svgFirstIcon={IconEditProfile}
            containerStyle={tw``}
          />
          <InputText
            label="Phone"
            onChangeText={(test) => {
              setPhone(test);
            }}
            touched
            textInputProps={{
              placeholder: "Enter Your Phone number",
            }}
            svgFirstIcon={IconPhone}
            containerStyle={tw``}
          />
        </View>

        <View>
          <Text
            style={tw`font-DegularDisplaySemibold text-xl text-regularText mb-2 mt-4`}
          >
            Car details
          </Text>

          <View style={tw`flex-row gap-2 w-full  `}>
            <View style={tw` w-1/2`}>
              <InputText
                label="Brand name"
                onChangeText={(test) => {
                  setCarBrand(test);
                }}
                touched
                textInputProps={{
                  placeholder: "Your Car brand",
                  numberOfLines: 1,
                }}
                containerStyle={tw`w-full flex-1`}
              />
            </View>

            <View style={tw` w-1/2`}>
              <InputText
                label="Model name"
                onChangeText={(test) => {
                  setCarModel(test);
                }}
                touched
                textInputProps={{
                  placeholder: "Car model Name",
                  numberOfLines: 1,
                }}
                containerStyle={tw`w-full flex-1`}
              />
            </View>
          </View>

          <View style={tw`flex-row flex-wrap justify-between mt-2`}>
            {images.map((item) => (
              <TouchableOpacity
                disabled
                style={tw`w-[30%] h-16 my-2 justify-center items-center text-center`}
                key={item.id}
              >
                <View style={tw`relative`}>
                  <Image
                    // style={tw`w-120 h-64 rounded-lg`}
                    style={{ width: 120, height: 64, borderRadius: 8 }}
                    source={item.image}
                  />
                  <TouchableOpacity
                    onPress={() => setSelectModalVisible(true)}
                    style={tw`absolute p-1.5 top-1 justify-center items-center right-1 w-6 h-6 rounded-full bg-primary`}
                  >
                    <SvgXml height={16} width={16} xml={IconThreeDot} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={tw`rounded-full w-full h-12 mt-3 `}>
            <TButton
              onPress={() => setModalVisible(true)}
              title="Save & Change"
              containerStyle={tw``}
            />
          </View>
        </View>
      </ScrollView>

      {/*  ========== successful modal open ============ */}

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
            <SvgXml xml={IconSuccess} />

            {/* Success Message */}
            <Text style={tw`text-2xl font-bold mt-3`}>Success!</Text>
            <Text style={tw`text-base text-gray-500 text-center mt-1`}>
              Your profile updated successfully
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

      {/* ========= selected modal ============= */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={selectModalVisible}
        onRequestClose={() => setSelectModalVisible(false)}
      >
        <View
          style={tw`flex-1 bg-black bg-opacity-50 justify-center items-center`}
        >
          <View
            style={tw`w-7/8 bg-white p-5 rounded-2xl items-center shadow-lg`}
          >
            <View style={tw`w-full flex-row justify-between items-center`}>
              <Text style={tw`text-2xl font-bold mt-3`}>Select one</Text>
              <Pressable onPress={() => setSelectModalVisible(false)}>
                <SvgXml xml={IconCross} />
              </Pressable>
            </View>

            <View style={tw`w-full m-4`}>
              <View
                style={tw`flex-row justify-center items-center border border-[#0063E580] w-full p-1 rounded-lg gap-2 mb-2`}
              >
                <SvgXml xml={IconSwapImage} />
                <Text>Swap image</Text>
              </View>
              <View
                style={tw`flex-row justify-center items-center border border-[#C47575] w-full p-1 rounded-lg gap-2`}
              >
                <SvgXml xml={IconDelete} />
                <Text>Delete image</Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default editProfile;
