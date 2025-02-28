import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { useColorScheme } from '@/hooks/useColorScheme';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';
import { relayStylePagination } from '@apollo/client/utilities';
import { PrivyProvider, PrivyElements } from '@privy-io/expo';
// Prevent the splash screen from auto-hiding before asset loading is complete.

import { useShareIntentContext } from "expo-share-intent";
const client = new ApolloClient({
  uri: process.env.EXPO_PUBLIC_API_URL,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          comments: relayStylePagination(),
        },
      },
    },
  }),
});
export default function App() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ApolloProvider client={client}>

        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="shareintent" options={{ headerShown: false, presentation: 'modal' }} />
          <Stack.Screen
            name="a"
            options={{
              presentation: 'modal',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="t"
            options={{
              presentation: 'modal',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="acc"
            options={{
              presentation: 'modal',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="list"
            options={{
              presentation: 'modal',
              headerShown: false,
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ApolloProvider>
    </ThemeProvider>
  );
}