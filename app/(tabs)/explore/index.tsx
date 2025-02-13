import { View, useWindowDimensions } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { StyleSheet } from 'react-native';

export default function ExploreIndex() {
  const { width } = useWindowDimensions();
  const isWideScreen = width >= 768;
  if (!isWideScreen) return null;

  return (
    <View style={styles.container}>
      <ThemedText style={styles.text}>Select a category to explore</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    opacity: 0.7,
  },
}); 