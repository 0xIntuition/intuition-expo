import { PrivyProvider } from '@privy-io/expo';
import React from 'react';

export function Providers({ children }: React.PropsWithChildren) {
  if (!process.env.EXPO_PUBLIC_PRIVY_APP_ID) {
    throw new Error('EXPO_PUBLIC_PRIVY_APP_ID is not set');
  }
  return (
    <PrivyProvider
      appId={process.env.EXPO_PUBLIC_PRIVY_APP_ID}
      clientId={process.env.EXPO_PUBLIC_PRIVY_MOBILE_CLIENT_ID}
      config={{
        embedded: {
          ethereum: {
            createOnLogin: 'users-without-wallets',
          }
        }
        // Customize Privy's appearance in your app
        // appearance: {
        //   theme: 'dark',
        //   accentColor: '#676FFF',
        //   logo: 'https://avatars.githubusercontent.com/u/94311139?s=200&v=4',
        // },
        // Create embedded wallets for users who don't have a wallet
        // embeddedWallets: {
        //   createOnLogin: 'users-without-wallets',
        // },
      }}
    >
      {children}
    </PrivyProvider>
  );
}