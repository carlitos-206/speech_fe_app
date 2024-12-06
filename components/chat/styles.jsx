import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  chatContainer: {
    flex: 1,
    padding: 10,
    marginTop: '5vh',
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
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#454545',
  },
  thinkingMessage: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  messageText: {
    color: '#fff',
    fontSize: 18,
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
    fontSize: 18,
  },
  optionButton: {
    padding: 0,
    marginVertical: 5,
    backgroundColor: 'transparent',
    borderRadius: 0,
  },
  optionText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  micButton: {
    // Adjust as needed for your layout
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
},
voiceLevelContainer: {
    position: 'absolute',
    bottom: -15,
    width: 50,
    height: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 2.5,
    overflow: 'hidden',
},
voiceLevelBar: {
    height: '100%',
    backgroundColor: '#007AFF',
},
});
