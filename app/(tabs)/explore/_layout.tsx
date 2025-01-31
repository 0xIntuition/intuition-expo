import { Text, View, Pressable } from 'react-native';
import { useQuery } from '@apollo/client';
import { gql } from '@/lib/generated';
import { Link, Slot, usePathname } from 'expo-router';
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

export default function ExploreLayout() {
  const { data, loading } = useQuery(GET_AGGREGATES);
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href="/explore/atoms" asChild>
          <Pressable style={{ ...styles.item, ...(pathname === '/explore/atoms' ? styles.activeItem : {}) }}>
            <Text style={{ ...styles.title, ...(pathname === '/explore/atoms' ? styles.activeText : {}) }}>Atoms</Text>
            <Text style={{ ...styles.count, ...(pathname === '/explore/atoms' ? styles.activeText : {}) }}>
              {loading ? '...' : data?.atoms_aggregate.aggregate?.count ?? 0}
            </Text>
          </Pressable>
        </Link>

        <Link href="/explore/triples" asChild>
          <Pressable style={{ ...styles.item, ...(pathname === '/explore/triples' ? styles.activeItem : {}) }}>
            <Text style={{ ...styles.title, ...(pathname === '/explore/triples' ? styles.activeText : {}) }}>Triples</Text>
            <Text style={{ ...styles.count, ...(pathname === '/explore/triples' ? styles.activeText : {}) }}>
              {loading ? '...' : data?.triples_aggregate.aggregate?.count ?? 0}
            </Text>
          </Pressable>
        </Link>

        <Link href="/explore/accounts" asChild>
          <Pressable style={{ ...styles.item, ...(pathname === '/explore/accounts' ? styles.activeItem : {}) }}>
            <Text style={{ ...styles.title, ...(pathname === '/explore/accounts' ? styles.activeText : {}) }}>Accounts</Text>
            <Text style={{ ...styles.count, ...(pathname === '/explore/accounts' ? styles.activeText : {}) }}>
              {loading ? '...' : data?.accounts_aggregate.aggregate?.count ?? 0}
            </Text>
          </Pressable>
        </Link>
      </View>

      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    gap: 16,
  },
  item: {
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
  },
  count: {
    fontSize: 16,
    opacity: 0.7,
    color: '#fff',
  },
  activeItem: {
    backgroundColor: '#333',
    borderColor: '#666',
    borderWidth: 1,
  },
  activeText: {
    opacity: 1,
    color: '#fff',
  },
});