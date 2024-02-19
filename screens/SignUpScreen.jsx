import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { doc, setDoc } from "firebase/firestore";
import tw from "twrnc";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { firebaseAuth, firestoreDB } from "../config/firebase.config";
import { UserTextInput } from "../components";
import { avatars } from "../utils/avatars";
import { screenHeight, screenWith } from "../utils/constants";
import { gStyle } from "../styles/global";

export default function SignUpScreen() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(avatars[0]?.image.asset.url);
    const [isAvatarMenu, setIsAvatarMenu] = useState(false);
    const [getEmailValidationStatus, setGetEmailValidationStatus] =
        useState(false);

    const navigation = useNavigation();

    const handleAvatar = (item) => {
        const image = item?.image.asset.url;
        setAvatar(image);
        setIsAvatarMenu(!isAvatarMenu);
    };

    const handleSignUp = async () => {
        if (getEmailValidationStatus && email.length) {
            await createUserWithEmailAndPassword(
                firebaseAuth,
                email,
                password
            ).then((userCred) => {
                const data = {
                    _id: userCred?.user.uid,
                    fullName: fullName,
                    profilePic: avatar,
                    providersData: userCred.user.providerData[0],
                };
                setDoc(
                    doc(firestoreDB, "users", userCred?.user.uid),
                    data
                ).then(() => {
                    navigation.navigate("LoginScreen");
                });
            });
        }
    };

    return (
        <View style={tw`flex-1 items-center justify-start`}>
            <ScrollView>
                <Image
                    source={require("../assets/images/bg.png")}
                    resizeMode="cover"
                    style={[tw`h-96`, { width: screenWith }]}
                />

                {isAvatarMenu && (
                    <>
                        {/* list of avatars sections */}
                        <View style={tw`absolute inset-0 z-10 flex-1`}>
                            <BlurView
                                style={[
                                    tw`w-full h-full px-4 py-16 flex-row flex-wrap items-center justify-evenly`,
                                    {
                                        width: screenWith,
                                        height: "100%",
                                    },
                                ]}
                                tint="dark"
                                intensity={100}
                            >
                                {avatars?.map((item) => (
                                    <TouchableOpacity
                                        onPress={() => handleAvatar(item)}
                                        key={item._id}
                                        style={[
                                            tw`w-20 m-3 h-20 p-1 rounded-full border-2 relative`,
                                            { borderColor: gStyle.primary },
                                        ]}
                                    >
                                        <Image
                                            source={{
                                                uri: item?.image.asset.url,
                                            }}
                                            style={tw`w-full h-full`}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                ))}
                            </BlurView>
                        </View>
                    </>
                )}

                {/* Main View */}
                <View
                    style={tw`w-full h-full bg-white rounded-tl-[90px] -mt-44 flex items-center justify-start py-6 px-6`}
                >
                    <Image
                        source={require("../assets/images/logo.png")}
                        style={tw`w-16 h-16`}
                        resizeMode="contain"
                    />
                    <Text
                        style={[
                            tw`py-2 text-xl font-semibold`,
                            { color: gStyle.primaryText },
                        ]}
                    >
                        Join with us!
                    </Text>
                    <View style={tw`w-full flex items-center justify-center`}>
                        {/* avatar section*/}
                        <View
                            style={tw`w-full flex items-center justify-center relative my-4`}
                        >
                            <TouchableOpacity
                                onPress={() => setIsAvatarMenu(!isAvatarMenu)}
                                style={[
                                    tw`w-20 h-20 p-1 rounded-full border-2 relative`,
                                    { borderColor: gStyle.primary },
                                ]}
                            >
                                <Image
                                    source={{ uri: avatar }}
                                    style={tw`w-full h-full`}
                                    resizeMode="contain"
                                />
                                <View
                                    style={[
                                        tw`w-6 h-6 rounded-full absolute top-0 right-0 flex items-center justify-center`,
                                        {
                                            backgroundColor: gStyle.primary,
                                        },
                                    ]}
                                >
                                    <MaterialIcons
                                        name="edit"
                                        size={18}
                                        color="white"
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* fullName */}
                        <UserTextInput
                            placeholder="Full Name"
                            isPass={false}
                            setStateValue={setFullName}
                        />

                        {/* email */}
                        <UserTextInput
                            placeholder="Email"
                            isPass={false}
                            setStateValue={setEmail}
                            setGetEmailValidationStatus={
                                setGetEmailValidationStatus
                            }
                        />

                        {/* password */}
                        <UserTextInput
                            placeholder="Password"
                            isPass={true}
                            setStateValue={setPassword}
                        />

                        {/* loginButton */}
                        <TouchableOpacity
                            onPress={handleSignUp}
                            style={[
                                tw`w-full px-4 py-2 rounded-xl my-3 flex items-center justify-center`,
                                { backgroundColor: gStyle.primary },
                            ]}
                        >
                            <Text
                                style={tw`py-2 text-white text-xl font-semibold `}
                            >
                                Sign Up
                            </Text>
                        </TouchableOpacity>

                        <View
                            style={tw`w-full py-12 flex-row justify-center items-center`}
                        >
                            <Text
                                style={[
                                    tw`text-base`,
                                    { color: gStyle.primaryText },
                                ]}
                            >
                                Have an account!
                            </Text>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("LoginScreen")
                                }
                            >
                                <Text
                                    style={[
                                        tw`text-base font-semibold ml-2`,
                                        { color: gStyle.primaryBold },
                                    ]}
                                >
                                    Login here
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
