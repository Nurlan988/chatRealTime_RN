import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import tw from "twrnc";

export default function HomeScreen() {
    const user = useSelector((state) => state.user.user);
    return (
        <View style={tw`flex-1`}>
            <ScrollView>
                <Text>HomeScreen</Text>
            </ScrollView>
        </View>
    );
}
