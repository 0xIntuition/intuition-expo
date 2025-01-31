import '@walletconnect/react-native-compat';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { useColorScheme } from '@/hooks/useColorScheme';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';
import { relayStylePagination } from '@apollo/client/utilities';
import { WalletConnectModal } from '@walletconnect/modal-react-native';
// Prevent the splash screen from auto-hiding before asset loading is complete.
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

SplashScreen.preventAutoHideAsync();

if (__DEV__) {
  loadDevMessages();
  loadErrorMessages();
}

const projectId = '5e71a895f4587af8d1ac0df79b81f86e';

const providerMetadata = {
  name: 'Intuition',
  description: 'Disruptive Trustformation',
  url: 'https://app.i7n.xyz/',
  icons: ['https://avatars.githubusercontent.com/u/94311139?s=200&v=4'],
  redirect: {
    native: 'i7n://',
  }
};
const sessionParams = {
  namespaces: {
    eip155: {
      methods: ['eth_sendTransaction'],
      chains: ['eip155:8453'],
      events: ['chainChanged', 'accountsChanged'],
      rpcMap: {}
    }
  }
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

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
        {!isWeb &&
          <WalletConnectModal projectId={projectId} providerMetadata={providerMetadata} sessionParams={sessionParams} />
        }

      </ApolloProvider>
    </ThemeProvider>
  );
}
