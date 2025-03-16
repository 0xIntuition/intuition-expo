import { View, StyleSheet, RefreshControl, ActivityIndicator, useWindowDimensions, Pressable } from 'react-native';
import { MasonryFlashList } from '@shopify/flash-list';
import { useQuery } from '@apollo/client';
import Avatar from '@/components/Avatar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { gql } from '@/lib/generated';
import { useThemeColor } from '@/hooks/useThemeColor';
import Ionicons from '@expo/vector-icons/Ionicons';
import { formatNumber, getCachedImage } from '@/lib/utils';
const GetAccountsQuery = gql(`
query GetAccounts($offset: Int, $orderBy: [accounts_order_by!]) {
  accounts_aggregate(where: { type: { _eq: Default } }) {
    aggregate {
      count
    }
  }
  accounts(
    limit: 50
    offset: $offset
    where: { type: { _eq: Default } }
    order_by: $orderBy
  ) {
    image
    label
    id
    claims_aggregate {
      aggregate {
        count
      }
    }
    signals_aggregate {
      aggregate {
        count
      }
    }
    cached_image {
      safe
      url
    }
  }
}`);

function shortId(id: string): string {
  return id.substring(0, 6) + "..." + id.substring(id.length - 4)
}

export default function Accounts() {

  const { loading, error, data, refetch, fetchMore } = useQuery(GetAccountsQuery, {
    variables: {
      "offset": 0,
      "orderBy": [
        {
          "signals_aggregate": {
            // @ts-ignore
            count: "desc"
          }
        }
      ]
    }
  });
  const width = useWindowDimensions().width;

  if (loading && !data) return <ActivityIndicator size="large" />;
  return (
    <ThemedView style={styles.container}>
      {error && <ThemedText>{error.message}</ThemedText>}
      {!loading && data && <MasonryFlashList
        numColumns={Math.floor(width / 150)}
        data={data.accounts}
        keyExtractor={(item: any) => `${item.id}`}
        renderItem={({ item }: { item: any }) => <AccountListItem account={item} />}
        estimatedItemSize={200}
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
  const backgroundColor = useThemeColor({}, 'backgroundSecondary');
  return (
    <ThemedView style={[styles.masonryContainer, { backgroundColor }]}>

      <Link
        asChild
        href={{
          pathname: '/acc/[id]',
          params: { id: account.id }
        }}>
        <Pressable style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Avatar image={getCachedImage(account.cached_image)} style={styles.avatar} size={100} radius={50} id={account.id} />

          {account.label.toLowerCase() !== shortId(account.id).toLowerCase() && <ThemedText style={styles.name}>{account.label}</ThemedText>}
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <ThemedText style={styles.secondary}><Ionicons size={13} name='volume-high-outline' style={{ marginLeft: 4 }} /> {formatNumber(account.signals_aggregate.aggregate.count)} </ThemedText>

            <ThemedText style={styles.secondary}><Ionicons size={13} name='color-filter-outline' style={{ marginLeft: 4 }} /> {formatNumber(account.claims_aggregate.aggregate.count)} </ThemedText>
          </View>
          <ThemedText style={styles.tertiary}>{shortId(account.id)}</ThemedText>
        </Pressable>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 8,
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
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    marginRight: 10,
  },
  name: {
    fontSize: 13,
    fontWeight: '500',

  },
  secondary: {
    color: '#888',
    fontSize: 13,
  },
  tertiary: {
    color: '#666',
    fontSize: 11,
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


