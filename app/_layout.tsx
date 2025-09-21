import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import "@walletconnect/react-native-compat";
import { WagmiProvider } from "wagmi";
import { mainnet } from "@wagmi/core/chains";
import { intuitionTestnet } from "@0xintuition/protocol";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createAppKit,
  defaultWagmiConfig,
  AppKit,
} from "@reown/appkit-wagmi-react-native";
import { authConnector } from "@reown/appkit-auth-wagmi-react-native";
import { useColorScheme } from '@/components/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId at https://dashboard.reown.com
const projectId = "9894a080a383df0833d5e82404186fdd";

// 2. Create config
const metadata = {
  name: "Intuiton",
  description: "Bringing human trust to trustless systems",
  url: "https://portal.intuition.systems",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
  redirect: {
    native: "intuition://",
    universal: "portal.intuition.systems",
  },
};
const auth = authConnector({ projectId, metadata });
const chains = [mainnet, intuitionTestnet] as const;

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata, extraConnectors: [auth] });

// 3. Create modal
createAppKit({
  projectId,
  metadata,
  wagmiConfig,
  defaultChain: intuitionTestnet, // Optional
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  features: {
    email: true,
    emailShowWallets: false,
    swaps: true,
    onramp: true,
    socials: ['x', 'apple', 'discord'],
  }
});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          </Stack>
        </ThemeProvider>
        <AppKit />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
