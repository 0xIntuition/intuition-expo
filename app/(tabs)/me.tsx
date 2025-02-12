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
import { useLogin, usePrivy } from '@privy-io/expo';

export default function Me() {
  const { login } = useLogin();
  const { logout, user } = usePrivy();
  const address = user?.wallet?.address;
  const isConnected = !!address;

  // Function to handle the
  const handleButtonPress = () => {
    if (isConnected) {
      logout();
    }
    login();
  };
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Me</ThemedText>
      <ThemedText>{isConnected ? address : "No Connected"}</ThemedText>
      <Pressable onPress={handleButtonPress} style={styles.pressableMargin}>
        <ThemedText>{isConnected ? "Disconnect" : "Connect"}</ThemedText>
      </Pressable>
      {isConnected && address !== undefined && (
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




