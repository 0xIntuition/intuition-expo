import { Multivault } from '@/lib/protocol';
import { Address, createPublicClient, createWalletClient, custom, http } from 'viem';
import { base } from 'viem/chains';
import { usePrivy, useWallets } from '@privy-io/react-auth';
export function useMultiVault() {
  const { user } = usePrivy();
  if (!user) {
    return null;
  }

  const address = user.wallet?.address;
  if (!address) {
    return null;
  }
  const { wallets } = useWallets();
  const wallet = wallets[0]; // Replace this with your desired wallet
  // const provider = await wallet.getEthereumProvider();

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
        return null
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
