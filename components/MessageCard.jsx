import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import tw from "twrnc";

import { gStyle } from "../styles/global";

export default function MessageCard({ room }) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("ChatScreen", { room: room })}
            style={tw`w-full flex-row items-center justify-start py-2`}
        >
            {/* images */}
            <View
                style={[
                    tw`w-16 h-16 rounded-full border-2 p-1 flex items-center justify-center`,
                    { borderColor: gStyle.primary },
                ]}
            >
                <FontAwesome5 name="users" size={24} color="#555" />
            </View>

            {/* content */}
            <View style={tw`flex-1 items-start justify-center ml-4`}>
                <Text
                    style={tw`text-[#333] text-base font-semibold capitalize`}
                >
                    {room.chatName}
                </Text>
                <Text style={[tw`text-sm`, { color: gStyle.primaryText }]}>
                    In publishing and graphic design, Lorem ipsum is a
                    placeholder text commonly used to....
                </Text>
            </View>

            {/* time text */}
            <View>
                <Text
                    style={[
                        tw`px-4 text-base font-semibold`,
                        { color: gStyle.primary },
                    ]}
                >
                    27min
                </Text>
            </View>
        </TouchableOpacity>
    );
}
