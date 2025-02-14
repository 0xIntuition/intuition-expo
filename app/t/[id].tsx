import { Button, View } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { useQuery, gql } from '@apollo/client';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { shareAsync } from 'expo-sharing';
import Atom from '@/components/Atom';

const GET_TRIPLE = gql`
query Triple ($id: numeric!){
  triple(id: $id) {
    id
      subject {
        id
        emoji
        label 
        image
      }
      predicate {
        id
        emoji
        label
        image
      }
      object {
        id
        emoji
        label
        image
      }
  }
}`;

export default function Triple() {
  const { id } = useLocalSearchParams();
  const { loading, error, data, refetch } = useQuery(GET_TRIPLE, { variables: { id } });

  if (loading) return <ThemedText>Loading...</ThemedText>;
  if (error) return <ThemedText>{error.message}</ThemedText>;

  if (!data.triple) {
    return <ThemedText>Triple not found</ThemedText>;
  }

  const { triple } = data;

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => <Button title="Share" onPress={async () => {
            await shareAsync('https://app.i7n.xyz/t/' + id);
          }} />,
        }}
      />
      <View style={styles.vaultContent}>
        <Link href={{
          pathname: '/a/[id]',
          params: { id: triple.subject.id }
        }}>
          <Atom atom={triple.subject} layout='text-avatar' />
        </Link>
        <Link href={{
          pathname: '/a/[id]',
          params: { id: triple.predicate.id }
        }}>
          <Atom atom={triple.predicate} layout='text-avatar' />
        </Link>
        <Link href={{
          pathname: '/a/[id]',
          params: { id: triple.object.id }
        }}>
          <Atom atom={triple.object} layout='text-avatar' />
        </Link>
      </View>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  container: {
    flex: 1,
  },
  vaultContent: {
    padding: 8,
    margin: 8,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(100,100,100,0.5)',
    borderRadius: 8,
  },
});
