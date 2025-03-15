import { View, StyleSheet, RefreshControl, ActivityIndicator, Image } from 'react-native';
import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { gql } from '@apollo/client';
import TriplesList from '@/components/TriplesList';
import { useGeneralConfig } from '@/hooks/useGeneralConfig';
import { usePrivy, useEmbeddedEthereumWallet } from '@privy-io/expo';

// Define interfaces for our GraphQL query results
export interface TripleItem {
  id: string;
  subject: {
    id: string;
    type?: string | null;
    label?: string | null;
    image?: string | null;
  };
  predicate: {
    id: string;
    type?: string | null;
    label?: string | null;
    image?: string | null;
  };
  object: {
    id: string;
    type?: string | null;
    label?: string | null;
    image?: string | null;
  };
  creator?: {
    id: string;
    label: string;
    image?: string | null;
  };
  block_timestamp?: string;
  vault?: {
    id: string;
    total_shares: string;
    position_count: number;
    current_share_price: string;
    positions?: Array<{
      shares: string;
      account_id: string;
    }>;
  };
  counter_vault?: {
    id: string;
    total_shares: string;
    position_count: number;
    current_share_price: string;
    positions?: Array<{
      shares: string;
      account_id: string;
    }>;
  };
}

const GetTriplesQuery = gql(`
query GetTriples($offset: Int, $address: String) {
  triples_aggregate {
    aggregate {
      count
    }
  }
  triples(order_by: { vault:  {
     total_shares: desc
  } }, limit: 50, offset: $offset) {
    id
    subject {
      id
      type
      label
      image
    }
    predicate {
      id
      type
      label
      image
    }
    object {
      id
      type
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
      id
      total_shares
      position_count
      current_share_price
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
  }
}
`);

export default function Triples() {
  const { wallets } = useEmbeddedEthereumWallet();
  const address = wallets[0]?.address?.toLowerCase() || '0x0000000000000000000000000000000000000000';
  const { loading, error, data, refetch, fetchMore, variables } = useQuery(GetTriplesQuery, {
    variables: { address }
  });

  if (loading && !data) return <ActivityIndicator size="large" />;

  return (
    <ThemedView style={styles.container}>
      {error && <ThemedText>{error.message}</ThemedText>}
      {data && (
        <TriplesList
          triples={data.triples.map((item: TripleItem) => ({
            ...item,


          }))}
          onRefresh={() => refetch({ offset: 0, address })}
          onRefetch={() => refetch({ offset: variables?.offset || 0, address })}
          onEndReached={() => {
            if (data.triples_aggregate.aggregate?.count && data.triples_aggregate.aggregate.count > data.triples.length) {
              fetchMore({
                variables: {
                  offset: data.triples.length,
                  address
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
          loading={loading}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
  },
});




