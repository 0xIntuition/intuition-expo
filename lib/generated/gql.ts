/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\nquery GetAccounts($offset: Int) {\n  accounts_aggregate(where: { type: { _eq: Default } }) {\n    aggregate {\n      count\n    }\n  }\n  accounts(\n    order_by: { label: asc }\n    limit: 10\n    offset: $offset\n    where: { type: { _eq: Default } }\n  ) {\n    image\n    label\n    id\n  }\n}": types.GetAccountsDocument,
    "\nquery GetAtoms($offset: Int) {\n  atoms_aggregate {\n    aggregate {\n      count\n    }\n  }\n  atoms(order_by: { block_timestamp: desc }, limit: 10, offset: $offset) {\n    id\n    image\n    emoji\n    label\n    creator {\n      id\n      label\n      image\n    }\n    block_timestamp\n    vault {\n      total_shares\n      current_share_price\n      position_count\n    }\n  }\n}": types.GetAtomsDocument,
    "\nquery GetSignals($offset: Int) {\n  signals_aggregate {\n    aggregate {\n      count\n    }\n  }\n  signals(order_by: { block_timestamp: desc }, limit: 10, offset: $offset) {\n    id\n    account {\n      id\n      label\n      image\n    }\n    delta\n    block_timestamp\n    atom {\n      id\n      emoji\n      label\n    }\n    triple {\n      id\n\n      subject {\n        emoji\n        label\n      }\n      predicate {\n        emoji\n        label\n      }\n      object {\n        emoji\n        label\n      }\n    }\n  }\n}\n": types.GetSignalsDocument,
    "\nquery GetTriples($offset: Int) {\n  triples_aggregate {\n    aggregate {\n      count\n    }\n  }\n  triples(order_by: { block_timestamp: desc }, limit: 10, offset: $offset) {\n    id\n    subject {\n      emoji\n      label\n    }\n    predicate {\n      emoji\n      label\n    }\n    object {\n      emoji\n      label\n    }\n    creator {\n      id\n      label\n      image\n    }\n    block_timestamp\n    vault {\n      total_shares\n      position_count\n    }\n    counter_vault {\n      total_shares\n      position_count\n    }\n  }\n}\n": types.GetTriplesDocument,
    "\nquery GetAtom($id: numeric!, $address: String) {\n  atom(id: $id) {\n    id\n    label\n    image\n    emoji\n    type\n    vault {\n      total_shares\n      position_count\n      current_share_price\n      positions(order_by: { shares: desc }) {\n        shares\n        account {\n          id\n          image\n          label\n        }\n      }\n    }\n    value {\n      thing {\n        description\n        image\n        name\n        url\n      }\n      person {\n        image\n        name\n        url\n        description\n      }\n      organization {\n        image\n        name\n        url\n        description\n      }\n    }\n  }\n\n  positions(where: { account_id: {_eq: $address}, vault_id: { _eq: $id} }, limit: 1) {\n    shares\n  }\n}": types.GetAtomDocument,
    "\nquery Account($id: String!) {\n  account(id: $id) {\n    id\n    label\n    image\n    atom {\n      id\n      as_subject_claims {\n        predicate {\n          label\n        }\n        object {\n          label\n        }\n      }\n    }\n  }\n}": types.AccountDocument,
    "\nquery Triple ($id: numeric!){\n  triple(id: $id) {\n    id\n      subject {\n        emoji\n        label \n      }\n      predicate {\n        emoji\n        label\n      }\n      object {\n        emoji\n        label\n      }\n  }\n}": types.TripleDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetAccounts($offset: Int) {\n  accounts_aggregate(where: { type: { _eq: Default } }) {\n    aggregate {\n      count\n    }\n  }\n  accounts(\n    order_by: { label: asc }\n    limit: 10\n    offset: $offset\n    where: { type: { _eq: Default } }\n  ) {\n    image\n    label\n    id\n  }\n}"): (typeof documents)["\nquery GetAccounts($offset: Int) {\n  accounts_aggregate(where: { type: { _eq: Default } }) {\n    aggregate {\n      count\n    }\n  }\n  accounts(\n    order_by: { label: asc }\n    limit: 10\n    offset: $offset\n    where: { type: { _eq: Default } }\n  ) {\n    image\n    label\n    id\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetAtoms($offset: Int) {\n  atoms_aggregate {\n    aggregate {\n      count\n    }\n  }\n  atoms(order_by: { block_timestamp: desc }, limit: 10, offset: $offset) {\n    id\n    image\n    emoji\n    label\n    creator {\n      id\n      label\n      image\n    }\n    block_timestamp\n    vault {\n      total_shares\n      current_share_price\n      position_count\n    }\n  }\n}"): (typeof documents)["\nquery GetAtoms($offset: Int) {\n  atoms_aggregate {\n    aggregate {\n      count\n    }\n  }\n  atoms(order_by: { block_timestamp: desc }, limit: 10, offset: $offset) {\n    id\n    image\n    emoji\n    label\n    creator {\n      id\n      label\n      image\n    }\n    block_timestamp\n    vault {\n      total_shares\n      current_share_price\n      position_count\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetSignals($offset: Int) {\n  signals_aggregate {\n    aggregate {\n      count\n    }\n  }\n  signals(order_by: { block_timestamp: desc }, limit: 10, offset: $offset) {\n    id\n    account {\n      id\n      label\n      image\n    }\n    delta\n    block_timestamp\n    atom {\n      id\n      emoji\n      label\n    }\n    triple {\n      id\n\n      subject {\n        emoji\n        label\n      }\n      predicate {\n        emoji\n        label\n      }\n      object {\n        emoji\n        label\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery GetSignals($offset: Int) {\n  signals_aggregate {\n    aggregate {\n      count\n    }\n  }\n  signals(order_by: { block_timestamp: desc }, limit: 10, offset: $offset) {\n    id\n    account {\n      id\n      label\n      image\n    }\n    delta\n    block_timestamp\n    atom {\n      id\n      emoji\n      label\n    }\n    triple {\n      id\n\n      subject {\n        emoji\n        label\n      }\n      predicate {\n        emoji\n        label\n      }\n      object {\n        emoji\n        label\n      }\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetTriples($offset: Int) {\n  triples_aggregate {\n    aggregate {\n      count\n    }\n  }\n  triples(order_by: { block_timestamp: desc }, limit: 10, offset: $offset) {\n    id\n    subject {\n      emoji\n      label\n    }\n    predicate {\n      emoji\n      label\n    }\n    object {\n      emoji\n      label\n    }\n    creator {\n      id\n      label\n      image\n    }\n    block_timestamp\n    vault {\n      total_shares\n      position_count\n    }\n    counter_vault {\n      total_shares\n      position_count\n    }\n  }\n}\n"): (typeof documents)["\nquery GetTriples($offset: Int) {\n  triples_aggregate {\n    aggregate {\n      count\n    }\n  }\n  triples(order_by: { block_timestamp: desc }, limit: 10, offset: $offset) {\n    id\n    subject {\n      emoji\n      label\n    }\n    predicate {\n      emoji\n      label\n    }\n    object {\n      emoji\n      label\n    }\n    creator {\n      id\n      label\n      image\n    }\n    block_timestamp\n    vault {\n      total_shares\n      position_count\n    }\n    counter_vault {\n      total_shares\n      position_count\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetAtom($id: numeric!, $address: String) {\n  atom(id: $id) {\n    id\n    label\n    image\n    emoji\n    type\n    vault {\n      total_shares\n      position_count\n      current_share_price\n      positions(order_by: { shares: desc }) {\n        shares\n        account {\n          id\n          image\n          label\n        }\n      }\n    }\n    value {\n      thing {\n        description\n        image\n        name\n        url\n      }\n      person {\n        image\n        name\n        url\n        description\n      }\n      organization {\n        image\n        name\n        url\n        description\n      }\n    }\n  }\n\n  positions(where: { account_id: {_eq: $address}, vault_id: { _eq: $id} }, limit: 1) {\n    shares\n  }\n}"): (typeof documents)["\nquery GetAtom($id: numeric!, $address: String) {\n  atom(id: $id) {\n    id\n    label\n    image\n    emoji\n    type\n    vault {\n      total_shares\n      position_count\n      current_share_price\n      positions(order_by: { shares: desc }) {\n        shares\n        account {\n          id\n          image\n          label\n        }\n      }\n    }\n    value {\n      thing {\n        description\n        image\n        name\n        url\n      }\n      person {\n        image\n        name\n        url\n        description\n      }\n      organization {\n        image\n        name\n        url\n        description\n      }\n    }\n  }\n\n  positions(where: { account_id: {_eq: $address}, vault_id: { _eq: $id} }, limit: 1) {\n    shares\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Account($id: String!) {\n  account(id: $id) {\n    id\n    label\n    image\n    atom {\n      id\n      as_subject_claims {\n        predicate {\n          label\n        }\n        object {\n          label\n        }\n      }\n    }\n  }\n}"): (typeof documents)["\nquery Account($id: String!) {\n  account(id: $id) {\n    id\n    label\n    image\n    atom {\n      id\n      as_subject_claims {\n        predicate {\n          label\n        }\n        object {\n          label\n        }\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery Triple ($id: numeric!){\n  triple(id: $id) {\n    id\n      subject {\n        emoji\n        label \n      }\n      predicate {\n        emoji\n        label\n      }\n      object {\n        emoji\n        label\n      }\n  }\n}"): (typeof documents)["\nquery Triple ($id: numeric!){\n  triple(id: $id) {\n    id\n      subject {\n        emoji\n        label \n      }\n      predicate {\n        emoji\n        label\n      }\n      object {\n        emoji\n        label\n      }\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;