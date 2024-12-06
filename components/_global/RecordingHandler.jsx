import { Audio } from 'expo-av';
import { Alert } from 'react-native';

class RecordingHandler {
    constructor() {
        this.recording = null;
    }

    startRecording = async () => {
        try {
            const { status } = await Audio.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Permission Required',
                    'Microphone access is needed to send voice messages.'
                );
                return;
            }
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            const recordingObject = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            this.recording = recordingObject.recording;
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    };

    stopRecording = async () => {
        try {
            const recording = this.recording;
            if (!recording) return null;
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            this.recording = null;
            return uri; // Return the audio URI instead of modifying state
        } catch (error) {
            console.error('Failed to stop recording', error);
            return null;
        }
    };

    playSound = async (uri) => {
        try {
            const { sound } = await Audio.Sound.createAsync({ uri });
            await sound.playAsync();
            // Automatically unload after playback
            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.didJustFinish) {
                    sound.unloadAsync();
                }
            });
        } catch (error) {
            console.error('Error playing sound', error);
        }
    };
    async getVoiceLevel() {
        if (this.recording) {
            const status = await this.recording.getStatusAsync();
            if (status.metering) {
                // Normalize metering value between 0 and 1
                const level = (status.metering + 160) / 160;
                return level;
            }
        }
        return 0;
    }
}

export default RecordingHandler;
