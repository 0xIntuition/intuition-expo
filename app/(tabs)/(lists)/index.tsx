import { Link, Stack } from 'expo-router';
import { Pressable, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View, useThemeColor } from '@/components/Themed';
import { AppKitButton } from '@reown/appkit-wagmi-react-native';
import { useAccount } from "wagmi";
import { graphql } from '@/lib/graphql';
import { useQuery } from '@tanstack/react-query';
import { execute } from '@/lib/graphql/execute';
import { CrossPlatformPicker } from '@/components/CrossPlatformPicker';
import { useState } from 'react';
import { Image } from 'expo-image';
import { blurhash, getCachedImage } from '@/lib/utils';
import { Ionicons } from '@expo/vector-icons';
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

interface CachedImage {
  safe?: boolean;
  url?: string;
}

interface Subject {
  term_id: string;
  cached_image?: CachedImage;
}

interface Triple {
  subject: Subject;
}

interface ListItemProps {
  object: {
    term_id: string;
    label: string;
    cached_image?: CachedImage;
    as_object_triples: Triple[];
    as_object_triples_aggregate: {
      aggregate: {
        count: number;
      };
    };
  };
  isLast: boolean;
}

const ComposedImage: React.FC<{ triples: Triple[] }> = ({ triples }) => {
  const imageUrls = triples
    .slice(0, 4)
    .map(triple => triple.subject.cached_image?.safe ? triple.subject.cached_image.url : null)
    .filter(Boolean);

  const backgroundColor = useThemeColor({ light: '#f0f0f0', dark: '#2a2a2a' }, 'tabIconDefault');

  if (imageUrls.length === 0) {
    return (
      <View style={[styles.composedImageContainer, { backgroundColor }]}>
        <Ionicons name="list" size={16} color="#8e8e93" />
      </View>
    );
  }

  const renderImages = () => {
    if (imageUrls.length === 1) {
      return (
        <Image
          source={getCachedImage(imageUrls[0]!)}
          placeholder={blurhash}
          style={styles.singleImage}
        />
      );
    }

    if (imageUrls.length === 2) {
      return (
        <>
          <View style={styles.topRow}>
            <Image
              source={getCachedImage(imageUrls[0]!)}
              placeholder={blurhash}
              style={styles.halfImage}
            />
            <Image
              source={getCachedImage(imageUrls[1]!)}
              placeholder={blurhash}
              style={styles.halfImage}
            />
          </View>
        </>
      );
    }

    if (imageUrls.length === 3) {
      return (
        <>
          <View style={styles.topRow}>
            <Image
              source={getCachedImage(imageUrls[0]!)}
              placeholder={blurhash}
              style={styles.halfImage}
            />
            <Image
              source={getCachedImage(imageUrls[1]!)}
              placeholder={blurhash}
              style={styles.halfImage}
            />
          </View>
          <View style={styles.bottomRow}>
            <Image
              source={getCachedImage(imageUrls[2]!)}
              placeholder={blurhash}
              style={styles.bottomSingleImage}
            />
          </View>
        </>
      );
    }

    return (
      <>
        <View style={styles.topRow}>
          <Image
            source={getCachedImage(imageUrls[0]!)}
            placeholder={blurhash}
            style={styles.quarterImage}
          />
          <Image
            source={getCachedImage(imageUrls[1]!)}
            placeholder={blurhash}
            style={styles.quarterImage}
          />
        </View>
        <View style={styles.bottomRow}>
          <Image
            source={getCachedImage(imageUrls[2]!)}
            placeholder={blurhash}
            style={styles.quarterImage}
          />
          <Image
            source={getCachedImage(imageUrls[3]!)}
            placeholder={blurhash}
            style={styles.quarterImage}
          />
        </View>
      </>
    );
  };

  return (
    <View style={styles.composedImageContainer}>
      {renderImages()}
    </View>
  );
};

