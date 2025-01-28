import { Button, View } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { useQuery, gql } from '@apollo/client';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { shareAsync } from 'expo-sharing';

const GET_TRIPLE = gql`
query Triple ($id: numeric!){
  triple(id: $id) {
    id
      subject {
        emoji
        label 
      }
      predicate {
        emoji
        label
      }
      object {
        emoji
        label
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

      <View style={styles.vaultContent}>
        <ThemedText numberOfLines={1}>{triple.subject.emoji} {triple.subject.label}</ThemedText>
        <ThemedText >{triple.predicate.label}</ThemedText>
        <ThemedText >{triple.object.emoji} {triple.object.label}</ThemedText>
      </View>
      <Button title="Share" onPress={async () => {
        await shareAsync('https://i7n.app/t/' + id);
      }} />
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

    borderWidth: 1,
    borderColor: 'rgba(100,100,100,0.5)',
    borderRadius: 8,
  },
});
