import { Pressable, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import { QUESTS } from '@/constants/quests';

export default function Quests() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
      {QUESTS.map((q) => (<View key={q.index} style={styles.card}>

        <Link href={q.link} asChild>
          <Pressable>
            <Text style={styles.title}>{q.title}</Text>
            <Text>{q.description}</Text>
          </Pressable>
        </Link>

      </View>))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  card: {
    margin: 5,
    borderRadius: 10,
    backgroundColor: 'rgba(100,100,100,0.3)',
    padding: 16,
  },
});
