import { Link, Stack } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { graphql } from '@/lib/graphql';
import { useQuery } from '@tanstack/react-query';
import { execute } from '@/lib/graphql/execute';
import { useState } from 'react';

const SEARCH_QUERY = graphql(`
query GlobalSearch(
  $likeStr: String
  $accountsLimit: Int
  $atomsLimit: Int
  $triplesLimit: Int
  $collectionsLimit: Int
) {
  accounts(
    limit: $accountsLimit
    where: {
      type: { _eq: Default }
      atom_id: { _is_null: false }
      _or: [
        { label: { _ilike: $likeStr } }
        { atom: { data: { _ilike: $likeStr } } }
      ]
    }
  ) {
    id
    label
  }
  atoms(
    limit: $atomsLimit
    where: {
      _or: [
        { data: { _ilike: $likeStr } }
        { label: { _ilike: $likeStr } }
        { value: { text_object: { data: { _ilike: $likeStr } } } }
        { value: { thing: { url: { _ilike: $likeStr } } } }
        { value: { thing: { name: { _ilike: $likeStr } } } }
        { value: { thing: { description: { _ilike: $likeStr } } } }
        { value: { person: { url: { _ilike: $likeStr } } } }
        { value: { person: { name: { _ilike: $likeStr } } } }
        { value: { person: { description: { _ilike: $likeStr } } } }
        { value: { organization: { url: { _ilike: $likeStr } } } }
        { value: { organization: { name: { _ilike: $likeStr } } } }
        { value: { organization: { description: { _ilike: $likeStr } } } }
      ]
    }
  ) {
    term_id
    label
  }
  triples(
    limit: $triplesLimit
    where: {
      _or: [
        { subject: { label: { _ilike: $likeStr } } }
        { predicate: { label: { _like: $likeStr } } }
        { object: { label: { _like: $likeStr } } }
      ]
    }
  ) {
    term_id
    object {
      label
    }
    predicate {
      label
    }
    subject {
      label
    }
  }
  collections: predicate_objects(
    where: {
      predicate: { type: { _eq: Keywords } }
      object: { label: { _ilike: $likeStr } }
    }
    order_by: [{ triple_count: desc }]
    limit: $collectionsLimit
  ) {
    object {
      label
      term_id
    }
  }
}
`);

export default function ExploreIndex() {
  const [searchQuery, setSearhQuery] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['globalSearch', searchQuery],
    queryFn: () => execute(SEARCH_QUERY, {
      likeStr: `${searchQuery}%`,
      atomsLimit: 5,
      accountsLimit: 5,
      triplesLimit: 5,
      collectionsLimit: 5,
    })
  })

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Explore',
          headerSearchBarOptions: {
            placement: 'automatic',
            placeholder: 'Search',
            onChangeText: (e) => setSearhQuery(e.nativeEvent.text),
          },
        }}
      />
      <ScrollView style={styles.container}>
          {isLoading && <Text>Loading</Text>}

            <Text style={styles.title}>Accounts</Text>
            {data?.accounts.map(account => (<View key={account.id}>
              <Link href={`/explore/account/${account.id}`} asChild>
                <Pressable>
                  <Text>{account.label}</Text>
                </Pressable>
              </Link>
            </View>))}

            <Text style={styles.title}>Identities</Text>
            {data?.atoms.map(atom => (<View key={atom.term_id}>
              <Link href={`/explore/atom/${atom.term_id}`} asChild>
                <Pressable>
                  <Text>{atom.label}</Text>
                </Pressable>
              </Link>


            </View>))}

            <Text style={styles.title}>Claims</Text>
            {data?.triples.map(triple => (<View key={triple.term_id}>
              <Link href={`/explore/triple/${triple.term_id}`} asChild>
                <Pressable>
                  <Text>{triple.subject.label} - {triple.predicate.label} - {triple.object.label}</Text>
                </Pressable>
              </Link>
            </View>))}

            <Text style={styles.title}>Lists</Text>
            {data?.collections.map(collection => (<View key={collection.object.term_id}>
              <Text>{collection.object.label}</Text>
            </View>))}

      </ScrollView>
    </>
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
    marginTop: 10,
    marginBottom: 5,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

