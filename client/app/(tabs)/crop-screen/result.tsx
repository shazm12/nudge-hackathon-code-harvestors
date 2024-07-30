import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const ResultScreen = () => {

    const { photoURI } = useLocalSearchParams<{ photoURI: string}>();

    if(photoURI) {
        return (
            <View style={styles.container}>
                <View>
                    <Image source={{ uri: photoURI }} height={400} width={400}  style={styles.photoPreview} />
                </View>
                <View style={styles.predictionContainer}>
                    <Text  style={styles.predictionText}>Predicted: Something</Text>
                </View>
            </View>
          );
    }
  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 0
    },

    photoPreview: {
        
    },
    predictionContainer: {
        marginTop: 50,
    },
    predictionText: {
        fontSize: 24,
        
    }
});

export default ResultScreen;