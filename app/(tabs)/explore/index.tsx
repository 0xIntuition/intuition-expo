import { Link, Stack } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
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
    atom_id
    label
    image
    triples_aggregate {
      aggregate {
        count
      }
    }
    signals_aggregate {
      aggregate {
        count
      }
    }
    cached_image {
      safe
      url
    }
  }
  atoms(
    order_by: { term: { triple: { term: { total_market_cap: desc } } } }
    limit: $atomsLimit
    where: {
      _or: [
        { data: { _ilike: $likeStr } }
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
    image
    type
    label
    created_at
    creator {
      id
      label
      image
      cached_image {
        safe
        url
      }
    }
    value {
      account {
        id
        label
      }
      person {
        name
        description
        email
        url
        identifier
      }
      thing {
        url
        name
        description
      }
      organization {
        name
        email
        description
        url
      }
    }
    term {
      vaults(where: { curve_id: { _eq: "1" } }, order_by: { curve_id: asc }) {
        curve_id
        term_id
        position_count
        current_share_price
        total_shares
        total_assets
        market_cap
      }
    }
  }
  triples(
    limit: $triplesLimit
    where: {
      _and: [
        {
          _or: [
            {
              term: {
                vaults: { position_count: { _gt: 0 }, curve_id: { _eq: "1" } }
              }
            }
            {
              counter_term: {
                vaults: { position_count: { _gt: 0 }, curve_id: { _eq: "1" } }
              }
            }
          ]
        }
        {
          _or: [
            { subject: { label: { _ilike: $likeStr } } }
            { predicate: { label: { _like: $likeStr } } }
            { object: { label: { _like: $likeStr } } }
          ]
        }
      ]
    }
    order_by: { term: { total_market_cap: desc } }
  ) {
    term_id
    object {
      term_id
      label
      image
      type
    }
    predicate {
      term_id
      label
      image
      type
    }
    subject {
      term_id
      label
      image
      type
    }
    counter_term {
      vaults(where: { curve_id: { _eq: "1" } }, order_by: { curve_id: asc }) {
        curve_id
        term_id
        position_count
        current_share_price
        total_shares
        total_assets
        market_cap
      }
    }
    term {
      vaults(where: { curve_id: { _eq: "1" } }, order_by: { curve_id: asc }) {
        curve_id
        term_id
        position_count
        current_share_price
        total_shares
        total_assets
        market_cap
      }
    }
  }
  collections: predicate_objects(
    where: {
      predicate: { type: { _eq: Keywords } }
      object: { label: { _ilike: $likeStr } }
    }
    order_by: [{ triple_count: desc }]
    # TODO: Doesnt exist on backend schema
    # { claim_count: desc }
    limit: $collectionsLimit
  ) {
    # TODO: Doesnt exist on backend schema
    # claim_count
    triple_count
    object {
      label
      term_id
      image
      value {
        thing {
          description
        }
      }
      cached_image {
        safe
        url
      }
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
      <SafeAreaProvider>
        <SafeAreaView style={styles.container} edges={['top']}>
          <ScrollView contentContainerStyle={styles.container}>
            {isLoading && <Text>Loading</Text>}

            <Text style={styles.title}>Accounts</Text>
            {data?.accounts.map(account => (<View key={account.id}>
              <Text>{account.label}</Text>
            </View>))}

            <Text style={styles.title}>Atoms</Text>
            {data?.atoms.map(atom => (<View key={atom.term_id}>
              <Link href={`/explore/atom/${atom.term_id}`} asChild>
                <Pressable>
                  <Text>{atom.label}</Text>
                </Pressable>
              </Link>


            </View>))}

            <Text style={styles.title}>Triples</Text>
            {data?.triples.map(triple => (<View key={triple.term_id}>
              <Link href={`/explore/triple/${triple.term_id}`} asChild>
                <Pressable>
                  <Text>{triple.subject.label} - {triple.predicate.label} - {triple.object.label}</Text>
                </Pressable>
              </Link>
            </View>))}

            <Text style={styles.title}>Collections</Text>
            {data?.collections.map(collection => (<View key={collection.object.term_id}>
              <Text>{collection.object.label}</Text>
            </View>))}

          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

