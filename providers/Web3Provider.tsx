import React, { useEffect } from 'react';
import { WagmiProvider, useAccount, useChainId, useSwitchChain } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppKit } from "@reown/appkit-wagmi-react-native";
import { wagmiConfig, createWeb3AppKit } from "@/config/web3";
import { intuitionTestnet } from "@0xintuition/protocol";

const queryClient = new QueryClient();

createWeb3AppKit();

interface Web3ProviderProps {
  children: React.ReactNode;
}

function ChainEnforcer() {
  const { status } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  useEffect(() => {
    if (status === 'connected' && chainId && chainId !== intuitionTestnet.id) {
      switchChain({ chainId: intuitionTestnet.id });
    }
  }, [chainId, status, switchChain]);

  return null;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ChainEnforcer />
        {children}
        <AppKit />
      </QueryClientProvider>
    </WagmiProvider>
  );
}