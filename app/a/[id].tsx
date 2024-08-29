import { Button, View } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { useQuery, gql } from '@apollo/client';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { shareAsync } from 'expo-sharing';
import { useCallback, useMemo, useState } from 'react';
import { useWalletConnectModal } from '@walletconnect/modal-react-native';
import { Address, createPublicClient, createWalletClient, custom, http, parseEther } from 'viem';
import { base } from 'viem/chains';
import { Multivault } from '@/lib/protocol';

const GET_ATOM = gql`
query Atom ($id: BigInt!){
  atom(id: $id) {
    id
    label
    image
    emoji
    type
  }
}`;
export default function Atom() {
  const { id } = useLocalSearchParams();
  const { loading, error, data, refetch } = useQuery(GET_ATOM, { variables: { id } });
  const { open, isConnected, address, provider } = useWalletConnectModal();
  const [errorMesage, setErrorMesage] = useState<string | null>(null);

  if (loading) return <ThemedText>Loading...</ThemedText>;
  if (error) return <ThemedText>{error.message}</ThemedText>;

  if (!data.atom) {
    return <ThemedText>Atom not found</ThemedText>;
  }

  const { atom } = data;

  const handleDeposit = async () => {

    if (!isConnected || !address || !provider) {
      open();
      return;
    }

    const publicClient = createPublicClient({
      chain: base,
      transport: http(),
    })

    const walletClient = createWalletClient({
      chain: base,
      account: address as Address,
      transport: custom({
        async request({ method, params }) {
          return await provider?.request({ method, params });
        },
      }),
    })

    const multivault = new Multivault({
      // @ts-ignore
      publicClient,
      // @ts-ignore
      walletClient,
    });


    multivault?.depositAtom(BigInt(atom.id), parseEther('0.00042'))
      .then(({ shares }) => {
        setErrorMesage(`Bought ${shares} shares`);
      })
      .catch((error) => {
        console.error(error);
        setErrorMesage(error.message);
      });

  };


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
      <ThemedText>{atom.emoji} {atom.type}</ThemedText>
      <Button title="Share" onPress={async () => {
        await shareAsync('https://i7n.app/a/' + id);
      }} />

      <Button title="Deposit" onPress={handleDeposit} />
      <ThemedText>{errorMesage}</ThemedText>

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
});
