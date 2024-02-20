import React, { useState } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator,
    TextInput,
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

const ChatScreen = ({ route }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const { room } = route.params;
    const user = useSelector((state) => state.user.user);

    const navigation = useNavigation();

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
                        <ScrollView>
                            {isLoading ? (
                                <>
                                    <ActivityIndicator
                                        size={"large"}
                                        color={"#43C651"}
                                    />
                                </>
                            ) : (
                                <>{/* messages */}</>
                            )}
                        </ScrollView>

                        <View
                            style={tw`w-full flex-row items-center justify-center px-8`}
                        >
                            <View
                                style={tw`bg-gray-200 rounded-2xl flex-row items-center justify-between px-4 py-2 gap-x-4`}
                            >
                                <TouchableOpacity>
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
                            <TouchableOpacity style={tw`pl-4`}>
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
