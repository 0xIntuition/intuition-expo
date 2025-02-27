import { ApolloClient } from '@apollo/client';
import { gql } from '@/lib/generated';
import { getUpvotes } from '@/hooks/useUpvotes';
export const SearchTaggedAtomsQuery = gql(/* GraphQL */ `
query SearchTaggedAtoms($where: atoms_bool_exp) {
  atoms(
    order_by: { vault: { position_count: desc } }
    limit: 100
    where: $where
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
  }
}
`);

export async function searchTaggedAtoms(client: ApolloClient<object>) {
  return async function (atomIds: string[]) {
    try {
      const { data } = await client.query({
        query: SearchTaggedAtomsQuery,
        variables: {
          where: {
            _and: atomIds.map((id) => ({
              as_subject_triples: {
                predicate_id: {
                  _eq: "4"
                },
                object_id: {
                  _eq: id
                }
              }
            }))
          }
        }
      });

      if (!data.atoms) {
        return "No atoms found";
      }
      const result = data.atoms.map((atom) => {
        return {
          atomId: atom.id,
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