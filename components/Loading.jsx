import { ActivityIndicator, Image, View } from "react-native";
import tw from "twrnc";

export default function Loading() {
    return (
        <View
            style={tw`bg-gray-200/50 w-full h-full absolute flex items-center justify-center`}
        >
            <Image
                source={require("../assets/images/logo.png")}
                style={tw`w-24 h-24`}
                resizeMode="contain"
            />
            <ActivityIndicator
                size={"large"}
                color={"#43C651"}
                style={tw`mt-20`}
            />
        </View>
    );
}
