import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  PanResponder,
  Animated,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import {
  Card,
  Paragraph,
  Title,
  Headline,
  Caption,
  Avatar,
  Button,
  Colors,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { SharedElement } from "react-navigation-shared-element";
import * as Animatable from "react-native-animatable";
import { MaterialIcons } from "@expo/vector-icons";

import Screen from "./../component/Screen";

import { AppContext } from "./../component/AppContext";

const ListScreen = ({ navigation, route }) => {
  const Hight_Screen = Dimensions.get("window").height;
  const animatedvalue = new Animated.ValueXY({ x: 0, y: Hight_Screen - 120 });
  // console.log(route.params.data);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { card, setCard } = useContext(AppContext);

  const sum = useCallback(() => {
    return card.reduce((pre, curr) => {
      return pre + curr.data.price;
    }, 0);
  }, [card]);

  const onDelete = (item) => {
    Animated.spring(animatedvalue.y, {
      toValue: 0,
      tension: 30,
      // speed: 30,
      useNativeDriver: false,
    }).start(() => {
      const filteritem = card.filter((p) => p.data.id !== item.id);
      setCard(filteritem);
    });
    // const filteritem = card.filter((p) => p.data.id !== item.id);
    // setCard(filteritem);
    // animatedvalue.setValue({ x: 0, y: 0 });
  };

  const getData = () => {
    fetch("http://fakestoreapi.com/products/category/women's clothing")
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        setLoading(false);
        setData(json);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const pan = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return !(gestureState.dx === 0 && gestureState.dy === 0);
      // return true;
    },
    onPanResponderGrant: (evt, gestureState) => {
      animatedvalue.extractOffset();
    },
    onPanResponderMove: (evt, gestureState) => {
      // console.log(gestureState);
      animatedvalue.setValue({ x: 0, y: gestureState.dy });
    },
    onPanResponderRelease: (evt, gestureState) => {
      // console.log(gestureState);
      if (gestureState.moveY > Hight_Screen - 200) {
        Animated.spring(animatedvalue.y, {
          toValue: 0,
          tension: 1,
          useNativeDriver: false,
        }).start();
      } else if (gestureState.moveY < 200) {
        Animated.spring(animatedvalue.y, {
          toValue: 0,
          tension: 1,
          useNativeDriver: false,
        }).start();
      } else if (gestureState.dy < 0) {
        Animated.spring(animatedvalue.y, {
          toValue: -Hight_Screen + 200,
          tension: 1,
          useNativeDriver: false,
        }).start();
      } else if (gestureState.dy > 0) {
        // console.log("first");
        Animated.spring(animatedvalue.y, {
          toValue: Hight_Screen - 200,
          tension: 1,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const animatedStyle = {
    transform: animatedvalue.getTranslateTransform(),
  };

  const Top = animatedvalue.y.interpolate({
    inputRange: [0, Hight_Screen - 120],
    outputRange: [-Hight_Screen - 200, 0],
  });

  let widthItem = animatedvalue.y.interpolate({
    inputRange: [0, Hight_Screen - 120],
    outputRange: [350, 40],

    extrapolate: "clamp",
  });
  let opacityItem = animatedvalue.y.interpolate({
    inputRange: [0, Hight_Screen - 120],
    outputRange: [1, 0],

    extrapolate: "clamp",
  });
  // console.log(FlexDir);
  // console.log(HeightCard);
  return (
    <Screen>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      ) : (
        <Animated.View
          style={[
            {
              flex: 1,
            },
          ]}
        >
          <Animated.View style={{ position: "relative", top: Top }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                backgroundColor: "white",
                paddingVertical: 10,
                marginBottom: 10,
              }}
            >
              <Animatable.View animation="fadeInDown" delay={100}>
                <Ionicons
                  name="ios-woman-outline"
                  size={40}
                  color="royalblue"
                />
              </Animatable.View>
              <Animatable.Text animation="fadeInRight" delay={100}>
                <Title>{route.params.data}</Title>
              </Animatable.Text>
            </View>

            <FlatList
              style={{ marginBottom: 100 }}
              data={data}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ marginRight: 10 }}
                  onPress={() => navigation.navigate("Detail", { data: item })}
                >
                  <View style={Styles.card}>
                    <SharedElement id={`item.${item.id}.image_url`}>
                      <Image
                        source={{ uri: item.image.replace("https", "http") }}
                        style={{
                          width: 100,
                          height: 100,
                          borderTopLeftRadius: 20,
                        }}
                        resizeMode="contain"
                      />
                    </SharedElement>
                    <Card.Content>
                      <Caption>{item.category}</Caption>
                      <SharedElement id={`item.${item.id}.price`}>
                        <Paragraph>{item.price}$</Paragraph>
                      </SharedElement>
                    </Card.Content>
                    <MaterialIcons name="more-vert" size={24} color="black" />
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          </Animated.View>
          {card.length > 0 && (
            <Animated.View
              {...pan.panHandlers}
              style={[
                animatedStyle,
                {
                  // flex: 1,
                  height: Hight_Screen,
                  backgroundColor: "lightgray",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  marginHorizontal: 20,
                  borderRadius: 10,
                  marginBottom: 10,
                  position: "absolute",
                  right: 0,
                  left: 0,
                  // bottom: BottomCard,
                  bottom: -90,
                  zIndex: 100,
                },
              ]}
            >
              {card.map((item, index) => (
                <Animated.View
                  style={[
                    {
                      margin: 5,

                      // backgroundColor: "whitesmoke",
                      justifyContent: "space-between",
                      width: widthItem,
                    },
                  ]}
                  key={index}
                >
                  <Animated.View
                    style={{
                      // flex: 1,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: widthItem,
                    }}
                  >
                    <SharedElement id={`item.${item.data.id}.image_url`}>
                      <Avatar.Image
                        size={32}
                        source={{
                          uri: item.data.image.replace("https", "http"),
                        }}
                      />
                    </SharedElement>
                    <Animated.Text style={{ opacity: opacityItem }}>
                      {item.data.price + " $"}
                    </Animated.Text>
                    <Animated.Text
                      style={{
                        opacity: opacityItem,
                        // display: "none",
                        // width: FlexDir,
                      }}
                    >
                      {item.data.category}
                    </Animated.Text>
                    <Animated.View
                      style={{
                        opacity: opacityItem,
                        // display: "none",
                        // width: FlexDir,
                      }}
                    >
                      <MaterialIcons
                        onPress={() => {
                          onDelete(item.data);
                        }}
                        name="delete-forever"
                        size={24}
                        color="tomato"
                      />
                    </Animated.View>
                  </Animated.View>
                </Animated.View>
              ))}
              <View
                style={{
                  // flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 100,
                  // backgroundColor: "red",
                  width: "100%",
                  // opacity: opacityItem,
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 20, margin: 5 }}>
                  sum: {sum()} $
                </Text>
                <Button
                  style={{ margin: 5, backgroundColor: Colors.blue300 }}
                  labelStyle={{ color: "white" }}
                  // icon="camera"
                  mode="contained"
                  // onPress={() => console.log("Pressed")}
                >
                  Payment
                </Button>
              </View>
            </Animated.View>
          )}
        </Animated.View>
      )}
    </Screen>
  );
};
const Styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    // paddingRight: 15,
    // paddingVertical: 10,
    borderRadius: 20,
    margin: 10,
    marginVertical: 5,
  },
});

export default ListScreen;
