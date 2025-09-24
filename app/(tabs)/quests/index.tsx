import { Pressable, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import { QUESTS } from '@/constants/quests';

export default function Quests() {
  return (
    <ScrollView style={styles.container}>
      {QUESTS.map((q) => (<View key={q.index} style={styles.card}>

        <Link href={q.link} asChild>
          <Pressable>
            <Text style={styles.title}>{q.title}</Text>
            <Text>{q.description}</Text>
          </Pressable>
        </Link>

      </View>))}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
