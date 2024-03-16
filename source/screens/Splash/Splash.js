import { View, StyleSheet, Image, Appearance } from 'react-native'
import React, { useEffect } from 'react'
import { colors } from '../../assets/colors'
import { scalableheight } from '../../assets/dimensions'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setAppearance } from '../../redux/appearSlice';

const Splash = ({ navigation }) => {
    const CurrentAppearance = useSelector((state) => state.appearance);
    const dispatch = useDispatch();
    useEffect(() => {
        checkLanding()
        CheckAppearance()
    }, []);

    const CheckAppearance = async () => {
        const currentAppearance = await AsyncStorage.getItem('appearance');
        if (currentAppearance) {
            console.log('found', currentAppearance)
            dispatch(setAppearance(currentAppearance))
        }
        else {
            console.log('not found', currentAppearance)
            const colorScheme = Appearance.getColorScheme();
            try {
                await AsyncStorage.setItem('appearance', colorScheme);
                console.log('appearance', colorScheme);
            } catch (error) {
                console.log('Error saving item:', error);
            }
            dispatch(setAppearance(colorScheme))
        }
    }

    const checkLanding = async () => {
        const dontShowLanding = await AsyncStorage.getItem('dontShowLanding');
        if (dontShowLanding) {
            console.log('found', dontShowLanding)
            const timeoutId = setTimeout(() => {
                navigation.replace('BottomTab');
            }, 3000);
            return () => clearTimeout(timeoutId);
        }
        else {
            console.log('not found', dontShowLanding)
            const timeoutId = setTimeout(() => {
                navigation.replace('GetStarted');
            }, 3000);
            return () => clearTimeout(timeoutId);
        }
    }

    return (
        <View style={[styles.container, { backgroundColor: CurrentAppearance === 'dark' ? colors.first : colors.secondLight, }]}>
            <Image source={require('../../assets/images/logo.png')} style={[styles.logo,{
                tintColor:CurrentAppearance === 'dark' ? 'white' : 'black',
            }]} />
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.first,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: scalableheight.thirty,
        width: scalableheight.thirty,
        resizeMode: 'contain',
        tintColor: colors.white,
    }
})