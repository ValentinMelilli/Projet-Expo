import { StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from 'expo-router';
import { useContext } from 'react';

import { View } from '../../components/Themed';
import CustomImage from '../../components/CustomImage';
import { ImagesContext } from '../../components/ImagesContext';

export default function TabOneScreen() {
  const images = useContext(ImagesContext);

  function renderImage(uri: string) {
    const source = Image.resolveAssetSource({ uri: uri });

    return (
      <CustomImage source={source} />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        numColumns={3}
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderImage(item.base64)}
      />
      <Link href='/camera' asChild>
        <TouchableOpacity style={styles.cameraButton}>
          <FontAwesome size={28} style={{ marginBottom: -3, marginTop: -1 }} name="plus" color={'#000'} />
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  cameraButton: {
    backgroundColor: '#fff',
    textAlign: 'center',
    padding: 15,
    borderRadius: 30,
    borderWidth: 1,
    margin: 5
  },
  list: {
    width: '100%'
  }
});
