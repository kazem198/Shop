import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Card, DataTable, Paragraph, Text, useTheme } from "react-native-paper";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import { AppContext } from "./AppContext";

const HomeCard = ({ data }) => {
  const [item, setItem] = useState([]);
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const { setFavorit, setImageFavorit, setAllFavorite, allFavorite } =
    useContext(AppContext);

  useEffect(() => {
    fetch(`http://fakestoreapi.com/products/category/${data}`)
      .then((res) => res.json())
      .then((json) => {
        setItem(json);
        // console.log(item + "5555");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err + "    8544844");
      });
  }, [data]);

  return (
    <>
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
        item.map((data, index) => (
          <Card
            key={index}
            style={{
              marginTop: 15,
              backgroundColor: colors.backdrop,
              width: 150,
            }}
          >
            <View
              style={{
                // marginTop: 20,
                flexDirection: "row",
                justifyContent: "flex-end",
                padding: 5,
                // backgroundColor: "red",
              }}
            >
              <Ionicons
                style={{
                  color: allFavorite.some((t) => t.title == data.title)
                    ? "tomato"
                    : "royalblue",
                  // margin: 10,
                  // textAlign: "left",
                  // backgroundColor: "red",
                }}
                name="heart-circle"
                size={24}
                onPress={() => {
                  setImageFavorit(data.image.replace("https", "http"));
                  setFavorit(true);
                  setAllFavorite((pre) => {
                    return [...pre, data];
                  });
                }}
              />
            </View>

            <Card.Cover
              style={{ width: 100, height: 100, alignSelf: "center" }}
              resizeMode="stretch"
              source={{
                uri: data.image.replace("https", "http"),
              }}
            />
            <Card.Content>
              <Paragraph style={{ textAlign: "center", color: colors.accent }}>
                $ 200000
              </Paragraph>
              <Text style={{ color: colors.accent }}>Popular Fashion</Text>
            </Card.Content>
            <DataTable.Row>
              <DataTable.Cell numeric>
                <AntDesign name="star" size={20} color="gold" />
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AntDesign name="star" size={20} color="gold" />
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AntDesign name="star" size={22} color="gold" />
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AntDesign name="star" size={22} color="gold" />
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <AntDesign name="staro" size={20} color="lightsalmon" />
              </DataTable.Cell>
            </DataTable.Row>
          </Card>
        ))
      )}
    </>
  );
};

export default HomeCard;
