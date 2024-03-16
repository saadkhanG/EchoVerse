import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, Text } from "react-native";
import { createStackNavigator, TransitionPresets, } from "@react-navigation/stack";
import "react-native-gesture-handler"


//screens//
import Splash from "../screens/Splash/Splash";
import BottomTab from "./BottomTab";
import GetStarted from "../screens/GetStarted/GetStarted";
import SettingsView from "../screens/SettingsView/SettingsView";
///////////

const Stack = createStackNavigator();

const MainNavigator = () => {
    const BounceTransition = {
        ...TransitionPresets.SlideFromRightIOS,
        cardStyleInterpolator: ({ current, layouts }) => {
            const translateX = current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
            });

            const scale = current.progress.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [1, 1.4, 1],
            });

            return {
                cardStyle: {
                    transform: [{ translateX }, { scale }],
                },
            };
        },
    };
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{
                    headerShown: false,
                    ...BounceTransition, // Slide animation for iOS
                    gestureEnabled: false, // Enable gestures for sliding back
                    gestureDirection: 'horizontal', // Set the direction of the gesture
                }}
            >
                <Stack.Screen
                    name="Splash"
                    component={Splash}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="GetStarted"
                    component={GetStarted}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="BottomTab"
                    component={BottomTab}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SettingsView"
                    component={SettingsView}
                    options={{ headerShown: false }}
                />
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator;