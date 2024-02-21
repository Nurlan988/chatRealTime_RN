import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator,
    TextInput,
    Image,
} from "react-native";
import {
    MaterialIcons,
    FontAwesome5,
    FontAwesome,
    Entypo,
} from "@expo/vector-icons";

import tw from "twrnc";
import { gStyle } from "../styles/global";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {
    addDoc,
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
} from "firebase/firestore";
import { firestoreDB } from "../config/firebase.config";
import { screenHeight } from "../utils/constants";

const ChatScreen = ({ route }) => {
    const { room } = route.params;

    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const user = useSelector((state) => state.user.user);
    const navigation = useNavigation();
    const textInputRef = useRef(null);
    const scrollEndRef = useRef(null);

    const handleKeyboard = () => {
        if (textInputRef.current) {
            textInputRef.current.focus();
        }
    };

    const sendMessage = async () => {
        if (!message) return;
        const timeStamp = serverTimestamp();
        const id = `${Date.now()}`;
        const _doc = {
            _id: id,
            roomId: room._id,
            timeStamp: timeStamp,
            message: message,
            user: user,
        };
        setMessage("");
        await addDoc(
            collection(doc(firestoreDB, "chats", room._id), "messages"),
            _doc
        )
            .then(() => {})
            .catch((err) => {
                throw new Error(err);
            });
    };

    useLayoutEffect(() => {
        const msgQuery = query(
            collection(firestoreDB, "chats", room?._id, "messages"),
            orderBy("timeStamp", "asc")
        );

        const unsubscribe = onSnapshot(msgQuery, (querySnap) => {
            const upMsg = querySnap.docs.map((doc) => doc.data());
            setMessages(upMsg);
            setIsLoading(false);
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        scrollEndRef.current?.scrollTo({ y: screenHeight, animated: true });
    }, [messages]);

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
                    <View style={tw`flex-row items-center justify-center`}>
                        <View
                            style={tw`w-12 h-12 rounded-full border border-white flex items-center justify-center mr-3`}
                        >
                            <FontAwesome5
                                name="users"
                                size={24}
                                color="#fbfbfb"
                            />
                        </View>
                        <View>
                            <Text
                                style={tw`text-gray-50 text-base font-semibold capitalize`}
                            >
                                {room.chatName.length > 16
                                    ? `${room.chatName.slice(0, 16)}..`
                                    : room.chatName}
                            </Text>
                            <Text
                                style={tw`text-gray-50 text-base font-semibold capitalize`}
                            >
                                online
                            </Text>
                        </View>
                    </View>

                    {/* last section */}
                    <View
                        style={tw`flex-row items-center justify-center gap-x-3`}
                    >
                        <TouchableOpacity>
                            <FontAwesome5
                                name="video"
                                size={24}
                                color="#fbfbfb"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesome
                                name="phone"
                                size={24}
                                color="#fbfbfb"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Entypo
                                name="dots-three-vertical"
                                size={24}
                                color="#fbfbfb"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {/* bottom sectioln */}
            <View
                style={tw`w-full bg-white px-4 py-6 rounded-3xl flex-1 rounded-t-50px -mt-10`}
            >
                <KeyboardAvoidingView
                    style={tw`flex-1`}
                    behavior={Platform.OS === "android" ? "height" : "padding"}
                    keyboardVerticalOffset={160}
                >
                    <>
                        <ScrollView ref={scrollEndRef}>
                            {isLoading ? (
                                <>
                                    <ActivityIndicator
                                        size={"large"}
                                        color={"#43C651"}
                                    />
                                </>
                            ) : (
                                <>
                                    {messages?.map((msg, i) =>
                                        msg.user?.providersData?.email ===
                                        user?.providersData?.email ? (
                                            <View style={tw`m-1`} key={i}>
                                                <View
                                                    style={[
                                                        tw`px-4 py-2 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl relative w-auto`,
                                                        {
                                                            backgroundColor:
                                                                gStyle.primary,
                                                            alignSelf:
                                                                "flex-end",
                                                        },
                                                    ]}
                                                >
                                                    <Text
                                                        style={tw`text-base font-semibold text-white`}
                                                    >
                                                        {msg.message}
                                                    </Text>
                                                </View>
                                                <View
                                                    style={{
                                                        alignSelf: "flex-end",
                                                    }}
                                                >
                                                    {msg?.timeStamp
                                                        ?.seconds && (
                                                        <Text
                                                            style={tw`text-12px text-black font-semibold`}
                                                        >
                                                            {new Date(
                                                                parseInt(
                                                                    msg
                                                                        ?.timeStamp
                                                                        ?.seconds
                                                                ) * 1000
                                                            ).toLocaleTimeString(
                                                                "en-US",
                                                                {
                                                                    hour: "numeric",
                                                                    minute: "numeric",
                                                                    hour12: false,
                                                                }
                                                            )}
                                                        </Text>
                                                    )}
                                                </View>
                                            </View>
                                        ) : (
                                            <View
                                                style={[
                                                    tw`flex items-center justify-start gap-x-2`,
                                                    { alignSelf: "flex-start" },
                                                ]}
                                                key={i}
                                            >
                                                <View
                                                    style={tw`flex-row items-center justify-center gap-x-2`}
                                                >
                                                    {/* image */}
                                                    <Image
                                                        source={{
                                                            uri: msg?.user
                                                                ?.profilePic,
                                                        }}
                                                        style={tw`w-12 h-12 rounded-full`}
                                                        resizeMode="cover"
                                                    />

                                                    {/* text */}
                                                    <View
                                                        style={tw`m-1`}
                                                        key={i}
                                                    >
                                                        <View
                                                            style={[
                                                                tw`px-4 py-2 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl relative w-auto`,
                                                                {
                                                                    backgroundColor:
                                                                        gStyle.primary,
                                                                    alignSelf:
                                                                        "flex-start",
                                                                },
                                                            ]}
                                                        >
                                                            <Text
                                                                style={tw`text-base font-semibold text-white`}
                                                            >
                                                                {msg.message}
                                                            </Text>
                                                        </View>
                                                        <View
                                                            style={{
                                                                alignSelf:
                                                                    "flex-start",
                                                            }}
                                                        >
                                                            {msg?.timeStamp
                                                                ?.seconds && (
                                                                <Text
                                                                    style={tw`text-12px text-black font-semibold`}
                                                                >
                                                                    {new Date(
                                                                        parseInt(
                                                                            msg
                                                                                ?.timeStamp
                                                                                ?.seconds
                                                                        ) * 1000
                                                                    ).toLocaleTimeString(
                                                                        "en-US",
                                                                        {
                                                                            hour: "numeric",
                                                                            minute: "numeric",
                                                                            hour12: false,
                                                                        }
                                                                    )}
                                                                </Text>
                                                            )}
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    )}
                                </>
                            )}
                        </ScrollView>

                        <View
                            style={tw`w-full flex-row items-center justify-center px-8`}
                        >
                            <View
                                style={tw`bg-gray-200 rounded-2xl flex-row items-center justify-between px-4 py-2 gap-x-4`}
                            >
                                <TouchableOpacity onPress={handleKeyboard}>
                                    <Entypo
                                        name="emoji-happy"
                                        size={24}
                                        color="#555"
                                    />
                                </TouchableOpacity>
                                <TextInput
                                    style={[
                                        tw`flex-1 h-8 text-base font-semibold`,
                                        { color: gStyle.primaryText },
                                    ]}
                                    ref={textInputRef}
                                    value={message}
                                    placeholder="Type here..."
                                    placeholderTextColor={"#999"}
                                    onChangeText={(text) => setMessage(text)}
                                />
                                <TouchableOpacity>
                                    <Entypo
                                        name="mic"
                                        size={24}
                                        color="#43C651"
                                    />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                style={tw`pl-4`}
                                onPress={sendMessage}
                            >
                                <FontAwesome
                                    name="send"
                                    size={24}
                                    color="#555"
                                />
                            </TouchableOpacity>
                        </View>
                    </>
                </KeyboardAvoidingView>
            </View>
        </View>
    );
};

export default ChatScreen;
