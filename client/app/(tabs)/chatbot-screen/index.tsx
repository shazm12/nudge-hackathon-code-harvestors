import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Platform } from 'react-native';
import React, { useEffect , useState, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import WebView from 'react-native-webview';

const Chatbot = () => {


    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
      if (Platform.OS === 'web') {
        const script1 = document.createElement('script');
        script1.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
        script1.async = true;
        document.head.appendChild(script1);
  
        const script2 = document.createElement('script');
        script2.src = "https://mediafiles.botpress.cloud/103cc07d-497a-4531-bc4f-df4de60ab814/webchat/config.js";
        script2.defer = true;
        document.head.appendChild(script2);
  
        // Cleanup scripts when component unmounts
        return () => {
          document.head.removeChild(script1);
          document.head.removeChild(script2);
        };
      }
    }, []);

    return (
      <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading</Text>
        </View>
      )}

      {Platform.OS === "web" ? 
      (
        <View></View>
      ): 
      (
        <WebView
        source={{ uri: 'https://mediafiles.botpress.cloud/103cc07d-497a-4531-bc4f-df4de60ab814/webchat/bot.html' }}
        style={styles.webView}
        onLoad={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          setIsLoading(nativeEvent.loading);
        }}
      />

      )}

      </View>
  );
    
  
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loadingContainer: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -25,
      marginLeft: -25,
      zIndex: 1, // Ensure the spinner is above the WebView
    },
    webView: {
      flex: 1,
      marginTop: 10
    },
})

export default Chatbot;