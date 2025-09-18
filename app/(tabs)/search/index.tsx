import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function SearchIndex() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Search',
          headerSearchBarOptions: {
            placement: 'automatic',
            placeholder: 'Search',
            onChangeText: () => { },
          },
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Search results</Text>
      </ScrollView>
    </>
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

