import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import * as Calendar from "expo-calendar";

const FourthStep = () => {
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        console.log("Permission granted");
      }
    })();
  }, []);

  const handleCreateEvent = async () => {
    const calendars = await Calendar.getCalendarsAsync();
    const calendar = calendars.find((c) => c.allowsModifications);
    if (!calendar) return;

    await Calendar.createEventAsync(calendar.id, {
      title: "Test Event",
      startDate: new Date(Date.now() + 60 * 1000),
      endDate: new Date(Date.now() + 60 * 60 * 1000),
      timeZone: "Asia/Dhaka",
      location: "Home",
    });

    alert("Event created!");
  };

  return (
    <View>
      <Text>📅 Calendar Demo</Text>
      <Button title="Create Event" onPress={handleCreateEvent} />
    </View>
  );
};

export default FourthStep;
