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
    "\nquery Stats {\n  stats {\n    total_accounts\n    total_atoms\n    total_triples\n  }\n}": typeof types.StatsDocument,
};
const documents: Documents = {
    "\nquery Stats {\n  stats {\n    total_accounts\n    total_atoms\n    total_triples\n  }\n}": types.StatsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery Stats {\n  stats {\n    total_accounts\n    total_atoms\n    total_triples\n  }\n}"): typeof import('./graphql').StatsDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
