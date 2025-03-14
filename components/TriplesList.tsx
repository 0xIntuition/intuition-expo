import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { usePrivy, useEmbeddedEthereumWallet } from '@privy-io/expo';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Triple from '@/components/Triple';
import { getMultiVault, useWaitForTransactionEvents } from '@/hooks/useMultiVault';
import { useGeneralConfig } from '@/hooks/useGeneralConfig';
import { TripleItem } from '@/app/(tabs)/explore/triples';

interface TriplesListProps {
  triples: TripleItem[];
  onRefresh?: () => void;
  onRefetch?: () => void;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  loading?: boolean;
}

const TriplesList: React.FC<TriplesListProps> = ({ triples, onRefresh, onRefetch, onEndReached, onEndReachedThreshold, loading }) => {
  const { isReady } = usePrivy();
  const { wallets } = useEmbeddedEthereumWallet();
  const address = wallets[0]?.address.toLowerCase() || '0x0000000000000000000000000000000000000000';
  const wait = useWaitForTransactionEvents();
  const generalConfig = useGeneralConfig();
  const [actionInProgress, setActionInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Redeem shares from a vault
  const handleRedeem = async (vaultId: bigint, shares: bigint) => {
    if (!isReady || !wallets[0]) {
      setErrorMessage('Connect wallet first');
      return false;
    }

    if (shares <= 0n) {
      // No shares to redeem
      return true;
    }

    const multivault = getMultiVault({
      address: wallets[0].address as `0x${string}`,
      // @ts-ignore
      provider: await wallets[0].getProvider()
    })?.multivault;

    if (!multivault) {
      setErrorMessage('Failed to initialize multivault');
      return false;
    }

    try {
      const res = await multivault.redeemTriple(vaultId, shares);
      if (!res) {
        throw new Error('Redeem failed');
      }
      await wait(res.hash);
      return true;
    } catch (error) {
      console.error('Redeem error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error during redemption');
      return false;
    }
  };

  // Handle upvote - deposit to vault, but first redeem any counter_vault shares
  const handleUpvote = async (tripleId: string) => {
    if (!isReady || !wallets[0]) {
      setErrorMessage('Connect wallet first');
      return;
    }

    const result = getMultiVault({
      address: wallets[0].address as `0x${string}`,
      // @ts-ignore
      provider: await wallets[0].getProvider()
    });

    if (!result?.multivault) {
      setErrorMessage('Failed to initialize multivault');
      return;
    }

    setActionInProgress(true);
    try {
      // First, check if user has counter position and redeem if needed
      const triple = triples.find(t => t.id === tripleId);
      const counterPosition = triple?.counter_vault?.positions?.find((pos: any) =>
        pos.account_id === address);

      // If user has position in counter_vault, redeem it first
      if (counterPosition && counterPosition.shares) {
        // Get counter vault ID
        const counterId = await result.multivault.getCounterIdFromTriple(BigInt(tripleId));

        // Redeem all shares from counter vault
        const redeemSuccess = await handleRedeem(counterId, BigInt(counterPosition.shares));
        if (!redeemSuccess) {
          throw new Error('Failed to redeem counter position');
        }
      }

      // Now deposit to the vault
      const res = await result.multivault.depositTriple(BigInt(tripleId), BigInt(generalConfig.minDeposit));
      if (!res) {
        throw new Error('Deposit failed');
      }
      await wait(res.hash);
      if (onRefetch) {
        onRefetch();
      }
      return true;
    } catch (error) {
      console.error(error);
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error');
      return false;
    } finally {
      setActionInProgress(false);
    }
  };

  // Handle downvote - deposit to counter_vault, but first redeem any vault shares
  const handleDownvote = async (tripleId: string) => {
    if (!isReady || !wallets[0]) {
      setErrorMessage('Connect wallet first');
      return;
    }

    const result = getMultiVault({
      address: wallets[0].address as `0x${string}`,
      // @ts-ignore
      provider: await wallets[0].getProvider()
    });

    if (!result?.multivault) {
      setErrorMessage('Failed to initialize multivault');
      return;
    }

    setActionInProgress(true);
    try {
      // First, check if user has normal position and redeem if needed
      const triple = triples.find(t => t.id === tripleId);
      const vaultPosition = triple?.vault?.positions?.find((pos: any) =>
        pos.account_id === address);

      // If user has position in vault, redeem it first
      if (vaultPosition && vaultPosition.shares) {
        const redeemSuccess = await handleRedeem(BigInt(tripleId), BigInt(vaultPosition.shares));
        if (!redeemSuccess) {
          throw new Error('Failed to redeem vault position');
        }
      }

      // Get counter vault ID
      const counterId = await result.multivault.getCounterIdFromTriple(BigInt(tripleId));

      // Deposit to counter vault
      const res = await result.multivault.depositTriple(counterId, BigInt(generalConfig.minDeposit));
      if (!res) {
        throw new Error('Counter deposit failed');
      }
      await wait(res.hash);
      if (onRefetch) {
        onRefetch();
      }
      return true;
    } catch (error) {
      console.error(error);
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error');
      return false;
    } finally {
      setActionInProgress(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      {errorMessage && (
        <ThemedText style={styles.errorText}>{errorMessage}</ThemedText>
      )}

      <FlatList
        data={triples}
        onEndReached={onEndReached}
        onRefresh={onRefresh}
        refreshing={loading}
        onEndReachedThreshold={onEndReachedThreshold}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          // Convert null values to undefined to satisfy type requirements
          const tripleData = {
            ...item,
            subject: {
              ...item.subject,
              emoji: item.subject.emoji || undefined,
              label: item.subject.label || undefined,
              image: item.subject.image || undefined
            },
            predicate: {
              ...item.predicate,
              emoji: item.predicate.emoji || undefined,
              label: item.predicate.label || undefined,
              image: item.predicate.image || undefined
            },
            object: {
              ...item.object,
              emoji: item.object.emoji || undefined,
              label: item.object.label || undefined,
              image: item.object.image || undefined
            },
            creator: item.creator ? {
              ...item.creator,
              image: item.creator.image || undefined
            } : undefined
          };

          return (
            <Triple
              triple={tripleData as any}
              layout="swipeable"
              inProgress={actionInProgress || loading}
              onUpvote={async () => {
                try {
                  await handleUpvote(item.id);
                } catch (e) {
                  console.error(e);
                }
              }}
              onDownvote={async () => {
                try {
                  await handleDownvote(item.id);
                } catch (e) {
                  console.error(e);
                }
              }}
            />
          );
        }}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorText: {
    color: 'red',
    padding: 16,
    textAlign: 'center',
  },
});

export default TriplesList; 