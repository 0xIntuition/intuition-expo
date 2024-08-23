import { View, StyleSheet, Image, ActivityIndicator, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { formatRelative } from 'date-fns';
import { convertToCurrency } from '@/hooks/useCurrency';

const GET_SIGNALS = gql`
  query GetSignals($offset: Int!) {
    signals(order_by: {vid: desc}, limit: 10, offset: $offset) {
    vid
    account {
      vid
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
    triple{
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
`;

export default function Signals() {
  const [offset, setOffset] = useState(0);
  const { loading, error, data, fetchMore, refetch } = useQuery(GET_SIGNALS, {
    variables: { offset: 0 },
  });

  console.log(JSON.stringify(data, null, 2));

  const fullRefetch = () => {
    setOffset(0);
    refetch();
  }

  const loadMore = () => {
    setOffset(prevOffset => prevOffset + 10);
    fetchMore({
      variables: {
        offset: offset + 10,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;
        return {
          signals: [...previousResult.signals, ...fetchMoreResult.signals],
        };
      },
    });
  };

  if (loading && !data) return <ActivityIndicator size="large" />;

  return (
    <ThemedView style={styles.container}>
      {error && <ThemedText>{error.message}</ThemedText>}
      {!loading && data && <FlashList
        data={data.signals}
        keyExtractor={(item) => item.vid}
        renderItem={({ item }: { item: any }) => <SignalListItem signal={item} />}
        estimatedItemSize={300}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={fullRefetch}
          />
        }
      />}
    </ThemedView>
  );
}
export function SignalListItem({ signal }: { signal: any }) {
  return (
    <ThemedView style={styles.listContainer}>
      <View style={styles.topRow}>
        <Link
          href={{
            pathname: '/account/[id]',
            params: { id: signal.account.id }
          }}>
          {signal.account.image !== null && <Image style={styles.image} source={{ uri: signal.account.image }} />}
          <ThemedText style={styles.secondary}>{signal.account.label}</ThemedText>
        </Link>

        <ThemedText style={styles.date}>{formatRelative(signal.block_timestamp * 1000, new Date())}</ThemedText>
      </View>

      <View style={styles.header}>
        <ThemedText >{convertToCurrency(signal.delta)}</ThemedText>
      </View>

      {signal.atom !== null && <Link
        style={styles.vaultLink}
        href={{
          pathname: '/atom/[id]',
          params: { id: signal.atom.id }
        }}>
        <View style={styles.vaultContent}>
          <ThemedText style={styles.secondary} numberOfLines={1}>{signal.atom.emoji} {signal.atom.label}</ThemedText>
        </View>

      </Link>}


      {signal.triple !== null && <Link
        style={styles.vaultLink}
        href={{
          pathname: '/triple/[id]',
          params: { id: signal.triple.id }
        }}>
        <View style={styles.vaultContent}>
          <ThemedText style={styles.secondary} numberOfLines={1}>{signal.triple.subject.emoji} {signal.triple.subject.label}</ThemedText>
          <ThemedText style={styles.secondary}>{signal.triple.predicate.label}</ThemedText>
          <ThemedText style={styles.secondary}>{signal.triple.object.emoji} {signal.triple.object.label}</ThemedText>
        </View>
      </Link>}

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


