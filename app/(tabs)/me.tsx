import { View, StyleSheet, RefreshControl, ActivityIndicator, Image, Pressable } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useQuery, gql } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { usePrivy, useLogin, useEmbeddedEthereumWallet, useFundWallet, usePrivyClient } from '@privy-io/expo';
import { base } from 'viem/chains';
import { getMultiVault } from '@/hooks/useMultiVault';
import { Multivault } from '@/lib/protocol';
import { Address, PublicClient, WalletClient, formatEther } from 'viem';
export default function Me() {
  const [balance, setBalance] = useState(0n);
  const { fundWallet } = useFundWallet();
  const { login } = useLogin();
  const { user, logout, error, isReady } = usePrivy();
  const { wallets } = useEmbeddedEthereumWallet();
  const address = wallets[0]?.address;

  useEffect(() => {
    if (wallets.length > 0 && isReady) {
      wallets[0].getProvider().then((provider) => {
        const result = getMultiVault({
          address: address as Address,
          // @ts-ignore
          provider
        });
        result?.publicClient.getBalance({ address: address as Address }).then(setBalance);
      });
    }
  }, [wallets, isReady]);
  // Function to handle the
  const handleButtonPress = async () => {
    if (user) {
      console.log('logging out');
      logout();
    } else {
      console.log('logging in');
      login({
        loginMethods: ['email'],
        appearance: {
          logo: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
        },
      }).then(() => {
        console.log('logged in');
      }).catch((err) => {
        console.log('error', err);
      });
    }
  };
  return (
    <ThemedView style={styles.container}>
      {error && <ThemedText>{error.message}</ThemedText>}
      {isReady && (
        <ThemedText>{user ? user.id : "No Connected"}</ThemedText>
      )}
      <Pressable onPress={handleButtonPress} style={styles.pressableMargin}>
        <ThemedText>{user ? "Disconnect" : "Connect"}</ThemedText>
      </Pressable>
      {address !== undefined && (
        <ThemedView>
          <Link
            href={{
              pathname: '/acc/[id]',
              params: { id: address }
            }}>
            <ThemedText>{address}</ThemedText>
          </Link>
          <Pressable onPress={() => fundWallet({ address, chain: base, amount: "0.01" })}>
            <ThemedText>Fund</ThemedText>
          </Pressable>
          <ThemedText>{formatEther(balance)}</ThemedText>
        </ThemedView>
      )}

    </ThemedView>
  );
}


const styles = StyleSheet.create({
  pressableMargin: {
    marginTop: 16,
  },
  container: {
    flex: 1,
    paddingLeft: 16,
  },
});




