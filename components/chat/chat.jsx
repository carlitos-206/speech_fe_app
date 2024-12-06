import React, { useState, useEffect, useRef } from 'react';
import { StatusBar, View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { styles } from './styles';
import MicButton from './MicButton'; // Import the MicButton component
import { init_messages } from './_message';
import { v4 as uuidv4 } from 'uuid';
import { backend_voice_audio } from '../../backend/api_calls';
import * as FileSystem from 'expo-file-system'; // Import FileSystem from Expo
import RecordingHandler from '../_global/RecordingHandler';


const MAIN_URL = "https://3281cb61c179.ngrok.app"

const ChatApp = () => {
    const [allMessages, setAllMessages] = useState(init_messages);
    const [visibleMessages, setVisibleMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
    const [micAndTextEnabled, setMicAndTextEnabled] = useState(false);
    const [optionsEnabled, setOptionsEnabled] = useState(true);
    const [selectedPhrase, setSelectedPhrase] = useState(null);
    const scrollViewRef = useRef();
    const recordingHandlerRef = useRef(null);


    useEffect(() => {
        recordingHandlerRef.current = new RecordingHandler();
    }, []);

    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex < allMessages.length) {
                const messageToAdd = allMessages[currentIndex];
                setVisibleMessages((prev) => [...prev, messageToAdd]);
                currentIndex += 1;
            } else {
                clearInterval(interval);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [allMessages]);

    const handleOptionPress = (option) => {
        setVisibleMessages((prev) => [
            ...prev,
            { id: uuidv4(), text: `You selected: ${option.value}`, sender: 'You' },
            {
                id: uuidv4(),
                text: 'Please hold the mic button, repeat the phrase, and release the mic when complete.',
                sender: 'Bot',
            },
        ]);
        setMicAndTextEnabled(true);
        setOptionsEnabled(false);
        setSelectedPhrase(option.text);
    };

    const handleSend = () => {
        if (inputText.trim()) {
            setIsWaitingForResponse(true);
            setVisibleMessages((prev) => [
                ...prev,
                { id: uuidv4(), text: inputText, sender: 'You' },
                { id: uuidv4(), text: '...', sender: 'thinking' },
            ]);
            setInputText('');

            // Call your backend API for text messages here
            // For now, we'll simulate a response with setTimeout
            setTimeout(() => {
                setVisibleMessages((prev) => prev.filter((msg) => msg.sender !== 'thinking'));
                setVisibleMessages((prev) => [
                    ...prev,
                    { id: uuidv4(), text: 'This is the response from the API', sender: 'Bot' },
                ]);
                setIsWaitingForResponse(false);
            }, 2000);
        }
    };

    const handleStopRecording = async (audioUri) => {
        setIsWaitingForResponse(true);

        if (audioUri) {
            setVisibleMessages((prev) => [
                ...prev,
                { id: uuidv4(), audio: audioUri, sender: 'You' },
                { id: uuidv4(), text: '...', sender: 'thinking' },
            ]);

            try {
                const phrase = selectedPhrase;
                const realUri = Platform.OS === 'ios' ? uri.replace('file://', '') : audioUri;
                const fileInfo = await FileSystem.getInfoAsync(realUri);
                if (!fileInfo.exists) {
                    console.error('File does not exist at the specified URI:', realUri);
                    return;
                }

                const formData = new FormData();
                formData.append('file', {
                    uri: realUri,
                    type: 'audio/m4a',
                    name: 'recording.m4a',
                });
                formData.append('phrase', phrase);
                const response = await fetch(`${MAIN_URL}/audio`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
    
                const jsonResponse = await response.json();
                console.log('Response from backend status:', jsonResponse.status, typeof jsonResponse.status);
                if (!response.ok) {
                    console.error('Backend returned an error:', response.status, response.statusText);
                    Alert.alert('Error', `Backend error: ${response.status} ${response.statusText}`);
                    setIsWaitingForResponse(false);
                    return;
                }
                setVisibleMessages((prev) => [
                    ...prev,
                    { id: uuidv4(), text: `${jsonResponse.result.text}`, sender: 'Bot' }
                ]);
                setIsWaitingForResponse(false);
                setMicAndTextEnabled(true);
            } catch (error) {
                console.error('Error handling audio data:', error);
                Alert.alert('Error', 'An error occurred while processing the audio data.');
                setIsWaitingForResponse(false);
            }
        } else {
            Alert.alert('Recording Failed', 'Could not record audio message.');
            setIsWaitingForResponse(false);
        }
    };

    const handlePlayAudio = async (audioUri) => {
        try {
            await recordingHandlerRef.current.playSound(audioUri);
        } catch (error) {
            console.error('Error playing audio:', error);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <ScrollView
                style={styles.chatContainer}
                ref={scrollViewRef}
                contentContainerStyle={{ paddingBottom: 20 }}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            >
                {visibleMessages.map((msg, index) => {
                    if (!msg) {
                        console.warn(`Message at index ${index} is undefined:`, msg);
                        return null;
                    }
                    if (!msg.sender) {
                        console.warn(`Message at index ${index} has no sender:`, msg);
                        return null;
                    }

                    return (
                        <View
                            key={msg.id}
                            style={[
                                styles.messageBubble,
                                msg.sender === 'You'
                                    ? styles.sentMessage
                                    : msg.sender === 'thinking'
                                    ? styles.thinkingMessage
                                    : styles.receivedMessage,
                            ]}
                        >
                            {msg.sender === 'option' ? (
                                <TouchableOpacity
                                    style={styles.optionButton}
                                    onPress={() => handleOptionPress(msg)}
                                    disabled={!optionsEnabled}
                                >
                                    <Text style={styles.optionText}>{msg.text}</Text>
                                </TouchableOpacity>
                            ) : msg.audio ? (
                                <TouchableOpacity
                                    onPress={() => {
                                       handlePlayAudio(msg.audio);
                                    }}
                                >
                                    <Text style={styles.audioMessageText}>Play Audio</Text>
                                </TouchableOpacity>
                            ) : (
                                <Text style={styles.messageText}>{msg.text}</Text>
                            )}
                        </View>
                    );
                })}
            </ScrollView>

            <View style={styles.inputContainer}>
                <MicButton
                    onStopRecording={handleStopRecording}
                    disabled={isWaitingForResponse || !micAndTextEnabled}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Type your message..."
                    value={inputText}
                    onChangeText={setInputText}
                    editable={!isWaitingForResponse && micAndTextEnabled}
                />
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={handleSend}
                    disabled={isWaitingForResponse || !micAndTextEnabled}
                >
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ChatApp;
