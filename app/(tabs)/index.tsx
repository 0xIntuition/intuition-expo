import { View, StyleSheet, Image, ActivityIndicator, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { formatRelative } from 'date-fns';
import { convertToCurrency } from '@/hooks/useCurrency';
import { ListItem } from '@/components/list-item';
import { Address, formatEther } from 'viem';

const GET_SIGNALS = gql`
query GetSignals($after: String) {
  signals(
    after: $after
    orderBy: "blockTimestamp"
    orderDirection: "desc"
    limit: 10
  ) {
    items {
      id
      account {
        id
        label
        image
      }
      delta
      blockTimestamp
      atom {
        id
        emoji
        label
      }
      triple {
        id
        label
        subject {
          emoji
          label
        }
        predicate {
          emoji
          label
        }
        object {
          emoji
          label
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
  chainlinkPrices(limit: 1, orderBy: "id", orderDirection: "desc") {
    items {
      usd
    }
  }
}
`;

export default function Signals() {
  const { loading, error, data, fetchMore, refetch } = useQuery(GET_SIGNALS);

  if (loading && !data) return <ActivityIndicator size="large" />;
  const usd = data.chainlinkPrices.items[0].usd;

  return (
    <ThemedView style={styles.container}>
      {error && <ThemedText>{error.message}</ThemedText>}
      {!loading && data && <FlashList
        data={data.signals.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: any }) => (<ListItem
          image={item.account?.image}
          id={item.account?.id.toString()! as Address}
          label={`${item.atom?.label || item.triple?.label || ''} `}
          subLabel={`${item.account?.label}  ∙ ${formatRelative(new Date(parseInt(item.blockTimestamp.toString()) * 1000), new Date())} `}
          value={`${item.delta > 0 ? '+' : ''}${(parseFloat(formatEther(item.delta)) * usd).toFixed(2)}`}
          subValue='USD'
          href={item.atom?.id ? `/a/${item.atom.id}` : `/t/${item.triple?.id}`}
        />)
        }
        estimatedItemSize={300}
        onEndReached={() => {
          if (data.signals.pageInfo.hasNextPage) {
            fetchMore({
              variables: {
                after: data.signals.pageInfo.endCursor,
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) return previousResult;
                return {
                  signals: {
                    __typename: previousResult.signals.__typename,
                    items: [...previousResult.signals.items, ...fetchMoreResult.signals.items],
                    pageInfo: fetchMoreResult.signals.pageInfo,
                  },
                  chainlinkPrices: previousResult.chainlinkPrices,
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
            onRefresh={() => refetch({ after: null })}
          />
        }
      />}
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
    paddingRight: 16,
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


