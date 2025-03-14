import { Button, View, Pressable, ScrollView } from 'react-native';
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
const GET_TRIPLE = gql`
query Triple ($id: numeric!, $address: String){
  triple(id: $id) {
    id
    vault_id
    vault {
      total_shares
      position_count
      current_share_price
      positions(order_by: { shares: desc }, limit: 15) {
        shares
        account {
          id
          image
          label
        }
      }
    }
    counter_vault {
      total_shares
      position_count
      current_share_price
      positions(order_by: { shares: desc }, limit: 15) {
        shares
        account {
          id
          image
          label
        }
      }
    }
      subject {
        id
        emoji
        label 
        image
      }
      predicate {
        id
        emoji
        label
        image
      }
      object {
        id
        emoji
        label
        image
      }
  }
  positions(where: { account_id: {_eq: $address}, vault_id: { _eq: $id} }, limit: 1) {
    shares
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
  console.log(data);
  const wait = useWaitForTransactionEvents();
  const generalConfig = useGeneralConfig();
  const [signalInProgress, setSignalInProgress] = useState(false);
  const [errorMesage, setErrorMesage] = useState<string | null>(null);

  if (loading) return <ThemedText>Loading...</ThemedText>;
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
    <ScrollView>
      <ThemedView style={styles.container}>
        <Stack.Screen
          options={{
            title: triple.object.label,
            headerRight: () => <Pressable onPress={async () => {
              await shareAsync('https://app.i7n.xyz/t/' + id);
            }} style={{ marginRight: 10 }}>
              <Ionicons name="share-outline" size={24} color={textColor} />
            </Pressable>,
          }}
        />
        <View style={{ padding: 8 }}>
          <Triple triple={triple} layout="list-item" />
        </View>


        <Section>
          {data && data.positions && data.positions.length > 0 && (
            <ListItem
              label="My upvotes"
              value={`↑ ${(getUpvotes(BigInt(data.positions[0].shares), BigInt(data.triple.vault.current_share_price))).toString(10)}`}
            />
          )}
          <ListItem
            label="Total upvotes"
            subLabel={`Voters: ${triple.vault.position_count}`}
            value={`↑ ${(getUpvotes(BigInt(triple.vault.total_shares), BigInt(triple.vault.current_share_price))).toString(10)}`}
            last
          />
        </Section>

        <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 8 }}>
          {signalInProgress ? (
            <ThemedText>Signal in progress...</ThemedText>
          ) : (
            <>
              {isReady && <Button title="Triple Upvote +↑" onPress={handleTripleDeposit} />}
              {data?.positions && data?.positions.length > 0 && (
                <Button title="Withdraw all" onPress={() => handleWithdraw(BigInt(data?.positions[0]?.shares))} />
              )}
            </>
          )}
        </View>
        {errorMesage && <ThemedText>{errorMesage}</ThemedText>}

        <Section title="Top Upvoters">
          {triple.vault.positions.map((pos: { shares: string; account: { id: string; image?: string; label?: string } }) => {
            const { shares, account } = pos;
            return (
              <ListItem
                key={account.id}
                id={account.id as `0x${string}`}
                image={account.image || ''}
                label={account.label || ''}
                href={{ pathname: '/acc/[id]', params: { id: account.id } }}
                value={`↑ ${(getUpvotes(BigInt(shares), BigInt(triple.vault.current_share_price))).toString(10)}`}
              />
            );
          })}
        </Section>
      </ThemedView>
    </ScrollView>
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
