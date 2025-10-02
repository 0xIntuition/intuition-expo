import { Stack, useLocalSearchParams, useNavigation, Link } from 'expo-router';
import { StyleSheet, Pressable, ActivityIndicator, Platform } from 'react-native';
import { ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { Text, View, useThemeColor } from '@/components/Themed';
import { AppKitButton } from '@reown/appkit-wagmi-react-native';
import { graphql } from '@/lib/graphql';
import { useQuery } from '@tanstack/react-query';
import { execute } from '@/lib/graphql/execute';
import { useEffect, useState } from 'react';
import { blurhash, getCachedImage } from '@/lib/utils';
import { useAccount } from 'wagmi';
import { Ionicons } from '@expo/vector-icons';
import { CrossPlatformPicker } from '@/components/CrossPlatformPicker';

const ListQuery = graphql(`
query List($objectId: String!, $term: terms_bool_exp, $subject: atoms_bool_exp, $limit: Int, $offset: Int) {
  object: atom(term_id: $objectId) {
    label
  }
  triples(
    where: {
      object_id: {
        _eq: $objectId
      }
      predicate_id: {
        _eq: "0x49487b1d5bf2734d497d6d9cfcd72cdfbaefb4d4f03ddc310398b24639173c9d"
      }
      term: $term
      subject: $subject
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

const sources = ['All', 'My'];

interface SectionItemProps {
  item: {
    term_id: string;
    label?: string | null;
    cached_image?: {
      url?: string;
      safe?: boolean;
    } | null;
  };
  isLast: boolean;
}

const SectionItem: React.FC<SectionItemProps> = ({ item, isLast }) => {
  const backgroundColor = useThemeColor({}, 'secondaryBackground');
  const textColor = useThemeColor({}, 'text');
  const separatorColor = useThemeColor({ light: '#e1e1e1', dark: '#333' }, 'tabIconDefault');
  const chevronColor = useThemeColor({ light: '#8e8e93', dark: '#8e8e93' }, 'tabIconDefault');
  const separator = !isLast ? { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: separatorColor } : {}

  return (
    <Link href={`../atom/${item.term_id}`} asChild>
      <Pressable
        style={{ ...styles.sectionItem, backgroundColor, ...separator }}
      >
        <View style={styles.sectionItemContent}>
          {item.cached_image?.url && (
            <Image
              source={getCachedImage(item.cached_image.url)}
              placeholder={blurhash}
              blurRadius={item.cached_image?.safe ? 0 : 5}
              style={styles.sectionItemImage}
            />
          )}
          <Text style={[styles.sectionItemText, { color: textColor }]} numberOfLines={1}>
            {item.label || 'Untitled'}
          </Text>
          <Ionicons name="chevron-forward" size={16} color={chevronColor} />
        </View>
      </Pressable>
    </Link>
  );
};

export default function List() {
  const navigation = useNavigation();
  const { address, status } = useAccount();
  const backgroundColor = useThemeColor({}, 'background');
  const [searchQuery, setSearhQuery] = useState('');
  const [sourceIndex, setSourceIndex] = useState(1);

  // useEffect(() => {
  //   navigation.setOptions({ headerShown: false });
  // }, [navigation]);

  const { id } = useLocalSearchParams();
  const objectId = Array.isArray(id) ? id[0] : id;

  const { data, isLoading } = useQuery({
    queryKey: ['list', objectId, address, sourceIndex, searchQuery],
    queryFn: () => execute(ListQuery, {
      objectId: objectId,
      subject: searchQuery.length > 0 ? {
        label: {
          _ilike: `%${searchQuery}%`
        }
      } : {},
      term: sourceIndex === 0 ? {} : address ? {
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

  const renderContent = () => {
    // If "My" is selected but user is not connected, show connection prompt
    if (sourceIndex === 1 && status !== 'connected') {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Connect your wallet</Text>
          <Text style={styles.emptySubtext}>Connect your wallet to see your items in this list</Text>
          <AppKitButton />
        </View>
      );
    }

    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      );
    }

    if (!data?.triples || data.triples.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Items Found</Text>
          <Text style={styles.emptySubtext}>
            This list doesn't contain any items yet
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.section}>
        <View style={styles.sectionContent}>
          {data.triples.map((triple, index) => (
            <SectionItem
              key={triple.subject.term_id}
              item={triple.subject}
              isLast={index === data.triples.length - 1}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: data?.object?.label || '',
          headerSearchBarOptions: {
            placement: 'automatic',
            placeholder: 'Search',
            onChangeText: (e) => setSearhQuery(e.nativeEvent.text),
          },
        }}

      />
      <ScrollView
        style={[{ backgroundColor }]}
        contentContainerStyle={styles.contentContainer}
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
  section: {
    marginBottom: 32,
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
  sectionItemImage: {
    width: 29,
    height: 29,
    borderRadius: 6,
    marginRight: 12,
  },
  sectionItemText: {
    flex: 1,
    fontSize: 17,
    fontWeight: '400',
  },
});
