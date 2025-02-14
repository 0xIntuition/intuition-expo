import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { gql } from '@/lib/generated';
import { useGeneralConfig } from '@/hooks/useGeneralConfig';

export const getAccountInfoQuery = gql(/* GraphQL */ `
query GetAccountInfo($address: String!) {
  account(id: $address) {
    image
    label
    id
    positions(where: { account_id: { _eq: $address } }) {
      id
      shares
      vault {
        id
        position_count
        total_shares
        current_share_price
        atom {
          id
          label
          image
        }
        triple {
          id
          subject {
            id
            image
            label
          }
          predicate {
            id
            image
            label
          }
          object {
            id
            image
            label
          }
        }
      }
    }
  }
}
`);

export async function getAccountInfo(client: ApolloClient<object>) {
  const generalConfig = useGeneralConfig();
  const upvote = BigInt(generalConfig.minDeposit);
  return async function (account_id: string) {
    try {
      const { data } = await client.query({
        query: getAccountInfoQuery,
        variables: {
          address: account_id.toLowerCase()
        }
      });

      if (!data.account) {
        return "Account not found";
      }
      const result = {
        account_id: data.account.id,
        label: data.account.label,
        upvotes: data.account.positions?.map((position) => {
          return {
            vault: {
              tripleId: position.vault?.triple?.id,
              atomId: position.vault?.atom?.id,
            },
            label: position.vault?.atom?.label || `${position.vault?.triple?.subject.label} ${position.vault?.triple?.predicate.label} ${position.vault?.triple?.object.label}`,
            upvotes: (BigInt(position.shares) / upvote + BigInt(1)).toString(10),
          }
        }),
      };
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      return "Account not found";
    }
  }
}