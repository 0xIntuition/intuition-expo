import { Button, View, TouchableOpacity } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@apollo/client';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { shareAsync } from 'expo-sharing';
import { useState } from 'react';
import { Address, formatEther, parseEther } from 'viem';
import { useMultiVault } from '@/hooks/useMultiVault';
import { Section } from '@/components/section';
import { ListItem } from '@/components/list-item';
import { gql } from '@/lib/generated';
import { useGeneralConfig } from '@/hooks/useGeneralConfig';

const GetAtomQuery = gql(`
query GetAtom($id: numeric!, $address: String) {
  atom(id: $id) {
    id
    label
    image
    emoji
    type
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
  const { id } = useLocalSearchParams();
  const { address } = { address: '0x0000000000000000000000000000000000000000' }; //useWalletConnectModal();
  const { loading, error, data, refetch } = useQuery(GetAtomQuery, {
    fetchPolicy: 'network-only',
    variables: { id: Number(id), address: (address !== undefined ? address : '') }
  });
  const [signalInProgress, setSignalInProgress] = useState(false);
  const multivault = useMultiVault();
  const [errorMesage, setErrorMesage] = useState<string | null>(null);
  const generalConfig = useGeneralConfig();
  const upvote = BigInt(generalConfig.minDeposit);

  if (loading) return <ThemedText>Loading...</ThemedText>;
  if (error) return <ThemedText>{error.message}</ThemedText>;

  if (!loading && !data?.atom) {
    return <ThemedText>Atom not found</ThemedText>;
  }

  const handleDeposit = async () => {

    if (!multivault) {
      setErrorMesage('Connect wallet first');
      return;
    }

    if (!data?.atom) {
      setErrorMesage('Atom not found');
      return;
    }

    setSignalInProgress(true);

    multivault?.depositAtom(BigInt(data.atom.id), parseEther('0.00042'))
      .then(() => {
        refetch();
      })
      .catch((error) => {
        console.error(error);
        setErrorMesage(error.message);
      }).finally(() => {
        setSignalInProgress(false);
      });
  };

  const handleWithdraw = async () => {

    if (!multivault) {
      setErrorMesage('Connect wallet first');
      return;
    }

    if (!data?.atom) {
      setErrorMesage('Atom not found');
      return;
    }

    multivault?.redeemAtom(BigInt(data.atom.id), parseEther('0.00042'))
      .then(() => {
        refetch();
      })
      .catch((error) => {
        console.error(error);
        setErrorMesage(error.message);
      }).finally(() => {
        setSignalInProgress(false);
      });
  };

  const description = data?.atom?.value?.thing?.description || data?.atom?.value?.person?.description || data?.atom?.value?.organization?.description || '';

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: () => <View style={styles.header} >
            {data?.atom?.image !== null && <Image style={styles.image} source={{ uri: data?.atom?.image }} />}
            <ThemedText>{data?.atom?.label}</ThemedText>
          </View>,
          headerRight: () => <Button title="Share" onPress={async () => {
            await shareAsync('https://app.i7n.xyz/a/' + id);
          }} />,
        }}
      />
      <Section >
        <ListItem
          label={description}
          subLabel={`${data?.atom?.type} ∙ ID: ${data?.atom?.id}`}
        />
        {data && data.positions && data.positions.length > 0 && (
          <ListItem
            label="My upvotes"
            value={`↑ ${(BigInt(data?.positions[0]?.shares) / upvote).toString(10)}`}
          />
        )}
        <ListItem
          label="Total upvotes"
          subLabel={`Voters: ${data?.atom?.vault?.position_count}`}
          value={`↑ ${(BigInt(data?.atom?.vault?.total_shares) / upvote).toString(10)}`}
          last
        />

      </Section>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 8, paddingLeft: 8 }}>
        {signalInProgress && <ThemedText>Signal in progress...</ThemedText>}
        {!signalInProgress && <Button title="Deposit" onPress={handleDeposit} />}
        {!signalInProgress && data?.positions && data?.positions.length > 0 && <Button title="Withdraw" onPress={handleWithdraw} />}

      </View>

      <ThemedText>{errorMesage}</ThemedText>
      {errorMesage && <Link href={{ pathname: '/(tabs)/me' }}><ThemedText>Go to me</ThemedText></Link>}
      <Section title="Top Upvoters">
        {data?.atom?.vault?.positions.map(({ shares, account }) => (
          <ListItem
            key={account?.id || ''}
            id={account?.id as Address}
            image={account?.image || ''}
            label={account?.label || ''}
            href={{ pathname: '/acc/[id]', params: { id: account?.id || '' } }}
            value={`↑ ${(BigInt(shares) / upvote).toString(10)}`}
          />
        ))}
      </Section>

    </ThemedView>
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
});
