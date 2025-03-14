import { View, StyleSheet, RefreshControl, ActivityIndicator, Image } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { gql } from '@/lib/generated';
import Triple from '@/components/Triple';
import { useGeneralConfig } from '@/hooks/useGeneralConfig';

const GetTriplesQuery = gql(`
query GetTriples($offset: Int) {
  triples_aggregate {
    aggregate {
      count
    }
  }
  triples(order_by: { vault:  {
     total_shares: desc
  } }, limit: 10, offset: $offset) {
    id
    subject {
      id
      emoji
      label
      image
    }
    predicate {
      id
      emoji
      label
      image
    }
    object {
      id
      emoji
      label
      image
    }
    creator {
      id
      label
      image
    }
    block_timestamp
    vault {
      total_shares
      position_count
      current_share_price
    }
    counter_vault {
      total_shares
      position_count
      current_share_price
    }
  }
}
`);

export default function Triples() {
  const { loading, error, data, refetch, fetchMore } = useQuery(GetTriplesQuery, {
  });

  if (loading && !data) return <ActivityIndicator size="large" />;

  return (
    <ThemedView style={styles.container}>
      {error && <ThemedText>{error.message}</ThemedText>}
      {!loading && data && <FlashList
        data={data.triples}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Triple triple={{ ...item, creator: item.creator! }} layout="list-item" />}
        estimatedItemSize={150}
        onEndReached={() => {
          if (data.triples_aggregate.aggregate?.count && data.triples_aggregate.aggregate.count > data.triples.length) {
            fetchMore({
              variables: {
                offset: data.triples.length,
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) return previousResult;
                return {
                  ...previousResult,
                  triples_aggregate: fetchMoreResult.triples_aggregate,
                  triples: [...previousResult.triples, ...fetchMoreResult.triples],
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
  },
});




