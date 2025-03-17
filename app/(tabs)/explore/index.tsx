import { View, ScrollView, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { gql } from '@/lib/generated';
import { useState } from 'react';

import { Link, Slot, usePathname, router } from 'expo-router';

import { Text, Pressable } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
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

export default function ExploreIndex() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, loading } = useQuery(GET_AGGREGATES);
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const backgroundSecondaryColor = useThemeColor({}, 'backgroundSecondary');

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

      <Link href="/explore/atoms" style={styles.item}>
        <ThemedText style={styles.title}>Atoms</ThemedText>
        <ThemedText style={styles.count}>
          - {loading ? '...' : data?.atoms_aggregate.aggregate?.count ?? 0}
        </ThemedText>
      </Link>

      <Link href="/explore/triples" style={styles.item}>
        <ThemedText style={styles.title}>Triples</ThemedText>
        <ThemedText style={styles.count}>
          - {loading ? '...' : data?.triples_aggregate.aggregate?.count ?? 0}
        </ThemedText>
      </Link>
      <Link href="/explore/accounts" style={styles.item}>
        <ThemedText style={styles.title}>Accounts</ThemedText>
        <ThemedText style={styles.count}>
          - {loading ? '...' : data?.accounts_aggregate.aggregate?.count ?? 0}
        </ThemedText>
      </Link>
      <Link href="/explore/lists" style={styles.item}>
        <ThemedText style={styles.title}>Collections</ThemedText>
        <ThemedText style={styles.count}>
          - {loading ? '...' : data?.predicate_objects_aggregate.aggregate?.count ?? 0}
        </ThemedText>
      </Link>

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
    padding: 16,
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  count: {
    paddingLeft: 16,
    opacity: 0.7,
  },
}); 