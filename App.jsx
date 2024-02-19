import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";

import { LoginScreen, SignUpScreen } from "./screens";
import store from "./store/store";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Provider store={store}>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen
                        name="SignUpScreen"
                        component={SignUpScreen}
                    />
                </Stack.Navigator>
            </Provider>
            <StatusBar style="light" />
        </NavigationContainer>
    );
}
