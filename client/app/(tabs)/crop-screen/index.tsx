import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native'
import React, { useContext, useState } from 'react';
import { router } from 'expo-router';
import { CameraView, CameraType, useCameraPermissions, CameraViewRef } from 'expo-camera';

const CropHomeScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [displayCamera, setDisplayCamera] = useState<Boolean>(false);
  const [facing, setFacing] = useState<CameraType>('back');
  const [cameraRef, setCameraRef] = useState(null);

  const onRequestPermission = () => {
    requestPermission();
    if(permission) {
      setDisplayCamera(true);
    }

  }

  const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const takePhoto = async() => {
    if(cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      console.log(uri);
      router.push(`/crop-screen/result?photoURI=${encodeURIComponent(uri)}`);
    }

  } 

  if(displayCamera && permission) {
    return (
      <CameraView ref={(ref) => setCameraRef(ref)} style={styles.camera} facing={facing} autofocus='on'>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.text}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
      </View>
    </CameraView>
    );
  }
  else {
    return (
      <View style={styles.container}>
      <View style={styles.openCameraContainer}>
        <TouchableOpacity onPress={onRequestPermission} style={styles.openCameraBtn}>
          <Text>Open Camera</Text>
        </TouchableOpacity>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  openCameraContainer: {
    marginVertical: 10
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  openCameraBtn: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  camera: {
    flex: 1,
  },
  button: {
    flex: 1,
    backgroundColor: 'transparent',
   
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: "flex-end",
    alignItems: 'flex-end',
    width: "auto",
    marginBottom: 10,
    padding: 10
  },
  toggleButton: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
})
export default CropHomeScreen;