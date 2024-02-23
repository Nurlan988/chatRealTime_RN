import { useEffect, useLayoutEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import tw from "twrnc";

import { Loading, UserTextInput } from "../components";
import { screenWith } from "../utils/constants";
import { firebaseAuth, firestoreDB } from "../config/firebase.config";
import { gStyle } from "../styles/global";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, setUser } from "../store/actions/userActions";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [getEmailValidationStatus, setGetEmailValidationStatus] =
        useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.user.isLoading);

    const handleLogin = async () => {
        if (getEmailValidationStatus && email.length) {
            dispatch(setIsLoading(true));
            await signInWithEmailAndPassword(firebaseAuth, email, password)
                .then((userCred) => {
                    if (userCred) {
                        getDoc(
                            doc(firestoreDB, "users", userCred?.user.uid)
                        ).then((docSnap) => {
                            if (docSnap.exists()) {
                                if (alert) {
                                    setAlert(!alert);
                                }
                                console.log("UserData", docSnap.data());
                                dispatch(setUser(docSnap.data()));
                            }
                        });
                    }
                })
                .catch((err) => {
                    console.log("ErroR>>", err);
                    if (err.message.includes("invalid-credential")) {
                        setAlert(true);
                        setAlertMsg("Invalid Email or Password");
                    } else if (err.message.includes("user-not-found")) {
                        setAlertMsg("User Not Found");
                    } else if (err.message.includes("invalid-email")) {
                        setAlert(true);
                        setAlertMsg("Invalid Email");
                    } else if (err.message.includes("invalid-password")) {
                        setAlert(true);
                        setGetEmailValidationStatus(true);
                        setAlertMsg("Invalid Password");
                    }
                    dispatch(setIsLoading(false));
                    setInterval(() => {
                        setAlert(false);
                    }, 2000);
                })
                .finally(() => {
                    dispatch(setIsLoading(false));
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
                        Welcome Back!
                    </Text>
                    <View
                        style={tw`w-full pt-6 flex items-center justify-center`}
                    >
                        {/* alert */}
                        {alert && (
                            <Text style={tw`text-base  text-red-600`}>
                                {alertMsg}
                            </Text>
                        )}

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
                            onPress={handleLogin}
                            style={[
                                tw`w-full px-4 py-2 rounded-xl my-3 flex items-center justify-center`,
                                { backgroundColor: gStyle.primary },
                            ]}
                        >
                            <Text
                                style={tw`py-2 text-white text-xl font-semibold`}
                            >
                                Sign In
                            </Text>
                        </TouchableOpacity>

                        <View
                            style={tw`w-full py-12 flex-row justify-center items-center `}
                        >
                            <Text
                                style={[
                                    tw`text-base`,
                                    { color: gStyle.primaryText },
                                ]}
                            >
                                Don't have an account?
                            </Text>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("SignUpScreen")
                                }
                            >
                                <Text
                                    style={[
                                        tw`text-base font-semibold ml-2`,
                                        { color: gStyle.primaryBold },
                                    ]}
                                >
                                    Create here
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
            {isLoading && <Loading />}
        </View>
    );
}
