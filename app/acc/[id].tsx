import { Button, View } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { useQuery, gql } from '@apollo/client';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { shareAsync } from 'expo-sharing';

const GET_ACCOUNT = gql`
query Account($id: String!) {
  account(id: $id) {
    id
    label
    image
    atom {
      id
      asSubject {
        items {
          predicate {
            label
          }
          object {
            label
          }
        }
      }
    }
  }
}`;
export default function Account() {
  const { id } = useLocalSearchParams();
  const { loading, error, data, refetch } = useQuery(GET_ACCOUNT, { variables: { id } });

  if (loading) return <ThemedText>Loading...</ThemedText>;
  if (error) return <ThemedText>{error.message}</ThemedText>;

  if (!data.account) {
    return <ThemedText>Account not found</ThemedText>;
  }

  const account = data.account;
  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: () => <View style={styles.header} >
            {account.image !== null && <Image style={styles.image} source={{ uri: account.image }} />}
            <ThemedText>{account.label}</ThemedText>
          </View>,
        }}
      />
      <ThemedText>Account {id}</ThemedText>
      <Button title="Share" onPress={async () => {
        await shareAsync('https://i7n.app/acc/' + id);
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
});
