import React from "react";
import { Text, View, StyleSheet } from "react-native";

const History = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: "black" }}>this is HistoryScreen</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default History;
