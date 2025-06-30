import {
  IconAdd,
  IconCameraProfile,
  IconCar,
  IconEdit,
} from "@/assets/icon/icon";
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import tw from "@/lib/tailwind";
import { useRouter } from "expo-router";
import React from "react";
import { SvgXml } from "react-native-svg";
import { useGetProfileQuery } from "@/redux/apiSlices/authSlices";
import {
  useCarPhotoMutation,
  useGetServiceHistoryQuery,
} from "@/redux/apiSlices/carApiSlices";
import { _HEIGHT, _WIDTH } from "@/utils/utils";

const profile = () => {
  const router = useRouter();

  const { data, isLoading, refetch } = useGetProfileQuery({});
  const [carPhotoMutation, { error }] = useCarPhotoMutation();
  const { data: serviceHistory } = useGetServiceHistoryQuery({});

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;

        // Now call upload API
        uploadImage(uri);
      }
    } catch (error) {
      console.log(error, "Pick==================");
    }
  };

  const uploadImage = async (uri: string) => {
    const fileName = uri.split("/").pop();
    try {
      const formData = new FormData();
      formData.append("photo", {
        uri: uri,
        name: fileName,
        type: "image/jpeg",
      } as any);

      await carPhotoMutation(formData).unwrap();
    } catch (error) {
      console.log(error, "Upload Image Error------------");
    }
  };

  return (
    <View style={tw`flex-1 `}>
      <View style={tw`flex-row px-6 justify-between items-center my-6`}>
        <Text style={tw`font-DegularDisplayBold text-2xl`}>My Profile</Text>
        <TouchableOpacity onPress={() => router.push("/editProfile")}>
          <View
            style={tw`bg-primary w-28 h-8 rounded-full mx-auto flex-row justify-center items-center gap-2 `}
          >
            <SvgXml xml={IconEdit} />
            <Text style={tw`text-sm font-DegularDisplayBold text-white`}>
              Edit profile
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl
            colors={["#0063E5"]}
            refreshing={isLoading}
            onRefresh={refetch}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-2 px-6`}
      >
        <View style={tw`w-full   items-center`}>
          <View style={tw`relative`}>
            <Image
              source={{
                uri: data?.data?.photo,
              }}
              style={tw`w-24 h-24  rounded-full `}
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={() => router.push("/editProfile")}
              style={tw`absolute p-2 rounded-full bg-primary bottom-0 right-0`}
            >
              <SvgXml xml={IconCameraProfile} />
            </TouchableOpacity>
          </View>
          <Text
            style={tw`font-DegularDisplayBold text-base text-[#262626] my-2`}
          >
            {data?.data?.name}
          </Text>
          <Text style={tw`font-DegularDisplayMedium text-xs text-[#6D6D6D]`}>
            {data?.data?.email}
          </Text>
        </View>

        {/* ========= car details ==================== */}

        <View style={tw` mb-6`}>
          <Text
            style={tw`font-DegularDisplaySemibold text-xl text-regularText mb-4`}
          >
            Car Details
          </Text>
          {data?.data?.car_model ? (
            <View style={tw`flex-row gap-2 mb-2`}>
              <SvgXml xml={IconCar} />
              <Text
                style={tw`font-DegularDisplayMedium text-base text-regularText`}
              >
                {data?.data?.car_model}
              </Text>
            </View>
          ) : null}

          <View style={tw`flex-row flex-wrap justify-between`}>
            {data?.data?.car_photos?.length === 0 ? (
              <View>
                <Text style={tw`font-bold text-xl text-center`}>
                  No Car Available..!
                </Text>
              </View>
            ) : (
              <FlatList
                numColumns={3}
                contentContainerStyle={tw` gap-3  self-center`}
                columnWrapperStyle={tw` gap-3`}
                scrollEnabled={false}
                data={data?.data?.car_photos}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={[tw`  justify-center items-center text-center`]}
                    >
                      <Image
                        style={[
                          tw` rounded-lg aspect-video `,
                          {
                            height: _HEIGHT * 0.07,
                          },
                        ]}
                        source={{ uri: item?.photo }}
                      />
                    </TouchableOpacity>
                  );
                }}
              />
            )}
          </View>

          <TouchableOpacity
            onPress={pickImage}
            style={tw`w-full border border-primary rounded-xl py-3 flex justify-center items-center mt-2`}
          >
            <SvgXml xml={IconAdd} />
          </TouchableOpacity>
        </View>

        {/* ========== service history ============== */}

        <View style={tw`mb-40`}>
          <Text
            style={tw`font-DegularDisplaySemibold text-xl text-regularText mb-4`}
          >
            Service history
          </Text>
          <View>
            {serviceHistory?.data?.data.length === 0 ? (
              <View>
                <Text
                  style={tw`font-DegularDisplayMedium text-lg text-black my-4 text-center`}
                >
                  NO service History !
                </Text>
              </View>
            ) : (
              serviceHistory?.data?.data.map((item) => {
                return (
                  <TouchableOpacity key={item?.id}>
                    <View
                      style={tw`flex-row justify-between px-4 py-1.5 my-2 rounded-lg bg-[#FFFFFF]`}
                    >
                      <View>
                        <Text
                          style={tw`font-DegularDisplaySemibold text-base text-regularText`}
                        >
                          {item?.service_name}
                        </Text>
                        <Text style={tw`  text-sm mt-2 `}>
                          {item?.service_type.toUpperCase()}:{" "}
                          <Text
                            style={tw`text-[#0063E5] font-DegularDisplaySemibold`}
                          >
                            ${item?.price}
                          </Text>
                        </Text>
                      </View>
                      <View style={tw`flex justify-end`}>
                        <View style={tw`flex-row justify-end gap-2`}>
                          <Text
                            style={tw`font-DegularDisplayMedium text-xs text-[#262626] justify-end`}
                          >
                            {item?.booking_time}
                          </Text>
                        </View>

                        <Text
                          style={tw`font-DegularDisplayMedium text-base text-[#262626] `}
                        >
                          {item?.booking_date}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default profile;
