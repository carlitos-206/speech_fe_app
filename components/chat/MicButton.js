// MicButton.js
import React, { useState, useRef, useEffect } from 'react';
import { TouchableOpacity, Animated, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './styles';
import RecordingHandler from '../_global/RecordingHandler';

const MicButton = ({ onStopRecording, disabled }) => {
    const [isRecording, setIsRecording] = useState(false);
    const scaleValue = useRef(new Animated.Value(1)).current;
    const [voiceLevel, setVoiceLevel] = useState(0);
    const recordingHandlerRef = useRef(null);

    useEffect(() => {
        recordingHandlerRef.current = new RecordingHandler();
    }, []);

    useEffect(() => {
        let interval;
        if (isRecording) {
            interval = setInterval(async () => {
                // Assuming RecordingHandler has a method to get current voice level
                const level = await recordingHandlerRef.current.getVoiceLevel();
                setVoiceLevel(level);
            }, 100);
        } else {
            clearInterval(interval);
            setVoiceLevel(0);
        }
        return () => clearInterval(interval);
    }, [isRecording]);

    const handlePressIn = () => {
        setIsRecording(true);
        Animated.spring(scaleValue, {
            toValue: 1.5,
            friction: 3,
            useNativeDriver: true,
        }).start();
        recordingHandlerRef.current.startRecording();
    };

    const handlePressOut = async () => {
        setIsRecording(false);
        Animated.spring(scaleValue, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
        const audioUri = await recordingHandlerRef.current.stopRecording();
        if (onStopRecording) {
            onStopRecording(audioUri);
        }
    };

    return (
        <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={disabled}
            style={styles.micButton}
        >
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                <Icon
                    name="microphone"
                    size={30}
                    color={disabled ? '#ccc' : '#007AFF'}
                />
            </Animated.View>
            {isRecording && (
                <View style={styles.voiceLevelContainer}>
                    <View
                        style={[
                            styles.voiceLevelBar,
                            { width: `${voiceLevel * 100}%` },
                        ]}
                    />
                </View>
            )}
        </TouchableOpacity>
    );
};

export default MicButton;
