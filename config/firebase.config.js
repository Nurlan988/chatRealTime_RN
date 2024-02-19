import { getApp, getApps, initializeApp } from "firebase/app";
import {
    getAuth,
    initializeAuth,
    getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyA4lliM9biPzcpIjuoyAoRD4NkeiF_x_DE",
    authDomain: "react-native-app-realtime-chat.firebaseapp.com",
    projectId: "react-native-app-realtime-chat",
    storageBucket: "react-native-app-realtime-chat.appspot.com",
    messagingSenderId: "896659712900",
    appId: "1:896659712900:web:9b478a8a5aeef1ff78cbd1",
};

const app = getApps.length ? getApp() : initializeApp(firebaseConfig);

// const firebaseAuth = getAuth(app);
const firestoreDB = getFirestore(app);

const firebaseAuth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, firebaseAuth, firestoreDB };
