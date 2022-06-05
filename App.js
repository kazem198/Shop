import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabBarNavigation from "./MyShop/navigation/TabBarNavigation";

import { useContext } from "react";
import { AppContext } from "./MyShop/component/AppContext";
import { MyContext } from "./MyShop/Context";

export default function App() {
  // const { Mytheme } = useContext(AppContext);
  // console.log(Mytheme + "kkdkd");

  const Stack = createNativeStackNavigator();
  return (
    <MyContext>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={TabBarNavigation}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MyContext>
  );
}
