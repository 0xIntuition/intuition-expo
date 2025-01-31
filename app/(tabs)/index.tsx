import { StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@apollo/client';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { formatRelative } from 'date-fns';
import { ListItem } from '@/components/list-item';
import { Address, formatEther } from 'viem';
import { gql } from '@/lib/generated';
import { getTripleLabel } from '@/lib/utils';
const GET_SIGNALS = gql(`
query GetSignals($offset: Int) {
  signals_aggregate {
    aggregate {
      count
    }
  }
  signals(order_by: { block_timestamp: desc }, limit: 10, offset: $offset) {
    id
    account {
      id
      label
      image
    }
    delta
    block_timestamp
    atom {
      id
      emoji
      label
    }
    triple {
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
    }
  }
}
`);

export default function Signals() {
  const { loading, error, data, fetchMore, refetch } = useQuery(GET_SIGNALS);

  if (loading && !data) return <ActivityIndicator size="large" />;
  const usd = 1;

  return (
    <ThemedView style={styles.container}>
      {error && <ThemedText>{error.message}</ThemedText>}
      {!loading && data && <FlashList
        data={data.signals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (<ListItem
          image={item.account?.image}
          id={item.account?.id.toString()! as Address}
          label={`${item.atom?.label || getTripleLabel(item.triple) || ''} `}
          subLabel={`${item.account?.label}  ∙ ${formatRelative(new Date(parseInt(item.block_timestamp.toString()) * 1000), new Date())} `}
          value={`${item.delta > 0 ? '+' : ''}${(parseFloat(formatEther(item.delta)) * usd).toFixed(2)}`}
          subValue='USD'
          href={item.atom?.id ? `/a/${item.atom.id}` : `/t/${item.triple?.id}`}
        />)
        }
        estimatedItemSize={300}
        onEndReached={() => {
          if (data.signals_aggregate.aggregate?.count && data.signals_aggregate.aggregate.count > data.signals.length) {
            fetchMore({
              variables: {
                offset: data.signals.length,
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


