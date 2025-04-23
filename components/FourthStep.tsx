import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import tw from "@/lib/tailwind";
import React from "react";
import { Calendar } from "react-native-calendars";

const Times = [
  {
    label: "12:00 PM",
    isOpen: false,
  },
  {
    label: "01:00 PM",
    isOpen: true,
  },
  {
    label: "02:00 PM",
    isOpen: true,
  },
  {
    label: "03:00 PM",
    isOpen: true,
  },
  {
    label: "04:00 PM",
    isOpen: true,
  },
  {
    label: "05:00 PM",
    isOpen: true,
  },
  {
    label: "06:00 PM",
    isOpen: true,
  },
  {
    label: "07:00 PM",
    isOpen: false,
  },
];

const FourthStep = () => {
  const [selectedDate, setSelectedDate] = React.useState("");
  const [markedDates, setMarkedDates] = React.useState({});
  const [selectTime, setSelectTime] = React.useState<{
    label: string;
    isOpen: boolean;
  } | null>(null);

  const today = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format
  // Custom rendering for each day
  const handleDayPress = (day) => {
    // Prevent selecting a day before today
    // if (day.dateString < today) {
    //   return;
    // }

    setSelectedDate(day.dateString);
    setMarkedDates({
      [day.dateString]: {
        selected: true,
        marked: true,
        selectedColor: "#00BFFF",
      },
    });
  };

  console.log("Selected date:", selectedDate);

  const renderDay = (day) => {
    const isPastDate = day.dateString < today;
    return (
      <TouchableOpacity
        onPress={() => handleDayPress(day)}
        disabled={isPastDate} // Disable past dates
        style={{
          backgroundColor: isPastDate
            ? "rgba(0, 0, 0, 0.1)" // Gray out past dates
            : selectedDate === day.dateString
            ? tw.color("bg-primary")
            : "transparent", // Gray out previous dates
          borderRadius: 20,
          width: 35,
          height: 35,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: isPastDate
              ? "rgba(0, 0, 0, 0.5)" // Dim text color for past dates
              : selectedDate === day.dateString
              ? "#FFFFFF"
              : "#000000", // Dim text color for past dates
          }}
        >
          {day.day}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView style={tw`pb-32`} showsVerticalScrollIndicator={false}>
      <View style={tw`mb-6`}>
        <Text style={tw`font-DegularDisplaySemibold text-xl text-regularText`}>
          Select time
        </Text>
        <Calendar
          // Specify the current date
          current={new Date().toISOString().split("T")[0]}
          // Mark the selected date
          markedDates={markedDates}
          // Callback that gets called when the user selects a day

          dayComponent={({ date, state }) => renderDay(date, state)} // Apply custom day rendering
          style={tw`rounded-lg`}
        />

        <View style={tw`mt-4`}>
          <View
            style={tw`flex-row flex-wrap justify-start items-center w-full`}
          >
            {Times.map((time, index) => (
              <TouchableOpacity
                disabled={!time.isOpen}
                style={tw`${
                  selectTime?.label === time.label
                    ? "bg-primary"
                    : !time.isOpen
                    ? "bg-gray-200"
                    : "bg-transparent"
                } rounded-lg border w-1/3 border-gray-50`}
                key={index}
                onPress={() => setSelectTime(time)}
              >
                <Text
                  style={tw`font-DegularDisplaySemibold text-base ${
                    selectTime?.label === time.label
                      ? "text-white"
                      : "text-regularText"
                  }   rounded-2xl text-center px-6 py-3`}
                >
                  {time?.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default FourthStep;
