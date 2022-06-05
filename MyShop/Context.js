import React, { useState } from "react";
import FavoritComponent from "./component/FavoritComponent";
// import { DefaultTheme, DarkTheme } from "react-native-paper";
import {
  DefaultTheme,
  DarkTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { AppContext } from "./component/AppContext";
import { useColorScheme } from "react-native";

export const MyContext = ({ children }) => {
  const [card, setCard] = useState([]);
  const [favorit, setFavorit] = useState(false);
  const [imageFavorit, setImageFavorit] = useState("");
  const [allFavorite, setAllFavorite] = useState([]);
  const colorSchema = useColorScheme();
  // const [theme, setTheme] = useState(colorSchema === "dark" ? "dark" : "light");
  const [theme, setTheme] = useState("light");

  const Mytheme =
    theme === "light"
      ? {
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            primary: "#f5f5f5", //whiteSmoke
            accent: "#000", //white
            backdrop: "#fff",
            background: "#fff",
          },
        }
      : {
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            primary: "#121212", //whiteSmoke
            accent: "#fff", //white
            background: "#121212",
          },
        };
  // console.log(Mytheme);

  const toggleThem = () => {
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  };

  return (
    <AppContext.Provider
      value={{
        card,
        setCard,
        favorit,
        setFavorit,
        imageFavorit,
        setImageFavorit,
        allFavorite,
        setAllFavorite,
        toggleThem,
        // Mytheme,
      }}
    >
      <PaperProvider theme={Mytheme}>
        {children}
        {favorit ? <FavoritComponent /> : null}
      </PaperProvider>
    </AppContext.Provider>
  );
};
