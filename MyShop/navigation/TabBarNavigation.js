import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/HomeScreen";
import Favorit from "../Screens/Favorit";
import History from "../Screens/History";
import Profile from "../Screens/Profile";
import { AntDesign } from "@expo/vector-icons";
import HomeNavigator from "./HomeNavigation";

import { useContext } from "react";
import { AppContext } from "./../component/AppContext";
import * as Animatable from "react-native-animatable";
import { useTheme } from "react-native-paper";

const Tab = createBottomTabNavigator();
const TabBarNavigation = () => {
  const { colors } = useTheme();
  const { favorit } = useContext(AppContext);
  const zoomOut = {
    0: {
      scale: 1,
    },
    0.5: {
      scale: 1.3,
    },
    1: {
      scale: 1,
    },
  };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeNavigator") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "Favorit") {
            iconName = focused ? "hearto" : "hearto";
          } else if (route.name === "History") {
            iconName = focused ? "message1" : "message1";
          } else if (route.name === "Profile2") {
            iconName = focused ? "user" : "user";
          }

          // You can return any component that you like here!
          return <AntDesign name={iconName} color={color} size={size} />;
        },
        tabBarStyle: { backgroundColor: colors.primary },

        // headerTitleStyle: { textAlign: "center" },

        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Favorit"
        component={Favorit}
        options={{ tabBarIconStyle: { position: "relative" } }}
      />

      <Tab.Screen name="History" component={History} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => {
            if (favorit)
              return (
                <Animatable.View
                  animation={zoomOut}
                  delay={1000}
                  duration={300}
                >
                  <AntDesign name="user" size={size} color={color} />
                </Animatable.View>
              );
            else {
              return <AntDesign name="user" color={color} size={size} />;
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabBarNavigation;
