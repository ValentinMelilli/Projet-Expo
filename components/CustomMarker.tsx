import { FontAwesome } from '@expo/vector-icons';
import { Image, StyleSheet, Text, Button, Alert } from 'react-native';
import { Callout, Marker } from 'react-native-maps';
import * as Sharing from 'expo-sharing';

import AppImage from './AppImage';
import { useEffect } from 'react';

const CustomMarker: React.FC<{ image: AppImage }> = ({ image }) => {
  let source = Image.resolveAssetSource({ uri: image.base64 });
  let sharing = false;

  useEffect(() => {
    (async () => {
      sharing = await Sharing.isAvailableAsync();
      console.log(sharing);
    })()
  }, [])

  const share = async () => {
    try {
      await Sharing.shareAsync(image.base64);
    } catch {
      Alert.alert('Erreur', '(Je n\'ai pas réussi à partager l\'image)');
    }
  }

  return (
    <Marker coordinate={image.location}>
      <Callout style={styles.item} onPress={share}>
        <Text style={styles.imageWrapper}>
          <Image source={source} style={styles.image} />
        </Text>
        <Text>
          {image.location.latitude}, {image.location.longitude}
        </Text>
        {
          ({ sharing } ? <Button title={'Partager'} /> : <></>)
        }
      </Callout>
    </Marker>
  )
}

const styles = StyleSheet.create({
  item: {

  },
  imageWrapper: {
    width: '100%',
    height: 100,
    flex: 1,
    marginTop: -50,
  },
  image: {
    width: 100,
    height: 100
  },
  share: {
    backgroundColor: '#f00',
    padding: 5
  }
});

export default CustomMarker;