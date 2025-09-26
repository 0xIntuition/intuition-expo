import { graphql } from './graphql'
import { execute } from './graphql/execute'
const GetQuestionsQuery = graphql(`
  query GetQuestions($where: epoch_questions_bool_exp) {
    epoch_questions(where: $where, order_by: { order: asc }) {
      id
      epoch_id
      title
      description
      point_award_amount
      enabled
      order
      link
      predicate_id
      object_id
      created_at
      tag_object_id
      preferences_predicate_id
    }
  }
`)
const GetQuestionQuery = graphql(`
  query GetQuestion($id: Int!) {
    epoch_questions_by_pk(id: $id) {
      id
      epoch_id
      title
      description
      point_award_amount
      enabled
      order
      link
      predicate_id
      object_id
      created_at
      tag_object_id
      preferences_predicate_id
    }
  }
`)

export async function getQuestions(epochs: number[]) {
  return execute(GetQuestionsQuery, {
    where: {
      epoch: { id: { _in: epochs } }
    }
  });
}

export async function getQuestion(id: number) {
  return execute(GetQuestionQuery, { id });
}
