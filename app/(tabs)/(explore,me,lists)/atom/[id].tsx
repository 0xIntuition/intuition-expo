import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Pressable, Platform } from 'react-native';
import { ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { Text, View, useThemeColor } from '@/components/Themed';
import { graphql } from '@/lib/graphql';
import { useQuery } from '@tanstack/react-query';
import { execute } from '@/lib/graphql/execute';
import { blurhash, getCachedImage, shortLink } from '@/lib/utils';
import { ExternalLink } from '@/components/ExternalLink';
import { Ionicons } from '@expo/vector-icons';
import { SourcePicker } from '@/components/SourcePicker';
import { useSourcePicker } from '@/providers/SourcePickerProvider';
import { useAccount } from 'wagmi';

const GetAtomQuery = graphql(`
query GetAtom($term_id: String!) {
  atom(term_id: $term_id) {
    label
    cached_image {
      url
      safe
    }
    value {
      account_id
      json: json_object {
        description: data(path: "description")
        url: data(path: "url")
      }
    }
  }
}
`);
const GetAtomDetails = graphql(`
query GetAtomDetails($term_id: String!, $positionsBool: positions_bool_exp) {
  atom(term_id: $term_id) {
    tags: as_subject_triples(
      where: {
        predicate_id: {
          _eq: "0x7ec36d201c842dc787b45cb5bb753bea4cf849be3908fb1b0a7d067c3c3cc1f5"
        }
        positions: $positionsBool
      }
    ) {
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
    <Link href={`../list/${item.term_id}` as any} asChild>
      <Pressable
        style={({ pressed }) => [
          styles.sectionItem,
          { backgroundColor },
          separator,
          pressed && styles.sectionItemPressed,
        ]}
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

const sources = ['All', 'My'];

export default function Atom() {
  const { id } = useLocalSearchParams();
  const termId = Array.isArray(id) ? id[0] : id
  const { address } = useAccount();
  const backgroundColor = useThemeColor({}, 'background');
  const { sourceIndex, setSourceIndex } = useSourcePicker();

  const { data, isLoading } = useQuery({
    queryKey: ['getAtom', id, address],
    queryFn: () => execute(GetAtomQuery, {
      term_id: termId
    })
  })
  const { data: details, isLoading: isLoadingDetails } = useQuery({
    queryKey: ['getAtomDetails', termId, sourceIndex, address],
    queryFn: () => execute(GetAtomDetails, {
      term_id: termId,
      positionsBool: sourceIndex === 0 ? {} : {
        account_id: {
          _eq: address
        }
      }
    })
  })
  return (

    <>
      <Stack.Screen
        options={{
          title: data?.atom?.label || '',
        }}
      />

      <ScrollView contentInsetAdjustmentBehavior='automatic'>
        {isLoading && data === undefined && <Text>Loading</Text>}
        {data !== undefined && <View >

          {data.atom?.cached_image !== null &&
            <Image source={getCachedImage(data.atom?.cached_image?.url)} placeholder={blurhash}
              blurRadius={150}
              style={styles.image}
              contentFit="cover"

            ></Image>}
          {data.atom?.cached_image !== null &&
            <Image source={getCachedImage(data.atom?.cached_image?.url)} placeholder={blurhash}
              blurRadius={data.atom?.cached_image?.safe ? 0 : 5}
              style={styles.image}
              contentFit="contain"

            />}
          <View style={styles.dataContainer}>

            {!!data?.atom?.value?.json?.description && data?.atom?.value?.json?.description !== "null" && <Text style={styles.description}>{data?.atom?.value?.json?.description}</Text>}
            {/* Additional text display for json value */}
            {!!data?.atom?.value?.json?.url && data?.atom?.value?.json?.url !== "null" && <ExternalLink href={data.atom.value.json.url}>
              <Text>{shortLink(data?.atom?.value?.json?.url)}</Text>
            </ExternalLink>}
            {/* Additional display for account_id */}
            {!!data?.atom?.value?.account_id && <Link href={`../account/${data.atom.value.account_id}`}>{data?.atom?.value?.account_id}</Link>}

          </View>

          {/* Picker Section */}
          <View style={Platform.select({
            ios: ({ flex: 1, backgroundColor, paddingVertical: 10, marginHorizontal: 16 }),
            android: ({ alignItems: 'center', flex: 1, backgroundColor })
          })}>
            <SourcePicker
              options={sources}
              selectedIndex={sourceIndex}
              onOptionSelected={({ nativeEvent: { index } }) => {
                setSourceIndex(index);
              }}
              variant="segmented"
            />
          </View>

          {/* Tags Section */}
          {details?.atom?.tags && details?.atom.tags.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>In Lists</Text>
              <View style={styles.sectionContent}>
                {details.atom.tags.map((tag, index) => (
                  <SectionItem
                    key={tag.object.term_id}
                    item={tag.object}
                    isLast={index === (details.atom?.tags?.length ?? 0) - 1}
                  />
                ))}
              </View>
            </View>
          )}
        </View>}


      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  dataContainer: {

    marginTop: 190,
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  description: {
    marginBottom: 10,
    fontSize: 16,
  },
  image: {
    position: 'absolute',
    top: 0,
    height: 180,
    flex: 1,
    width: '100%',
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
  sectionItemPressed: {
    opacity: 0.7,
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

