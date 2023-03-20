import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PictureButton = (props: any) => {
  return (
      <TouchableOpacity onPress={props.onPress} style={styles.button} />
  );
}

const styles = StyleSheet.create({
  button: {
      position: 'absolute',
      bottom: 30,
      width: 75,
      height: 75,
      borderRadius: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      borderWidth: 1
  }
});

export default PictureButton;