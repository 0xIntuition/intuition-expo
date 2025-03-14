import { View, StyleSheet, RefreshControl, ActivityIndicator, Pressable, useWindowDimensions } from 'react-native';
import { MasonryFlashList } from '@shopify/flash-list';
import { useQuery } from '@apollo/client';
import Avatar from '@/components/Avatar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { gql } from '@/lib/generated';
import { useThemeColor } from '@/hooks/useThemeColor';

const GetListsQuery = gql(`
query GetLists($offset: Int) {
  predicate_objects_aggregate(
    where: { predicate_id: { _eq: 4 } }
  ) {
    aggregate {
      count
    }
  }
  predicate_objects(
    where: { predicate_id: { _eq: 4 } }
    order_by: [{ triple_count: desc }, { claim_count: desc }]
    limit: 100
    offset: $offset
  ) {
    claim_count
    triple_count
    object {
      image
      label
      id
    }
  }
}`);

function shortId(id: string): string {
  return id.substring(0, 6) + "..." + id.substring(id.length - 4)
}

export default function Accounts() {

  const { loading, error, data, refetch, fetchMore } = useQuery(GetListsQuery);
  const width = useWindowDimensions().width;


  if (loading && !data) return <ActivityIndicator size="large" />;
  return (
    <ThemedView style={styles.container}>
      {error && <ThemedText>{error.message}</ThemedText>}
      {!loading && data && <MasonryFlashList
        numColumns={Math.floor(width / 150)}

        data={data.predicate_objects}
        keyExtractor={(item: any) => `${item.object.id}`}
        renderItem={({ item }: { item: any }) => <PredicateObjectListItem predicateObject={item} />}
        estimatedItemSize={200}
        onEndReached={() => {
          if (data.predicate_objects_aggregate.aggregate?.count && data.predicate_objects_aggregate.aggregate.count > data.predicate_objects.length) {
            fetchMore({
              variables: {
                offset: data.predicate_objects.length,
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) return previousResult;
                return {
                  ...previousResult,
                  predicate_objects: [...previousResult.predicate_objects, ...fetchMoreResult.predicate_objects],
                  predicate_objects_aggregate: fetchMoreResult.predicate_objects_aggregate,
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
export function PredicateObjectListItem({ predicateObject }: { predicateObject: any }) {
  const backgroundColor = useThemeColor({}, 'backgroundSecondary');
  return (
    <ThemedView style={[styles.masonryContainer, { backgroundColor }]}>

      <Link
        asChild
        href={{
          pathname: '/list/[id]',
          params: { id: predicateObject.object.id }
        }}>
        <Pressable style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Avatar image={predicateObject.object.image} style={styles.avatar} size={80} radius={10} />

          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
            <ThemedText style={styles.name}>{predicateObject.object.label}</ThemedText>
            <ThemedText style={styles.secondary}>{predicateObject.triple_count} triples, {predicateObject.claim_count} claims </ThemedText>
          </View>
        </Pressable>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 8,
  },
  listContainer: {
    flex: 1,
    margin: 10,
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


