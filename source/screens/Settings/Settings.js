import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native'
import React from 'react'
import { colors } from '../../assets/colors'
import { commonStylying } from '../../assets/CommonStyle'
import { fontSize, scalableheight } from '../../assets/dimensions'
import MMcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux'

const Settings = ({ navigation }) => {
    const CurrentAppearance = useSelector((state) => state.appearance);
    const CustomStackButtons = (icon1, icon2, title, id) => {
        const Permissions = () => {
            if (Platform.OS === 'android') {
                Linking.openSettings();
            } else {
                Linking.openURL('app-settings:');
            }
        }
        return (
            <TouchableOpacity
                activeOpacity={0.6}
                style={styles.button}
                onPress={() => id === 3 ? Permissions() : navigation.navigate('SettingsView', id)}
            >
                <View style={styles.buttonFlex}>
                    <MMcons name={icon1} size={scalableheight.twopointfive} color={CurrentAppearance === 'dark' ? colors.white : colors.black} />
                    <Text style={[styles.buttonText, {
                        color: CurrentAppearance === 'dark' ? colors.white : colors.black,
                    }]}>{title}</Text>
                </View>
                <MMcons name={icon2} size={scalableheight.two} color={CurrentAppearance === 'dark' ? colors.white : colors.black} />
            </TouchableOpacity>
        )
    }
    return (
        <View style={[styles.container, { backgroundColor: CurrentAppearance === 'dark' ? colors.first : colors.secondLight, }]}>
            <Text style={[styles.heading, {
                color: CurrentAppearance === 'dark' ? colors.white : colors.black,
            }]}>Settings</Text>
            <View style={{ marginTop: scalableheight.four }}>
                {CustomStackButtons('visibility', 'arrow-forward-ios', 'Appearance', 1)}
                {CustomStackButtons('headphones', 'arrow-forward-ios', 'Help and Support', 2)}
                {CustomStackButtons('key', 'arrow-forward-ios', 'Permissions ', 3)}
                {CustomStackButtons('help', 'arrow-forward-ios', 'About Us', 4)}
            </View>
        </View>
    )
}

export default Settings
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
        marginTop: scalableheight.two
    },
    button: {
        padding: scalableheight.one,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: scalableheight.one
    },
    buttonFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
    },
    buttonText: {
        color: colors.white,
        fontSize: fontSize.twelve,
        fontWeight: '400',
        marginLeft: scalableheight.one
    }
})