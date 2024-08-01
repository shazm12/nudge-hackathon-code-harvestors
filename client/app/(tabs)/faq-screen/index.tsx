import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import LinkPreview from './LinkPreview';


const  linksToRender = ["https://pmfby.gov.in/", 
    "https://m.indiacustomercare.com/ministry-agriculture-and-farmers-welfare-contact-no#google_vignette",
     "https://www.enam.gov.in/web/",
     "https://agriinfra.dac.gov.in/",
     "https://agritech.tnau.ac.in/kisan/kisan.html",
    
    ];

const FAQHomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Helpful Links and Articles</Text>
        </View>
        <View style={styles.linksPreviewContainer}>
            {
                linksToRender.map((link) => (
                    <LinkPreview url={link} />
                ))
            }
        </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,      
    },

    titleContainer: {
        marginTop: 100,
        flex: 1,
        alignSelf: "center"
    },

    titleText: {
        fontSize: 24,
        fontWeight: "bold"
    },
    linksPreviewContainer: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        gap: 10,
        marginTop: 40,
        width: "80%",
        alignSelf: "center"

    }

})

export default FAQHomeScreen;