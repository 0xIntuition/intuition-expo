import { Button, View, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { useQuery, gql } from '@apollo/client';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { shareAsync } from 'expo-sharing';
import Atom from '@/components/Atom';
import { useState } from 'react';
import React from 'react';
import { usePrivy, useEmbeddedEthereumWallet } from '@privy-io/expo';
import { getMultiVault, useWaitForTransactionEvents } from '@/hooks/useMultiVault';
import { useGeneralConfig } from '@/hooks/useGeneralConfig';
import { Address } from 'viem';
import { Section } from '@/components/section';
import { ListItem } from '@/components/list-item';
import { getUpvotes } from '@/hooks/useUpvotes';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeColor } from '@/hooks/useThemeColor';
import Triple from '@/components/Triple';
import { ListComponent } from '../list/[id]';
const GET_TRIPLE = gql`
query Triple ($id: numeric!, $address: String){
  triple(id: $id) {
    id
    vault_id
    vault {
      id
      total_shares
      position_count
      current_share_price
      positions(where: { account_id: {_eq: $address} }, limit: 1) {
        shares
        account_id
      }
    }
    counter_vault {
      id
      total_shares
      position_count
      current_share_price
      positions(where: { account_id: {_eq: $address} }, limit: 1) {
        shares
        account_id
      }
    }
      subject {
        id
        type
        label 
        image
      }
      predicate {
        id
        type
        label
        image
      }
      object {
        id
        type
        label
        image
      }
  }

}`;

export default function TriplePage() {
  const textColor = useThemeColor({}, 'text');
  const { id } = useLocalSearchParams();
  const { isReady } = usePrivy();
  const { wallets } = useEmbeddedEthereumWallet();
  const { address } = { address: wallets[0]?.address.toLowerCase() || '0x0000000000000000000000000000000000000000' };
  const { loading, error, data, refetch } = useQuery(GET_TRIPLE, {
    fetchPolicy: 'network-only',
    variables: { id: Number(id), address: (address !== undefined ? address : '') }
  });
  const wait = useWaitForTransactionEvents();
  const generalConfig = useGeneralConfig();
  const [signalInProgress, setSignalInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [actionInProgress, setActionInProgress] = useState(false);
  if (loading) return <ActivityIndicator size="large" color={textColor} />;
  if (error) return <ThemedText>{error.message}</ThemedText>;

  if (!data.triple) {
    return <ThemedText>Triple not found</ThemedText>;
  }

  const { triple } = data;

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
      refetch();
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
      refetch();
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
      <ScrollView style={{ padding: 8, height: 170, flexGrow: 0 }}>
        <Triple
          triple={triple}
          layout="swipeable"
          linkToAtoms={true}
          inProgress={actionInProgress || loading}
          onUpvote={async () => {
            try {
              await handleUpvote(triple.id);
            } catch (e) {
              console.error(e);
            }
          }}
          onDownvote={async () => {
            try {
              await handleDownvote(triple.id);
            } catch (e) {
              console.error(e);
            }
          }}
        />
      </ScrollView>
      <ListComponent id={triple.object.id.toString()} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  container: {
    flex: 1,
  },
  vaultContent: {
    padding: 8,
    margin: 8,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(100,100,100,0.5)',
    borderRadius: 8,
  },
});
