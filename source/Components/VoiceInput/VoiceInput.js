import { PermissionsAndroid } from "react-native";
import Voice from '@react-native-voice/voice';

const startListening = async (setIsListening) => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
                title: 'EchoVerse App Mic Permission',
                message:
                    'EchoVerse App needs access to your microphone ',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            try {
                setIsListening(true);
                await Voice.start('en-US');
            } catch (error) {
                console.error('Error starting voice recognition:', error);
            }
        } else {
            console.log('microphone permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
};

const stopListening = async (setIsListening) => {
    try {
        await Voice.stop();
        setIsListening(false);

    } catch (error) {
        console.error('Error stopping voice recognition:', error);
    }
};
const VoiceInput = {
    startListening,
    stopListening
}
export default VoiceInput;