import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  bgColor: "#0A2647",
  textColor: "#EAFDFC",
  cardColor: "#144272",
  accentColor: "#FD8A8A",
  priceColor: "#2B3A55",
  boxshadowColor: `rgba(0, 0, 0, 0.3) 0px 3px 13px;`,
};

export const lightTheme: DefaultTheme = {
  bgColor: "#82AAE3",
  textColor: "#0A2647",
  cardColor: "#EAFDFC",
  accentColor: "#FFC6D3",
  priceColor: "#bfeaf5",
  boxshadowColor: `-5px -5px 9px rgba(255, 255, 255, 0.45),
  5px 5px 9px rgba(94, 104, 121, 0.3)`,
};
