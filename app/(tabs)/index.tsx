import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import { graphql } from '@/lib/graphql';
import { useQuery } from '@tanstack/react-query';
import { execute } from '@/lib/graphql/execute';

const doc = graphql(`
query Stats {
  stats {
    total_accounts
    total_atoms
    total_triples
  }
}`)

export default function TabOneScreen() {

  const { data, isLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: () => execute(doc)
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is home</Text>
      {data?.stats !== undefined && data?.stats?.length > 0 && <>
        <Text>Total atoms: {data?.stats[0].total_atoms}</Text>
        <Text>Total triples: {data?.stats[0].total_triples}</Text>
        <Text>Total accounts: {data?.stats[0].total_accounts}</Text>
      </>}
      {isLoading && <Text>Loading</Text>}
      <Link href="/modal" asChild>
        <Pressable>
          <Text>Open modal</Text>
        </Pressable>
      </Link>
    </View>
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
    marginBottom: 20
  },
});
