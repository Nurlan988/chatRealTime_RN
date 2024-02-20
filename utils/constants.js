import { Dimensions } from "react-native";

export const screenWith = Math.round(Dimensions.get("window").width);
export const screenHeight = Math.round(Dimensions.get("screen").height);
