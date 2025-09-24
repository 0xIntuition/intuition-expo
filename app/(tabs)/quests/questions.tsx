import { Pressable, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function QuestionsQuest() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>This is questions quest</Text>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
  },
});
