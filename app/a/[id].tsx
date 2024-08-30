import { Button, View, TouchableOpacity } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { useQuery, gql } from '@apollo/client';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { shareAsync } from 'expo-sharing';
import { useState } from 'react';
import { formatEther, parseEther } from 'viem';
import { useMultiVault } from '@/hooks/useMultiVault';
import { Section } from '@/components/section';
import { ListItem } from '@/components/list-item';
import { useWalletConnectModal } from '@walletconnect/modal-react-native';

const GET_ATOM = gql`
query Atom($id: BigInt!, $address: String) {
  atom(id: $id) {
    id
    label
    image
    emoji
    type
    vault {
      totalShares
      positionCount
      currentSharePrice
      positions(orderBy: "shares", orderDirection: "desc") {
        items {
          shares
          account {
            id
            image
            label
          }
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
  chainlinkPrices(limit: 1, orderBy: "id", orderDirection: "desc") {
    items {
      usd
    }
  }
  positions(where: { accountId: $address, vaultId: $id }, limit: 1) {
    items {
      shares
    }
  }
}`;
export default function Atom() {
  const { id } = useLocalSearchParams();
  const { address } = useWalletConnectModal();
  const { loading, error, data, refetch } = useQuery(GET_ATOM, {
    fetchPolicy: 'network-only',
    variables: { id, address: address }
  });
  const [signalInProgress, setSignalInProgress] = useState(false);
  const multivault = useMultiVault();
  const [errorMesage, setErrorMesage] = useState<string | null>(null);

  if (loading) return <ThemedText>Loading...</ThemedText>;
  if (error) return <ThemedText>{error.message}</ThemedText>;

  if (!data.atom) {
    return <ThemedText>Atom not found</ThemedText>;
  }
  const { atom } = data;

  const handleDeposit = async () => {

    if (!multivault) {
      setErrorMesage('Connect wallet first');
      return;
    }

    setSignalInProgress(true);

    multivault?.depositAtom(BigInt(atom.id), parseEther('0.00042'))
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

    multivault?.redeemAtom(BigInt(atom.id), parseEther('0.00042'))
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

  const description = atom.value?.thing?.description || atom.value?.person?.description || atom.value?.organization?.description || '';
  const totalStaked = parseFloat(formatEther(atom.vault.totalShares))
    * parseFloat(formatEther(atom.vault.currentSharePrice));
  const usd = data.chainlinkPrices.items[0].usd;

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: () => <View style={styles.header} >
            {atom.image !== null && <Image style={styles.image} source={{ uri: atom.image }} />}
            <ThemedText>{atom.label}</ThemedText>
          </View>,
        }}
      />
      <Section >
        <ListItem
          label={description}
          subLabel={`${atom.type} ∙ ID: ${atom.id}`}
        />
        {data.positions.items.length > 0 && (
          <ListItem
            label="My stake"
            value={`${(
              parseFloat(formatEther(atom.vault.currentSharePrice))
              * parseFloat(formatEther(data.positions.items[0].shares))
              * usd).toFixed(2)} USD`}
          />
        )}
        <ListItem
          label="Total staked"
          subLabel={`Holders: ${atom.vault.positionCount}`}
          value={`${(totalStaked * usd).toFixed(2)} USD`}
          last
        />

      </Section>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 8, paddingLeft: 8 }}>
        {signalInProgress && <ThemedText>Signal in progress...</ThemedText>}
        {!signalInProgress && <Button title="Deposit" onPress={handleDeposit} />}
        {!signalInProgress && data.positions.items.length > 0 && <Button title="Withdraw" onPress={handleWithdraw} />}
        <Button title="Share" onPress={async () => {
          await shareAsync('https://i7n.app/a/' + id);
        }} />
      </View>

      <ThemedText>{errorMesage}</ThemedText>
      {errorMesage && <Link href={{ pathname: '(tabs)/me' }}><ThemedText>Go to me</ThemedText></Link>}
      <Section title="Top Holders">
        {atom.vault.positions.items.map(({ shares, account }: any) => (
          <ListItem
            key={account.id}
            id={account.id}
            image={account.image}
            label={account.label}
            value={`${(
              parseFloat(formatEther(atom.vault.currentSharePrice))
              * parseFloat(formatEther(shares))
              * usd).toFixed(2)} USD`}
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
