import {
    AddToChatScreen,
    ChatScreen,
    HomeScreen,
    LoginScreen,
    ProfileScreen,
    SignUpScreen,
    SplashScreen,
} from "./screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";

import store from "./store/store";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Provider store={store}>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                        name="SplashScreen"
                        component={SplashScreen}
                    />
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen
                        name="SignUpScreen"
                        component={SignUpScreen}
                    />
                    <Stack.Screen name="HomeScreen" component={HomeScreen} />
                    <Stack.Screen
                        name="ProfileScreen"
                        component={ProfileScreen}
                    />
                    <Stack.Screen
                        name="AddToChatScreen"
                        component={AddToChatScreen}
                    />
                    <Stack.Screen name="ChatScreen" component={ChatScreen} />
                </Stack.Navigator>
            </Provider>
            <StatusBar style="auto" />
        </NavigationContainer>
    );
}
