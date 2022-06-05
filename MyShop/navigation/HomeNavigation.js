// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListScreen from "../Screens/ListScreen";
import HomeScreen from "./../Screens/HomeScreen";
import DetailScreen from "./../Screens/DetailScreen";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { useTheme } from "react-native-paper";

const stack = createSharedElementStackNavigator();

const HomeNavigator = () => {
  const { colors } = useTheme();
  const options = {
    headerBackTitleVisible: false,
    cardStyleInterpolator: ({ current: { progress } }) => {
      return {
        cardStyle: {
          opacity: progress,
        },
      };
    },
  };
  return (
    // <NavigationContainer>
    <stack.Navigator
      screenOptions={() => ({
        headerStyle: { backgroundColor: colors.background },
        headerTitleStyle: { color: colors.accent, textAlign: "center" },
      })}
    >
      <stack.Screen name="Home" component={HomeScreen} />

      <stack.Screen name="List" component={ListScreen} />
      <stack.Screen
        name="Detail"
        component={DetailScreen}
        options={() => options}
      />
    </stack.Navigator>
    /* </NavigationContainer> */
  );
};

export default HomeNavigator;
