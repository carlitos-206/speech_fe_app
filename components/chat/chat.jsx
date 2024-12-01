import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import { Audio } from 'expo-av';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ChatApp = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [recording, setRecording] = useState(null);


    const handleSend = () => {
        if (inputText.trim()) {
            setMessages([...messages, { id: Date.now(), text: inputText, sender: 'You' }]);
            setInputText('');
        }
    };

    const startRecording = async () => {
        try {
                const { status } = await Audio.requestPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permission Required', 'Microphone access is needed to send voice messages.');
                    return;
                }
                await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
                const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
                setRecording(recording);
                } catch (err) {
                console.error('Failed to start recording', err);
            }
    };

    const stopRecording = async () => {
        try {
                if (!recording) return;
                await recording.stopAndUnloadAsync();
                const uri = recording.getURI();
                setRecording(null);
                setMessages((prevMessages) => [...prevMessages, { id: Date.now(), audio: uri, sender: 'You' }]);
            } catch (error) {
                console.error('Failed to stop recording', error);
            }
    };

    const playSound = async (uri) => {
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
                    console.error("Error playing sound", error);
                }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.chatContainer}>
                {messages.map((msg) => (
                    <View
                        key={msg.id}
                        style={[
                            styles.messageBubble,
                            msg.sender === 'You' ? styles.sentMessage : styles.receivedMessage,
                        ]}
                    >
                        {msg.text && <Text style={styles.messageText}>{msg.text}</Text>}
                        {msg.audio && (
                            <TouchableOpacity onPress={() => playSound(msg.audio)}>
                                <Icon name="play-circle" size={30} color="#fff" />
                            </TouchableOpacity>
                        )}
                    </View>
                ))}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TouchableOpacity
                    style={styles.micButton}
                    onPressIn={startRecording}
                    onPressOut={stopRecording}
                >
                    <Icon name="microphone" size={30} color="#007AFF" />
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder="Type your message..."
                    value={inputText}
                    onChangeText={setInputText}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ChatApp;
