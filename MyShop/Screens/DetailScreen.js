import React, { useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  PanResponder,
  Image,
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Subheading,
  Caption,
} from "react-native-paper";
import Screen from "./../component/Screen";
import { Fontisto } from "@expo/vector-icons";

import { SharedElement } from "react-navigation-shared-element";
import { AppContext } from "./../component/AppContext";

const DetailScreen = ({ route, navigation }) => {
  const { data } = route.params;

  const { card, setCard } = useContext(AppContext);

  const AddBasket = (data) => {
    setCard((old) => [...old, { data }]);
    navigation.goBack();
  };

  useEffect(() => {
    Animated.timing(animatedvalue.y, {
      toValue: Hight_Screen - 660,

      useNativeDriver: false,
      duration: 800,
      delay: 10,
    }).start();
  }, []);

  const Hight_Screen = Dimensions.get("window").height;
  const animatedvalue = new Animated.ValueXY({ x: 0, y: Hight_Screen });

  const pan = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return !(gestureState.dx === 0 && gestureState.dy === 0);
    },
    onPanResponderGrant: (evt, gestureState) => {
      animatedvalue.extractOffset();
    },
    onPanResponderMove: (evt, gestureState) => {
      // if (gestureState.dx < 150)
      animatedvalue.setValue({ x: gestureState.dx, y: 0 });
    },
    onPanResponderRelease: (evt, gestureState) => {
      const x = gestureState.dx;
      Animated.timing(animatedvalue, {
        toValue: { x: 0, y: 0 },
        duration: 100,
        // speed: 30,
        useNativeDriver: false,
      }).start(() => {
        if (x > 80) {
          navigation.goBack();
        }
      });
    },
  });

  return (
    <Screen>
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ translateX: animatedvalue.x }],
          },
        ]}
        {...pan.panHandlers}
      >
        <SharedElement
          id={`item.${data.id}.image_url`}
          style={{ backgroundColor: "white" }}
        >
          <Image
            source={{ uri: data.image.replace("https", "http") }}
            style={{
              // width: "100%",
              height: 200,
              backgroundColor: "white",
              margin: 10,
              // flex: 1,
            }}
            resizeMode="contain"
          />
        </SharedElement>

        <Animated.View
          style={[
            styles.myPan,
            { transform: [{ translateX: 0 }, { translateY: animatedvalue.y }] },
          ]}
        >
          <Card.Content style={{ margin: 1, padding: 5 }}>
            <Subheading>{data.title}</Subheading>
            <ScrollView
              style={{ height: 140 }}
              showsVerticalScrollIndicator={false}
            >
              <Caption style={{ marginVertical: 2 }}>
                {data.description}
              </Caption>
            </ScrollView>
            <SharedElement id={`item.${data.id}.price`}>
              <Subheading
                style={{
                  textAlign: "center",
                  color: "royalblue",
                  marginTop: 15,
                }}
              >
                Price: {data.price}$
              </Subheading>
            </SharedElement>
          </Card.Content>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              padding: 10,
              // alignItems: "stretch",
              // marginBottom: 1500,
            }}
          >
            <Button color="tomato">Cancel</Button>
            <TouchableOpacity
              onPress={() => AddBasket(data)}
              style={{ zIndex: 100 }}
            >
              <Fontisto
                name="shopping-basket-add"
                size={24}
                color="royalblue"
              />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </Screen>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "whitesmoke",
    // borderTopColor: "white",
    flex: 1,
    // position: "absolute",
  },
  myPan: {
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginHorizontal: 10,
    // height: 500,
    // padding: 10,
  },
});
DetailScreen.sharedElements = (route) => {
  const { data } = route.params;
  // console.log(data);
  return [
    {
      id: `item.${data.id}.image_url`,
      animation: "move",
      resize: "clip",
    },
    {
      id: `item.${data.id}.price`,
      animation: "fade",
      resize: "clip",
    },
    {
      id: `item.${data.id}.image_Basket`,
      animation: "move",
      resize: "clip",
    },
  ];
};
export default DetailScreen;
