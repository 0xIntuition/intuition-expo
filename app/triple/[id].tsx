import { View } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { useQuery, gql } from '@apollo/client';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const GET_TRIPLE = gql`
query Triple ($id: String!){
  triples(where: {id: {_eq: $id}}) {
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

  if (data.triples.length === 0) {
    return <ThemedText>Triple not found</ThemedText>;
  }

  const triple = data.triples[0];


  return (
    <ThemedView style={styles.container}>

      <View style={styles.vaultContent}>
        <ThemedText numberOfLines={1}>{triple.subject.emoji} {triple.subject.label}</ThemedText>
        <ThemedText >{triple.predicate.label}</ThemedText>
        <ThemedText >{triple.object.emoji} {triple.object.label}</ThemedText>
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

    borderWidth: 1,
    borderColor: 'rgba(100,100,100,0.5)',
    borderRadius: 8,
  },
});
