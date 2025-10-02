import React, { useEffect } from 'react';
import { Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native';
import { Text, View, useThemeColor } from '@/components/Themed';
import { useQuery } from '@tanstack/react-query';
import { getQuestions } from '@/lib/quests/questions';
import { Link, useLocalSearchParams, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { graphql } from '@/lib/graphql';
import { useAccount } from 'wagmi';
import { execute } from '@/lib/graphql/execute';

const QuestionsPositions = graphql(`
query GetQuestionsPositions($address: String!, $predicateId: String!, $object: String_comparison_exp!) {
  positions(
    where: {
      account_id: { _eq: $address }
      term: {
        triple: {
          predicate_id: { _eq: $predicateId }
          object_id: $object
        }
      }
    }
  ) {
    term {
      triple {
        object_id
      }
    }
  }
}
`)
interface SectionItemProps {
  item: {
    id: number;
    title?: string | null;
  };
  href: string;
  isLast: boolean;
  hasPositions: boolean;
}

const SectionItem: React.FC<SectionItemProps> = ({ item, href, isLast, hasPositions }) => {
  const backgroundColor = useThemeColor({}, 'secondaryBackground');
  const textColor = useThemeColor({}, 'text');
  const separatorColor = useThemeColor({ light: '#e1e1e1', dark: '#333' }, 'tabIconDefault');
  const chevronColor = useThemeColor({ light: '#8e8e93', dark: '#8e8e93' }, 'tabIconDefault');
  const separator = !isLast ? { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: separatorColor } : {}

  return (
    <Link href={href as any} asChild>
      <Pressable
        style={{ ...styles.sectionItem, backgroundColor, ...separator }}
      >
        <View style={styles.sectionItemContent}>
          <Text style={[styles.sectionItemText, { color: textColor }]}>
            {item.title || 'Untitled'}
          </Text>
          <Ionicons
            name={hasPositions ? "checkmark-done-circle-sharp" : "radio-button-off"}
            size={20}
            color={hasPositions ? textColor : chevronColor} />
        </View>
      </Pressable>
    </Link>
  );
};

export default function EpochQuest() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { address } = useAccount();
  const backgroundColor = useThemeColor({}, 'background');
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: `` });
  }, []);

  // Parse epoch IDs from route parameter (e.g., "1-6-7-8" -> [1, 6, 7, 8])
  const epochIds = React.useMemo(() => {
    if (!id) return [];
    return id.split('-').map(Number);
  }, [id]);

  const { data, isLoading } = useQuery({
    queryKey: ['getQuestions', epochIds],
    queryFn: () => getQuestions(epochIds),
    enabled: epochIds.length > 0
  }) as any

  const { data: possitionsData } = useQuery({
    enabled: !!address && !!data,
    queryKey: ['questionsPositions', address],
    queryFn: () => execute(QuestionsPositions, {
      address: address!,
      object: { _in: data?.epoch_questions?.map((q: any) => q.object_id) },
      predicateId: '0x49487b1d5bf2734d497d6d9cfcd72cdfbaefb4d4f03ddc310398b24639173c9d'
    })
  });

  // Group questions by epoch_id and sort epochs in descending order
  const groupedQuestions = React.useMemo(() => {
    if (!data?.epoch_questions) return [];

    const groups = data.epoch_questions.reduce((acc: any, question: any) => {
      if (!acc[question.epoch_id]) {
        acc[question.epoch_id] = [];
      }
      acc[question.epoch_id].push(question);
      return acc;
    }, {} as Record<number, typeof data.epoch_questions>);

    return Object.entries(groups)
      .map(([epochId, questions]) => ({
        epochId: parseInt(epochId),
        questions
      }))
      .sort((a, b) => b.epochId - a.epochId);
  }, [data?.epoch_questions]);

  return (
    <>
      <ScrollView
        style={[{ backgroundColor }]}
        contentContainerStyle={styles.contentContainer}
        contentInsetAdjustmentBehavior='automatic'
      >
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}

        {groupedQuestions.map((group: any) => (
          <View key={group.epochId} style={styles.section}>
            <Text style={styles.sectionTitle}>Epoch {group.epochId}</Text>
            <View style={styles.sectionContent}>
              {group?.questions?.map((question: any, index: any) => (
                <SectionItem
                  key={question.id}
                  item={question}
                  href={`/quests/question/${question.id}`}
                  isLast={index === group.questions.length - 1}
                  hasPositions={!!possitionsData?.positions?.find(p => p.term.triple?.object_id === question.object_id) || false}


                />
              ))}
            </View>
          </View>
        ))}
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
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
  },
  sectionItemText: {
    flex: 1,
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 22,
    paddingRight: 8,
  },
});
