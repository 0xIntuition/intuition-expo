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
  const [errorMesage, setErrorMesage] = useState<string | null>(null);

  if (loading) return <ActivityIndicator size="large" color={textColor} />;
  if (error) return <ThemedText>{error.message}</ThemedText>;

  if (!data.triple) {
    return <ThemedText>Triple not found</ThemedText>;
  }

  const { triple } = data;

  const handleTripleDeposit = async () => {
    if (!isReady || !wallets[0]) {
      setErrorMesage('Connect wallet first');
      return;
    }

    if (!data?.triple) {
      setErrorMesage('Triple not found');
      return;
    }

    const result = getMultiVault({
      address: wallets[0].address as `0x${string}`,
      // @ts-ignore
      provider: await wallets[0].getProvider()
    });

    setSignalInProgress(true);
    try {
      const res = await result?.multivault?.depositTriple(BigInt(triple.id), BigInt(generalConfig.minDeposit));
      if (!res) {
        throw new Error('Deposit failed');
      }
      await wait(res.hash);
      await refetch();
    } catch (error) {
      console.error(error);
      setErrorMesage(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setSignalInProgress(false);
    }
  };

  const handleWithdraw = async (shares: bigint) => {
    if (!isReady || !wallets[0]) {
      setErrorMesage('Connect wallet first');
      return;
    }

    if (!data?.triple) {
      setErrorMesage('Triple not found');
      return;
    }

    if (shares <= 0n) {
      setErrorMesage('Shares must be greater than 0');
      return;
    }

    const result = getMultiVault({
      address: wallets[0].address as `0x${string}`,
      // @ts-ignore
      provider: await wallets[0].getProvider()
    });

    setSignalInProgress(true);
    try {
      const res = await result?.multivault?.redeemTriple(BigInt(data.triple.id), shares);
      if (!res) {
        throw new Error('Redeem failed');
      }
      await wait(res.hash);
      await refetch();
    } catch (error) {
      console.error(error);
      setErrorMesage(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setSignalInProgress(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={{ padding: 8, height: 170 }}>
        <Triple triple={triple} layout="list-item" />
      </View>
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
