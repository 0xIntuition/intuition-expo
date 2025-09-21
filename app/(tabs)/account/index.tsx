import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { AppKitButton } from '@reown/appkit-wagmi-react-native';

export default function SearchIndex() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AppKitButton />
    </ScrollView>
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
});

