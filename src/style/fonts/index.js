import { createGlobalStyle } from "styled-components";
import BlackHanSans from "./BlackHanSans-Regular.ttf";
import NotoSansKR from "./NotoSansKR-VariableFont_wght.ttf";

export default createGlobalStyle`
  @font-face {
    font-family: "BlackHanSans";
    src: url(${BlackHanSans}) format("truetype")
  }
  @font-face {
    font-family: "NotoSansKR";
    src: url(${NotoSansKR}) format("truetype")
  }
`;
