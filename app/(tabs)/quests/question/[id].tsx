import { Stack, useLocalSearchParams, useNavigation, Link } from 'expo-router';
import { StyleSheet, ScrollView, Pressable, ActivityIndicator, Platform } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View, useThemeColor } from '@/components/Themed';
import { graphql } from '@/lib/graphql';
import { useQuery } from '@tanstack/react-query';
import { execute } from '@/lib/graphql/execute';
import { use, useEffect, useState } from 'react';
import { blurhash, getCachedImage } from '@/lib/utils';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { getQuestion } from '@/lib/quests/questions';
import { intuitionDeployments, intuitionTestnet, MultiVaultAbi } from '@0xintuition/protocol';
import { Hex, isErc6492Signature } from 'viem';

const ListQuery = graphql(`
query AnswerList($objectId: String!, $term: terms_bool_exp, $subject: atoms_bool_exp, $limit: Int, $offset: Int) {
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
    term_id
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
  onSelect: () => void;
}

const SectionItem: React.FC<SectionItemProps> = ({ item, isLast, onSelect }) => {
  const backgroundColor = useThemeColor({}, 'secondaryBackground');
  const textColor = useThemeColor({}, 'text');
  const separatorColor = useThemeColor({ light: '#e1e1e1', dark: '#333' }, 'tabIconDefault');
  const chevronColor = useThemeColor({ light: '#8e8e93', dark: '#8e8e93' }, 'tabIconDefault');
  const separator = !isLast ? { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: separatorColor } : {}

  return (
    <Pressable
      style={{ ...styles.sectionItem, backgroundColor, ...separator }}
      onPress={onSelect}
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
      </View>
    </Pressable>
  );
};

export default function List() {
  const { address, status } = useAccount();
  const backgroundColor = useThemeColor({}, 'background');
  const [searchQuery, setSearhQuery] = useState('');


  const { id } = useLocalSearchParams();
  const questionId = parseInt(Array.isArray(id) ? id[0] : id);

  const config = useReadContract({
    abi: MultiVaultAbi,
    functionName: 'getGeneralConfig',
    address: intuitionDeployments['MultiVault'][intuitionTestnet.id]
  })

  const { data: question } = useQuery({
    queryKey: ['question', id],
    queryFn: () => getQuestion(questionId),

  })

  const objectId = question?.epoch_questions_by_pk.object_id;

  const { data, isLoading } = useQuery({
    queryKey: ['list', objectId, address, searchQuery],
    queryFn: () => execute(ListQuery, {
      objectId: objectId,
      subject: searchQuery.length > 0 ? {
        label: {
          _ilike: `%${searchQuery}%`
        }
      } : {},
      term: {},
      limit: 50,
      offset: 0
    }),
    enabled: !!objectId
  });
  const [requestModalVisible, setRequetsModalVisible] = useState(false);

  const { data: writeData, isPending, isSuccess, isError, error, writeContract } =
    useWriteContract();

  const handleSelect = async (termId: Hex) => {
    const minDeposit = config.data?.minDeposit
    if (!address || !minDeposit) {
      return
    }
    try {
      writeContract({
        abi: MultiVaultAbi,
        functionName: 'deposit',
        address: intuitionDeployments['MultiVault'][intuitionTestnet.id],
        args: [address, termId, 2n, 0n],
        chainId: intuitionTestnet.id,
        value: minDeposit
      })
    } catch (e) {
      console.log(e)
    }
  }

  const renderContent = () => {
    if (isSuccess) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Success!</Text>
        </View>
      );
    }
    if (isError) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Error: {error.message}</Text>
        </View>
      );
    }

    if (isPending) {

      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Waiting for transaction...</Text>
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
              onSelect={() => handleSelect(triple.term_id as Hex)}
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
          title: question?.epoch_questions_by_pk?.title || '',
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
