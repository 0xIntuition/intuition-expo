import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { useColorScheme } from '@/hooks/useColorScheme';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';
import { relayStylePagination } from '@apollo/client/utilities';
import { PrivyProvider, PrivyElements } from '@privy-io/expo';
// Prevent the splash screen from auto-hiding before asset loading is complete.
import { Platform } from 'react-native';
import { base } from 'viem/chains';
if (typeof window !== 'undefined') { window.React = React; }

const isWeb = Platform.OS === 'web';

SplashScreen.preventAutoHideAsync();

if (__DEV__) {
  loadDevMessages();
  loadErrorMessages();
}



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
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  if (!process.env.EXPO_PUBLIC_PRIVY_APP_ID || !process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID) {
    throw new Error('Privy app ID and client ID are not set');
  }
  const App = <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <ApolloProvider client={client}>

      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
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
        <Stack.Screen name="+not-found" />
      </Stack>
    </ApolloProvider>
  </ThemeProvider>;
  if (isWeb) {
    return App;
  }
  return (
    <PrivyProvider
      appId={process.env.EXPO_PUBLIC_PRIVY_APP_ID}
      clientId={process.env.EXPO_PUBLIC_PRIVY_CLIENT_ID}
      supportedChains={[base]}
      config={{
        embedded: {
          ethereum: {
            createOnLogin: 'users-without-wallets', // defaults to 'off'
          },
        },
      }}
    >
      {App}
      <PrivyElements config={{ appearance: { colorScheme: colorScheme === 'dark' ? 'dark' : 'light' } }} />
    </PrivyProvider>

  );
}
