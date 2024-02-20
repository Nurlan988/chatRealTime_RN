import { useLayoutEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import tw from "twrnc";

import { MessageCard } from "../components";
import { firestoreDB } from "../config/firebase.config";
import { gStyle } from "../styles/global";

export default function HomeScreen() {
    const user = useSelector((state) => state.user.user);
    const [isLoading, setIsLoading] = useState(true);
    const [chats, setChats] = useState(null);

    const navigation = useNavigation();

    useLayoutEffect(() => {
        const chatQuery = query(
            collection(firestoreDB, "chats"),
            orderBy("_id", "desc")
        );

        const unsubscribe = onSnapshot(chatQuery, (querySnapShot) => {
            const chatRooms = querySnapShot.docs.map((doc) => doc.data());
            setChats(chatRooms);
            setIsLoading(false);
        });

        // Return the unsubscribe function to stop listening to the updates
        return unsubscribe;
    }, []);

    return (
        <View style={tw`flex-1`}>
            <View style={gStyle.SafeAreaView}>
                <View
                    style={tw`w-full flex-row items-center justify-between p-4`}
                >
                    <Image
                        source={require("../assets/images/logo.png")}
                        style={tw`w-12 h-12`}
                        resizeMode="contain"
                    />
                    <TouchableOpacity
                        style={[
                            tw`w-12 h-12 rounded-full border flex items-center justify-center`,
                            { borderColor: gStyle.primary },
                        ]}
                    >
                        <Image
                            source={{ uri: user?.profilePic }}
                            style={tw`w-full h-full`}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView style={tw`w-full px-4 pt-4`}>
                    <View style={tw`w-full`}>
                        {/* message title */}
                        <View
                            style={tw`w-full flex-row items-center justify-between px-2`}
                        >
                            <Text
                                style={[
                                    tw`text-base font-extrabold pb-2`,
                                    { color: gStyle.primaryText },
                                ]}
                            >
                                Mesasges
                            </Text>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("AddToChatScreen")
                                }
                            >
                                <Ionicons
                                    name="chatbox"
                                    size={28}
                                    color="#555"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* scroll area */}
                        {isLoading ? (
                            <View
                                style={tw`w-full flex items-center justify-center`}
                            >
                                <ActivityIndicator
                                    size={"large"}
                                    color={"#43C651"}
                                />
                            </View>
                        ) : (
                            <>
                                {chats && chats?.length ? (
                                    <>
                                        {chats?.map((room) => (
                                            <MessageCard
                                                key={room._id}
                                                room={room}
                                            />
                                        ))}
                                    </>
                                ) : (
                                    <></>
                                )}
                            </>
                        )}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
