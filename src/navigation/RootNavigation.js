import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { auth, onAuthStateChanged } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../state-management/reducers";
import GettingStartedScreen from "../screens/GettingStartedScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import ImageScreen from "../screens/ImageScreen";
import LoadingScreen from "../screens/LoadingScreen";
import ChoiceScreen from "../screens/ChoiceScreen";
import ChatScreen from "../screens/ChatScreen";

const Stack = createStackNavigator();

function AuthScreens() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="GettingStarted" component={GettingStartedScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
    );
}

function AppScreens() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Choice" component={ChoiceScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="Image" component={ImageScreen} />
        </Stack.Navigator>
    );
}

const RootNavigation = () => {
    const dispatch = useDispatch();
    const [isUser, setIsUser] = useState(false);
    const isLoading = useSelector((state) => state.isLoading);
    useEffect(() => {
        const redirect = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsUser(true);
                dispatch(setLoading(false));
            } else {
                setIsUser(false);
                dispatch(setUser(null));
            }
        });
        return redirect;
    }, []);
    return (
        <NavigationContainer>
            {isLoading ? (
                <LoadingScreen />
            ) : isUser ? (<AppScreens />) : (<AuthScreens />)}
        </NavigationContainer>
    );
}

export default RootNavigation;