import { View, StyleSheet, RefreshControl, ActivityIndicator, Image } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@apollo/client';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { formatRelative } from 'date-fns';
import { convertToCurrency } from '@/hooks/useCurrency';
import { gql } from '@/lib/generated';
import Atom from '@/components/Atom';
import { useGeneralConfig } from '@/hooks/useGeneralConfig';
const GetAtomsQuery = gql(`
query GetAtoms($offset: Int) {
  atoms_aggregate {
    aggregate {
      count
    }
  }
  atoms(
    order_by: { vault: { total_shares: desc } }
    limit: 10
    offset: $offset
  ) {
    id
    image
    emoji
    label
    creator {
      id
      label
      image
    }
    block_timestamp
    vault {
      total_shares
      current_share_price
      position_count
    }
  }
}`);

export default function Atoms() {
  const { loading, error, data, refetch, fetchMore } = useQuery(GetAtomsQuery);

  if (loading && !data) return <ActivityIndicator size="large" />;

  return (
    <ThemedView style={styles.container}>
      {error && <ThemedText>{error.message}</ThemedText>}
      {!loading && data && <FlashList
        data={data.atoms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AtomListItem atom={item} />}
        estimatedItemSize={150}
        onEndReached={() => {
          if (data.atoms_aggregate.aggregate?.count && data.atoms_aggregate.aggregate.count > data.atoms.length) {
            fetchMore({
              variables: {
                offset: data.atoms.length,
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) return previousResult;
                return {
                  ...previousResult,
                  atoms: [...previousResult.atoms, ...fetchMoreResult.atoms],
                  atoms_aggregate: fetchMoreResult.atoms_aggregate,
                };
              },
            });
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => refetch({ offset: 0 })}
          />
        }
      />}
    </ThemedView>
  );
}
export function AtomListItem({ atom }: { atom: any }) {
  const generalConfig = useGeneralConfig();
  const upvote = BigInt(generalConfig.minDeposit);
  return (
    <ThemedView style={styles.listContainer}>
      <View style={styles.topRow}>
        <Link
          href={{
            pathname: '/acc/[id]',
            params: { id: atom.creator.id }
          }}>
          {atom.creator.image !== null && <Image style={styles.image} source={{ uri: atom.creator.image }} />}
          <ThemedText style={styles.secondary}>{atom.creator.label}</ThemedText>
        </Link>

        <ThemedText style={styles.date}>{formatRelative(new Date(parseInt(atom.block_timestamp.toString()) * 1000), new Date())}</ThemedText>
      </View>

      <Link
        style={styles.vaultLink}
        href={{
          pathname: '/a/[id]',
          params: { id: atom.id }
        }}>
        <View style={styles.vaultContent}>
          <Atom atom={atom} layout='text-avatar' />
        </View>
      </Link>
      <ThemedText numberOfLines={1}><Ionicons size={13} name='person' /> {atom.vault.position_count} ∙ ⬆{(BigInt(atom.vault.total_shares) / upvote).toString(10)} </ThemedText>


    </ThemedView>
  );
}

const styles = StyleSheet.create({
  vaultLink: {
    marginTop: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  date: {
    fontSize: 11,
    color: '#888',

  },
  shortText: {
    fontSize: 11,
  },
  image: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  vaultContent: {
    flex: 1,
    padding: 8,
    marginTop: 8,

    borderWidth: 1,
    borderColor: 'rgba(100,100,100,0.5)',
    borderRadius: 8,
  },
  container: {
    flex: 1,
    paddingLeft: 16,
  },
  listContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingRight: 36,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(100,100,100,0.5)',
  },
  masonryContainer: {
    flex: 1,
    marginTop: 10,
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ddd',
    borderRadius: 8,
  },
  avatar: {
    marginRight: 10,
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  secondary: {
    color: '#888',

  },
  profileLayout: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  interactionsLayout: {
    flexDirection: 'row',
  },
  header: {
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  interaction: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#aaa',
    marginRight: 20,
    marginTop: 12,
  },
  icon: {
    marginRight: 4,
  },
});




