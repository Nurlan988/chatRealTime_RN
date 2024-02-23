import { useEffect, useLayoutEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import tw from "twrnc";

import { gStyle } from "../styles/global";
import { firestoreDB } from "../config/firebase.config";

export default function MessageCard({ room }) {
    const navigation = useNavigation();
    const [lastMsg, setLastMsg] = useState(null);

    useLayoutEffect(() => {
        const msgQuery = query(
            collection(firestoreDB, "chats", room?._id, "messages"),
            orderBy("timeStamp", "asc")
        );

        const unsubscribe = onSnapshot(msgQuery, (querySnap) => {
            const upMsg = querySnap.docs.map((doc) => doc.data());
            const last = upMsg[upMsg.length - 1];
            setLastMsg(last);
        });

        return unsubscribe;
    }, []);

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
                <Text style={tw`text-[#333] text-base font-semibold`}>
                    {room.chatName}
                </Text>
                <Text style={[tw`text-sm`, { color: gStyle.primaryText }]}>
                    {lastMsg
                        ? `${lastMsg?.user?.fullName}: ${
                              lastMsg?.message || ""
                          }`
                        : ""}
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
                    {lastMsg
                        ? new Date(
                              parseInt(lastMsg?.timeStamp?.seconds) * 1000
                          ).toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: false,
                          })
                        : ""}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
