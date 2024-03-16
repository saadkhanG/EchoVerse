import { View, Text, StyleSheet, ImageBackground, Appearance } from 'react-native'
import React, { useEffect } from 'react'
import { colors } from '../../assets/colors'
import { commonStylying } from '../../assets/CommonStyle'
import LottieView from 'lottie-react-native';
import { scalableheight } from '../../assets/dimensions';
import mainStyles from '../../assets/mainStyles';
import CustomButton from '../../Components/CustomButton/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';


const GetStarted = ({ navigation }) => {
    const CurrentAppearance = useSelector((state) => state.appearance);
    useEffect(() => {
        AddAppearance()
    }, [])

    const AddAppearance = async () => {
        const colorScheme = Appearance.getColorScheme();
        try {
            await AsyncStorage.setItem('appearance', colorScheme);
            console.log('appearance', colorScheme);
        } catch (error) {
            console.log('Error saving item:', error);
        }
    }

    const SetLoading = async () => {
        try {
            await AsyncStorage.setItem('dontShowLanding', 'true');
            console.log('Item saved successfully!');
        } catch (error) {
            console.log('Error saving item:', error);
        }
    };
    return (
        <View style={[styles.container, { backgroundColor: CurrentAppearance === 'dark' ? colors.first : colors.secondLight, }]}>
            <View style={{ height: '65%', width: '100%' }}>
                <ImageBackground
                    source={require('../../assets/images/glow.png')}
                    style={styles.backgroundImage}
                    imageStyle={styles.backgroundImageStyle} 
                >
                    <LottieView
                        source={require('../../assets/lottie/micc.json')}
                        style={styles.lottie}
                        loop={true}
                        autoPlay={true}
                    />
                </ImageBackground>
            </View>
            <View style={{ height: '35%', width: '100%', padding: commonStylying.paddingHorizontalParent, }}>
                <Text style={[mainStyles.heading,{
                    color: CurrentAppearance === 'dark' ? 'white' : 'black'
                }]}>Speech To Text (STT)</Text>
                <Text style={[mainStyles.descriptiopn, styles.desc]}>Explore the Power of Voice: Transform spoken words into written text with our cutting-edge Speech-to-Text technology</Text>
                <CustomButton
                    bottom={true}
                    title={'Next'}
                    color={'black'}
                    style={{ marginBottom: scalableheight.three }}
                    onPress={() => { navigation.navigate('BottomTab'), SetLoading() }}
                />
            </View>
        </View>
    )
}

export default GetStarted
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.first,
        flex: 1,
    },
    backgroundImage: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImageStyle: {
        tintColor: colors.main
    },
    lottie: {
        height: scalableheight.thirty,
        width: scalableheight.thirty,
    },
    desc: {
        marginVertical: scalableheight.two,
        width: '85%'
    },
})