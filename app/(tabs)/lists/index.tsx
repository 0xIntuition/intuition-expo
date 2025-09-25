import { StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { ScrollView } from 'react-native';
import { Text, View, useThemeColor } from '@/components/Themed';
import { AppKitButton } from '@reown/appkit-wagmi-react-native';
import { Stack } from 'expo-router';
import { useAccount } from "wagmi";
import { graphql } from '@/lib/graphql';
import { useQuery } from '@tanstack/react-query';
import { execute } from '@/lib/graphql/execute';
import { ListCard } from '@/components/ListCard';
import { CrossPlatformPicker } from '@/components/CrossPlatformPicker';
import { useState } from 'react';
const SavedListsQuery = graphql(`
query SavedLists(
  $where: predicate_objects_bool_exp
  $limit: Int
  $offset: Int
  $orderBy: [predicate_objects_order_by!]
  $triplesWhere: triples_bool_exp
) {
  predicate_objects_aggregate(where: $where) {
    aggregate {
      count
    }
  }
  predicate_objects(
    where: $where
    limit: $limit
    offset: $offset
    order_by: $orderBy
  ) {
    id
    triple_count
    object {
      term_id
      label
      cached_image {
        safe
        url
      }
      value {
        thing {
          description
        }
      }
      as_object_triples_aggregate(where: $triplesWhere) {
        aggregate {
          count
        }
      }

      as_object_triples(
        where: $triplesWhere
        limit: 6
        order_by: { term: { total_market_cap: desc } }
      ) {
        subject {
          term_id
          cached_image {
            safe
            url
          }
        }
      }
    }
  }
}
`);

const sources = ['All', 'My'];

export default function AccountIndex() {
  const { address, status } = useAccount();
  const backgroundColor = useThemeColor({}, 'background');
  const [sourceIndex, setSourceIndex] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ['savedLists', address, sourceIndex],
    queryFn: () => execute(SavedListsQuery, {
      "orderBy": { "triple_count": "desc" },

      "triplesWhere": {
        "term": sourceIndex === 0 ? {} : address ? {
          "vaults": {
            "positions": {
              "account_id": {
                "_eq": address
              },
              "shares": {
                "_gt": "0"
              }
            }
          }
        } : {}
      },
      "where": {
        "_and": [
          {
            "predicate_id": {
              "_eq": "0x49487b1d5bf2734d497d6d9cfcd72cdfbaefb4d4f03ddc310398b24639173c9d"
            }
          },
          {
            "object": {
              "as_object_triples": {
                "predicate_id": {
                  "_eq": "0x49487b1d5bf2734d497d6d9cfcd72cdfbaefb4d4f03ddc310398b24639173c9d"
                },
                "term": sourceIndex === 0 ? {} : address ? {
                  "vaults": {
                    "positions": {
                      "account_id": {
                        "_eq": address
                      },
                      "shares": {
                        "_gt": "0"
                      }
                    }
                  }
                } : {}
              }
            }
          }
        ]
      },
      "limit": 18,
      "offset": 0,
    })
  });

  const renderContent = () => {


    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Loading your lists...</Text>
        </View>
      );
    }

    if (!data?.predicate_objects || data.predicate_objects.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No saved lists found</Text>
          <Text style={styles.emptySubtext}>Start exploring to save your first list!</Text>
        </View>
      );
    }

    return data.predicate_objects.map((p) => (
      <ListCard
        key={p.id}
        id={p.id}
        triple_count={p.triple_count}
        object={p.object}
      />
    ));
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false
        }}
      />
      <ScrollView
        style={[styles.container, { backgroundColor }]}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      ><View style={Platform.select({
        android: ({ alignItems: 'center' })
      })}><CrossPlatformPicker
            options={sources}
            selectedIndex={sourceIndex}
            onOptionSelected={({ nativeEvent: { index } }) => {
              setSourceIndex(index);
            }}
            variant="segmented"
          /></View>
        {renderContent()}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.7,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 64,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 16,
    opacity: 0.7,
  },
});

