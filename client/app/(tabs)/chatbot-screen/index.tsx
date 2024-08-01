import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect , useState, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import WebView from 'react-native-webview';

const Chatbot = () => {


    const [isLoading, setIsLoading] = useState(true);

    return (
      <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading</Text>
        </View>
      )}
      <WebView
        source={{ uri: 'https://mediafiles.botpress.cloud/103cc07d-497a-4531-bc4f-df4de60ab814/webchat/bot.html' }}
        style={styles.webView}
        onLoad={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          setIsLoading(nativeEvent.loading);
        }}
      />
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