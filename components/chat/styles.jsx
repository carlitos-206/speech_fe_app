import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f4f4f4',
    },
    chatContainer: {
      flex: 1,
      padding: 10,
    },
    messageBubble: {
      maxWidth: '80%',
      padding: 10,
      borderRadius: 10,
      marginVertical: 5,
    },
    sentMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#007AFF',
      color: '#fff',
    },
    receivedMessage: {
      alignSelf: 'flex-start',
      backgroundColor: '#e0e0e0',
      color: '#000',
    },
    messageText: {
      color: '#fff',
    },
    inputContainer: {
      flexDirection: 'row',
      padding: 10,
      borderTopWidth: 1,
      borderColor: '#ddd',
      alignItems: 'center',
    },
    micButton: {
      paddingHorizontal: 10,
    },
    input: {
      flex: 1,
      padding: 10,
      borderRadius: 20,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ddd',
      marginHorizontal: 10,
    },
    sendButton: {
      backgroundColor: '#007AFF',
      borderRadius: 20,
      paddingHorizontal: 15,
      justifyContent: 'center',
    },
    sendButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });