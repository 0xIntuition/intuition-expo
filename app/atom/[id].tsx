import { View } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { useQuery, gql } from '@apollo/client';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const GET_ATOM = gql`
query Atom ($id: BigInt!){
  atom(id: $id) {
    id
    label
    image
    emoji
    type
  }
}`;
export default function Atom() {
  const { id } = useLocalSearchParams();
  const { loading, error, data, refetch } = useQuery(GET_ATOM, { variables: { id } });

  if (loading) return <ThemedText>Loading...</ThemedText>;
  if (error) return <ThemedText>{error.message}</ThemedText>;

  if (!data.atom) {
    return <ThemedText>Atom not found</ThemedText>;
  }

  const { atom } = data;


  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: () => <View style={styles.header} >
            {atom.image !== null && <Image style={styles.image} source={{ uri: atom.image }} />}
            <ThemedText>{atom.label}</ThemedText>
          </View>,
        }}
      />
      <ThemedText>{atom.emoji} {atom.type}</ThemedText>

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
});
