import { Pressable, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { AppKitButton } from '@reown/appkit-wagmi-react-native';
import { formatEther } from 'viem';
import { Link, Stack } from 'expo-router';
import { useAccount } from "wagmi";
import { graphql } from '@/lib/graphql';
import { useQuery } from '@tanstack/react-query';
import { execute } from '@/lib/graphql/execute';

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
          label
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


export default function AccountIndex() {
  const { address, status } = useAccount();

  const { data, isLoading } = useQuery({
    enabled: status === 'connected',
    queryKey: ['savedLists', address],
    queryFn: () => execute(SavedListsQuery, {
      "orderBy": { "triple_count": "desc" },

      "triplesWhere": {
        "term": {
          "vaults": {
            "positions": {
              "account_id": {
                "_eq": "0x19711CD19e609FEBdBF607960220898268B7E24b"
              },
              "shares": {
                "_gt": "0"
              }
            }
          }
        }
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
                "term": {
                  "vaults": {
                    "positions": {
                      "account_id": {
                        "_eq": "0x19711CD19e609FEBdBF607960220898268B7E24b"
                      },
                      "shares": {
                        "_gt": "0"
                      }
                    }
                  }
                }
              }
            }
          }
        ]
      },
      "limit": 18,
      "offset": 0,
    })
  })
  return (
    <>
      <Stack.Screen
        options={{
          title: 'My Intuition',
          headerRight: () => <AppKitButton />,
        }}
      />
      <ScrollView >
        {data?.predicate_objects.map((p) => (<View key={p.id}>
          <Link href={`/explore/atom/${p.object.term_id}`} asChild>
            <Pressable>
              <Text style={styles.title}>{p.object.label}</Text>
            </Pressable>
          </Link>
          {p.object.as_object_triples.map((t) => (<View key={t.subject.term_id}>
            <Link href={`/explore/atom/${t.subject.term_id}`} asChild>
              <Pressable>
                <Text >{t.subject.label}</Text>
              </Pressable>
            </Link>
          </View>))}

        </View>))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

