import React from 'react';
import { View, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
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
  type?: string;
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
  const backgroundSecondary = useThemeColor({}, 'backgroundSecondary');
  const background = useThemeColor({}, 'background');
  switch (layout) {
    case 'swipeable':
      return <SwipeableListItem
        onLeftSwipe={inProgress ? undefined : onUpvote}
        onRightSwipe={inProgress ? undefined : onDownvote}>
        <Triple triple={triple} layout="list-item" inProgress={inProgress} />
      </SwipeableListItem>;
    case 'list-item':
      return (
        <ThemedView style={[styles.listContainer]}>


          <Link style={styles.vaultLink} href={{ pathname: '/t/[id]', params: { id: triple.id } }}>
            <View style={[styles.vaultContent, { backgroundColor: backgroundSecondary }]}>
              <Atom atom={triple.subject} layout='text-avatar' />
              {triple.predicate.type === 'Keywords' && <ThemedView style={[styles.keywordContainer, { backgroundColor: background }]} >
                <ThemedText style={styles.keyword}>{triple.object.label}</ThemedText>
              </ThemedView>}
              {triple.predicate.type !== 'Keywords' && <>
                <Atom atom={triple.predicate} layout='text-avatar' />
                <Atom atom={triple.object} layout='text-avatar' />
              </>}
            </View>
          </Link>

          <View style={styles.positionsColumn}>
            {triple.counter_vault && triple.counter_vault.position_count > 0 && (
              <Pressable onPress={() => { onDownvote?.(); }}>
                <ThemedText numberOfLines={1} style={[styles.secondary, { borderColor: backgroundSecondary }]}>
                  ↓{' '}
                  {getUpvotes(BigInt(triple.counter_vault.total_shares), BigInt(triple.counter_vault.current_share_price)).toString(10)} ∙ <Ionicons size={13} name='globe' /> {triple.counter_vault.position_count}
                  {triple.counter_vault.positions != null && triple.counter_vault.positions.length > 0 && (" ∙ ")}
                  {triple.counter_vault.positions != null && triple.counter_vault.positions.length > 0 && (<Ionicons size={13} name='person-outline' style={{ marginLeft: 4 }} />)}
                  {triple.counter_vault.positions != null && triple.counter_vault.positions.length > 0 && getUpvotes(BigInt(triple.counter_vault.positions[0].shares), BigInt(triple.counter_vault.current_share_price)).toString(10)}
                </ThemedText>
              </Pressable>
            )}


            {triple.vault && (
              <Pressable onPress={() => { onUpvote?.(); }}>
                <ThemedText numberOfLines={1} style={[styles.secondary, { borderColor: backgroundSecondary }]}>
                  ↑{' '}
                  {getUpvotes(BigInt(triple.vault.total_shares), BigInt(triple.vault.current_share_price)).toString(10)} ∙ <Ionicons size={13} name='globe' /> {triple.vault.position_count}

                  {triple.vault.positions != null && triple.vault.positions.length > 0 && (" ∙ ")}
                  {triple.vault.positions != null && triple.vault.positions.length > 0 && (<Ionicons size={13} name='person-outline' style={{ marginLeft: 4 }} />)}
                  {triple.vault.positions != null && triple.vault.positions.length > 0 && getUpvotes(BigInt(triple.vault.positions[0].shares), BigInt(triple.vault.current_share_price)).toString(10)}
                </ThemedText>
              </Pressable>
            )}


            {inProgress && (

              <ActivityIndicator size="small" color={textColor} style={{ position: 'absolute', top: 0, right: 0 }} />

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
    fontSize: 12,
    borderWidth: 1,
    opacity: 0.7,
    borderRadius: 12,
    paddingHorizontal: 6,
    marginRight: 4,
  },
  vaultLink: {
    marginTop: 10,
    flex: 1,
  },
  vaultContent: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
  },
  positionsColumn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 6,
  },
  keywordContainer: {
    marginTop: 4,
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginVertical: 2,
  },
  keyword: {
    fontSize: 12,
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