import { Button, View, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native';
import { Image, StyleSheet, ScrollView } from 'react-native';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@apollo/client';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { shareAsync } from 'expo-sharing';
import { useState } from 'react';
import { Address, formatEther, parseEther } from 'viem';
import { getMultiVault, useWaitForTransactionEvents } from '@/hooks/useMultiVault';
import { Section } from '@/components/section';
import { ListItem } from '@/components/list-item';
import { gql } from '@/lib/generated';
import { useGeneralConfig } from '@/hooks/useGeneralConfig';
import { getUpvotes } from '@/hooks/useUpvotes';
import { usePrivy, useLogin, useEmbeddedEthereumWallet, useFundWallet, usePrivyClient } from '@privy-io/expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeColor } from '@/hooks/useThemeColor';
import Markdown from 'react-native-markdown-display';
import { styles as markdownStyles } from '@/lib/chat-styles';
const GetAtomQuery = gql(`
query GetAtom($id: numeric!, $address: String) {
  atom(id: $id) {
    id
    label
    image
    type
    tags: as_subject_triples(
        where: {
          predicate: { type: { _eq: "Keywords" } }
          vault: { position_count: { _gt: 0 } }
        }
      ) {
        id
        predicate {
          label
          type
        }
        object {
          id
          label
        }
      }
    vault {
      total_shares
      position_count
      current_share_price
      positions(order_by: { shares: desc }, limit: 5) {
        shares
        account {
          id
          image
          label
        }
      }
    }
    value {
      thing {
        description
        image
        name
        url
      }
      person {
        image
        name
        url
        description
      }
      organization {
        image
        name
        url
        description
      }
    }
  }

  positions(where: { account_id: {_eq: $address}, vault_id: { _eq: $id} }, limit: 1) {
    shares
  }
}`);

export default function Atom() {
  const textColor = useThemeColor({}, 'text');
  const secondaryTextColor = useThemeColor({}, 'textSecondary');
  const backgroundColor = useThemeColor({}, 'background');
  const backgroundSecondaryColor = useThemeColor({}, 'backgroundSecondary');
  const wait = useWaitForTransactionEvents();
  const { isReady } = usePrivy();
  const { wallets } = useEmbeddedEthereumWallet();
  const { id } = useLocalSearchParams();
  const { address } = { address: wallets[0]?.address.toLowerCase() || '0x0000000000000000000000000000000000000000' }; //useWalletConnectModal();
  const { loading, error, data, refetch } = useQuery(GetAtomQuery, {
    fetchPolicy: 'network-only',
    variables: { id: Number(id), address: (address !== undefined ? address : '') }
  });
  const [signalInProgress, setSignalInProgress] = useState(false);
  const [errorMesage, setErrorMesage] = useState<string | null>(null);
  const generalConfig = useGeneralConfig();

  if (loading) return <ActivityIndicator size="large" color={textColor} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  if (error) return <ThemedText>{error.message}</ThemedText>;

  if (!loading && !data?.atom) {
    return <ThemedText>Atom not found</ThemedText>;
  }

  const handleDeposit = async () => {

    if (!isReady || !wallets[0]) {
      setErrorMesage('Connect wallet first');
      return;
    }

    if (!data?.atom) {
      setErrorMesage('Atom not found');
      return;
    }

    const result = getMultiVault({
      address: wallets[0].address as Address,
      // @ts-ignore
      provider: await wallets[0].getProvider()
    });

    setSignalInProgress(true);
    try {
      const res = await result?.multivault?.depositAtom(BigInt(data.atom.id), BigInt(generalConfig.minDeposit));
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

    if (!data?.atom) {
      setErrorMesage('Atom not found');
      return;
    }

    if (shares <= 0n) {
      setErrorMesage('Shares must be greater than 0');
      return;
    }

    const result = getMultiVault({
      address: wallets[0].address as Address,
      // @ts-ignore
      provider: await wallets[0].getProvider()
    });
    setSignalInProgress(true);
    try {
      const res = await result?.multivault?.redeemAtom(BigInt(data.atom.id), shares);
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

  const description = data?.atom?.value?.thing?.description || data?.atom?.value?.person?.description || data?.atom?.value?.organization?.description || '';
  const url = data?.atom?.value?.thing?.url || data?.atom?.value?.person?.url || data?.atom?.value?.organization?.url || '';

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <Stack.Screen
          options={{
            headerTitle: () => <View style={styles.header} >
              {data?.atom?.image !== null && <Image style={styles.image} source={{ uri: data?.atom?.image }} />}
              <ThemedText>{data?.atom?.label}</ThemedText>
            </View>,
            headerRight: () => <Pressable onPress={async () => {
              await shareAsync('https://app.i7n.xyz/a/' + id);
            }} style={{ marginRight: 10 }}>
              <Ionicons name="share-outline" size={24} color={textColor} />
            </Pressable>,
          }}
        />
        <ThemedView style={{ padding: 8 }}>
          <Markdown
            style={markdownStyles}
            rules={{
              link: (node, children, parent, styles) => {
                return (
                  <Link
                    key={node.key}
                    href={node.attributes.href}
                    style={[styles.link, { color: textColor }]}
                  >
                    {children}
                  </Link>
                );
              }
            }}
          >{description + (url ? '\n\n' + '[' + url + '](' + url + ')' : '')}

          </Markdown>
        </ThemedView>

        <ThemedView style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10, padding: 8 }}>
          {data?.atom?.tags.map((claim: any) => (
            <Link href={`/t/${claim.id}`} key={claim.id}>
              <ThemedView style={[styles.keywordContainer, { backgroundColor: backgroundSecondaryColor, marginRight: 4 }]}>
                <ThemedText key={claim.id} style={styles.keyword}>{claim.object.label}</ThemedText>
              </ThemedView>
            </Link>
          ))}

        </ThemedView>

        <Section >

          {data && data.positions && data.positions.length > 0 && (
            <ListItem
              label="My upvotes"
              value={`↑ ${(getUpvotes(BigInt(data?.positions[0]?.shares), BigInt(data?.atom?.vault?.current_share_price))).toString(10)}`}
            />
          )}
          <ListItem
            label="Total upvotes"
            subLabel={`Voters: ${data?.atom?.vault?.position_count}`}
            value={`↑ ${(getUpvotes(BigInt(data?.atom?.vault?.total_shares), BigInt(data?.atom?.vault?.current_share_price))).toString(10)}`}
            last
          />

        </Section>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 8, paddingLeft: 8 }}>
          {signalInProgress && <ThemedText>Signal in progress...</ThemedText>}
          {!signalInProgress && isReady && <Button title="Upvote +↑" onPress={handleDeposit} />}
          {!signalInProgress && data?.positions && data?.positions.length > 0 && <Button title="Withdraw all" onPress={() => handleWithdraw(BigInt(data?.positions[0]?.shares))} />}

        </View>

        <ThemedText>{errorMesage}</ThemedText>
        {errorMesage && <Link href={{ pathname: '/(tabs)/me' }}><ThemedText>Go to me</ThemedText></Link>}


      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
});
