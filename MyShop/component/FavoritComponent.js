import { useRef, useEffect, useContext } from "react";
import { View, Text, Animated, Easing } from "react-native";

import { AppContext } from "./AppContext";

const FavoritComponent = () => {
  const { setFavorit, imageFavorit } = useContext(AppContext);
  // console.log(imageFavorit);
  const Animation = useRef(new Animated.Value(0)).current;
  const Animation2 = useRef(new Animated.Value(0)).current;

  Animated.sequence([
    Animated.timing(Animation, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
      // easing: Easing.back,
    }),
    Animated.timing(Animation2, {
      toValue: 1,
      duration: 300,
      delay: 800,
      useNativeDriver: false,
    }),
  ]).start(() => {
    setFavorit(false);
  });

  const bottomSave = Animation2.interpolate({
    inputRange: [0, 1],
    outputRange: [80, 0],
  });
  const scaleSave = Animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1.1],
  });

  const opacity = Animation2.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.1, 0],
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
        right: 30,

        // zIndex: 100,
        bottom: bottomSave,
        opacity,
      }}
    >
      <Animated.Image
        style={{
          //  width: widthSave,
          //   height: heightSave ,
          height: 45,
          width: 45,
          transform: [{ scale: scaleSave }],
        }}
        source={{
          uri: imageFavorit,
        }}
      />
    </Animated.View>
  );
};

export default FavoritComponent;
