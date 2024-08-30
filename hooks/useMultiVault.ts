import { Multivault } from '@/lib/protocol';
import { useWalletConnectModal } from '@walletconnect/modal-react-native';
import { Address, createPublicClient, createWalletClient, custom, http } from 'viem';
import { base } from 'viem/chains';

export function useMultiVault() {
  const { isConnected, address, provider } = useWalletConnectModal();
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
        return await provider?.request({ method, params });
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
