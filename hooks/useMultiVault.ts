import { Multivault } from '@/lib/protocol';
import { gql, useApolloClient } from '@apollo/client';
import { Address, createPublicClient, createWalletClient, custom, http, EIP1193Provider } from 'viem';
import { base } from 'viem/chains';

export function getMultiVault({ address, provider }: { address: Address, provider: EIP1193Provider }) {
  if (!address || !provider) {
    return null;
  }

  const publicClient = createPublicClient({
    chain: base,
    transport: http(),
  })

  const walletClient = createWalletClient({
    chain: base,
    account: address as Address,
    transport: custom(provider),
  })

  const multivault = new Multivault({
    // @ts-ignore
    publicClient,
    // @ts-ignore
    walletClient,
  });
  return { multivault, publicClient, walletClient };
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

export const getTransactionEventsQuery = gql(/* GraphQL */ `
  query GetTransactionEvents($hash: String!) {
    events(where: { transaction_hash: { _eq: $hash } }) {
      transaction_hash
    }
  }
`);

export function useWaitForTransactionEvents() {
  const client = useApolloClient();
  return async (hash: string) => {
    const promise = new Promise(async (resolve, reject) => {
      while (true) {
        const { data, error } = await client.query({
          query: getTransactionEventsQuery,
          variables: { hash },
          fetchPolicy: 'network-only',
        });
        if (data?.events.length > 0) {
          return resolve(true);
        }
        if (error) {
          return reject(error);
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    });
    return promise;
  };
}
