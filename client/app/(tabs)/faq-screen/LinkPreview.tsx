import { Link } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';

const LinkPreview = ({ url }) => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreview = async () => {
      setLoading(true);
      try {
        // Fetch metadata from the URL
        const apiKey = "153ddae74b899e35414505b6666e738e";
        const response = await fetch(`https://api.linkpreview.net/?key=${apiKey}&q=${url}`, {
          method: "GET",
        });
        const data = await response.json();
        setPreview(data);
      } catch (error) {
        console.error('Error fetching preview:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPreview();
  }, [url]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!preview || preview?.description.includes("403")) {
    return <Text>No preview available</Text>;
  }

  if(preview?.error === 429) {
    return (
        <View style={styles.linkContainer}>
            <Link href={url}>
                <Text style={styles.linkText}>{url}</Text>
            </Link>
        </View>
    )
  }



  return (
    <View style={styles.container}>
      {preview.image && <Image source={{ uri: preview.image }} style={styles.image} />}
      <Text style={styles.title}>{preview?.title.length > 50 ? preview.title.slice(0,50)+ "..." : preview.title}</Text>
      <Text>{preview.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  linkContainer: {
    padding: 20,
    borderRadius: 5
  },
  linkText: {
    color: "#0000ff",
    fontSize:20,
    fontFamily: "Chalkduster"
  }
});

export default LinkPreview;