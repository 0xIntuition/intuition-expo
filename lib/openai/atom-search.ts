import { ApolloClient } from '@apollo/client';
import { gql } from '@/lib/generated';
import { getUpvotes } from '@/hooks/useUpvotes';
export const SearchAtomsQuery = gql(/* GraphQL */ `
query SearchAtoms($likeStr: String) {
  atoms(
    order_by: { vault: { position_count: desc } }
    limit: 5
    where: {
      _or: [
        { value: { account: { label: { _ilike: $likeStr } } } }
        { value: { thing: { url: { _ilike: $likeStr } } } }
        { value: { thing: { name: { _ilike: $likeStr } } } }
        { value: { thing: { description: { _ilike: $likeStr } } } }
        { value: { person: { url: { _ilike: $likeStr } } } }
        { value: { person: { name: { _ilike: $likeStr } } } }
        { value: { person: { description: { _ilike: $likeStr } } } }
        { value: { organization: { url: { _ilike: $likeStr } } } }
        { value: { organization: { name: { _ilike: $likeStr } } } }
        { value: { organization: { description: { _ilike: $likeStr } } } }
      ]
    }
  ) {
    id
    label
    value {
      account {
        id
        label
      }
      person {
        name
        description
        email
        identifier
      }
      thing {
        url
        name
        description
      }
      organization {
        name
        email
        description
        url
      }
    }
    vault {
      position_count
      current_share_price
      total_shares
    }
    as_subject_triples(
      limit: 15,
      where: {
        _or: [
          { vault: { position_count: { _gt: 0 } } }
          { counter_vault: { position_count: { _gt: 0 } } }
        ]
      }

      order_by: { vault: { position_count: desc } }
    ) {
      id
      object {
        id
        label
        emoji
        image
      }
      predicate {
        emoji
        label
        image
        id
      }
      counter_vault {
        position_count
        current_share_price
        total_shares
      }
      vault {
        position_count
        current_share_price
        total_shares
      }
    }
  }
}
`);

export async function searchAtoms(client: ApolloClient<object>) {
  return async function (likeStr: string) {
    try {
      const { data } = await client.query({
        query: SearchAtomsQuery,
        variables: {
          likeStr: `%${likeStr}%`
        }
      });

      if (!data.atoms) {
        return "No atoms found";
      }
      const result = data.atoms.map((atom) => {
        return {
          id: atom.id,
          label: atom.label,
          value: atom.value,
          upvotes: getUpvotes(BigInt(atom.vault?.total_shares ?? 0), BigInt(atom.vault?.current_share_price ?? 0)).toString(10)
        }
      })

      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      return "No atoms found";
    }
  }
}