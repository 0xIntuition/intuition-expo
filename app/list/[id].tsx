import { View, StyleSheet, RefreshControl, ActivityIndicator, Image, Pressable } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { gql } from '@/lib/generated';
import Triple from '@/components/Triple';
import { useGeneralConfig } from '@/hooks/useGeneralConfig';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import Avatar from '@/components/Avatar';
import { getUpvotes } from '@/hooks/useUpvotes';
import { shareAsync } from 'expo-sharing';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeColor } from '@/hooks/useThemeColor';
const GetListQuery = gql(`
query GetList($listId: numeric!, $offset: Int) {
    triples_aggregate(
      where: { predicate_id: { _eq: 4 }, object_id: { _eq: $listId } }
    ) {
    aggregate {
      count
    }
  }
  atom(
    id: $listId  
  ) {
    id
    label
    image
  }
  triples(
    limit: 10, offset: $offset
    order_by: [{ vault: { position_count: desc } }]
    where: { predicate_id: { _eq: 4 }, object_id: { _eq: $listId } }
  ) {
    id
    subject {
      id
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

export default function List() {
  const textColor = useThemeColor({}, 'text');
  const { id } = useLocalSearchParams();
  const { loading, error, data, refetch, fetchMore } = useQuery(GetListQuery, {
    variables: {
      listId: Number(id),
      offset: 0
    }
  });

  if (loading && !data) return <ActivityIndicator size="large" />;

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: () => <View style={styles.header} >
            {data?.atom?.image !== null && <Image style={styles.titleImage} source={{ uri: data?.atom?.image }} />}
            <ThemedText>{data?.atom?.label}</ThemedText>
          </View>,
          headerRight: () => <Pressable onPress={async () => {
            await shareAsync('https://app.i7n.xyz/list/' + id);
          }} style={{ marginRight: 10 }}>
            <Ionicons name="share-outline" size={24} color={textColor} />
          </Pressable>,
        }}
      />
      {error && <ThemedText>{error.message}</ThemedText>}
      {!loading && data && <FlashList
        data={data.triples}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ListItem item={item} />}
        estimatedItemSize={150}
        onEndReached={() => {
          if (data.triples_aggregate.aggregate?.count && data.triples_aggregate.aggregate.count > data.triples.length) {
            fetchMore({
              variables: {
                offset: data.triples.length,
                listId: Number(id),
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

export function ListItem({ item }: { item: any }) {
  return (
    <ThemedView style={styles.listContainer}>

      <Link
        href={{
          pathname: '/a/[id]',
          params: { id: item.subject.id }
        }}>
        <Avatar image={item.subject.image} style={styles.avatar} />

        <View>
          <ThemedText style={styles.name}>{item.subject.label}</ThemedText>
          <ThemedText style={styles.secondary}>↑ {getUpvotes(BigInt(item.vault.total_shares), BigInt(item.vault.current_share_price)).toString(10)}</ThemedText>
        </View>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  counterVault: {
    // color: 'red'
  },
  vaultLink: {
    marginTop: 10,
  },
  positionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 16,
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
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
  titleImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
});




