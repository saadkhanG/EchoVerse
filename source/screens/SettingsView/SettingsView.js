import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../assets/colors'
import { commonStylying } from '../../assets/CommonStyle'
import { fontSize, scalableheight } from '../../assets/dimensions'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setAppearance } from '../../redux/appearSlice';
import MMcons from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler'

const SettingsView = ({ navigation, route }) => {
    const page = route.params
    const CurrentAppearance = useSelector((state) => state.appearance);
    const dispatch = useDispatch();

    const ChangeAppearance = async (scheme) => {
        try {
            await AsyncStorage.setItem('appearance', scheme);
            console.log('appearance', scheme);
        } catch (error) {
            console.log('Error saving item:', error);
        }
        dispatch(setAppearance(scheme))
    }
    const HelpButtons = (icon, title, id, url) => {
        const HandleTouch = () => {
            if (id === 1) {
                Linking.openURL(url);
            }
            else if (id === 2) {
                Linking.openURL(`tel:${title}`);
            }
            else if (id === 3) {
                Linking.openURL(`tel:${title}`);
            }
        }

        return (
            <TouchableOpacity onPress={() => HandleTouch()} activeOpacity={0.7} style={styles.flexView}>
                <MMcons name={icon}
                    size={scalableheight.twopointfive}
                    color={CurrentAppearance === 'dark' ? colors.white : colors.black}
                />
                <Text style={[styles.texttwo, {
                    color: CurrentAppearance === 'dark' ? colors.white : colors.black
                }]}>{title}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={[styles.container, { backgroundColor: CurrentAppearance === 'dark' ? colors.first : colors.secondLight, }]}>
            {page === 1 ? (
                <>
                    <Text style={[styles.heading, {
                        color: CurrentAppearance === 'dark' ? colors.white : colors.black,
                    }]}>App Appearance</Text>

                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => ChangeAppearance('dark')}
                        style={{ flexDirection: 'row', alignItems: 'center', marginVertical: scalableheight.two }}
                    >
                        <MMcons name={CurrentAppearance === 'dark' ? 'radio-button-checked' : 'radio-button-unchecked'}
                            size={scalableheight.twopointfive}
                            color={CurrentAppearance === 'dark' ? colors.white : colors.black}
                        />
                        <Text style={[styles.text, {
                            color: CurrentAppearance === 'dark' ? colors.white : colors.black
                        }]}>Dark</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => ChangeAppearance('light')}
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <MMcons name={CurrentAppearance === 'light' ? 'radio-button-checked' : 'radio-button-unchecked'}
                            size={scalableheight.twopointfive}
                            color={CurrentAppearance === 'dark' ? colors.white : colors.black}
                        />
                        <Text style={[styles.text, {
                            color: CurrentAppearance === 'dark' ? colors.white : colors.black
                        }]}>Light</Text>
                    </TouchableOpacity>
                </>




            ) : page === 2 ? (
                <>
                    <Text style={[styles.heading, {
                        color: CurrentAppearance === 'dark' ? colors.white : colors.black,
                    }]}>Help and Support</Text>

                    <View style={{ marginTop: scalableheight.two }}>
                        {HelpButtons('language', 'SpeechWeb', 1, 'https://www.example.com')}
                        {HelpButtons('call', '+0009900999', 2)}
                        {HelpButtons('fax', '887776665544332', 3)}
                    </View>

                </>



            ) : page === 4 ? (
                <>
                    <Text style={[styles.heading, {
                        color: CurrentAppearance === 'dark' ? colors.white : colors.black,
                    }]}>About Us</Text>
                    <ScrollView style={{ flex: 1, marginTop: scalableheight.two }} showsVerticalScrollIndicator={false}>

                        <Text style={[styles.Subheading, {
                            color: CurrentAppearance === 'dark' ? colors.white : colors.black,
                        }]}>Lorem Ipsum</Text>
                        <Text style={[styles.subtext, {
                            color: CurrentAppearance === 'dark' ? colors.white : colors.black,
                        }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec lorem eu massa blandit laoreet. Duis eleifend lectus sit amet nisi ultrices, ut efficitur quam finibus. Phasellus tristique felis sed sapien vestibulum, nec eleifend lorem suscipit. Quisque interdum lacus nec velit tempus, non lacinia nulla congue. Integer in vehicula sem. Ut tristique dui id odio feugiat, a condimentum libero tempus. Suspendisse potenti. In hac habitasse platea dictumst. Nulla facilisi. Sed eu libero vel odio venenatis congue at et dolor. Nullam vestibulum blandit velit, nec ultrices nulla faucibus nec. Nam efficitur eros nec libero congue, a tempor nulla vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum ullamcorper fermentum nisi vel lacinia.</Text>

                        <Text style={[styles.Subheading, {
                            color: CurrentAppearance === 'dark' ? colors.white : colors.black,
                        }]}>Lorem Ipsum</Text>
                        <Text style={[styles.subtext, {
                            color: CurrentAppearance === 'dark' ? colors.white : colors.black,
                        }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec lorem eu massa blandit laoreet. Duis eleifend lectus sit amet nisi ultrices, ut efficitur quam finibus. Phasellus tristique felis sed sapien vestibulum, nec eleifend lorem suscipit. Quisque interdum lacus nec velit tempus, non lacinia nulla congue. Integer in vehicula sem. Ut tristique dui id odio feugiat, a condimentum libero tempus. Suspendisse potenti. In hac habitasse platea dictumst. Nulla facilisi. Sed eu libero vel odio venenatis congue at et dolor. Nullam vestibulum blandit velit, nec ultrices nulla faucibus nec. Nam efficitur eros nec libero congue, a tempor nulla vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum ullamcorper fermentum nisi vel lacinia.</Text>

                        <Text style={[styles.Subheading, {
                            color: CurrentAppearance === 'dark' ? colors.white : colors.black,
                        }]}>Lorem Ipsum</Text>
                        <Text style={[styles.subtext, {
                            color: CurrentAppearance === 'dark' ? colors.white : colors.black,
                        }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec lorem eu massa blandit laoreet. Duis eleifend lectus sit amet nisi ultrices, ut efficitur quam finibus. Phasellus tristique felis sed sapien vestibulum, nec eleifend lorem suscipit. Quisque interdum lacus nec velit tempus, non lacinia nulla congue. Integer in vehicula sem. Ut tristique dui id odio feugiat, a condimentum libero tempus. Suspendisse potenti. In hac habitasse platea dictumst. Nulla facilisi. Sed eu libero vel odio venenatis congue at et dolor. Nullam vestibulum blandit velit, nec ultrices nulla faucibus nec. Nam efficitur eros nec libero congue, a tempor nulla vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum ullamcorper fermentum nisi vel lacinia.</Text>

                        <Text style={[styles.Subheading, {
                            color: CurrentAppearance === 'dark' ? colors.white : colors.black,
                        }]}>Lorem Ipsum</Text>
                        <Text style={[styles.subtext, {
                            color: CurrentAppearance === 'dark' ? colors.white : colors.black,
                        }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec lorem eu massa blandit laoreet. Duis eleifend lectus sit amet nisi ultrices, ut efficitur quam finibus. Phasellus tristique felis sed sapien vestibulum, nec eleifend lorem suscipit. Quisque interdum lacus nec velit tempus, non lacinia nulla congue. Integer in vehicula sem. Ut tristique dui id odio feugiat, a condimentum libero tempus. Suspendisse potenti. In hac habitasse platea dictumst. Nulla facilisi. Sed eu libero vel odio venenatis congue at et dolor. Nullam vestibulum blandit velit, nec ultrices nulla faucibus nec. Nam efficitur eros nec libero congue, a tempor nulla vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum ullamcorper fermentum nisi vel lacinia.</Text>
                        <Text style={[styles.Subheading, {
                            color: CurrentAppearance === 'dark' ? colors.white : colors.black,
                        }]}>Lorem Ipsum</Text>
                        <Text style={[styles.subtext, {
                            color: CurrentAppearance === 'dark' ? colors.white : colors.black,
                        }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec lorem eu massa blandit laoreet. Duis eleifend lectus sit amet nisi ultrices, ut efficitur quam finibus. Phasellus tristique felis sed sapien vestibulum, nec eleifend lorem suscipit. Quisque interdum lacus nec velit tempus, non lacinia nulla congue. Integer in vehicula sem. Ut tristique dui id odio feugiat, a condimentum libero tempus. Suspendisse potenti. In hac habitasse platea dictumst. Nulla facilisi. Sed eu libero vel odio venenatis congue at et dolor. Nullam vestibulum blandit velit, nec ultrices nulla faucibus nec. Nam efficitur eros nec libero congue, a tempor nulla vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum ullamcorper fermentum nisi vel lacinia.</Text>
                        <Text style={[styles.Subheading, {
                            color: CurrentAppearance === 'dark' ? colors.white : colors.black,
                        }]}>Lorem Ipsum</Text>
                        <Text style={[styles.subtext, {
                            color: CurrentAppearance === 'dark' ? colors.white : colors.black,
                        }]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec lorem eu massa blandit laoreet. Duis eleifend lectus sit amet nisi ultrices, ut efficitur quam finibus. Phasellus tristique felis sed sapien vestibulum, nec eleifend lorem suscipit. Quisque interdum lacus nec velit tempus, non lacinia nulla congue. Integer in vehicula sem. Ut tristique dui id odio feugiat, a condimentum libero tempus. Suspendisse potenti. In hac habitasse platea dictumst. Nulla facilisi. Sed eu libero vel odio venenatis congue at et dolor. Nullam vestibulum blandit velit, nec ultrices nulla faucibus nec. Nam efficitur eros nec libero congue, a tempor nulla vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum ullamcorper fermentum nisi vel lacinia.</Text>

                    </ScrollView>
                </>
            ) : (<></>)}

        </View>
    )
}

export default SettingsView
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.first,
        flex: 1,
        padding: commonStylying.paddingHorizontalParent
    },
    heading: {
        color: colors.white,
        textAlign: 'center',
        fontSize: fontSize.sixteen,
        fontWeight: '600',
        marginTop: scalableheight.one
    },
    text: {
        color: colors.white,
        fontSize: fontSize.ten,
        fontWeight: '600',
        marginLeft: scalableheight.one
    },
    texttwo: {
        color: colors.white,
        fontSize: fontSize.twelve,
        fontWeight: '600',
        marginLeft: scalableheight.one
    },
    flexView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: scalableheight.one
    },
    Subheading: {
        fontSize: fontSize.twelve,
        fontWeight: '800',
        marginTop: scalableheight.one
    },
    subtext: {
        fontSize: fontSize.ten,
        fontWeight: '400',
        textAlign: 'justify',
        marginTop: scalableheight.one,
        lineHeight: scalableheight.two
    }
})