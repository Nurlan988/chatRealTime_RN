import { Platform, StatusBar } from "react-native";
import { screenHeight } from "../utils/constants";

export const gStyle = {
    primary: "#43C651",
    primaryBold: "#056526",
    primaryText: "#555",

    SafeAreaView: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        height: screenHeight,
    },
};
