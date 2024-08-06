import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect , useState } from 'react'
import { useLocalSearchParams } from 'expo-router'

const ResultScreen = () => {

    const { photoURI } = useLocalSearchParams<{ photoURI: string}>();
    const [loading , setLoading] = useState<Boolean>(true);
    const [prediction, setPrediction] = useState("");

    
    const uploadImage = async (uri) => {
        setLoading(true);
        const localUri = uri;
        const filename = localUri.split('/').pop();
        const type = `image/${filename.split('.').pop()}`;
        const formData = new FormData();

        formData.append('file', {
            uri: localUri,
            type: type,
            name: filename,
        });

        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_API_ENPOINT}/predict`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const responseJson = await response.json();
            const predictionText = responseJson?.predicted_category;
            setPrediction(predictionText);
            setLoading(false);
        } catch (error) {
            console.error('Error:', error.message);
            setLoading(false);
        }

    };

    useEffect(() => {
        if(photoURI) {
            uploadImage(photoURI);
        }
    },[]);


    if(photoURI) {
        return (
            <View style={styles.container}>
                <View>
                    <Image source={{ uri: photoURI }} height={400} width={400}  style={styles.photoPreview} />
                </View>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <Text>Loading the Predictions from Model...</Text>
                    </View>
                )
                :
                (
                    <View style={styles.predictionContainer}>
                        <Text  style={styles.predictionText}>Predicted: {prediction}</Text>
                    </View>
                )}
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
        width: 250,
        textAlign: "center"
    },
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
   }
});

export default ResultScreen;