const ListItem: React.FC<ListItemProps> = ({ object, isLast }) => {
  const backgroundColor = useThemeColor({}, 'secondaryBackground');
  const textColor = useThemeColor({}, 'text');
  const subtitleColor = useThemeColor({ light: '#8e8e93', dark: '#8e8e93' }, 'tabIconDefault');
  const separatorColor = useThemeColor({ light: '#e1e1e1', dark: '#333' }, 'tabIconDefault');
  const chevronColor = useThemeColor({ light: '#8e8e93', dark: '#8e8e93' }, 'tabIconDefault');
  const separator = !isLast ? { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: separatorColor } : {}

  const memberCount = object.as_object_triples_aggregate.aggregate.count;

  return (
    <Link href={`/(lists)/list/${object.term_id}`} asChild>
      <Pressable
        style={{ ...styles.sectionItem, backgroundColor, ...separator }}
      >
        <View style={styles.sectionItemContent}>
          <ComposedImage triples={object.as_object_triples} />
          <View style={styles.textContainer}>
            <Text style={[styles.sectionItemText, { color: textColor }]} numberOfLines={1}>
              {object.label || 'Untitled'}
            </Text>
            <Text style={[styles.memberCountText, { color: subtitleColor }]} numberOfLines={1}>
              {memberCount} {memberCount === 1 ? 'item' : 'items'}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={chevronColor} />
        </View>
      </Pressable>
    </Link>
  );
};

export default function AccountIndex() {
  const { address, status } = useAccount();
  const [searchQuery, setSearhQuery] = useState('');
  const backgroundColor = useThemeColor({}, 'background');
  const [sourceIndex, setSourceIndex] = useState(status === 'disconnected' ? 0 : 1);

  const { data, isLoading } = useQuery({
    queryKey: ['savedLists', address, sourceIndex, searchQuery],
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
            "object": searchQuery.length > 0 ? {
              "label": {
                "_ilike": "%" + searchQuery + "%"
              }
            } : {}
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
    // If "My" is selected but user is not connected, show connection prompt
    if (sourceIndex === 1 && status !== 'connected') {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Connect your wallet</Text>
          <Text style={styles.emptySubtext}>Connect your wallet to see your saved lists</Text>
          <AppKitButton />
        </View>
      );
    }

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

    return (
      <View style={styles.section}>
        <View style={styles.sectionContent}>
          {data.predicate_objects.map((p, index) => (
            <ListItem
              key={p.id}
              object={p.object}
              isLast={index === data.predicate_objects.length - 1}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <Stack.Screen
        options={{
          title: 'Lists',
          headerLargeTitle: true,
          headerSearchBarOptions: {
            placement: 'automatic',
            placeholder: 'Search',
            onChangeText: (e) => setSearhQuery(e.nativeEvent.text),
          },
        }}
      />
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView
          style={[{ backgroundColor }]}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
        >
          <View style={Platform.select({
            ios: ({ flex: 1, backgroundColor, paddingBottom: 10, marginHorizontal: 16 }),
            android: ({ alignItems: 'center', flex: 1, backgroundColor })
          })}>
            <CrossPlatformPicker
              options={sources}
              selectedIndex={sourceIndex}
              onOptionSelected={({ nativeEvent: { index } }) => {
                setSourceIndex(index);
              }}
              variant="segmented"
            />
          </View>
          {renderContent()}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
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
    marginBottom: 16
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    paddingHorizontal: 16,
    marginBottom: 8,
    opacity: 0.6,
  },
  sectionContent: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  sectionItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 44,
    justifyContent: 'center',
  },
  sectionItemContent: {
    paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  composedImageContainer: {
    width: 29,
    height: 29,
    borderRadius: 6,
    marginRight: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleImage: {
    width: 29,
    height: 29,
    borderRadius: 6,
  },
  topRow: {
    flexDirection: 'row',
    height: 14,
    marginBottom: 1,
  },
  bottomRow: {
    flexDirection: 'row',
    height: 14,
  },
  halfImage: {
    width: 14,
    height: 14,
    marginRight: 1,
  },
  bottomSingleImage: {
    width: 29,
    height: 14,
  },
  quarterImage: {
    width: 14,
    height: 14,
    marginRight: 1,
  },
  textContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  sectionItemText: {
    fontSize: 17,
    fontWeight: '400',
    marginBottom: 2,
  },
  memberCountText: {
    fontSize: 13,
    fontWeight: '400',
  },
});

