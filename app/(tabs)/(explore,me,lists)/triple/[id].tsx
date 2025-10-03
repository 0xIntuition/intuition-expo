import { Link, Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import { StyleSheet, Pressable } from 'react-native';
import { ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { Text, View, useThemeColor } from '@/components/Themed';
import { graphql } from '@/lib/graphql';
import { useQuery } from '@tanstack/react-query';
import { execute } from '@/lib/graphql/execute';
import { useEffect } from 'react';
import { blurhash, getCachedImage } from '@/lib/utils';
import { Ionicons } from '@expo/vector-icons';

const GetTripleQuery = graphql(`
query GetTriple($term_id: String!) {
  triple(term_id: $term_id) {
    subject {
      term_id
      label
      cached_image {
        url
        safe
      }
    }
    predicate {
      term_id
      label
      cached_image {
        url
        safe
      }
    }
    object {
      term_id
      label
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
    <Link href={`../atom/${item.term_id}` as any} asChild>
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

export default function Triple() {


  const { id } = useLocalSearchParams();
  const termId = Array.isArray(id) ? id[0] : id

  const { data, isLoading } = useQuery({
    queryKey: ['getTriple', id],
    queryFn: () => execute(GetTripleQuery, {
      term_id: termId
    })
  })

  const title = isLoading ? '' : data?.triple?.subject.label + ' ' + data?.triple?.predicate?.label + ' ' + data?.triple?.object?.label

  return (
    <>
      <Stack.Screen
        options={{
          title,
        }}
      />
      <ScrollView contentInsetAdjustmentBehavior='automatic'>
        {isLoading && <Text>Loading</Text>}
        {data !== undefined && (
          <View>
            {/* Claim Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Claim</Text>
              <View style={styles.sectionContent}>
                {data.triple?.subject && (
                  <SectionItem
                    item={data.triple.subject}
                    isLast={false}
                  />
                )}
                {data.triple?.predicate && (
                  <SectionItem
                    item={data.triple.predicate}
                    isLast={false}
                  />
                )}
                {data.triple?.object && (
                  <SectionItem
                    item={data.triple.object}
                    isLast={true}
                  />
                )}
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

