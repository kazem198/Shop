import { createContext } from "react";

export const AppContext = createContext({
  card: [],
  setCard: () => {},
  favorit: false,
  setFavorit: () => {},
  imageFavorit: "",
  setImageFavorit: () => {},
  allFavorite: [],
  setAllFavorite: () => {},
  toggleThem: () => {},
  Mytheme: "",
});
