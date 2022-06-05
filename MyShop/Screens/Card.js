import React from "react";
import { AntDesign } from "@expo/vector-icons";
import Screen from "./../component/Screen";

const Card = () => {
  return (
    <Screen>
      <View style={Styles.count}>
        <TouchableOpacity>
          <AntDesign name="pluscircle" size={24} color="lightseagreen" />
        </TouchableOpacity>
        <Text style={{ textAlign: "center" }}>0</Text>
        <TouchableOpacity>
          <AntDesign name="minuscircle" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default Card;
