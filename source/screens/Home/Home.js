import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../assets/colors'
import { commonStylying } from '../../assets/CommonStyle'
import Voice from '@react-native-voice/voice';
import { fontSize, scalableheight } from '../../assets/dimensions';
import MMcons from 'react-native-vector-icons/MaterialIcons';
import VoiceInput from '../../Components/VoiceInput/VoiceInput';
import mainStyles from '../../assets/mainStyles';
import Tts from 'react-native-tts';
import { useSelector } from 'react-redux';

const Home = ({ navigation }) => {
    const CurrentAppearance = useSelector((state) => state.appearance);

    const onSpeechResults = (event) => {
        let newData = event.value[0];
        setreponse((prevResponse) => prevResponse + ' ' + newData);
        console.log('data: ', event);
        console.log('data: ', newData);
    };
    Voice.onSpeechResults = onSpeechResults;
    const [isListening, setIsListening] = useState(false);
    const [timerInterval, setTimerInterval] = useState(null);
    const [time, setTime] = useState({ minutes: 0, seconds: 0 });
    const [reponse, setreponse] = useState('')
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        Voice.onSpeechResults = onSpeechResults;
        const ttsStartListener = Tts.addEventListener('tts-start', () => {
            setIsSpeaking(true);
            console.log(isSpeaking, 'start')
        });
        const ttsFinishListener = Tts.addEventListener('tts-finish', () => {
            setIsSpeaking(false);
            console.log(isSpeaking, 'stop')
        });

        return () => {
            Voice.removeAllListeners();
            clearInterval(timerInterval);
            ttsStartListener.remove();
            ttsFinishListener.remove();
        };
    }, [timerInterval]);

    React.useEffect(() => {
        const subscribe = navigation.addListener('focus', () => {
            setIsSpeaking(false)
        });
        return subscribe;
    }, [isSpeaking]);

    useEffect(() => {
        Tts.setDefaultLanguage('en-US');
        Tts.setDefaultRate(0.5);
    }, []);

    const handleSpeak = async () => {
        await Tts.speak(reponse);
    }
    const handleStop = async () => {
        await Tts.stop()
        setIsSpeaking(false);
    }

    const startTimer = () => {
        const interval = setInterval(() => {
            setTime((prevTime) => {
                let newSeconds = prevTime.seconds + 1;
                let newMinutes = prevTime.minutes;
                if (newSeconds === 60) {
                    newSeconds = 0;
                    newMinutes++;
                }
                const newTime = { minutes: newMinutes, seconds: newSeconds };
                setTime(newTime);
                return newTime;
            });
        }, 1000);
        setTimerInterval(interval);
    };

    const [font, setfont] = useState(17)
    const stopTimer = () => {
        clearInterval(timerInterval);
        setTimerInterval(null);
        setTime({ minutes: 0, seconds: 0 });
    };

    const TaskButtons = (icon, title, id) => {
        const handlePress = (id) => {
            if (id === 1) {
                setreponse('')
            }
            else if (id === 2) {
                if (font < 22) {
                    setfont(font + 1)
                }
            }
            else if (id === 3) {
                if (font > 15) {
                    setfont(font - 1)
                }
            }
        }
        return (
            <TouchableOpacity style={[styles.button,{
                borderColor:CurrentAppearance === 'dark' ? colors.white : colors.main,
            }]} onPress={() => handlePress(id)}>
                <MMcons name={icon} size={scalableheight.two} color={CurrentAppearance === 'dark' ? colors.white : colors.main} />
                <Text style={[styles.buttonText,{
                    color: CurrentAppearance === 'dark' ? colors.white : colors.black,
                }]}>{title}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <View style={[styles.container, { backgroundColor: CurrentAppearance === 'dark' ? colors.first : colors.secondLight, }]}>

            <View style={[styles.TopView, { backgroundColor: 'transparent', }]}>
                <Text style={[styles.heading,{
                    color: CurrentAppearance === 'dark' ? colors.white : colors.black,
                }]}
                >Output</Text>

                <ScrollView style={{ flex: 1, maxHeight: '85%' }}>
                    <Text
                        selectable={true}
                        style={[styles.userText, {
                            fontSize: font,
                            color: CurrentAppearance === 'dark' ? colors.white : colors.black,
                        }]}>
                        {reponse ? reponse : <Text style={styles.placeholder}>say something!</Text>}
                    </Text>
                </ScrollView>
                <View style={[styles.BottomflexView]}>
                    <TouchableOpacity style={[styles.bottomButton, {
                        backgroundColor: CurrentAppearance === 'dark' ? colors.first : colors.white,
                    }]} onPress={() => isSpeaking ? handleStop() : handleSpeak()}>
                        <MMcons name={isSpeaking ? 'stop' : 'play-arrow'} size={scalableheight.three} color={CurrentAppearance === 'dark' ? colors.white : colors.main} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.bottomView, { backgroundColor: CurrentAppearance === 'dark' ? colors.third : colors.white }]}>

                <View style={[styles.timer, { backgroundColor: timerInterval ? colors.white : null }]}>
                    {timerInterval ? (

                        <Text style={[mainStyles.whiteText, { color: colors.black }]}>
                            duration: {timerInterval ? `${time.minutes} : ${time.seconds}` : 'Press and hold to start and release to stop!'}
                        </Text>

                    ) : (<><Text style={mainStyles.whiteText}> </Text></>)}
                </View>

                <View style={{ alignItems: 'center', padding: commonStylying.paddingHorizontalParent, width: '100%' }}>
                    <View style={styles.flexView}>
                        {TaskButtons('backspace', 'Clear All', 1)}
                        {TaskButtons('text-increase', 'Increase Font', 2)}
                        {TaskButtons('text-decrease', 'Decrease Font', 3)}
                    </View>

                    <TouchableOpacity
                        onPressIn={() => { VoiceInput.startListening(setIsListening), startTimer() }}
                        onPress={() => { VoiceInput.stopListening(setIsListening), stopTimer() }}
                        activeOpacity={0.5}
                        style={[styles.mic,{
                            borderColor:CurrentAppearance === 'dark' ? colors.white : colors.main,
                        }]}
                    >
                        <MMcons name={'mic'} size={scalableheight.four} color={CurrentAppearance === 'dark' ? colors.white : colors.main} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Home
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    TopView: {
        margin: commonStylying.paddingHorizontalParent,
        backgroundColor: colors.second,
        height: '60%',
        borderRadius: fontSize.borderradiusmedium,
    },
    bottomView: {
        height: '40%',
        borderTopLeftRadius: scalableheight.three,
        borderTopRightRadius: scalableheight.three,
        elevation: 5,
        alignItems: 'center'
    },
    mic: {
        width: scalableheight.eight,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: fontSize.circle,
        marginVertical: scalableheight.three,
        height:scalableheight.eight,
        borderWidth:2,
    },
    heading: {
        fontSize: fontSize.fifteen,
        fontWeight: '700',
        color: colors.white,
        paddingHorizontal: scalableheight.two,
        paddingTop: scalableheight.two,
    },
    userText: {
        fontWeight: '400',
        color: colors.white,
        textAlign: 'justify',
        lineHeight: scalableheight.twopointsix,
        width: '100%',
        textAlign: 'justify',
        padding: scalableheight.two,
    },
    button: {
        paddingHorizontal: scalableheight.two,
        paddingVertical: scalableheight.pointeightfive,
        borderRadius: fontSize.borderradiusmedium,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth:2,
    },
    flexView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: scalableheight.one
    },
    placeholder: {
        fontSize: fontSize.twelve,
        fontWeight: '300',
        color: colors.appGrey,
    },
    buttonText: {
        fontSize: fontSize.twelve,
        fontWeight: '400',
        color: colors.white,
    },
    timer: {
        backgroundColor: colors.white,
        padding: scalableheight.one,
        borderRadius: fontSize.borderradiusmedium,
        bottom: scalableheight.onepointfive
    },
    bottomButton: {
        paddingHorizontal: scalableheight.onepointfive,
        paddingVertical: scalableheight.one,
        borderRadius: fontSize.borderradiusmedium,
        elevation:10
    },
    BottomflexView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 0,
        alignSelf: 'flex-end',
    }
})