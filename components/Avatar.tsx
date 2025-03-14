import { View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';

//@ts-ignore
export default function Avatar({ image, style, size = 36, radius = 999 }) {
  const SIZING = {
    height: size,
    width: size,
  };
  return (
    <View style={style}>
      {image ? (
        <Image source={image} style={[styles.avatar, SIZING, { borderRadius: radius }]} />
      ) : (
        <View
          style={[
            styles.avatar,
            SIZING,
            { borderRadius: radius }
          ]}>
          <Ionicons
            name="image-outline"
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});

