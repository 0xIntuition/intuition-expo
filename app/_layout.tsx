import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';
import { PrivyProvider, PrivyElements } from '@privy-io/expo';
// Prevent the splash screen from auto-hiding before asset loading is complete.
import { Platform } from 'react-native';
import { base } from 'viem/chains';
import { ShareIntentProvider } from "expo-share-intent";
import App from '@/components/App';
if (typeof window !== 'undefined') { window.React = React; }

const isWeb = Platform.OS === 'web';

SplashScreen.preventAutoHideAsync();

if (__DEV__) {
  loadDevMessages();
  loadErrorMessages();
}

export default function RootLayout() {
  const router = useRouter();
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

  if (isWeb) {
    return <App />;
  }
  return (
    <ShareIntentProvider
      options={{
        debug: true,
        resetOnBackground: true,
        onResetShareIntent: () =>
          // used when app going in background and when the reset button is pressed
          router.replace({
            pathname: "/",
          }),
      }}
    >
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
        <App />
        <PrivyElements config={{ appearance: { colorScheme: colorScheme === 'dark' ? 'dark' : 'light' } }} />
      </PrivyProvider>
    </ShareIntentProvider>

  );
}
