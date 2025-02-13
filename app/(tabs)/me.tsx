import { View, StyleSheet, RefreshControl, ActivityIndicator, Image, Pressable } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useQuery, gql } from '@apollo/client';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { formatRelative } from 'date-fns';
import { convertToCurrency } from '@/hooks/useCurrency';
import { usePrivy, useLogin, useEmbeddedEthereumWallet, isNotCreated } from '@privy-io/expo';
export default function Me() {
  const { login } = useLogin();
  const { user, logout, error, isReady } = usePrivy();
  const { wallets } = useEmbeddedEthereumWallet();
  const address = wallets[0]?.address;

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
        <Link
          href={{
            pathname: '/acc/[id]',
            params: { id: address }
          }}>
          <ThemedText>{address}</ThemedText>
        </Link>
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




