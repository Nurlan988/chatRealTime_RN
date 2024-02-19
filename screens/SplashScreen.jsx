import { useLayoutEffect } from "react";
import { ActivityIndicator, Image, View } from "react-native";
import tw from "twrnc";
import { firebaseAuth, firestoreDB } from "../config/firebase.config";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import { setUser } from "../store/actions/userActions";
import { useDispatch } from "react-redux";

export default function SplashScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const checkLoggedUser = async () => {
        firebaseAuth.onAuthStateChanged((userCred) => {
            if (userCred?.uid) {
                getDoc(doc(firestoreDB, "users", userCred?.uid))
                    .then((docSnap) => {
                        if (docSnap.exists()) {
                            dispatch(setUser(docSnap.data()));
                        }
                    })
                    .then(() => {
                        setTimeout(() => {
                            navigation.replace("HomeScreen");
                        }, 2000);
                    })
                    .catch(() => {
                        navigation.replace("LoginScreen");
                    });
            } else {
                navigation.replace("LoginScreen");
            }
        });
    };

    useLayoutEffect(() => {
        checkLoggedUser();
    }, []);

    return (
        <View style={tw`flex-1 items-center justify-center`}>
            <Image
                source={require("../assets/images/logo.png")}
                style={tw`w-24 h-24`}
                resizeMode="contain"
            />
            <ActivityIndicator
                size={"large"}
                color={"#43C651"}
                style={tw`mt-20`}
            />
        </View>
    );
}
