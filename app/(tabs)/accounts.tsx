import { View, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useQuery, gql } from '@apollo/client';
import React, { useState, useEffect, useCallback } from 'react';
import Avatar from '@/components/Avatar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';

const GET_ACCOUNTS = gql`
query Accounts($after: String) {
  accounts(
    orderBy: "label"
    limit: 10
    after: $after
    orderDirection: "asc"
    where: { type: Default }
  ) {
    items {
      image
      label
      id
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}`;
function shortId(id: string): string {
  return id.substring(0, 6) + "..." + id.substring(id.length - 4)
}

export default function Accounts() {

  const { loading, error, data, refetch, fetchMore } = useQuery(GET_ACCOUNTS);


  if (loading && !data) return <ActivityIndicator size="large" />;
  return (
    <ThemedView style={styles.container}>
      {error && <ThemedText>{error.message}</ThemedText>}
      {!loading && data && <FlashList
        data={data.accounts.items}
        keyExtractor={(item: any) => `${item.id}`}
        renderItem={({ item }: { item: any }) => <AccountListItem account={item} />}
        estimatedItemSize={300}
        onEndReached={() => {
          if (data.accounts.pageInfo.hasNextPage) {
            fetchMore({
              variables: {
                after: data.accounts.pageInfo.endCursor,
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) return previousResult;
                return {
                  accounts: {
                    __typename: previousResult.accounts.__typename,
                    items: [...previousResult.accounts.items, ...fetchMoreResult.accounts.items],
                    pageInfo: fetchMoreResult.accounts.pageInfo,
                  }
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
export function AccountListItem({ account }: { account: any }) {
  return (
    <ThemedView style={styles.listContainer}>

      <Link
        href={{
          pathname: '/acc/[id]',
          params: { id: account.id }
        }}>
        <Avatar image={account.image} style={styles.avatar} />

        <View>
          <ThemedText style={styles.name}>{account.label}</ThemedText>
          <ThemedText style={styles.secondary}>{shortId(account.id)}</ThemedText>
        </View>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 13,
  },
  profileLayout: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  interactionsLayout: {
    flexDirection: 'row',
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


