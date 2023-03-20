import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

import { View } from '../../components/Themed';
import { ImagesContext } from '../../components/ImagesContext';
import CustomMarker from '../../components/CustomMarker';

export default function TabTwoScreen() {
  const [location, setLocation] = useState<Location.LocationObject>();
  const images = useContext(ImagesContext);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let region = {
    latitude: 43.635213,
    longitude: 3.8292835,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }

  let key = 0;

  if (location) {
    region.latitude = location.coords.latitude;
    region.longitude = location.coords.longitude;
  }

  return (
    <View style={styles.container}>
      <MapView
        loadingEnabled={true}
        region={region}
        style={styles.map}
      >
        {
          images.map(img => {
              key++;
              return (<CustomMarker key={key} image={img} />)
          })
        }
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  }
});
