import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { formatDistanceToNow } from 'date-fns';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Atom from '@/components/Atom';
import { getUpvotes } from '@/hooks/useUpvotes';
import SwipeableListItem from './SwipeableListItem';
import { useThemeColor } from '@/hooks/useThemeColor';

// Define an interface for the Atom data structure
interface AtomData {
  id: string;
  emoji?: string;
  label?: string;
  image?: string;
}

interface TripleData {
  id: string;
  subject: AtomData;
  predicate: AtomData;
  object: AtomData;
  creator?: {
    id: string;
    label: string;
    image?: string;
  };
  block_timestamp?: string;
  vault?: {
    total_shares: string;
    position_count: number;
    current_share_price: string;
    positions?: Array<{
      shares: string;
      account: {
        id: string;
        image?: string;
        label?: string;
      }
    }>;
  };
  counter_vault?: {
    total_shares: string;
    position_count: number;
    current_share_price: string;
    positions?: Array<{
      shares: string;
      account: {
        id: string;
        image?: string;
        label?: string;
      }
    }>;
  };
}

type LayoutType = 'list-item' | 'details' | 'compact' | 'swipeable';

interface TripleProps {
  triple: TripleData;
  layout: LayoutType;
  onUpvote?: () => Promise<void>;
  onDownvote?: () => Promise<void>;
  inProgress?: boolean;
}

const Triple: React.FC<TripleProps> = ({ triple, layout, onUpvote, onDownvote, inProgress }) => {
  const textColor = useThemeColor({}, 'text');
  switch (layout) {
    case 'swipeable':
      return <SwipeableListItem
        onLeftSwipe={inProgress ? undefined : onUpvote}
        onRightSwipe={inProgress ? undefined : onDownvote}>
        <Triple triple={triple} layout="list-item" inProgress={inProgress} />
      </SwipeableListItem>;
    case 'list-item':
      return (
        <ThemedView style={styles.listContainer}>
          {triple.creator && (
            <View style={styles.topRow}>
              <Link href={{ pathname: '/acc/[id]', params: { id: triple.creator.id } }}>
                <ThemedText style={styles.secondary}>{triple.creator.label}</ThemedText>
              </Link>
              {triple.block_timestamp && (
                <ThemedText style={styles.date}>
                  {formatDistanceToNow(new Date(parseInt(triple.block_timestamp) * 1000), { addSuffix: true })}
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

          <View style={styles.positionsColumn}>
            {inProgress && (

              <ActivityIndicator size="small" color={textColor} style={{ position: 'absolute', top: 0, right: 0 }} />

            )}
            {triple.vault && (
              <ThemedText numberOfLines={1}>
                ↑{' '}
                {getUpvotes(BigInt(triple.vault.total_shares), BigInt(triple.vault.current_share_price)).toString(10)} ∙ <Ionicons size={13} name='globe' /> {triple.vault.position_count}

                {triple.vault.positions != null && triple.vault.positions.length > 0 && (" ∙ ")}
                {triple.vault.positions != null && triple.vault.positions.length > 0 && (<Ionicons size={13} name='person-outline' style={{ marginLeft: 4 }} />)}
                {triple.vault.positions != null && triple.vault.positions.length > 0 && getUpvotes(BigInt(triple.vault.positions[0].shares), BigInt(triple.vault.current_share_price)).toString(10)}
              </ThemedText>
            )}



            {triple.counter_vault && triple.counter_vault.position_count > 0 && (
              <ThemedText numberOfLines={1} style={styles.counterVault}>
                ↓{' '}
                {getUpvotes(BigInt(triple.counter_vault.total_shares), BigInt(triple.counter_vault.current_share_price)).toString(10)} ∙ <Ionicons size={13} name='globe' /> {triple.counter_vault.position_count}
                {triple.counter_vault.positions != null && triple.counter_vault.positions.length > 0 && (" ∙ ")}
                {triple.counter_vault.positions != null && triple.counter_vault.positions.length > 0 && (<Ionicons size={13} name='person-outline' style={{ marginLeft: 4 }} />)}
                {triple.counter_vault.positions != null && triple.counter_vault.positions.length > 0 && getUpvotes(BigInt(triple.counter_vault.positions[0].shares), BigInt(triple.counter_vault.current_share_price)).toString(10)}
              </ThemedText>
            )}
          </View>

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
    paddingRight: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(100,100,100,0.5)',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 8,
  },
  date: {
    fontSize: 11,
    color: '#888',
  },
  secondary: {
    color: '#888',
    fontSize: 12,
  },
  vaultLink: {
    marginTop: 10,
    flex: 1,
  },
  vaultContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(100,100,100,0.5)',
    borderRadius: 8,
  },
  positionsColumn: {
    flexDirection: 'column',
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