/* eslint-disable */
import * as types from './graphql';



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
type Documents = {
    "\nquery GetAtom($term_id: String!) {\n  atom(term_id: $term_id) {\n    label\n    cached_image {\n      url\n      safe\n    }\n  }\n}\n": typeof types.GetAtomDocument,
    "\nquery GlobalSearch(\n  $likeStr: String\n  $accountsLimit: Int\n  $atomsLimit: Int\n  $triplesLimit: Int\n  $collectionsLimit: Int\n) {\n  accounts(\n    limit: $accountsLimit\n    where: {\n      type: { _eq: Default }\n      atom_id: { _is_null: false }\n      _or: [\n        { label: { _ilike: $likeStr } }\n        { atom: { data: { _ilike: $likeStr } } }\n      ]\n    }\n  ) {\n    id\n    label\n  }\n  atoms(\n    limit: $atomsLimit\n    where: {\n      _or: [\n        { data: { _ilike: $likeStr } }\n        { label: { _ilike: $likeStr } }\n        { value: { text_object: { data: { _ilike: $likeStr } } } }\n        { value: { thing: { url: { _ilike: $likeStr } } } }\n        { value: { thing: { name: { _ilike: $likeStr } } } }\n        { value: { thing: { description: { _ilike: $likeStr } } } }\n        { value: { person: { url: { _ilike: $likeStr } } } }\n        { value: { person: { name: { _ilike: $likeStr } } } }\n        { value: { person: { description: { _ilike: $likeStr } } } }\n        { value: { organization: { url: { _ilike: $likeStr } } } }\n        { value: { organization: { name: { _ilike: $likeStr } } } }\n        { value: { organization: { description: { _ilike: $likeStr } } } }\n      ]\n    }\n  ) {\n    term_id\n    label\n  }\n  triples(\n    limit: $triplesLimit\n    where: {\n      _or: [\n        { subject: { label: { _ilike: $likeStr } } }\n        { predicate: { label: { _like: $likeStr } } }\n        { object: { label: { _like: $likeStr } } }\n      ]\n    }\n  ) {\n    term_id\n    object {\n      label\n    }\n    predicate {\n      label\n    }\n    subject {\n      label\n    }\n  }\n  collections: predicate_objects(\n    where: {\n      predicate: { type: { _eq: Keywords } }\n      object: { label: { _ilike: $likeStr } }\n    }\n    order_by: [{ triple_count: desc }]\n    limit: $collectionsLimit\n  ) {\n    object {\n      label\n      term_id\n    }\n  }\n}\n": typeof types.GlobalSearchDocument,
    "\nquery GetTriple($term_id: String!) {\n  triple(term_id: $term_id) {\n    subject {\n      term_id\n      label\n      cached_image {\n        url\n        safe\n      }\n    }\n    predicate {\n      term_id\n      label\n      cached_image {\n        url\n        safe\n      }\n    }\n    object {\n      term_id\n      label\n      cached_image {\n        url\n        safe\n      }\n    }\n  }\n}\n": typeof types.GetTripleDocument,
    "\nquery Stats {\n  stats {\n    total_accounts\n    total_atoms\n    total_triples\n  }\n}": typeof types.StatsDocument,
};
const documents: Documents = {
    "\nquery GetAtom($term_id: String!) {\n  atom(term_id: $term_id) {\n    label\n    cached_image {\n      url\n      safe\n    }\n  }\n}\n": types.GetAtomDocument,
    "\nquery GlobalSearch(\n  $likeStr: String\n  $accountsLimit: Int\n  $atomsLimit: Int\n  $triplesLimit: Int\n  $collectionsLimit: Int\n) {\n  accounts(\n    limit: $accountsLimit\n    where: {\n      type: { _eq: Default }\n      atom_id: { _is_null: false }\n      _or: [\n        { label: { _ilike: $likeStr } }\n        { atom: { data: { _ilike: $likeStr } } }\n      ]\n    }\n  ) {\n    id\n    label\n  }\n  atoms(\n    limit: $atomsLimit\n    where: {\n      _or: [\n        { data: { _ilike: $likeStr } }\n        { label: { _ilike: $likeStr } }\n        { value: { text_object: { data: { _ilike: $likeStr } } } }\n        { value: { thing: { url: { _ilike: $likeStr } } } }\n        { value: { thing: { name: { _ilike: $likeStr } } } }\n        { value: { thing: { description: { _ilike: $likeStr } } } }\n        { value: { person: { url: { _ilike: $likeStr } } } }\n        { value: { person: { name: { _ilike: $likeStr } } } }\n        { value: { person: { description: { _ilike: $likeStr } } } }\n        { value: { organization: { url: { _ilike: $likeStr } } } }\n        { value: { organization: { name: { _ilike: $likeStr } } } }\n        { value: { organization: { description: { _ilike: $likeStr } } } }\n      ]\n    }\n  ) {\n    term_id\n    label\n  }\n  triples(\n    limit: $triplesLimit\n    where: {\n      _or: [\n        { subject: { label: { _ilike: $likeStr } } }\n        { predicate: { label: { _like: $likeStr } } }\n        { object: { label: { _like: $likeStr } } }\n      ]\n    }\n  ) {\n    term_id\n    object {\n      label\n    }\n    predicate {\n      label\n    }\n    subject {\n      label\n    }\n  }\n  collections: predicate_objects(\n    where: {\n      predicate: { type: { _eq: Keywords } }\n      object: { label: { _ilike: $likeStr } }\n    }\n    order_by: [{ triple_count: desc }]\n    limit: $collectionsLimit\n  ) {\n    object {\n      label\n      term_id\n    }\n  }\n}\n": types.GlobalSearchDocument,
    "\nquery GetTriple($term_id: String!) {\n  triple(term_id: $term_id) {\n    subject {\n      term_id\n      label\n      cached_image {\n        url\n        safe\n      }\n    }\n    predicate {\n      term_id\n      label\n      cached_image {\n        url\n        safe\n      }\n    }\n    object {\n      term_id\n      label\n      cached_image {\n        url\n        safe\n      }\n    }\n  }\n}\n": types.GetTripleDocument,
    "\nquery Stats {\n  stats {\n    total_accounts\n    total_atoms\n    total_triples\n  }\n}": types.StatsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetAtom($term_id: String!) {\n  atom(term_id: $term_id) {\n    label\n    cached_image {\n      url\n      safe\n    }\n  }\n}\n"): typeof import('./graphql').GetAtomDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GlobalSearch(\n  $likeStr: String\n  $accountsLimit: Int\n  $atomsLimit: Int\n  $triplesLimit: Int\n  $collectionsLimit: Int\n) {\n  accounts(\n    limit: $accountsLimit\n    where: {\n      type: { _eq: Default }\n      atom_id: { _is_null: false }\n      _or: [\n        { label: { _ilike: $likeStr } }\n        { atom: { data: { _ilike: $likeStr } } }\n      ]\n    }\n  ) {\n    id\n    label\n  }\n  atoms(\n    limit: $atomsLimit\n    where: {\n      _or: [\n        { data: { _ilike: $likeStr } }\n        { label: { _ilike: $likeStr } }\n        { value: { text_object: { data: { _ilike: $likeStr } } } }\n        { value: { thing: { url: { _ilike: $likeStr } } } }\n        { value: { thing: { name: { _ilike: $likeStr } } } }\n        { value: { thing: { description: { _ilike: $likeStr } } } }\n        { value: { person: { url: { _ilike: $likeStr } } } }\n        { value: { person: { name: { _ilike: $likeStr } } } }\n        { value: { person: { description: { _ilike: $likeStr } } } }\n        { value: { organization: { url: { _ilike: $likeStr } } } }\n        { value: { organization: { name: { _ilike: $likeStr } } } }\n        { value: { organization: { description: { _ilike: $likeStr } } } }\n      ]\n    }\n  ) {\n    term_id\n    label\n  }\n  triples(\n    limit: $triplesLimit\n    where: {\n      _or: [\n        { subject: { label: { _ilike: $likeStr } } }\n        { predicate: { label: { _like: $likeStr } } }\n        { object: { label: { _like: $likeStr } } }\n      ]\n    }\n  ) {\n    term_id\n    object {\n      label\n    }\n    predicate {\n      label\n    }\n    subject {\n      label\n    }\n  }\n  collections: predicate_objects(\n    where: {\n      predicate: { type: { _eq: Keywords } }\n      object: { label: { _ilike: $likeStr } }\n    }\n    order_by: [{ triple_count: desc }]\n    limit: $collectionsLimit\n  ) {\n    object {\n      label\n      term_id\n    }\n  }\n}\n"): typeof import('./graphql').GlobalSearchDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery GetTriple($term_id: String!) {\n  triple(term_id: $term_id) {\n    subject {\n      term_id\n      label\n      cached_image {\n        url\n        safe\n      }\n    }\n    predicate {\n      term_id\n      label\n      cached_image {\n        url\n        safe\n      }\n    }\n    object {\n      term_id\n      label\n      cached_image {\n        url\n        safe\n      }\n    }\n  }\n}\n"): typeof import('./graphql').GetTripleDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery Stats {\n  stats {\n    total_accounts\n    total_atoms\n    total_triples\n  }\n}"): typeof import('./graphql').StatsDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
