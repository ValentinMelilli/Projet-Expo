import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { View, StyleSheet, Alert } from 'react-native';
import AppImage from '../components/AppImage';

import CustomCamera from '../components/CustomCamera';

export default function CameraScreen() {
  const { getItem, setItem } = useAsyncStorage('@saved_images');

  const onPicture = async (uri: string, location: { latitude: number, longitude: number }) => {
    uri = `data:image/jpg;base64,${uri}`;

    let image: AppImage = {
      base64: uri,
      location: location
    }

    let imagesJson = await getItem();
    let images = imagesJson !== null ? JSON.parse(imagesJson) : []

    images = [image, ...images];

    try {
      await setItem(JSON.stringify(images));

    } catch (e) {
      console.log(e);
    }

    Alert.alert('Photo sauvegardée', 'La galerie va être mise à jour');
  }

  return (
    <View style={styles.container}>
      <CustomCamera onPicture={onPicture} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
