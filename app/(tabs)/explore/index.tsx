import { View, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { gql } from '@/lib/generated';

import { Link, Slot, usePathname, router } from 'expo-router';

import { Text, Pressable } from 'react-native';
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

  const { data, loading } = useQuery(GET_AGGREGATES);


  return (
    <ScrollView style={styles.container}>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

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