import { Stack, useLocalSearchParams, useNavigation, Link } from 'expo-router';
import { StyleSheet, ScrollView, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View } from '@/components/Themed';
import { graphql } from '@/lib/graphql';
import { useQuery } from '@tanstack/react-query';
import { execute } from '@/lib/graphql/execute';
import { useEffect } from 'react';
import { blurhash, getCachedImage } from '@/lib/utils';
import { useAccount } from 'wagmi';

const ListQuery = graphql(`
query List($objectId: String!, $term: terms_bool_exp, $limit: Int, $offset: Int) {
  triples(
    where: {
      object_id: {
        _eq: $objectId
      }
      predicate_id: {
        _eq: "0x49487b1d5bf2734d497d6d9cfcd72cdfbaefb4d4f03ddc310398b24639173c9d"
      }
      term: $term
    }
    limit: $limit
    offset: $offset
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
`);

export default function List() {
  const navigation = useNavigation();
  const { address } = useAccount();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const { id } = useLocalSearchParams();
  const objectId = Array.isArray(id) ? id[0] : id;

  const { data, isLoading } = useQuery({
    queryKey: ['list', objectId, address],
    queryFn: () => execute(ListQuery, {
      objectId: objectId,
      term: address ? {
        vaults: {
          positions: {
            account_id: {
              _eq: address
            },
            shares: {
              _gt: "0"
            }
          }
        }
      } : {},
      limit: 50,
      offset: 0
    }),
    enabled: !!objectId
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView>
          {isLoading && <Text>Loading...</Text>}
          {data?.triples?.map((triple) => (
            <View key={triple.subject.term_id} style={styles.listItem}>
              <Link href={`/explore/atom/${triple.subject.term_id}`} asChild>
                <Pressable style={styles.itemContainer}>
                  {triple.subject.cached_image?.url && (
                    <Image
                      source={getCachedImage(triple.subject.cached_image.url)}
                      placeholder={blurhash}
                      blurRadius={triple.subject.cached_image.safe ? 0 : 5}
                      style={styles.itemImage}
                    />
                  )}
                  <Text style={styles.itemLabel}>{triple.subject.label}</Text>
                </Pressable>
              </Link>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    marginBottom: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(100,100,100,0.3)',
    borderRadius: 8,
    marginHorizontal: 16,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  itemLabel: {
    fontSize: 16,
    flex: 1,
  },
});
