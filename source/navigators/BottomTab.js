import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { fontSize, scalableheight } from '../assets/dimensions';
import { colors } from '../assets/colors';
import Home from '../screens/Home/Home';
import MMcons from 'react-native-vector-icons/MaterialIcons';
import Settings from '../screens/Settings/Settings';


const BottomTab = () => {

    const MyFeed = () => {
        return (
            <View>
                <Text>This is the Streams tab content</Text>
                {/* Add your additional UI components and logic here */}
            </View>
        );
    };
    return (
        <Tab.Navigator initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabStyle,
                tabBarShowLabel: true,
                tabBarHideOnKeyboard: true,
                tabBarTransparent: true,
                tabBarLabelStyle: styles.tabLabelStyle,
            }}
        >
            {/* Define your tabs */}
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{
                                alignItems: 'center',
                            }}>
                                <MMcons name={'mic'} size={scalableheight.three} color={focused ? colors.white : colors.first} />
                            </View>
                        )
                    },
                    tabBarLabel: ({focused}) => {
                        return(
                            <Text style={focused ? styles.tabLabelStyle : styles.tabBarLabeltwo}>STT</Text>
                        )
                    }
                }}
            />
            
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{
                                alignItems: 'center',
                            }}>
                                <MMcons name={'settings'} size={scalableheight.three} color={focused ? colors.white : colors.first} />
                            </View>
                        )
                    },
                    tabBarLabel: ({focused}) => {
                        return(
                            <Text style={focused ? styles.tabLabelStyle : styles.tabBarLabeltwo}>Settings</Text>
                        )
                    }
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTab;
const styles = StyleSheet.create({
    tabStyle: {
        height: scalableheight.seven,
        borderTopLeftRadius: fontSize.borderradiuslarge,
        borderTopRightRadius: fontSize.borderradiuslarge,
        backgroundColor: colors.second,
        borderColor: colors.second,
        position: 'absolute'
    },
    tabLabelStyle: {
        fontSize: scalableheight.onepointfive,
        color: colors.white,
        bottom:scalableheight.pointfive
    },
    tabBarLabeltwo:{
        fontSize: scalableheight.onepointfive,
        color: colors.appGrey,
        bottom:scalableheight.pointfive
    }
})