import { View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';

//@ts-ignore
export default function Avatar({ image, style, size = 36 }) {
  const SIZING = {
    height: size,
    width: size,
  };
  console.log('avatar', image);
  return (
    <View style={style}>
      {image ? (
        <Image source={image} style={[styles.avatar, SIZING]} />
      ) : (
        <View
          style={[
            styles.avatar,
            SIZING,
          ]}>
          <Ionicons
            name="person-circle-outline"
            size={(size * 2) / 3}
            color="rgba(255,255,255,.8)"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: 36,
    width: 36,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ccc',
  },
});

