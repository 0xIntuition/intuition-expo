import { View, StyleSheet, RefreshControl, ActivityIndicator, Image } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { formatRelative } from 'date-fns';
import { convertToCurrency } from '@/hooks/useCurrency';
import { gql } from '@/lib/generated';

const GetTriplesQuery = gql(`
query GetTriples($offset: Int) {
  triples_aggregate {
    aggregate {
      count
    }
  }
  triples(order_by: { block_timestamp: desc }, limit: 10, offset: $offset) {
    id
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
    creator {
      id
      label
      image
    }
    block_timestamp
    vault {
      total_shares
      position_count
    }
    counter_vault {
      total_shares
      position_count
    }
  }
}
`);

export default function Triple() {

  const { loading, error, data, refetch, fetchMore } = useQuery(GetTriplesQuery);

  if (loading && !data) return <ActivityIndicator size="large" />;

  return (
    <ThemedView style={styles.container}>
      {error && <ThemedText>{error.message}</ThemedText>}
      {!loading && data && <FlashList
        data={data.triples}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TripleListItem triple={item} />}
        estimatedItemSize={300}
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
export function TripleListItem({ triple }: { triple: any }) {
  return (
    <ThemedView style={styles.listContainer}>
      <View style={styles.topRow}>
        <Link
          href={{
            pathname: '/acc/[id]',
            params: { id: triple.creator.id }
          }}>
          {triple.creator.image !== null && <Image style={styles.image} source={{ uri: triple.creator.image }} />}
          <ThemedText style={styles.secondary}>{triple.creator.label}</ThemedText>
        </Link>

        <ThemedText style={styles.date}>{formatRelative(new Date(parseInt(triple.block_timestamp.toString()) * 1000), new Date())}</ThemedText>
      </View>

      <Link
        style={styles.vaultLink}
        href={{
          pathname: '/t/[id]',
          params: { id: triple.id }
        }}>
        <View style={styles.vaultContent}>
          <ThemedText numberOfLines={1}>{triple.subject.emoji} {triple.subject.label}</ThemedText>
          <ThemedText >{triple.predicate.label}</ThemedText>
          <ThemedText >{triple.object.emoji} {triple.object.label}</ThemedText>
        </View>
      </Link>
      <View style={styles.positionsRow}>
        <ThemedText numberOfLines={1}><Ionicons size={13} name='person' /> {triple.vault.position_count} ∙ {convertToCurrency(triple.vault.total_shares)} </ThemedText>

        <ThemedText numberOfLines={1} style={styles.counterVault}><Ionicons size={13} name='person' /> {triple.counter_vault.position_count} ∙ {convertToCurrency(triple.counter_vault.total_shares)} </ThemedText>
      </View>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  counterVault: {
    color: 'red'
  },
  vaultLink: {
    marginTop: 10,
  },
  positionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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




