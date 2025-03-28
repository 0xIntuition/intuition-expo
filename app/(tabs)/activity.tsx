import { StyleSheet, ActivityIndicator, RefreshControl, useWindowDimensions, View } from 'react-native';
import { FlashList, MasonryFlashList } from '@shopify/flash-list';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { formatDistanceToNow } from 'date-fns';
import { ListItem } from '@/components/list-item';
import { Address, formatEther } from 'viem';
import { gql } from '@/lib/generated';
import { getTripleLabel } from '@/lib/utils';
import { useGeneralConfig } from '@/hooks/useGeneralConfig';
import { useQuery } from '@apollo/client';
import React, { useMemo } from 'react';
import { Link } from 'expo-router';
import Triple from '@/components/Triple';
import Atom from '@/components/Atom';
import { getUpvotes, getUpvotePrice } from '@/hooks/useUpvotes';
import Avatar from '@/components/Avatar';
import { useEmbeddedEthereumWallet } from '@privy-io/expo';
const GET_SIGNALS = gql(`
query GetSignals($minDelta: numeric!, $offset: Int, $limit: Int, $address: String) {
  signals_aggregate(where: { delta: { _gt: $minDelta } }) {
    aggregate {
      count
    }
  }
  signals(
    where: { delta: { _gt: $minDelta } },
    order_by: { block_timestamp: desc },
    limit: $limit,
    offset: $offset
  ) {
    id
    delta
    block_timestamp
    account {
      id
      label
      image
    }
    
    atom {
      id
      type
      image
      label
      type
      vault {
        current_share_price
        total_shares
        position_count
        positions(where: { account_id: {_eq: $address} }, limit: 1) {
          shares
          account_id
        }
      }
    }

    triple {
      id
      vault {
        id
        current_share_price
        total_shares
        position_count
        positions(where: { account_id: {_eq: $address} }, limit: 1) {
          shares
          account_id
        }
      }
      counter_vault {
        id
        total_shares
        position_count
        current_share_price
        positions(where: { account_id: {_eq: $address} }, limit: 1) {
          shares
          account_id
        }
      }

      subject {
        id
        image
        type
        label
        type
      }
      predicate {
        id
        image
        type
        label
        type
      }
      object {
        id
        image
        type
        label
        type
      }
    }
  }
}
`);

export default function Signals() {
  const { wallets } = useEmbeddedEthereumWallet();
  const address = wallets[0]?.address?.toLowerCase() || '0x0000000000000000000000000000000000000000';

  const minDelta = getUpvotePrice() * BigInt(80) / BigInt(100);

  const { loading, error, data, fetchMore, refetch } = useQuery(GET_SIGNALS, {
    variables: {
      limit: 100,
      minDelta: parseInt(minDelta.toString()),
      address
    },
  });
  const { width } = useWindowDimensions();
  const isWideScreen = width >= 768;

  if (loading && !data) return <ActivityIndicator size="large" />;

  return (
    <ThemedView style={[styles.container,]}>
      <View style={styles.wideInner}>
        {error && <ThemedText>{error.message}</ThemedText>}
        {!loading && data && <MasonryFlashList
          numColumns={Math.floor(width / 250)}
          data={data.signals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (<SignalListItem item={item} />)}
          estimatedItemSize={150}
          onEndReached={() => {
            if (data.signals_aggregate.aggregate?.count && data.signals_aggregate.aggregate.count > data.signals.length) {
              fetchMore({
                variables: {
                  offset: data.signals.length,
                  limit: 100,
                },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return previousResult;
                  return {
                    signals: [...previousResult.signals, ...fetchMoreResult.signals],
                    signals_aggregate: fetchMoreResult.signals_aggregate,
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
      </View>
    </ThemedView>

  );
}

export function SignalListItem({ item }: { item: any }) {
  const vault = item.atom?.vault ?? item.triple?.vault;
  const upvotes = getUpvotes(BigInt(item.delta ?? 0), BigInt(vault?.current_share_price ?? 0));
  return (
    <ThemedView style={styles.listContainer}>
      <View style={styles.topRow}>


        <Avatar size={10} radius={10} style={{ marginRight: 1, paddingTop: 6, paddingRight: 6 }} id={item.account?.id} />
        <ThemedText style={styles.date}>{`${item.delta > 0 ? '↑' : '↓'}${(upvotes)} ∙ ${formatDistanceToNow(new Date(parseInt(item.block_timestamp.toString()) * 1000), { addSuffix: true })}`}</ThemedText>
      </View>
      {item.atom !== null ? (
        <Link
          style={styles.vaultLink}
          href={{
            pathname: '/a/[id]',
            params: { id: item.atom.id }
          }}>
          <Atom atom={item.atom} layout="text-avatar" />
        </Link>
      ) : (

        <Triple triple={item.triple} layout="swipeable" />

      )}

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  vaultLink: {
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 8,
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

    borderWidth: 1,
    borderColor: 'rgba(100,100,100,0.5)',
    borderRadius: 8,
  },
  container: {
    flex: 1,
    paddingLeft: 16,
  },
  wideContainer: {
    paddingLeft: '30%',
    paddingRight: '30%',
  },
  wideInner: {
    flex: 1,
    flexDirection: 'row',
  },
  listContainer: {
    flex: 1,
    paddingRight: 16,
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


