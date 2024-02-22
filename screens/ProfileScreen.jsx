import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { MaterialIcons, Entypo, Ionicons } from "@expo/vector-icons";

import tw from "twrnc";
import { gStyle } from "../styles/global";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { firebaseAuth } from "../config/firebase.config";
import { setUserNull } from "../store/actions/userActions";

const ProfileScreen = () => {
    const user = useSelector((state) => state.user.user);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        await firebaseAuth.signOut().then(() => {
            dispatch(setUserNull());
            navigation.replace("LoginScreen");
        });
    };

    return (
        <View
            style={[gStyle.SafeAreaView, tw`items-center justify-start mt-5`]}
        >
            {/* icons */}
            <View style={tw`w-full flex-row items-center justify-between px-4`}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="chevron-left" size={32} color="#555" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Entypo name="dots-three-vertical" size={24} color="#555" />
                </TouchableOpacity>
            </View>

            {/* profile */}
            <View style={tw`items-center justify-center`}>
                <View
                    style={[
                        tw`w-24 h-24 rounded-full border flex items-center justify-center`,
                        { borderColor: gStyle.primary },
                    ]}
                >
                    <Image
                        source={{ uri: user?.profilePic }}
                        style={tw`w-full h-full`}
                        resizeMode="contain"
                    />
                </View>
                <Text
                    style={[
                        tw`text-xl font-semibold pt-3`,
                        { color: gStyle.primaryBold },
                    ]}
                >
                    {user?.fullName}
                </Text>
                <Text
                    style={[
                        tw`text-base font-semibold`,
                        { color: gStyle.primaryText },
                    ]}
                >
                    {user?.providersData?.email}
                </Text>
            </View>

            {/* icons section */}
            <View style={tw`w-full flex-row items-center justify-evenly py-6`}>
                <View style={tw`items-center justify-center`}>
                    <TouchableOpacity
                        style={tw`items-center justify-center w-12 h-12 rounded-lg bg-gray-300`}
                    >
                        <MaterialIcons
                            name="messenger-outline"
                            size={24}
                            color="#555"
                        />
                    </TouchableOpacity>
                    <Text
                        style={[
                            tw`text-sm py-1`,
                            { color: gStyle.primaryText },
                        ]}
                    >
                        Message
                    </Text>
                </View>
                <View style={tw`items-center justify-center`}>
                    <TouchableOpacity
                        style={tw`items-center justify-center w-12 h-12 rounded-lg bg-gray-300`}
                    >
                        <Ionicons
                            name="videocam-outline"
                            size={24}
                            color="#555"
                        />
                    </TouchableOpacity>
                    <Text
                        style={[
                            tw`text-sm py-1`,
                            { color: gStyle.primaryText },
                        ]}
                    >
                        Video Call
                    </Text>
                </View>
                <View style={tw`items-center justify-center`}>
                    <TouchableOpacity
                        style={tw`items-center justify-center w-12 h-12 rounded-lg bg-gray-300`}
                    >
                        <Ionicons name="call-outline" size={24} color="#555" />
                    </TouchableOpacity>
                    <Text
                        style={[
                            tw`text-sm py-1`,
                            { color: gStyle.primaryText },
                        ]}
                    >
                        Call
                    </Text>
                </View>
                <View style={tw`items-center justify-center`}>
                    <TouchableOpacity
                        style={tw`items-center justify-center w-12 h-12 rounded-lg bg-gray-300`}
                    >
                        <Entypo
                            name="dots-three-horizontal"
                            size={24}
                            color="#555"
                        />
                    </TouchableOpacity>
                    <Text
                        style={[
                            tw`text-sm py-1`,
                            { color: gStyle.primaryText },
                        ]}
                    >
                        More
                    </Text>
                </View>
            </View>

            {/* medias shared */}
            <View style={tw`w-full px-6 gap-y-3`}>
                <View style={tw`w-full flex-row items-center justify-between`}>
                    <Text
                        style={[
                            tw`text-base font-semibold`,
                            { color: gStyle.primaryText },
                        ]}
                    >
                        Media Shared
                    </Text>
                    <TouchableOpacity>
                        <Text
                            style={[
                                tw`text-base font-semibold uppercase`,
                                { color: gStyle.primaryText },
                            ]}
                        >
                            View All
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={tw`w-full flex-row items-center justify-between`}>
                    <TouchableOpacity
                        style={tw`w-24 h-24 m-1 rounded-xl bg-gray-300 overflow-hidden`}
                    >
                        <Image
                            source={{
                                uri: "https://media.istockphoto.com/id/1458215547/photo/brown-bear.jpg?s=1024x1024&w=is&k=20&c=R2zXwSRYnLX2kZt7qBUBW1eLhWL3gamnkN6HE_S2Awk=",
                            }}
                            resizeMode="cover"
                            style={tw`w-full h-full`}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={tw`w-24 h-24 m-1 rounded-xl bg-gray-300 overflow-hidden`}
                    >
                        <Image
                            source={{
                                uri: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg?s=1024x1024&w=is&k=20&c=R2zXwSRYnLX2kZt7qBUBW1eLhWL3gamnkN6HE_S2Awk=",
                            }}
                            resizeMode="cover"
                            style={tw`w-full h-full`}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={tw`w-24 h-24 m-1 rounded-xl bg-gray-300 overflow-hidden`}
                    >
                        <Image
                            source={{
                                uri: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fbeautiful%2F&psig=AOvVaw0apML-n_PZzeHXespReW3M&ust=1708696525359000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNiN0d2Mv4QDFQAAAAAdAAAAABAI",
                            }}
                            resizeMode="cover"
                            style={tw`w-full h-full`}
                        />
                        <View
                            style={tw`absolute w-full h-full items-center justify-center`}
                        >
                            <Text
                                style={tw`text-base text-white font-semibold`}
                            >
                                250+
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            {/* settings options */}
            <View style={tw`pt-5`}>
                <View
                    style={tw`w-full px-6 py-4 flex-row items-center justify-between`}
                >
                    <View style={tw`flex-row items-center`}>
                        <MaterialIcons name="security" size={24} color="#555" />
                        <Text
                            style={[
                                tw`text-base font-semibold px-3`,
                                { color: gStyle.primaryText },
                            ]}
                        >
                            Privacy
                        </Text>
                    </View>

                    <Entypo name="chevron-right" size={24} color="#555" />
                </View>
                <View
                    style={tw`w-full px-6 py-4 flex-row items-center justify-between`}
                >
                    <View style={tw`flex-row items-center`}>
                        <MaterialIcons name="message" size={24} color="#555" />
                        <Text
                            style={[
                                tw`text-base font-semibold px-3`,
                                { color: gStyle.primaryText },
                            ]}
                        >
                            Groups
                        </Text>
                    </View>

                    <Entypo name="chevron-right" size={24} color="#555" />
                </View>
                <View
                    style={tw`w-full px-6 py-4 flex-row items-center justify-between`}
                >
                    <View style={tw`flex-row items-center`}>
                        <MaterialIcons
                            name="music-note"
                            size={24}
                            color="#555"
                        />
                        <Text
                            style={[
                                tw`text-base font-semibold px-3`,
                                { color: gStyle.primaryText },
                            ]}
                        >
                            Media’s & Downloads
                        </Text>
                    </View>

                    <Entypo name="chevron-right" size={24} color="#555" />
                </View>
                <View
                    style={tw`w-full px-6 py-4 flex-row items-center justify-between`}
                >
                    <View style={tw`flex-row items-center`}>
                        <MaterialIcons name="person" size={24} color="#555" />
                        <Text
                            style={[
                                tw`text-base font-semibold px-3`,
                                { color: gStyle.primaryText },
                            ]}
                        >
                            Acoount
                        </Text>
                    </View>

                    <Entypo name="chevron-right" size={24} color="#555" />
                </View>
            </View>
            <TouchableOpacity
                onPress={handleLogout}
                style={tw`w-full px-6 py-4 flex-row items-center justify-center`}
            >
                <Text
                    style={[
                        tw`text-lg font-semibold px-3`,
                        { color: gStyle.primaryBold },
                    ]}
                >
                    Logout
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProfileScreen;
