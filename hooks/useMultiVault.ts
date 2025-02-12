import { Multivault } from '@/lib/protocol';
import { Address, createPublicClient, createWalletClient, custom, http } from 'viem';
import { base } from 'viem/chains';

export function useMultiVault() {
  const { isConnected, address, provider } = { isConnected: false, address: undefined, provider: undefined };
  if (!isConnected || !address || !provider) {
    return null;
  }

  const publicClient = createPublicClient({
    chain: base,
    transport: http(),
  })

  const walletClient = createWalletClient({
    chain: base,
    account: address as Address,
    transport: custom({
      async request({ method, params }) {
        // return await provider?.request({ method, params });
      },
    }),
  })

  const multivault = new Multivault({
    // @ts-ignore
    publicClient,
    // @ts-ignore
    walletClient,
  });
  return multivault;
}

export function usePublicMultivault() {
  const publicClient = createPublicClient({
    chain: base,
    transport: http(),
  })
  const multivault = new Multivault({
    // @ts-ignore
    publicClient,
    // @ts-ignore
    walletClient: publicClient,
  });
  return multivault;
}
