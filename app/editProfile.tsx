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
import {
  useChangeProfileImageMutation,
  useGetProfileQuery,
  useUpdateUserMutation,
} from "@/redux/apiSlices/authSlices";
import {
  useDeleteCarPhotoMutation,
  useUpdateCarPhotoMutation,
} from "@/redux/apiSlices/carApiSlices";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import * as ImagePicker from "expo-image-picker";

const editProfile = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectModalVisible, setSelectModalVisible] = React.useState(false);
  const [photoId, setPhotoId] = useState(null);
  const [name, setUserName] = useState("");
  const [car_brand, setCarBrand] = useState("");
  const [car_model, setCarModel] = useState("");
  const [phone, setPhone] = useState("");

  const { data, isLoading, isError, refetch } = useGetProfileQuery({});
  const [changeUserData] = useUpdateUserMutation();
  const [deletePhot] = useDeleteCarPhotoMutation();
  const [swapPhoto] = useUpdateCarPhotoMutation();
  const [changeProfileImage] = useChangeProfileImageMutation();

  useEffect(() => {
    if (data?.data) {
      setUserName(data?.data?.name || "");
      setPhone(data?.data?.phone || "");
      setCarBrand(data?.data?.car_brand || "");
      setCarModel(data?.data?.car_model || "");
    }
  }, [data, refetch]);
  // ========================== update profile  ------------------

  const handleUpdateProfile = async () => {
    const updateData = {
      name: name ?? "",
      phone: phone ?? "",
      car_brand: car_brand ?? "",
      car_model: car_model ?? "",
    };
    try {
      const res = await changeUserData(updateData).unwrap();
      if (res?.status) {
        setModalVisible(true);
      }
    } catch (error) {
      console.warn("Update user error --->", error);
    }
  };

  // ================== swap image / update image =======================

  const imagePickSwap = async () => {
    try {
      setSelectModalVisible(false);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        const swapUri = result.assets[0].uri;

        // Now call upload API
        handleSwapPhoto(swapUri);
      }
    } catch (error) {
      console.log("Profile Image not updated -------------------->", error);
    }
  };
  const handleSwapPhoto = async (swapUri) => {
    try {
      const fileName = swapUri.split("/").pop();
      const formData = new FormData();
      formData.append("_method", "PUT");
      formData.append("photo", {
        uri: swapUri,
        name: fileName,
        type: "image/jpeg",
      } as any);

      console.log(photoId);
      const res = await swapPhoto({ data: formData, id: photoId }).unwrap();
      console.log("image Res", res);
      if (res?.status) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "Your Update success this Photo",
        });
      }
    } catch (error) {
      console.log("Image Update something Is Wrong ----->", error);
    }
  };

  // =========================== delete image ------------------
  const handlePhotoDelete = async () => {
    try {
      const res = await deletePhot(photoId).unwrap();
      setSelectModalVisible(false);
      if (res?.status) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "You have successful this Photo",
        });
      }
    } catch (error) {
      console.log("some thing is Wrong no delete image---------->", error);
    }
  };

  // ========================== image picker with profile image =================

  const imagePickWithProfile = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        const uri = result.assets[0].uri;
        console.log("Selected image---------------:", uri);

        // Now call upload API
        profileUploadImage(uri);
      }
    } catch (error) {
      console.log("Profile Image not updated -------------------->", error);
    }
  };

  const profileUploadImage = async (uri: string) => {
    const fileName = uri.split("/").pop();
    const fileType = fileName?.split(".").pop();
    try {
      const formData = new FormData();
      formData.append("photo", {
        uri,
        name: fileName || `profile.${fileType}`,
        type: `image/${fileType}`,
      } as any);

      // ================ here is call api ===========
      const res = await changeProfileImage(formData).unwrap();
      if (res?.status) {
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Success",
          textBody: "Congrats! Your Profile Image Update success",
        });
      }
    } catch (error) {
      console.log("Profile image something is wrong ==============", error);
    }
  };

  // console.log(data?.data?.car_photos);

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
            source={{
              uri: data?.data?.photo,
            }}
            style={tw`w-24 h-24  rounded-full `}
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={imagePickWithProfile}
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
            value={name}
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
            value={phone}
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
                value={car_brand}
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
                value={car_model}
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
            {data?.data?.car_photos.map((item) => (
              <TouchableOpacity
                disabled
                style={tw`w-[30%] h-16 my-2 justify-center items-center text-center`}
                key={item.id}
              >
                <View style={tw`relative`}>
                  <Image
                    style={{ width: 112, height: 64, borderRadius: 8 }}
                    source={{ uri: item?.photo }}
                    resizeMode="cover"
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setSelectModalVisible(true);
                      // console.log(item);
                      setPhotoId(item?.id);
                    }}
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
              onPress={() => {
                handleUpdateProfile();
              }}
              title="Save & Change"
              containerStyle={tw``}
            />
          </View>
        </View>
      </ScrollView>

      {/*  ==========------------------------------- successful modal open ============ */}

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
              <Pressable
                style={tw`p-3`}
                onPress={() => setSelectModalVisible(false)}
              >
                <SvgXml xml={IconCross} />
              </Pressable>
            </View>

            <View style={tw`w-full m-4`}>
              <TouchableOpacity
                onPress={imagePickSwap}
                style={tw`flex-row justify-center items-center border border-[#0063E580] w-full p-1 rounded-lg gap-2 mb-2`}
              >
                <SvgXml xml={IconSwapImage} />
                <Text>Swap image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handlePhotoDelete}
                style={tw`flex-row justify-center items-center border border-[#C47575] w-full p-1 rounded-lg gap-2`}
              >
                <SvgXml xml={IconDelete} />
                <Text>Delete image</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default editProfile;
