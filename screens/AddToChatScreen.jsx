import React, { useState } from "react";
import {
    View,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    Text,
} from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";

import tw from "twrnc";
import { gStyle } from "../styles/global";
import { doc, setDoc } from "firebase/firestore";
import { firestoreDB } from "../config/firebase.config";
import { MessageCard } from "../components";

const AddToChatScreen = () => {
    const [addChat, setAddChat] = useState("");
    const [isAlert, setIsAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");

    const user = useSelector((state) => state.user.user);
    const chats = useSelector((state) => state.chats.chats);
    const navigation = useNavigation();

    const createNewChat = async () => {
        let id = `${Date.now()}`;

        const _doc = {
            _id: id,
            user: user,
            chatName: addChat,
        };

        if (addChat !== "") {
            if (chats.some((chat) => chat.chatName === addChat)) {
                setIsAlert(true);
                setAlertMsg("This name already exists");
                return;
            }
            setDoc(doc(firestoreDB, "chats", id), _doc)
                .then(() => {
                    setAddChat("");
                    navigation.replace("HomeScreen");
                })
                .catch((err) => {
                    throw new Error(err);
                });
        }
    };

    const hadleAddChat = (text) => {
        setIsAlert(false);
        setAlertMsg("");
        setAddChat(text);
    };

    return (
        <View style={tw`flex-1`}>
            <View
                style={[
                    tw`w-full px-4 py-6 flex-0.2`,
                    { backgroundColor: gStyle.primary },
                ]}
            >
                <View
                    style={tw`flex-row items-center justify-between w-full px-4 py-12`}
                >
                    {/* go back */}
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons
                            name="chevron-left"
                            size={32}
                            color="#fbfbfb"
                        />
                    </TouchableOpacity>

                    {/* middle */}

                    {/* last section */}
                    <View style={tw`flex-row items-center justify-center `}>
                        <Image
                            source={{ uri: user?.profilePic }}
                            style={tw`w-12 h-12`}
                            resizeMode="contain"
                        />
                    </View>
                </View>
            </View>
            {/* bottom sectioln */}
            <View
                style={tw`w-full bg-white px-4 py-6 rounded-3xl flex-1 rounded-t-50px -mt-10`}
            >
                <View style={tw`w-full px-4 py-4`}>
                    <View
                        style={tw`w-full px-4 flex-row items-center justify-between py-3 rounded-xl border border-gray-200 `}
                    >
                        {/* icons */}
                        <Ionicons name="chatbubbles" size={24} color="#777" />

                        {/* text input */}
                        <TextInput
                            style={[
                                tw`flex-1 text-lg -mt-1 h-12 w-full ml-3`,
                                { color: gStyle.primaryText },
                            ]}
                            placeholder="Search or Create a chat"
                            placeholderTextColor={"#999"}
                            value={addChat}
                            onChangeText={hadleAddChat}
                            autoCapitalize="none"
                        />

                        {/* icon */}
                        <TouchableOpacity onPress={createNewChat}>
                            <FontAwesome name="send" size={24} color="#777" />
                        </TouchableOpacity>
                    </View>
                </View>
                {isAlert && <Text style={tw`text-red-500`}>{alertMsg}</Text>}
                <ScrollView style={tw`w-full px-4 pt-4`}>
                    <View style={tw`w-full`}>
                        {chats && chats?.length ? (
                            <>
                                {chats?.map(
                                    (room) =>
                                        room.chatName
                                            .toLowerCase()
                                            .includes(
                                                addChat.toLowerCase()
                                            ) && (
                                            <MessageCard
                                                key={room._id}
                                                room={room}
                                            />
                                        )
                                )}
                            </>
                        ) : (
                            <></>
                        )}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default AddToChatScreen;
