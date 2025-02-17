import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { formatRelative } from 'date-fns';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Atom from '@/components/Atom';

interface TripleData {
  id: string;
  subject: {
    id: string;
    emoji?: string | null;
    label?: string | null;
    image?: string | null;
  };
  predicate: {
    id: string;
    emoji?: string | null;
    label?: string | null;
    image?: string | null;
  };
  object: {
    id: string;
    emoji?: string | null;
    label?: string | null;
    image?: string | null;
  };
  creator: {
    id: string;
    label: string;
    image?: string;
  };
  block_timestamp?: string;
  vault?: {
    total_shares: string;
    position_count: number;
  };
  counter_vault?: {
    total_shares: string;
    position_count: number;
  };
}

type LayoutType = 'list-item' | 'details' | 'compact';

interface TripleProps {
  triple: any;
  layout: LayoutType;
  upvote: bigint;
}

const Triple: React.FC<TripleProps> = ({ triple, layout, upvote }) => {
  switch (layout) {
    case 'list-item':
      return (
        <ThemedView style={styles.listContainer}>
          {triple.creator && (
            <View style={styles.topRow}>
              <Link href={{ pathname: '/acc/[id]', params: { id: triple.creator.id } }}>
                <ThemedText style={styles.secondary}>{triple.creator.label}</ThemedText>
              </Link>
              {triple.block_timestamp !== null && (
                <ThemedText style={styles.date}>
                  {formatRelative(new Date(parseInt(triple.block_timestamp) * 1000), new Date())}
                </ThemedText>
              )}
            </View>
          )}

          <Link style={styles.vaultLink} href={{ pathname: '/t/[id]', params: { id: triple.id } }}>
            <View style={styles.vaultContent}>
              <Atom atom={triple.subject} layout='text-avatar' />
              <Atom atom={triple.predicate} layout='text-avatar' />
              <Atom atom={triple.object} layout='text-avatar' />
            </View>
          </Link>

          {triple.vault && (
            <View style={styles.positionsRow}>
              <ThemedText numberOfLines={1}>
                <Ionicons size={13} name='person' /> {triple.vault.position_count} ∙ ↑{' '}
                {(BigInt(triple.vault.total_shares) / upvote).toString(10)}
              </ThemedText>

              {triple.counter_vault?.position_count !== null && triple.counter_vault.position_count > 0 && (
                <ThemedText numberOfLines={1} style={styles.counterVault}>
                  <Ionicons size={13} name='person' /> {triple.counter_vault.position_count} ∙ ↓{' '}
                  {(BigInt(triple.counter_vault.total_shares) / upvote).toString(10)}
                </ThemedText>
              )}
            </View>
          )}
        </ThemedView>
      );

    case 'details':
      return (
        <ThemedView style={styles.detailsContainer}>
          <View style={styles.vaultContent}>
            <Atom atom={triple.subject} layout='details' />
            <Atom atom={triple.predicate} layout='details' />
            <Atom atom={triple.object} layout='details' />
          </View>
        </ThemedView>
      );

    case 'compact':
      return (
        <ThemedView style={styles.compactContainer}>
          <Link href={{ pathname: '/t/[id]', params: { id: triple.id } }}>
            <View style={styles.compactContent}>
              <Atom atom={triple.subject} layout='text' />
              <Atom atom={triple.predicate} layout='text' />
              <Atom atom={triple.object} layout='text' />
            </View>
          </Link>
        </ThemedView>
      );

    default:
      return null;
  }
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingRight: 36,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(100,100,100,0.5)',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  date: {
    fontSize: 11,
    color: '#888',
  },
  secondary: {
    color: '#888',
  },
  vaultLink: {
    marginTop: 10,
  },
  vaultContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'rgba(100,100,100,0.5)',
    borderRadius: 8,
  },
  positionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 16,
  },
  counterVault: {
    // color: 'red'
  },
  detailsContainer: {
    padding: 16,
  },
  compactContainer: {
    padding: 8,
  },
  compactContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    wordWrap: 'break-word',
    paddingBottom: 16,
  },
});

export default Triple; 