import React, { useEffect } from 'react';
import ChatApp from './components/chat/chat';
import { connection_test } from './backend/api_calls';

export default function App() {

  useEffect(() => {
    const initial = async () => {
      try {
        const test = await connection_test();
        if (test) {
          return
        } else {
          Alert.alert('No backend connection');
        }
      } catch (error) {
        console.error('Error connecting to backend:', error);
        Alert.alert('Error', error.message);
      }
    };

    initial(); // Test for backend connection
  }, []);
  
  return(
    <>
      <ChatApp/>
    </>
  )
}