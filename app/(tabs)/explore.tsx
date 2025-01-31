import { Text, View, Pressable } from 'react-native';
import { useQuery } from '@apollo/client';
import { gql } from '@/lib/generated';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

const GET_AGGREGATES = gql(`
  query GetAggregates {
    accounts_aggregate {
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
  }
`);

export default function Explore() {
  const { data, loading } = useQuery(GET_AGGREGATES);

  return (
    <View style={styles.container}>
      <Link href="/atoms" asChild>
        <Pressable style={styles.item}>
          <Text style={styles.title}>Atoms</Text>
          <Text style={styles.count}>
            {loading ? '...' : data?.atoms_aggregate.aggregate?.count ?? 0}
          </Text>
        </Pressable>
      </Link>

      <Link href="/triples" asChild>
        <Pressable style={styles.item}>
          <Text style={styles.title}>Triples</Text>
          <Text style={styles.count}>
            {loading ? '...' : data?.triples_aggregate.aggregate?.count ?? 0}
          </Text>
        </Pressable>
      </Link>

      <Link href="/accounts" asChild>
        <Pressable style={styles.item}>
          <Text style={styles.title}>Accounts</Text>
          <Text style={styles.count}>
            {loading ? '...' : data?.accounts_aggregate.aggregate?.count ?? 0}
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  item: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  count: {
    fontSize: 16,
    opacity: 0.7,
  },
}); 