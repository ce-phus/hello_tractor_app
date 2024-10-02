import { StatusBar } from "expo-status-bar";
import { Tabs } from "expo-router";
import { Image, Text, View, Dimensions } from "react-native";
import { icons } from "../../constants";
import React from 'react';

const TabIcon = ({ icon, color, name, focused }) => {
  const windowWidth = Dimensions.get('window').width; // Get screen width
  const isTablet = windowWidth > 768; // Assuming > 768px width as tablet
  
  return (
    <View className="flex items-center justify-center gap-2" style={{ minWidth: isTablet ? 100 : 70 }}>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} ${isTablet ? "text-base" : "text-xs"}`}
        style={{ color: color, textAlign: 'center' }} // Text alignment for better centering
        numberOfLines={1} // Ensures the text doesn't wrap onto another line
      >
        {name}
      </Text>
    </View>
  );
};

const Tablayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#ff461e",
          tabBarInactiveTintColor: "#161622",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopWidth: 1,
            borderTopColor: "#e5e4e2",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Jobs"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="bookings"
          options={{
            title: "Bookings",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Bookings"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                name="Create"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="alljobs"
          options={{
            title: "Farms",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.farm}
                color={color}
                name="Farms"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="podcasts"
          options={{
            title: "Podcasts",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.podcast}
                color={color}
                name="Podcasts"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default Tablayout;
