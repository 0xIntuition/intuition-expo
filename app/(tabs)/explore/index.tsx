import { View, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { gql } from '@/lib/generated';
import { useState, useCallback, useEffect } from 'react';
import { Link } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';
import { AccountListItem } from './accounts';
import { PredicateObjectListItem } from './lists';
import { AtomListItem } from './atoms';
import Triple from '@/components/Triple';
import debounce from 'lodash.debounce';

const GET_AGGREGATES = gql(`
query GetAggregates {
  accounts_aggregate(where: {type:  {
     _eq: Default
  }}) {
    aggregate {
      count
    }
  }
  atoms_aggregate {
    aggregate {
      count
    }
  }
  triples_aggregate {
    aggregate {
      count
    }
  }
  predicate_objects_aggregate(
    where: { predicate_id: { _eq: 4 } }
  ) {
    aggregate {
      count
    }
  }
}
`);

const SEARCH_QUERY = gql(`
query GlobalSearch($likeStr: String) {
  accounts(
    limit: 10
    where: { type: { _eq: Default }, label: { _ilike: $likeStr } }
  ) {
    id
    label
    claims_aggregate {
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
    order_by: { vault: { position_count: desc } }
    limit: 5
    where: {
      _or: [
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
    id
    image
    type
    label
    block_timestamp
    creator {
      id
      label
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
    vault {
      position_count
      current_share_price
      total_shares
    }
  }
  triples(
    limit: 5
    where: {
      _and: [
        {
          _or: [
            { vault: { position_count: { _gt: 0 } } }
            { counter_vault: { position_count: { _gt: 0 } } }
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

    order_by: { vault: { position_count: desc } }
  ) {
    id
    object {
      id
      label
      image
      type
    }
    predicate {
      id
      label
      image
      type
    }
    subject {
      id
      label
      image
      type
    }
    counter_vault {
      position_count
      current_share_price
      total_shares
    }
    vault {
      position_count
      current_share_price
      total_shares
    }
  }

  collections: predicate_objects(
    where: { predicate_id: { _eq: 4 }, object: { label: { _ilike: $likeStr } } }
    order_by: [{ triple_count: desc }, { claim_count: desc }]
    limit: 10
  ) {
    claim_count
    triple_count
    object {
      label
      id
      image
      cached_image {
        safe
        url
      }
    }
  }
}
`);

export default function ExploreIndex() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const { data, loading } = useQuery(GET_AGGREGATES);
  const { data: searchData, loading: searchLoading } = useQuery(SEARCH_QUERY, {
    variables: { likeStr: `%${debouncedSearchQuery}%` },
    fetchPolicy: 'network-only'
  });
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const backgroundSecondaryColor = useThemeColor({}, 'backgroundSecondary');

  // Create a debounced function to update the search query
  const debouncedSetSearchQuery = useCallback(
    debounce((value: string) => {
      setDebouncedSearchQuery(value);
    }, 500),
    []
  );

  // Update the debounced search query when the search query changes
  useEffect(() => {
    debouncedSetSearchQuery(searchQuery);

    // Cleanup function to cancel any pending debounced calls
    return () => {
      debouncedSetSearchQuery.cancel();
    };
  }, [searchQuery, debouncedSetSearchQuery]);

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <View style={styles.searchContainer}>
        <TextInput
          style={[
            styles.searchInput,
            {
              color: textColor,
              backgroundColor: backgroundSecondaryColor
            }
          ]}
          placeholder="Search..."
          placeholderTextColor={useThemeColor({}, 'tabIconDefault')}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <Link href="/explore/triples" style={styles.item}>
        <ThemedText style={styles.title}>Triples</ThemedText>
        <ThemedText style={styles.count}>
          {loading ? '...' : data?.triples_aggregate.aggregate?.count ?? 0} &gt;
        </ThemedText>
      </Link>

      {!searchLoading && searchData && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {searchData.triples.map((item: any) => (
            <View key={item.id} style={styles.listItem}>
              <Triple layout='list-item' triple={item} />
            </View>
          ))}
        </ScrollView>
      )}

      {searchLoading && (
        <View style={styles.item}>
          <ActivityIndicator size="large" color={textColor} />
        </View>
      )}

      <Link href="/explore/accounts" style={styles.item}>
        <ThemedText style={styles.title}>Accounts</ThemedText>
        <ThemedText style={styles.count}>
          {loading ? '...' : data?.accounts_aggregate.aggregate?.count ?? 0} &gt;
        </ThemedText>
      </Link>

      {!searchLoading && searchData && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {searchData.accounts.map((item: any) => (
            <View key={item.id} style={styles.listItem}>
              <AccountListItem account={item} />
            </View>
          ))}
        </ScrollView>
      )}

      {searchLoading && (
        <View style={styles.item}>
          <ActivityIndicator size="large" color={textColor} />
        </View>
      )}

      <Link href="/explore/lists" style={styles.item}>
        <ThemedText style={styles.title}>Collections</ThemedText>
        <ThemedText style={styles.count}>
          {loading ? '...' : data?.predicate_objects_aggregate.aggregate?.count ?? 0} &gt;
        </ThemedText>
      </Link>

      {!searchLoading && searchData && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.horizontalList, { maxHeight: 250 }]}
        >
          {searchData.collections.map((item: any) => (
            <View key={item.id} style={styles.listItem}>
              <PredicateObjectListItem predicateObject={item} />
            </View>
          ))}
        </ScrollView>
      )}

      <Link href="/explore/atoms" style={styles.item}>
        <ThemedText style={styles.title}>Atoms</ThemedText>
        <ThemedText style={styles.count}>
          {loading ? '...' : data?.atoms_aggregate.aggregate?.count ?? 0} &gt;
        </ThemedText>
      </Link>

      {!searchLoading && searchData && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {searchData.atoms.map((item: any) => (
            <View key={item.id} style={styles.listItem}>
              <AtomListItem atom={item} />
            </View>
          ))}
        </ScrollView>
      )}

      {searchLoading && (
        <View style={styles.item}>
          <ActivityIndicator size="large" color={textColor} />
        </View>
      )}

    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  item: {
    paddingTop: 36,
    padding: 16,
    flexDirection: 'row',
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '500',
    marginRight: 16,
  },
  count: {
    fontSize: 16,
    opacity: 0.7,
  },
  horizontalList: {
    paddingHorizontal: 16,
  },
  listItem: {
    marginRight: 12,
  },
}); 