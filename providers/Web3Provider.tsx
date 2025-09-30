import React from 'react';
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppKit } from "@reown/appkit-wagmi-react-native";
import { wagmiConfig, createWeb3AppKit } from "@/config/web3";

const queryClient = new QueryClient();

createWeb3AppKit();

interface Web3ProviderProps {
  children: React.ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
        <AppKit />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
