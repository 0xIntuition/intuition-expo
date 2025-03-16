import { View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { createAvatar } from '@dicebear/core';
import { bottts, botttsNeutral } from '@dicebear/collection';

//@ts-ignore
export default function Avatar({ image, style, size = 36, radius = 999, id }: { image?: string, style: any, size: number, radius: number, id?: string }) {
  const SIZING = {
    height: size,
    width: size,
  };

  const avatar = id ? createAvatar(botttsNeutral, {
    seed: id,
    size: size,
    radius: radius,
  }).toDataUri() : null;
  const uri = image ? image : avatar;
  return (
    <View style={style}>
      {uri ? (
        <Image source={uri} recyclingKey={uri} style={[styles.avatar, SIZING, { borderRadius: radius }]} />
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

