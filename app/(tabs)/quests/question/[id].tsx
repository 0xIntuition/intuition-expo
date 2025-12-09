import { Stack, useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { Text, View, useThemeColor } from '@/components/Themed';
import { graphql } from '@/lib/graphql';
import { useQuery } from '@tanstack/react-query';
import { execute } from '@/lib/graphql/execute';
import { useState, useEffect } from 'react';
import { blurhash, getCachedImage } from '@/lib/utils';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { getQuestion } from '@/lib/quests/questions';
import { intuitionDeployments, intuitionTestnet, MultiVaultAbi } from '@0xintuition/protocol';
import { Hex } from 'viem';
import { Ionicons } from '@expo/vector-icons';
import { useDebounce } from '@/hooks/useDebounce';

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
        _eq: "0x7ec36d201c842dc787b45cb5bb753bea4cf849be3908fb1b0a7d067c3c3cc1f5"
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
const ListPositions = graphql(`
query GetListPositions($address: String!, $predicateId: String!, $objectId: String!) {
  positions(
    where: {
      account_id: { _eq: $address }
      term: {
        triple: {
          predicate_id: { _eq: $predicateId }
          object_id: { _eq: $objectId }
        }
      }
    }
  ) {
    term {
      triple {
        subject_id
      }
    }
  }
}
`)

interface SectionItemProps {
  item: {
    term_id: string;
    label?: string | null;
    cached_image?: {
      url?: string;
      safe?: boolean;
    } | null;
  };
  isSelected: boolean;
  isLast: boolean;
  onSelect: () => void;
}

const SectionItem: React.FC<SectionItemProps> = ({ item, isLast, isSelected, onSelect }) => {
  const backgroundColor = useThemeColor({}, 'secondaryBackground');
  const textColor = useThemeColor({}, 'text');
  const separatorColor = useThemeColor({ light: '#e1e1e1', dark: '#333' }, 'tabIconDefault');
  const chevronColor = useThemeColor({}, 'text');
  const separator = !isLast ? { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: separatorColor } : {}

  return (
    <Pressable
      style={({ pressed }) => [
        styles.sectionItem,
        { backgroundColor },
        separator,
        pressed && styles.sectionItemPressed,
      ]}
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
        {isSelected && <Ionicons name={"checkmark"} size={20} color={chevronColor} />}

      </View>
    </Pressable>
  );
};

export default function List() {
  const { address } = useAccount();
  const backgroundColor = useThemeColor({}, 'background');
  const [searchQuery, setSearhQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const router = useRouter();



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
  }) as any

  const objectId = question?.epoch_questions_by_pk.object_id;

  const { data: possitionsData } = useQuery({
    enabled: !!address && !!objectId,
    queryKey: ['listPositions', address, objectId],
    queryFn: () => execute(ListPositions, {
      address: address!,
      objectId,
      predicateId: '0x7ec36d201c842dc787b45cb5bb753bea4cf849be3908fb1b0a7d067c3c3cc1f5'
    })
  });

  const { data, isLoading } = useQuery({
    queryKey: ['list', objectId, address, debouncedSearchQuery],
    queryFn: () => execute(ListQuery, {
      objectId: objectId,
      subject: debouncedSearchQuery.length > 0 ? {
        label: {
          _ilike: `%${debouncedSearchQuery}%`
        }
      } : {},
      term: {},
      limit: 50,
      offset: 0
    }),
    enabled: !!objectId
  });

  const { isPending, isSuccess, isError, error, writeContract } =
    useWriteContract();

  useEffect(() => {
    if (isSuccess || isError) {
      setSelectedSubject(null);
    }
  }, [isSuccess, isError]);

  const handleSelect = async (termId: Hex, subjectLabel: string) => {
    const minDeposit = config.data?.minDeposit
    if (!address || !minDeposit) {
      return
    }
    setSelectedSubject(subjectLabel);
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
          <Pressable
            style={({ pressed }) => [
              styles.closeButton,
              pressed && styles.closeButtonPressed,
            ]}
            onPress={() => router.dismiss(1)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </Pressable>
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
          <Text style={styles.loadingText}>
            {selectedSubject && data?.object?.label
              ? `Adding ${selectedSubject} to ${data.object.label} list`
              : ''}
          </Text>
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
              onSelect={() => handleSelect(triple.term_id as Hex, triple.subject.label || 'Untitled')}
              isSelected={!!possitionsData?.positions?.find(p => p.term.triple?.subject_id === triple.subject.term_id) || false}
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
          title: question?.epoch_questions_by_pk?.title || '',
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
        contentInsetAdjustmentBehavior='automatic'
      >
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
  sectionItemPressed: {
    opacity: 0.7,
  },
  closeButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  closeButtonPressed: {
    opacity: 0.7,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
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
