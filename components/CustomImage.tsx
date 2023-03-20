import { useRef } from 'react';
import { ImageSourcePropType, View } from 'react-native';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

const CustomImage : React.FC<{source: ImageSourcePropType}>  = ({ source }) => {      
    return (
    <TouchableOpacity style={styles.item}>
      <Image source={source} style={styles.image} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexBasis: '33.33%',
    flexGrow: 0,
    flexShrink: 0,
    padding: 5,
  },
  image: {
    borderRadius: 5,
    width: 'auto',
    aspectRatio: 1,
  }
});

export default CustomImage;