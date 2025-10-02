import { Link, Stack } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View, useThemeColor } from '@/components/Themed';
import { graphql } from '@/lib/graphql';
import { useQuery } from '@tanstack/react-query';
import { execute } from '@/lib/graphql/execute';
import { useState } from 'react';
import { Image } from 'expo-image';
import { blurhash, getCachedImage } from '@/lib/utils';
import { Ionicons } from '@expo/vector-icons';

const SEARCH_QUERY = graphql(`
query GlobalSearch(
  $likeStr: String
  $accountsLimit: Int
  $atomsLimit: Int
  $triplesLimit: Int
  $collectionsLimit: Int
) {
  accounts(
    limit: $accountsLimit
    order_by: [ {
       atom:  {
          term:  {
             total_market_cap: desc
          }
       }
    }]
    where: {
      type: { _eq: Default }
      atom_id: { _is_null: false }
      _or: [
        { label: { _ilike: $likeStr } }
        { atom: { data: { _ilike: $likeStr } } }
      ]
    }
  ) {
    id
    label
    cached_image {
      url
      safe
    }
  }
  atoms(
    limit: $atomsLimit
    order_by: [ {
       term:  {
          total_market_cap: desc
       }
    }]
    where: {
      _or: [
        { data: { _ilike: $likeStr } }
        { label: { _ilike: $likeStr } }
        { value: { text_object: { data: { _ilike: $likeStr } } } }
        { value: { thing: { url: { _ilike: $likeStr } } } }
        { value: { thing: { name: { _ilike: $likeStr } } } }
        { value: { thing: { description: { _ilike: $likeStr } } } }
        { value: { person: { url: { _ilike: $likeStr } } } }
        { value: { person: { name: { _ilike: $likeStr } } } }
        { value: { person: { description: { _ilike: $likeStr } } } }
        { value: { organization: { url: { _ilike: $likeStr } } } }
        { value: { organization: { name: { _ilike: $likeStr } } } }
        { value: { organization: { description: { _ilike: $likeStr } } } }
      ]
    }
  ) {
    term_id
    label
    cached_image {
      url
      safe
    }
  }
  triples(
    limit: $triplesLimit
    order_by: [ {
       triple_term:  {
          total_market_cap: desc
       }
    }]
    where: {
      _or: [
        { subject: { label: { _ilike: $likeStr } } }
        { predicate: { label: { _like: $likeStr } } }
        { object: { label: { _like: $likeStr } } }
      ]
    }
  ) {
    term_id
    object {
      label
      cached_image {
        url
        safe
      }
    }
    predicate {
      label
      cached_image {
        url
        safe
      }
    }
    subject {
      label
      cached_image {
        url
        safe
      }
    }
  }
  collections: predicate_objects(
    where: {
      predicate: { type: { _eq: Keywords } }
      object: { label: { _ilike: $likeStr } }
    }
    order_by: [{ triple_count: desc }]
    limit: $collectionsLimit
  ) {
    object {
      label
      term_id
      cached_image {
        url
        safe
      }
    }
  }
}
`);

interface SectionItemProps {
  item: {
    id?: string;
    term_id?: string;
    label?: string | null;
    cached_image?: {
      url?: string;
      safe?: boolean;
    } | null;
  };
  href: string;
  isLast: boolean;
}

