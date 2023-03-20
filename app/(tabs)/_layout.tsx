import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { Tabs } from 'expo-router';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import AppImage from '../../components/AppImage';
import { ImagesContext } from '../../components/ImagesContext';
import Colors from '../../constants/Colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [images, setImages] = useState<AppImage[]>([]);
  const { getItem } = useAsyncStorage('@saved_images');
  
  const loadImages = async () => {
    let imagesJson = await getItem();
    
    if(imagesJson !== null) {
      let savedImages = JSON.parse(imagesJson);
      setImages(savedImages);
    }
  }
  
  useEffect(() => {
    // C'est pas propre mais j'ai pas réussi à mettre à jour le Context
    setInterval(() => {
      loadImages();
    }, 5000)
  }, [])

  return (
    <ImagesContext.Provider value={images}>
      <Tabs screenOptions={{tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint}}>
        <Tabs.Screen name="index"
          options={{
            title: 'Photos',
            tabBarIcon: ({ color }) => <TabBarIcon name="camera" color={color} />,
          }}
        />
        <Tabs.Screen name="two"
          options={{
            title: 'Carte',
            tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
          }}
        />
      </Tabs>
    </ImagesContext.Provider>
  );
}
