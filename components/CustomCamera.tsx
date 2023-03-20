import { Camera, CameraType, ImageType } from 'expo-camera';
import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import PictureButton from './PictureButton';
import * as Location from 'expo-location';

const CustomCamera: React.FC<{ onPicture: Function }> = ({ onPicture }) => {
  const [type, setType] = useState(CameraType.back);
  const [location, setLocation] = useState<Location.LocationObject>();
  let useLocation = true;
  let camera: Camera;


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        useLocation = false;
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const takePicture = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();

    if (status === 'granted' && useLocation) {
      let picture = await camera.takePictureAsync({
        base64: true,
        quality: 0.1,
        imageType: ImageType.jpg
      });

      onPicture(picture.base64, {latitude: location?.coords.latitude, longitude: location?.coords.longitude});
    }
    else {
      console.log('error')
    }
  }

  return (
    <>
      <Camera style={styles.camera} type={type} ref={(r: Camera) => { camera = r }} />
      <TouchableOpacity onPress={toggleCameraType} style={styles.switchButton}>
        <Text style={{ textAlign: 'center' }}>Flip</Text>
      </TouchableOpacity>
      <PictureButton onPress={takePicture} />
    </>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  switchButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    minWidth: '25%'
  }
});

export default CustomCamera;