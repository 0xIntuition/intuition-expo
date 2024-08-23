import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { defaultDataIdFromObject } from '@apollo/client';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { useColorScheme } from '@/hooks/useColorScheme';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const httpLink = new HttpLink({
  // uri: 'https://smiling-macaw-41.hasura.app/v1/graphql'
  uri: 'http://localhost:8080/v1/graphql'
});
const wsLink = new GraphQLWsLink(createClient({
  url: 'wss://smiling-macaw-41.hasura.app/v1/graphql',
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache({
    dataIdFromObject(responseObject) {
      switch (responseObject.__typename) {
        // TODO: Add more types here
        case 'account': return `account:${responseObject.vid}`;
        default: return defaultDataIdFromObject(responseObject);
      }
    }
  })
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
            name="atom"
            options={{
              presentation: 'modal',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="triple"
            options={{
              presentation: 'modal',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="account"
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
