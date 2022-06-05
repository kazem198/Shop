import React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "react-native-paper";

const Screen = ({ children, style }) => {
  const { colors } = useTheme();
  // { backgroundColor: colors.primary }
  return (
    <View style={[styles.container]}>
      <View style={[styles.screen, style]}>
        {children}
        <StatusBar style="dark" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "floralwhite",
    // backgroundColor: "ghostwhite",
    // backgroundColor: "honeydew",
    // backgroundColor: "ivory",
    // backgroundColor: "whitesmoke",
  },
  screen: {
    marginTop: Constants.statusBarHeight,
    marginBottom: 10,
    flex: 1,
  },
});
export default Screen;
