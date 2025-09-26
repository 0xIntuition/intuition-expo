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
    "\n  query GetQuestions($where: epoch_questions_bool_exp) {\n    epoch_questions(where: $where, order_by: { order: asc }) {\n      id\n      epoch_id\n      title\n      description\n      point_award_amount\n      enabled\n      order\n      link\n      predicate_id\n      object_id\n      created_at\n      tag_object_id\n      preferences_predicate_id\n    }\n  }\n": typeof types.GetQuestionsDocument,
    "\n  query GetQuestion($id: Int!) {\n    epoch_questions_by_pk(id: $id) {\n      id\n      epoch_id\n      title\n      description\n      point_award_amount\n      enabled\n      order\n      link\n      predicate_id\n      object_id\n      created_at\n      tag_object_id\n      preferences_predicate_id\n    }\n  }\n": typeof types.GetQuestionDocument,
};
const documents: Documents = {
    "\n  query GetQuestions($where: epoch_questions_bool_exp) {\n    epoch_questions(where: $where, order_by: { order: asc }) {\n      id\n      epoch_id\n      title\n      description\n      point_award_amount\n      enabled\n      order\n      link\n      predicate_id\n      object_id\n      created_at\n      tag_object_id\n      preferences_predicate_id\n    }\n  }\n": types.GetQuestionsDocument,
    "\n  query GetQuestion($id: Int!) {\n    epoch_questions_by_pk(id: $id) {\n      id\n      epoch_id\n      title\n      description\n      point_award_amount\n      enabled\n      order\n      link\n      predicate_id\n      object_id\n      created_at\n      tag_object_id\n      preferences_predicate_id\n    }\n  }\n": types.GetQuestionDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetQuestions($where: epoch_questions_bool_exp) {\n    epoch_questions(where: $where, order_by: { order: asc }) {\n      id\n      epoch_id\n      title\n      description\n      point_award_amount\n      enabled\n      order\n      link\n      predicate_id\n      object_id\n      created_at\n      tag_object_id\n      preferences_predicate_id\n    }\n  }\n"): typeof import('./graphql').GetQuestionsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetQuestion($id: Int!) {\n    epoch_questions_by_pk(id: $id) {\n      id\n      epoch_id\n      title\n      description\n      point_award_amount\n      enabled\n      order\n      link\n      predicate_id\n      object_id\n      created_at\n      tag_object_id\n      preferences_predicate_id\n    }\n  }\n"): typeof import('./graphql').GetQuestionDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
