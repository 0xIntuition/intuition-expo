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
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  loading?: boolean;
}

const TriplesList: React.FC<TriplesListProps> = ({ triples, onRefresh, onEndReached, onEndReachedThreshold, loading }) => {
  const { isReady } = usePrivy();
  const { wallets } = useEmbeddedEthereumWallet();
  const address = wallets[0]?.address.toLowerCase() || '0x0000000000000000000000000000000000000000';
  const wait = useWaitForTransactionEvents();
  const generalConfig = useGeneralConfig();
  const [actionInProgress, setActionInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleTripleDeposit = async (tripleId: string) => {
    if (!isReady || !wallets[0]) {
      setErrorMessage('Connect wallet first');
      return;
    }

    const result = getMultiVault({
      address: wallets[0].address as `0x${string}`,
      // @ts-ignore
      provider: await wallets[0].getProvider()
    });

    setActionInProgress(true);
    try {
      const res = await result?.multivault?.depositTriple(BigInt(tripleId), BigInt(generalConfig.minDeposit));
      if (!res) {
        throw new Error('Deposit failed');
      }
      await wait(res.hash);
      if (onRefresh) {
        onRefresh();
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

  const handleWithdraw = async (tripleId: string, shares: bigint) => {
    if (!isReady || !wallets[0]) {
      setErrorMessage('Connect wallet first');
      return;
    }

    if (shares <= 0n) {
      setErrorMessage('Shares must be greater than 0');
      return;
    }

    const result = getMultiVault({
      address: wallets[0].address as `0x${string}`,
      // @ts-ignore
      provider: await wallets[0].getProvider()
    });

    setActionInProgress(true);
    try {
      const res = await result?.multivault?.redeemTriple(BigInt(tripleId), shares);
      if (!res) {
        throw new Error('Redeem failed');
      }
      await wait(res.hash);
      if (onRefresh) {
        onRefresh();
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
              inProgress={actionInProgress}
              onUpvote={async () => {
                try {
                  await handleTripleDeposit(item.id);
                } catch (e) {
                  console.error(e);
                }
              }}
              onDownvote={async () => {
                // Check if user has any position (shares) before attempting withdrawal
                const userPosition = item.vault?.positions?.find((pos: any) =>
                  pos.account_id === address);

                if (userPosition && userPosition.shares) {
                  try {
                    await handleWithdraw(item.id, BigInt(userPosition.shares));
                  } catch (e) {
                    console.error(e);
                  }
                } else {
                  setErrorMessage('No position to withdraw');
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