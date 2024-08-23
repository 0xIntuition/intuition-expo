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
import {
  WalletConnectModal,
  useWalletConnectModal,
} from "@walletconnect/modal-react-native";

const projectId = '5e71a895f4587af8d1ac0df79b81f86e';

const providerMetadata = {
  name: 'Intuition',
  description: 'Disruptive Trustformation',
  url: 'https://intuition.systems/',
  icons: ['https://avatars.githubusercontent.com/u/94311139?s=200&v=4'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com'
  }
};

export default function Me() {
  const { open, isConnected, address, provider } = useWalletConnectModal();

  // Function to handle the
  const handleButtonPress = async () => {
    if (isConnected) {
      return provider?.disconnect();
    }
    return open();
  };
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Me</ThemedText>
      <ThemedText>{isConnected ? address : "No Connected"}</ThemedText>
      <Pressable onPress={handleButtonPress} style={styles.pressableMargin}>
        <ThemedText>{isConnected ? "Disconnect" : "Connect"}</ThemedText>
      </Pressable>
      <WalletConnectModal projectId={projectId} providerMetadata={providerMetadata} />

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




