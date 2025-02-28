import { ApolloClient } from '@apollo/client';
import { gql } from '@/lib/generated';
import { getUpvotes } from '@/hooks/useUpvotes';
export const SearchListsQuery = gql(/* GraphQL */ `
query SearchLists($str: String) {
  predicate_objects(
    where: {
      predicate_id: { _eq: 4 }
      object:  {
         label:  {
            _ilike: $str
         }
      }
    }
    order_by: [{ triple_count: desc }, { claim_count: desc }]
    limit: 100
  ) {
    claim_count
    triple_count
    object {
      label
      id
    }
  }
}
`);

export async function searchLists(client: ApolloClient<object>) {
  return async function (str?: string) {
    try {
      const { data } = await client.query({
        query: SearchListsQuery,
        variables: {
          str: `%${str ?? ""}%`
        }
      });

      if (!data.predicate_objects) {
        return "No lists found";
      }
      const result = data.predicate_objects.map((predicateObject) => {
        return {
          atomId: predicateObject.object.id,
          label: predicateObject.object.label,
          claims: predicateObject.claim_count,
          items: predicateObject.triple_count,
        }
      })

      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      return "No lists found";
    }
  }
}