const SectionItem: React.FC<SectionItemProps> = ({ item, href, isLast }) => {
  const backgroundColor = useThemeColor({}, 'secondaryBackground');
  const textColor = useThemeColor({}, 'text');
  const separatorColor = useThemeColor({ light: '#e1e1e1', dark: '#333' }, 'tabIconDefault');
  const chevronColor = useThemeColor({ light: '#8e8e93', dark: '#8e8e93' }, 'tabIconDefault');
  const separator = !isLast ? { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: separatorColor } : {}

  return (
    <Link href={href} asChild>
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

interface ClaimItemProps {
  triple: {
    term_id: string;
    subject: { label?: string | null };
    predicate: { label?: string | null };
    object: { label?: string | null };
  };
  isLast: boolean;
  backgroundColor: string;
  textColor: string;
  separatorColor: string;
  chevronColor: string;
}

const ClaimItem: React.FC<ClaimItemProps> = ({
  triple,
  isLast,
  backgroundColor,
  textColor,
  separatorColor,
  chevronColor
}) => {
  const separator = !isLast ? { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: separatorColor } : {}

  return (
    <Link href={`/(explore)/triple/${triple.term_id}`} asChild>
      <Pressable
        style={{ ...styles.sectionItem, backgroundColor, ...separator }}
      >
        <View style={styles.sectionItemContent}>
          <View style={styles.claimTextContainer}>
            <Text style={[styles.claimText, { color: textColor }]} numberOfLines={2}>
              <Text style={styles.claimSubject}>{triple.subject.label || 'Unknown'}</Text>
              <Text> </Text>
              <Text style={[styles.claimPredicate, { color: textColor }]}>{triple.predicate.label || 'relates to'}</Text>
              <Text> </Text>
              <Text style={styles.claimObject}>{triple.object.label || 'Unknown'}</Text>
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={16}
            color={chevronColor}
          />
        </View>
      </Pressable>
    </Link>
  );
};

export default function ExploreIndex() {
  const [searchQuery, setSearhQuery] = useState('');
  const backgroundColor = useThemeColor({}, 'background');
  const secondaryBackgroundColor = useThemeColor({}, 'secondaryBackground');
  const textColor = useThemeColor({}, 'text');
  const separatorColor = useThemeColor({ light: '#e1e1e1', dark: '#333' }, 'tabIconDefault');
  const chevronColor = useThemeColor({ light: '#8e8e93', dark: '#8e8e93' }, 'tabIconDefault');

  const { data, isLoading } = useQuery({
    queryKey: ['globalSearch', searchQuery],
    queryFn: () => execute(SEARCH_QUERY, {
      likeStr: `${searchQuery}%`,
      atomsLimit: 5,
      accountsLimit: 5,
      triplesLimit: 5,
      collectionsLimit: 5,
    })
  })

  return (
    <SafeAreaProvider>
      <Stack.Screen
        options={{
          title: 'Explore',
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
        >
          {isLoading && <Text style={styles.loadingText}>Loading...</Text>}

          {/* Accounts Section */}
          {data?.accounts && data.accounts.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Accounts</Text>
              <View style={styles.sectionContent}>
                {data.accounts.map((account, index) => (
                  <SectionItem
                    key={account.id}
                    item={account}
                    href={`/(explore)/account/${account.id}`}
                    isLast={index === data.accounts.length - 1}
                  />
                ))}
              </View>
            </View>
          )}

          {/* Identities Section */}
          {data?.atoms && data.atoms.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Identities</Text>
              <View style={styles.sectionContent}>
                {data.atoms.map((atom, index) => (
                  <SectionItem
                    key={atom.term_id}
                    item={atom}
                    href={`/(explore)/atom/${atom.term_id}`}
                    isLast={index === data.atoms.length - 1}
                  />
                ))}
              </View>
            </View>
          )}

          {/* Claims Section */}
          {data?.triples && data.triples.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Claims</Text>
              <View style={styles.sectionContent}>
                {data.triples.map((triple, index) => (
                  <ClaimItem
                    key={triple.term_id}
                    triple={triple}
                    isLast={index === data.triples.length - 1}
                    backgroundColor={secondaryBackgroundColor}
                    textColor={textColor}
                    separatorColor={separatorColor}
                    chevronColor={chevronColor}
                  />
                ))}
              </View>
            </View>
          )}

          {/* Lists Section */}
          {data?.collections && data.collections.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Lists</Text>
              <View style={styles.sectionContent}>
                {data.collections.map((collection, index) => (
                  <SectionItem
                    key={collection.object.term_id}
                    item={collection.object}
                    href={`/(explore)/list/${collection.object.term_id}`}
                    isLast={index === data.collections.length - 1}
                  />
                ))}
              </View>
            </View>
          )}

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
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 32,
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
  claimTextContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  claimText: {
    fontSize: 17,
    lineHeight: 22,
  },
  claimSubject: {
    fontWeight: '600',
  },
  claimPredicate: {
    fontWeight: '400',
    opacity: 0.7,
  },
  claimObject: {
    fontWeight: '600',
  },
});

