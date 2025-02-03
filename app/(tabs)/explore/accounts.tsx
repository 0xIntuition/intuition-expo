import { View, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@apollo/client';
import Avatar from '@/components/Avatar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { gql } from '@/lib/generated';

const GetAccountsQuery = gql(`
query GetAccounts($offset: Int) {
  accounts_aggregate(where: { type: { _eq: Default } }) {
    aggregate {
      count
    }
  }
  accounts(
    order_by: { atom:  {
       vault:  {
          total_shares: desc
       }
    } }
    limit: 10
    offset: $offset
    where: { type: { _eq: Default } }
  ) {
    image
    label
    id
  }
}`);

function shortId(id: string): string {
  return id.substring(0, 6) + "..." + id.substring(id.length - 4)
}

export default function Accounts() {

  const { loading, error, data, refetch, fetchMore } = useQuery(GetAccountsQuery);


  if (loading && !data) return <ActivityIndicator size="large" />;
  return (
    <ThemedView style={styles.container}>
      {error && <ThemedText>{error.message}</ThemedText>}
      {!loading && data && <FlashList
        data={data.accounts}
        keyExtractor={(item: any) => `${item.id}`}
        renderItem={({ item }: { item: any }) => <AccountListItem account={item} />}
        estimatedItemSize={100}
        onEndReached={() => {
          if (data.accounts_aggregate.aggregate?.count && data.accounts_aggregate.aggregate.count > data.accounts.length) {
            fetchMore({
              variables: {
                offset: data.accounts.length,
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) return previousResult;
                return {
                  ...previousResult,
                  accounts: [...previousResult.accounts, ...fetchMoreResult.accounts],
                  accounts_aggregate: fetchMoreResult.accounts_aggregate,
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


