import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Screen from "./../component/Screen";
import {
  Avatar,
  Card,
  Headline,
  Paragraph,
  Subheading,
  Title,
  Chip,
} from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { Searchbar, useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeCard from "../component/HomeCard";

import { AppContext } from "./../component/AppContext";

const HomeScreen = ({ navigation }) => {
  const [categoris, setCatigorys] = useState([]);
  const [categori, setCatigory] = useState("electronics");
  const { colors } = useTheme();
  const getData = () => {
    fetch("http://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => {
        setCatigorys(json);
        // console.log(json);
      })
      .catch((err) => {
        console.log(err, "kazem");
      });
  };

  useEffect(() => {
    getData();
  }, []);
  const { card, setFavorit } = useContext(AppContext);
  // console.log(categoris);

  return (
    <Screen style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={styles.top}>
          <Avatar.Image
            size={32}
            source={require("../assets/image/IMG_E0605.jpg")}
          />
          <View style={styles.iconBasket}>
            <TouchableOpacity onPress={() => setFavorit(true)}>
              <Avatar.Text
                size={24}
                label={card.length}
                // color={colors.accent}
                style={[
                  styles.badgeBasket,
                  { backgroundColor: "royalblue", color: colors.accent },
                ]}
              />

              <AntDesign name="shoppingcart" size={32} color={colors.accent} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.title}>
          <Headline style={{ color: colors.accent }}>Fashion Shop</Headline>
          <Subheading style={{ color: colors.accent }}>
            Get papular Fashion from Home
          </Subheading>
        </View>
        <Searchbar
          placeholder="Search the Clothes you need"
          // onChangeText={onChangeSearch}
          // value="0"
          style={{ marginTop: 20, backgroundColor: colors.backdrop }}
          placeholderTextColor="lightgray"
        />
        <View style={[styles.top, { marginVertical: 20 }]}>
          <Title style={{ color: colors.accent }}>Categories</Title>
          <Paragraph style={{ color: "royalblue" }}>See All</Paragraph>
        </View>

        <View style={styles.categories}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Card
              style={[
                styles.categoriesCard,
                { backgroundColor: colors.surface },
              ]}
            >
              <Card.Content>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("List", { data: "women's clothing" })
                  }
                >
                  <Ionicons
                    name="ios-woman-outline"
                    size={40}
                    color="royalblue"
                    style={{
                      textAlign: "center",

                      color: "tomato",
                    }}
                  />
                  <Subheading
                    style={{
                      textAlign: "center",
                      color: colors.accent,
                      fontWeight: "bold",
                    }}
                  >
                    woman
                  </Subheading>
                </TouchableOpacity>
              </Card.Content>
            </Card>

            <Card
              style={[
                styles.categoriesCard,
                { backgroundColor: colors.surface },
              ]}
            >
              <Card.Content>
                <Ionicons
                  name="ios-man-outline"
                  size={40}
                  color="royalblue"
                  style={{
                    textAlign: "center",
                    color: "tomato",
                  }}
                />
                <Subheading
                  style={{
                    textAlign: "center",
                    color: colors.accent,
                    fontWeight: "bold",
                  }}
                >
                  man{" "}
                </Subheading>
              </Card.Content>
            </Card>
            <Card
              style={[
                styles.categoriesCard,
                { backgroundColor: colors.surface },
              ]}
            >
              <Card.Content>
                <Ionicons
                  name="shirt-outline"
                  size={40}
                  color="royalblue"
                  style={{
                    textAlign: "center",
                    color: "tomato",
                  }}
                />
                <Subheading
                  style={{
                    textAlign: "center",
                    color: colors.accent,
                    fontWeight: "bold",
                  }}
                >
                  Tshirt
                </Subheading>
              </Card.Content>
            </Card>
            <Card
              style={[
                styles.categoriesCard,
                { backgroundColor: colors.surface },
              ]}
            >
              <Card.Content>
                <MaterialCommunityIcons
                  name="shoe-heel"
                  size={40}
                  color="royalblue"
                  style={{
                    textAlign: "center",
                    color: "tomato",
                  }}
                />
                <Subheading
                  style={{
                    textAlign: "center",
                    color: colors.accent,
                    fontWeight: "bold",
                  }}
                >
                  woman shoes
                </Subheading>
              </Card.Content>
            </Card>
            <Card
              style={[
                styles.categoriesCard,
                { backgroundColor: colors.surface },
              ]}
            >
              <Card.Content>
                <MaterialCommunityIcons
                  name="shoe-formal"
                  size={40}
                  color="royalblue"
                  style={{
                    textAlign: "center",
                    color: "tomato",
                  }}
                />
                <Subheading
                  style={{
                    textAlign: "center",
                    color: colors.accent,
                    fontWeight: "bold",
                  }}
                >
                  man shoes
                </Subheading>
              </Card.Content>
            </Card>
          </ScrollView>
        </View>

        <View style={[styles.top, { marginVertical: 5 }]}>
          <Title style={{ color: colors.accent }}>Popular Fashion</Title>
          <Subheading style={{ color: "royalblue" }}>choose one</Subheading>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {categoris.map((item, index) => (
            <Chip
              icon="information"
              key={index}
              onPress={() => setCatigory(item)}
              // style={{ marginHorizontal: 5 }}
              style={[
                { marginHorizontal: 5 },
                item === categori
                  ? {
                      backgroundColor: colors.disabled,
                    }
                  : { backgroundColor: colors.backdrop },
              ]}
            >
              <Text
                style={
                  item === categori
                    ? {
                        color: colors.primary,
                      }
                    : { color: colors.accent }
                }
              >
                {item}
              </Text>
            </Chip>
          ))}
        </ScrollView>

        <View
          style={{
            marginTop: 5,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          <HomeCard data={categori} />
          {/* <HomeCard />

          <HomeCard />
          <HomeCard /> */}
        </View>
      </ScrollView>
    </Screen>
  );
};
const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    // alignItems: "center",
    marginHorizontal: 15,
    flex: 1,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    // flex: 1,
  },
  iconBasket: {
    position: "relative",
    marginHorizontal: 8,
  },
  badgeBasket: {
    position: "absolute",
    left: 15,
    top: -13,
  },
  title: {
    marginTop: 20,
  },
  categories: {
    flexDirection: "row",
  },
  categoriesCard: {
    margin: 5,
    width: 150,
    // backgroundColor: "white",
    borderRadius: 15,
  },
});

export default HomeScreen;
