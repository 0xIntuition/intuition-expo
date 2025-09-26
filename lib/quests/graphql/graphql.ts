/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  bigint: { input: any; output: any; }
  jsonb: { input: any; output: any; }
  numeric: { input: any; output: any; }
  timestamp: { input: any; output: any; }
  timestamptz: { input: any; output: any; }
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bigint']['input']>;
  _gt?: InputMaybe<Scalars['bigint']['input']>;
  _gte?: InputMaybe<Scalars['bigint']['input']>;
  _in?: InputMaybe<Array<Scalars['bigint']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['bigint']['input']>;
  _lte?: InputMaybe<Scalars['bigint']['input']>;
  _neq?: InputMaybe<Scalars['bigint']['input']>;
  _nin?: InputMaybe<Array<Scalars['bigint']['input']>>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "epoch_completions" */
export type Epoch_Completions = {
  __typename?: 'epoch_completions';
  account_id: Scalars['String']['output'];
  completed_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  epoch: Epochs;
  epoch_id: Scalars['Int']['output'];
  /** An object relationship */
  epoch_question: Epoch_Questions;
  id: Scalars['Int']['output'];
  object_id: Scalars['String']['output'];
  points_awarded: Scalars['Int']['output'];
  question_id: Scalars['Int']['output'];
  subject_id: Scalars['String']['output'];
};

/** aggregated selection of "epoch_completions" */
export type Epoch_Completions_Aggregate = {
  __typename?: 'epoch_completions_aggregate';
  aggregate?: Maybe<Epoch_Completions_Aggregate_Fields>;
  nodes: Array<Epoch_Completions>;
};

export type Epoch_Completions_Aggregate_Bool_Exp = {
  count?: InputMaybe<Epoch_Completions_Aggregate_Bool_Exp_Count>;
};

export type Epoch_Completions_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Epoch_Completions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Epoch_Completions_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "epoch_completions" */
export type Epoch_Completions_Aggregate_Fields = {
  __typename?: 'epoch_completions_aggregate_fields';
  avg?: Maybe<Epoch_Completions_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Epoch_Completions_Max_Fields>;
  min?: Maybe<Epoch_Completions_Min_Fields>;
  stddev?: Maybe<Epoch_Completions_Stddev_Fields>;
  stddev_pop?: Maybe<Epoch_Completions_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Epoch_Completions_Stddev_Samp_Fields>;
  sum?: Maybe<Epoch_Completions_Sum_Fields>;
  var_pop?: Maybe<Epoch_Completions_Var_Pop_Fields>;
  var_samp?: Maybe<Epoch_Completions_Var_Samp_Fields>;
  variance?: Maybe<Epoch_Completions_Variance_Fields>;
};


/** aggregate fields of "epoch_completions" */
export type Epoch_Completions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Epoch_Completions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "epoch_completions" */
export type Epoch_Completions_Aggregate_Order_By = {
  avg?: InputMaybe<Epoch_Completions_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Epoch_Completions_Max_Order_By>;
  min?: InputMaybe<Epoch_Completions_Min_Order_By>;
  stddev?: InputMaybe<Epoch_Completions_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Epoch_Completions_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Epoch_Completions_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Epoch_Completions_Sum_Order_By>;
  var_pop?: InputMaybe<Epoch_Completions_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Epoch_Completions_Var_Samp_Order_By>;
  variance?: InputMaybe<Epoch_Completions_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Epoch_Completions_Avg_Fields = {
  __typename?: 'epoch_completions_avg_fields';
  epoch_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  points_awarded?: Maybe<Scalars['Float']['output']>;
  question_id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "epoch_completions" */
export type Epoch_Completions_Avg_Order_By = {
  epoch_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  points_awarded?: InputMaybe<Order_By>;
  question_id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "epoch_completions". All fields are combined with a logical 'AND'. */
export type Epoch_Completions_Bool_Exp = {
  _and?: InputMaybe<Array<Epoch_Completions_Bool_Exp>>;
  _not?: InputMaybe<Epoch_Completions_Bool_Exp>;
  _or?: InputMaybe<Array<Epoch_Completions_Bool_Exp>>;
  account_id?: InputMaybe<String_Comparison_Exp>;
  completed_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  epoch?: InputMaybe<Epochs_Bool_Exp>;
  epoch_id?: InputMaybe<Int_Comparison_Exp>;
  epoch_question?: InputMaybe<Epoch_Questions_Bool_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  object_id?: InputMaybe<String_Comparison_Exp>;
  points_awarded?: InputMaybe<Int_Comparison_Exp>;
  question_id?: InputMaybe<Int_Comparison_Exp>;
  subject_id?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Epoch_Completions_Max_Fields = {
  __typename?: 'epoch_completions_max_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  completed_at?: Maybe<Scalars['timestamptz']['output']>;
  epoch_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  object_id?: Maybe<Scalars['String']['output']>;
  points_awarded?: Maybe<Scalars['Int']['output']>;
  question_id?: Maybe<Scalars['Int']['output']>;
  subject_id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "epoch_completions" */
export type Epoch_Completions_Max_Order_By = {
  account_id?: InputMaybe<Order_By>;
  completed_at?: InputMaybe<Order_By>;
  epoch_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  object_id?: InputMaybe<Order_By>;
  points_awarded?: InputMaybe<Order_By>;
  question_id?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Epoch_Completions_Min_Fields = {
  __typename?: 'epoch_completions_min_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  completed_at?: Maybe<Scalars['timestamptz']['output']>;
  epoch_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  object_id?: Maybe<Scalars['String']['output']>;
  points_awarded?: Maybe<Scalars['Int']['output']>;
  question_id?: Maybe<Scalars['Int']['output']>;
  subject_id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "epoch_completions" */
export type Epoch_Completions_Min_Order_By = {
  account_id?: InputMaybe<Order_By>;
  completed_at?: InputMaybe<Order_By>;
  epoch_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  object_id?: InputMaybe<Order_By>;
  points_awarded?: InputMaybe<Order_By>;
  question_id?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "epoch_completions". */
export type Epoch_Completions_Order_By = {
  account_id?: InputMaybe<Order_By>;
  completed_at?: InputMaybe<Order_By>;
  epoch?: InputMaybe<Epochs_Order_By>;
  epoch_id?: InputMaybe<Order_By>;
  epoch_question?: InputMaybe<Epoch_Questions_Order_By>;
  id?: InputMaybe<Order_By>;
  object_id?: InputMaybe<Order_By>;
  points_awarded?: InputMaybe<Order_By>;
  question_id?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
};

/** select columns of table "epoch_completions" */
export enum Epoch_Completions_Select_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  CompletedAt = 'completed_at',
  /** column name */
  EpochId = 'epoch_id',
  /** column name */
  Id = 'id',
  /** column name */
  ObjectId = 'object_id',
  /** column name */
  PointsAwarded = 'points_awarded',
  /** column name */
  QuestionId = 'question_id',
  /** column name */
  SubjectId = 'subject_id'
}

/** aggregate stddev on columns */
export type Epoch_Completions_Stddev_Fields = {
  __typename?: 'epoch_completions_stddev_fields';
  epoch_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  points_awarded?: Maybe<Scalars['Float']['output']>;
  question_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "epoch_completions" */
export type Epoch_Completions_Stddev_Order_By = {
  epoch_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  points_awarded?: InputMaybe<Order_By>;
  question_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Epoch_Completions_Stddev_Pop_Fields = {
  __typename?: 'epoch_completions_stddev_pop_fields';
  epoch_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  points_awarded?: Maybe<Scalars['Float']['output']>;
  question_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "epoch_completions" */
export type Epoch_Completions_Stddev_Pop_Order_By = {
  epoch_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  points_awarded?: InputMaybe<Order_By>;
  question_id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Epoch_Completions_Stddev_Samp_Fields = {
  __typename?: 'epoch_completions_stddev_samp_fields';
  epoch_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  points_awarded?: Maybe<Scalars['Float']['output']>;
  question_id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "epoch_completions" */
export type Epoch_Completions_Stddev_Samp_Order_By = {
  epoch_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  points_awarded?: InputMaybe<Order_By>;
  question_id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "epoch_completions" */
export type Epoch_Completions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Epoch_Completions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Epoch_Completions_Stream_Cursor_Value_Input = {
  account_id?: InputMaybe<Scalars['String']['input']>;
  completed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  epoch_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  object_id?: InputMaybe<Scalars['String']['input']>;
  points_awarded?: InputMaybe<Scalars['Int']['input']>;
  question_id?: InputMaybe<Scalars['Int']['input']>;
  subject_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Epoch_Completions_Sum_Fields = {
  __typename?: 'epoch_completions_sum_fields';
  epoch_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  points_awarded?: Maybe<Scalars['Int']['output']>;
  question_id?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "epoch_completions" */
export type Epoch_Completions_Sum_Order_By = {
  epoch_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  points_awarded?: InputMaybe<Order_By>;
  question_id?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Epoch_Completions_Var_Pop_Fields = {
  __typename?: 'epoch_completions_var_pop_fields';
  epoch_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  points_awarded?: Maybe<Scalars['Float']['output']>;
  question_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "epoch_completions" */
export type Epoch_Completions_Var_Pop_Order_By = {
  epoch_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  points_awarded?: InputMaybe<Order_By>;
  question_id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Epoch_Completions_Var_Samp_Fields = {
  __typename?: 'epoch_completions_var_samp_fields';
  epoch_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  points_awarded?: Maybe<Scalars['Float']['output']>;
  question_id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "epoch_completions" */
export type Epoch_Completions_Var_Samp_Order_By = {
  epoch_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  points_awarded?: InputMaybe<Order_By>;
  question_id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Epoch_Completions_Variance_Fields = {
  __typename?: 'epoch_completions_variance_fields';
  epoch_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  points_awarded?: Maybe<Scalars['Float']['output']>;
  question_id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "epoch_completions" */
export type Epoch_Completions_Variance_Order_By = {
  epoch_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  points_awarded?: InputMaybe<Order_By>;
  question_id?: InputMaybe<Order_By>;
};

/** columns and relationships of "epoch_points" */
export type Epoch_Points = {
  __typename?: 'epoch_points';
  account_id: Scalars['String']['output'];
  claimr_points?: Maybe<Scalars['bigint']['output']>;
  community?: Maybe<Scalars['bigint']['output']>;
  community_events?: Maybe<Scalars['bigint']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  /** A computed field, executes function "calculate_discord_points" */
  discord_points?: Maybe<Scalars['Int']['output']>;
  discord_roles?: Maybe<Scalars['Int']['output']>;
  galxe_points?: Maybe<Scalars['bigint']['output']>;
  id: Scalars['Int']['output'];
  launchpad_quests_points?: Maybe<Scalars['Int']['output']>;
  layer3_points?: Maybe<Scalars['bigint']['output']>;
  portal_quests?: Maybe<Scalars['Int']['output']>;
  referral?: Maybe<Scalars['Int']['output']>;
  /** A computed field, executes function "calculate_relic_points" */
  relic_points?: Maybe<Scalars['Int']['output']>;
  social?: Maybe<Scalars['Int']['output']>;
  /** A computed field, executes function "epoch_points_total_community" */
  total_community?: Maybe<Scalars['bigint']['output']>;
  /** A computed field, executes function "calculate_total_points" */
  total_points?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregated selection of "epoch_points" */
export type Epoch_Points_Aggregate = {
  __typename?: 'epoch_points_aggregate';
  aggregate?: Maybe<Epoch_Points_Aggregate_Fields>;
  nodes: Array<Epoch_Points>;
};

/** aggregate fields of "epoch_points" */
export type Epoch_Points_Aggregate_Fields = {
  __typename?: 'epoch_points_aggregate_fields';
  avg?: Maybe<Epoch_Points_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Epoch_Points_Max_Fields>;
  min?: Maybe<Epoch_Points_Min_Fields>;
  stddev?: Maybe<Epoch_Points_Stddev_Fields>;
  stddev_pop?: Maybe<Epoch_Points_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Epoch_Points_Stddev_Samp_Fields>;
  sum?: Maybe<Epoch_Points_Sum_Fields>;
  var_pop?: Maybe<Epoch_Points_Var_Pop_Fields>;
  var_samp?: Maybe<Epoch_Points_Var_Samp_Fields>;
  variance?: Maybe<Epoch_Points_Variance_Fields>;
};


/** aggregate fields of "epoch_points" */
export type Epoch_Points_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Epoch_Points_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Epoch_Points_Avg_Fields = {
  __typename?: 'epoch_points_avg_fields';
  claimr_points?: Maybe<Scalars['Float']['output']>;
  community?: Maybe<Scalars['Float']['output']>;
  community_events?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "calculate_discord_points" */
  discord_points?: Maybe<Scalars['Int']['output']>;
  discord_roles?: Maybe<Scalars['Float']['output']>;
  galxe_points?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  launchpad_quests_points?: Maybe<Scalars['Float']['output']>;
  layer3_points?: Maybe<Scalars['Float']['output']>;
  portal_quests?: Maybe<Scalars['Float']['output']>;
  referral?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "calculate_relic_points" */
  relic_points?: Maybe<Scalars['Int']['output']>;
  social?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "epoch_points_total_community" */
  total_community?: Maybe<Scalars['bigint']['output']>;
  /** A computed field, executes function "calculate_total_points" */
  total_points?: Maybe<Scalars['Int']['output']>;
};

/** Boolean expression to filter rows from the table "epoch_points". All fields are combined with a logical 'AND'. */
export type Epoch_Points_Bool_Exp = {
  _and?: InputMaybe<Array<Epoch_Points_Bool_Exp>>;
  _not?: InputMaybe<Epoch_Points_Bool_Exp>;
  _or?: InputMaybe<Array<Epoch_Points_Bool_Exp>>;
  account_id?: InputMaybe<String_Comparison_Exp>;
  claimr_points?: InputMaybe<Bigint_Comparison_Exp>;
  community?: InputMaybe<Bigint_Comparison_Exp>;
  community_events?: InputMaybe<Bigint_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  discord_points?: InputMaybe<Int_Comparison_Exp>;
  discord_roles?: InputMaybe<Int_Comparison_Exp>;
  galxe_points?: InputMaybe<Bigint_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  launchpad_quests_points?: InputMaybe<Int_Comparison_Exp>;
  layer3_points?: InputMaybe<Bigint_Comparison_Exp>;
  portal_quests?: InputMaybe<Int_Comparison_Exp>;
  referral?: InputMaybe<Int_Comparison_Exp>;
  relic_points?: InputMaybe<Int_Comparison_Exp>;
  social?: InputMaybe<Int_Comparison_Exp>;
  total_community?: InputMaybe<Bigint_Comparison_Exp>;
  total_points?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** aggregate max on columns */
export type Epoch_Points_Max_Fields = {
  __typename?: 'epoch_points_max_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  claimr_points?: Maybe<Scalars['bigint']['output']>;
  community?: Maybe<Scalars['bigint']['output']>;
  community_events?: Maybe<Scalars['bigint']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  /** A computed field, executes function "calculate_discord_points" */
  discord_points?: Maybe<Scalars['Int']['output']>;
  discord_roles?: Maybe<Scalars['Int']['output']>;
  galxe_points?: Maybe<Scalars['bigint']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  launchpad_quests_points?: Maybe<Scalars['Int']['output']>;
  layer3_points?: Maybe<Scalars['bigint']['output']>;
  portal_quests?: Maybe<Scalars['Int']['output']>;
  referral?: Maybe<Scalars['Int']['output']>;
  /** A computed field, executes function "calculate_relic_points" */
  relic_points?: Maybe<Scalars['Int']['output']>;
  social?: Maybe<Scalars['Int']['output']>;
  /** A computed field, executes function "epoch_points_total_community" */
  total_community?: Maybe<Scalars['bigint']['output']>;
  /** A computed field, executes function "calculate_total_points" */
  total_points?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Epoch_Points_Min_Fields = {
  __typename?: 'epoch_points_min_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  claimr_points?: Maybe<Scalars['bigint']['output']>;
  community?: Maybe<Scalars['bigint']['output']>;
  community_events?: Maybe<Scalars['bigint']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  /** A computed field, executes function "calculate_discord_points" */
  discord_points?: Maybe<Scalars['Int']['output']>;
  discord_roles?: Maybe<Scalars['Int']['output']>;
  galxe_points?: Maybe<Scalars['bigint']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  launchpad_quests_points?: Maybe<Scalars['Int']['output']>;
  layer3_points?: Maybe<Scalars['bigint']['output']>;
  portal_quests?: Maybe<Scalars['Int']['output']>;
  referral?: Maybe<Scalars['Int']['output']>;
  /** A computed field, executes function "calculate_relic_points" */
  relic_points?: Maybe<Scalars['Int']['output']>;
  social?: Maybe<Scalars['Int']['output']>;
  /** A computed field, executes function "epoch_points_total_community" */
  total_community?: Maybe<Scalars['bigint']['output']>;
  /** A computed field, executes function "calculate_total_points" */
  total_points?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** Ordering options when selecting data from "epoch_points". */
export type Epoch_Points_Order_By = {
  account_id?: InputMaybe<Order_By>;
  claimr_points?: InputMaybe<Order_By>;
  community?: InputMaybe<Order_By>;
  community_events?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  discord_points?: InputMaybe<Order_By>;
  discord_roles?: InputMaybe<Order_By>;
  galxe_points?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  launchpad_quests_points?: InputMaybe<Order_By>;
  layer3_points?: InputMaybe<Order_By>;
  portal_quests?: InputMaybe<Order_By>;
  referral?: InputMaybe<Order_By>;
  relic_points?: InputMaybe<Order_By>;
  social?: InputMaybe<Order_By>;
  total_community?: InputMaybe<Order_By>;
  total_points?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** select columns of table "epoch_points" */
export enum Epoch_Points_Select_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  ClaimrPoints = 'claimr_points',
  /** column name */
  Community = 'community',
  /** column name */
  CommunityEvents = 'community_events',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DiscordRoles = 'discord_roles',
  /** column name */
  GalxePoints = 'galxe_points',
  /** column name */
  Id = 'id',
  /** column name */
  LaunchpadQuestsPoints = 'launchpad_quests_points',
  /** column name */
  Layer3Points = 'layer3_points',
  /** column name */
  PortalQuests = 'portal_quests',
  /** column name */
  Referral = 'referral',
  /** column name */
  Social = 'social',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate stddev on columns */
export type Epoch_Points_Stddev_Fields = {
  __typename?: 'epoch_points_stddev_fields';
  claimr_points?: Maybe<Scalars['Float']['output']>;
  community?: Maybe<Scalars['Float']['output']>;
  community_events?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "calculate_discord_points" */
  discord_points?: Maybe<Scalars['Int']['output']>;
  discord_roles?: Maybe<Scalars['Float']['output']>;
  galxe_points?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  launchpad_quests_points?: Maybe<Scalars['Float']['output']>;
  layer3_points?: Maybe<Scalars['Float']['output']>;
  portal_quests?: Maybe<Scalars['Float']['output']>;
  referral?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "calculate_relic_points" */
  relic_points?: Maybe<Scalars['Int']['output']>;
  social?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "epoch_points_total_community" */
  total_community?: Maybe<Scalars['bigint']['output']>;
  /** A computed field, executes function "calculate_total_points" */
  total_points?: Maybe<Scalars['Int']['output']>;
};

/** aggregate stddev_pop on columns */
export type Epoch_Points_Stddev_Pop_Fields = {
  __typename?: 'epoch_points_stddev_pop_fields';
  claimr_points?: Maybe<Scalars['Float']['output']>;
  community?: Maybe<Scalars['Float']['output']>;
  community_events?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "calculate_discord_points" */
  discord_points?: Maybe<Scalars['Int']['output']>;
  discord_roles?: Maybe<Scalars['Float']['output']>;
  galxe_points?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  launchpad_quests_points?: Maybe<Scalars['Float']['output']>;
  layer3_points?: Maybe<Scalars['Float']['output']>;
  portal_quests?: Maybe<Scalars['Float']['output']>;
  referral?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "calculate_relic_points" */
  relic_points?: Maybe<Scalars['Int']['output']>;
  social?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "epoch_points_total_community" */
  total_community?: Maybe<Scalars['bigint']['output']>;
  /** A computed field, executes function "calculate_total_points" */
  total_points?: Maybe<Scalars['Int']['output']>;
};

/** aggregate stddev_samp on columns */
export type Epoch_Points_Stddev_Samp_Fields = {
  __typename?: 'epoch_points_stddev_samp_fields';
  claimr_points?: Maybe<Scalars['Float']['output']>;
  community?: Maybe<Scalars['Float']['output']>;
  community_events?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "calculate_discord_points" */
  discord_points?: Maybe<Scalars['Int']['output']>;
  discord_roles?: Maybe<Scalars['Float']['output']>;
  galxe_points?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  launchpad_quests_points?: Maybe<Scalars['Float']['output']>;
  layer3_points?: Maybe<Scalars['Float']['output']>;
  portal_quests?: Maybe<Scalars['Float']['output']>;
  referral?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "calculate_relic_points" */
  relic_points?: Maybe<Scalars['Int']['output']>;
  social?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "epoch_points_total_community" */
  total_community?: Maybe<Scalars['bigint']['output']>;
  /** A computed field, executes function "calculate_total_points" */
  total_points?: Maybe<Scalars['Int']['output']>;
};

/** Streaming cursor of the table "epoch_points" */
export type Epoch_Points_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Epoch_Points_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Epoch_Points_Stream_Cursor_Value_Input = {
  account_id?: InputMaybe<Scalars['String']['input']>;
  claimr_points?: InputMaybe<Scalars['bigint']['input']>;
  community?: InputMaybe<Scalars['bigint']['input']>;
  community_events?: InputMaybe<Scalars['bigint']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  discord_roles?: InputMaybe<Scalars['Int']['input']>;
  galxe_points?: InputMaybe<Scalars['bigint']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  launchpad_quests_points?: InputMaybe<Scalars['Int']['input']>;
  layer3_points?: InputMaybe<Scalars['bigint']['input']>;
  portal_quests?: InputMaybe<Scalars['Int']['input']>;
  referral?: InputMaybe<Scalars['Int']['input']>;
  social?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Epoch_Points_Sum_Fields = {
  __typename?: 'epoch_points_sum_fields';
  claimr_points?: Maybe<Scalars['bigint']['output']>;
  community?: Maybe<Scalars['bigint']['output']>;
  community_events?: Maybe<Scalars['bigint']['output']>;
  /** A computed field, executes function "calculate_discord_points" */
  discord_points?: Maybe<Scalars['Int']['output']>;
  discord_roles?: Maybe<Scalars['Int']['output']>;
  galxe_points?: Maybe<Scalars['bigint']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  launchpad_quests_points?: Maybe<Scalars['Int']['output']>;
  layer3_points?: Maybe<Scalars['bigint']['output']>;
  portal_quests?: Maybe<Scalars['Int']['output']>;
  referral?: Maybe<Scalars['Int']['output']>;
  /** A computed field, executes function "calculate_relic_points" */
  relic_points?: Maybe<Scalars['Int']['output']>;
  social?: Maybe<Scalars['Int']['output']>;
  /** A computed field, executes function "epoch_points_total_community" */
  total_community?: Maybe<Scalars['bigint']['output']>;
  /** A computed field, executes function "calculate_total_points" */
  total_points?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Epoch_Points_Var_Pop_Fields = {
  __typename?: 'epoch_points_var_pop_fields';
  claimr_points?: Maybe<Scalars['Float']['output']>;
  community?: Maybe<Scalars['Float']['output']>;
  community_events?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "calculate_discord_points" */
  discord_points?: Maybe<Scalars['Int']['output']>;
  discord_roles?: Maybe<Scalars['Float']['output']>;
  galxe_points?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  launchpad_quests_points?: Maybe<Scalars['Float']['output']>;
  layer3_points?: Maybe<Scalars['Float']['output']>;
  portal_quests?: Maybe<Scalars['Float']['output']>;
  referral?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "calculate_relic_points" */
  relic_points?: Maybe<Scalars['Int']['output']>;
  social?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "epoch_points_total_community" */
  total_community?: Maybe<Scalars['bigint']['output']>;
  /** A computed field, executes function "calculate_total_points" */
  total_points?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_samp on columns */
export type Epoch_Points_Var_Samp_Fields = {
  __typename?: 'epoch_points_var_samp_fields';
  claimr_points?: Maybe<Scalars['Float']['output']>;
  community?: Maybe<Scalars['Float']['output']>;
  community_events?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "calculate_discord_points" */
  discord_points?: Maybe<Scalars['Int']['output']>;
  discord_roles?: Maybe<Scalars['Float']['output']>;
  galxe_points?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  launchpad_quests_points?: Maybe<Scalars['Float']['output']>;
  layer3_points?: Maybe<Scalars['Float']['output']>;
  portal_quests?: Maybe<Scalars['Float']['output']>;
  referral?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "calculate_relic_points" */
  relic_points?: Maybe<Scalars['Int']['output']>;
  social?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "epoch_points_total_community" */
  total_community?: Maybe<Scalars['bigint']['output']>;
  /** A computed field, executes function "calculate_total_points" */
  total_points?: Maybe<Scalars['Int']['output']>;
};

/** aggregate variance on columns */
export type Epoch_Points_Variance_Fields = {
  __typename?: 'epoch_points_variance_fields';
  claimr_points?: Maybe<Scalars['Float']['output']>;
  community?: Maybe<Scalars['Float']['output']>;
  community_events?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "calculate_discord_points" */
  discord_points?: Maybe<Scalars['Int']['output']>;
  discord_roles?: Maybe<Scalars['Float']['output']>;
  galxe_points?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  launchpad_quests_points?: Maybe<Scalars['Float']['output']>;
  layer3_points?: Maybe<Scalars['Float']['output']>;
  portal_quests?: Maybe<Scalars['Float']['output']>;
  referral?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "calculate_relic_points" */
  relic_points?: Maybe<Scalars['Int']['output']>;
  social?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "epoch_points_total_community" */
  total_community?: Maybe<Scalars['bigint']['output']>;
  /** A computed field, executes function "calculate_total_points" */
  total_points?: Maybe<Scalars['Int']['output']>;
};

/** columns and relationships of "epoch_questions" */
export type Epoch_Questions = {
  __typename?: 'epoch_questions';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  enabled?: Maybe<Scalars['Boolean']['output']>;
  /** An object relationship */
  epoch?: Maybe<Epochs>;
  /** An array relationship */
  epoch_completions: Array<Epoch_Completions>;
  /** An aggregate relationship */
  epoch_completions_aggregate: Epoch_Completions_Aggregate;
  epoch_id?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  link?: Maybe<Scalars['String']['output']>;
  object_id?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  point_award_amount: Scalars['Int']['output'];
  predicate_id?: Maybe<Scalars['String']['output']>;
  preferences_predicate_id?: Maybe<Scalars['String']['output']>;
  tag_object_id?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};


/** columns and relationships of "epoch_questions" */
export type Epoch_QuestionsEpoch_CompletionsArgs = {
  distinct_on?: InputMaybe<Array<Epoch_Completions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Epoch_Completions_Order_By>>;
  where?: InputMaybe<Epoch_Completions_Bool_Exp>;
};


/** columns and relationships of "epoch_questions" */
export type Epoch_QuestionsEpoch_Completions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Epoch_Completions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Epoch_Completions_Order_By>>;
  where?: InputMaybe<Epoch_Completions_Bool_Exp>;
};

/** aggregated selection of "epoch_questions" */
export type Epoch_Questions_Aggregate = {
  __typename?: 'epoch_questions_aggregate';
  aggregate?: Maybe<Epoch_Questions_Aggregate_Fields>;
  nodes: Array<Epoch_Questions>;
};

export type Epoch_Questions_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Epoch_Questions_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Epoch_Questions_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Epoch_Questions_Aggregate_Bool_Exp_Count>;
};

export type Epoch_Questions_Aggregate_Bool_Exp_Bool_And = {
  arguments: Epoch_Questions_Select_Column_Epoch_Questions_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Epoch_Questions_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Epoch_Questions_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Epoch_Questions_Select_Column_Epoch_Questions_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Epoch_Questions_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Epoch_Questions_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Epoch_Questions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Epoch_Questions_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "epoch_questions" */
export type Epoch_Questions_Aggregate_Fields = {
  __typename?: 'epoch_questions_aggregate_fields';
  avg?: Maybe<Epoch_Questions_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Epoch_Questions_Max_Fields>;
  min?: Maybe<Epoch_Questions_Min_Fields>;
  stddev?: Maybe<Epoch_Questions_Stddev_Fields>;
  stddev_pop?: Maybe<Epoch_Questions_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Epoch_Questions_Stddev_Samp_Fields>;
  sum?: Maybe<Epoch_Questions_Sum_Fields>;
  var_pop?: Maybe<Epoch_Questions_Var_Pop_Fields>;
  var_samp?: Maybe<Epoch_Questions_Var_Samp_Fields>;
  variance?: Maybe<Epoch_Questions_Variance_Fields>;
};


/** aggregate fields of "epoch_questions" */
export type Epoch_Questions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Epoch_Questions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "epoch_questions" */
export type Epoch_Questions_Aggregate_Order_By = {
  avg?: InputMaybe<Epoch_Questions_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Epoch_Questions_Max_Order_By>;
  min?: InputMaybe<Epoch_Questions_Min_Order_By>;
  stddev?: InputMaybe<Epoch_Questions_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Epoch_Questions_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Epoch_Questions_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Epoch_Questions_Sum_Order_By>;
  var_pop?: InputMaybe<Epoch_Questions_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Epoch_Questions_Var_Samp_Order_By>;
  variance?: InputMaybe<Epoch_Questions_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Epoch_Questions_Avg_Fields = {
  __typename?: 'epoch_questions_avg_fields';
  epoch_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  order?: Maybe<Scalars['Float']['output']>;
  point_award_amount?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "epoch_questions" */
export type Epoch_Questions_Avg_Order_By = {
  epoch_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  point_award_amount?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "epoch_questions". All fields are combined with a logical 'AND'. */
export type Epoch_Questions_Bool_Exp = {
  _and?: InputMaybe<Array<Epoch_Questions_Bool_Exp>>;
  _not?: InputMaybe<Epoch_Questions_Bool_Exp>;
  _or?: InputMaybe<Array<Epoch_Questions_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  enabled?: InputMaybe<Boolean_Comparison_Exp>;
  epoch?: InputMaybe<Epochs_Bool_Exp>;
  epoch_completions?: InputMaybe<Epoch_Completions_Bool_Exp>;
  epoch_completions_aggregate?: InputMaybe<Epoch_Completions_Aggregate_Bool_Exp>;
  epoch_id?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  link?: InputMaybe<String_Comparison_Exp>;
  object_id?: InputMaybe<String_Comparison_Exp>;
  order?: InputMaybe<Int_Comparison_Exp>;
  point_award_amount?: InputMaybe<Int_Comparison_Exp>;
  predicate_id?: InputMaybe<String_Comparison_Exp>;
  preferences_predicate_id?: InputMaybe<String_Comparison_Exp>;
  tag_object_id?: InputMaybe<String_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Epoch_Questions_Max_Fields = {
  __typename?: 'epoch_questions_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  epoch_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  object_id?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  point_award_amount?: Maybe<Scalars['Int']['output']>;
  predicate_id?: Maybe<Scalars['String']['output']>;
  preferences_predicate_id?: Maybe<Scalars['String']['output']>;
  tag_object_id?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "epoch_questions" */
export type Epoch_Questions_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  epoch_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  link?: InputMaybe<Order_By>;
  object_id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  point_award_amount?: InputMaybe<Order_By>;
  predicate_id?: InputMaybe<Order_By>;
  preferences_predicate_id?: InputMaybe<Order_By>;
  tag_object_id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Epoch_Questions_Min_Fields = {
  __typename?: 'epoch_questions_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  epoch_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  object_id?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  point_award_amount?: Maybe<Scalars['Int']['output']>;
  predicate_id?: Maybe<Scalars['String']['output']>;
  preferences_predicate_id?: Maybe<Scalars['String']['output']>;
  tag_object_id?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "epoch_questions" */
export type Epoch_Questions_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  epoch_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  link?: InputMaybe<Order_By>;
  object_id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  point_award_amount?: InputMaybe<Order_By>;
  predicate_id?: InputMaybe<Order_By>;
  preferences_predicate_id?: InputMaybe<Order_By>;
  tag_object_id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "epoch_questions". */
export type Epoch_Questions_Order_By = {
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  enabled?: InputMaybe<Order_By>;
  epoch?: InputMaybe<Epochs_Order_By>;
  epoch_completions_aggregate?: InputMaybe<Epoch_Completions_Aggregate_Order_By>;
  epoch_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  link?: InputMaybe<Order_By>;
  object_id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  point_award_amount?: InputMaybe<Order_By>;
  predicate_id?: InputMaybe<Order_By>;
  preferences_predicate_id?: InputMaybe<Order_By>;
  tag_object_id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** select columns of table "epoch_questions" */
export enum Epoch_Questions_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  Enabled = 'enabled',
  /** column name */
  EpochId = 'epoch_id',
  /** column name */
  Id = 'id',
  /** column name */
  Link = 'link',
  /** column name */
  ObjectId = 'object_id',
  /** column name */
  Order = 'order',
  /** column name */
  PointAwardAmount = 'point_award_amount',
  /** column name */
  PredicateId = 'predicate_id',
  /** column name */
  PreferencesPredicateId = 'preferences_predicate_id',
  /** column name */
  TagObjectId = 'tag_object_id',
  /** column name */
  Title = 'title'
}

/** select "epoch_questions_aggregate_bool_exp_bool_and_arguments_columns" columns of table "epoch_questions" */
export enum Epoch_Questions_Select_Column_Epoch_Questions_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Enabled = 'enabled'
}

/** select "epoch_questions_aggregate_bool_exp_bool_or_arguments_columns" columns of table "epoch_questions" */
export enum Epoch_Questions_Select_Column_Epoch_Questions_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Enabled = 'enabled'
}

/** aggregate stddev on columns */
export type Epoch_Questions_Stddev_Fields = {
  __typename?: 'epoch_questions_stddev_fields';
  epoch_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  order?: Maybe<Scalars['Float']['output']>;
  point_award_amount?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "epoch_questions" */
export type Epoch_Questions_Stddev_Order_By = {
  epoch_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  point_award_amount?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Epoch_Questions_Stddev_Pop_Fields = {
  __typename?: 'epoch_questions_stddev_pop_fields';
  epoch_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  order?: Maybe<Scalars['Float']['output']>;
  point_award_amount?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "epoch_questions" */
export type Epoch_Questions_Stddev_Pop_Order_By = {
  epoch_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  point_award_amount?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Epoch_Questions_Stddev_Samp_Fields = {
  __typename?: 'epoch_questions_stddev_samp_fields';
  epoch_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  order?: Maybe<Scalars['Float']['output']>;
  point_award_amount?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "epoch_questions" */
export type Epoch_Questions_Stddev_Samp_Order_By = {
  epoch_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  point_award_amount?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "epoch_questions" */
export type Epoch_Questions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Epoch_Questions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Epoch_Questions_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  epoch_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  object_id?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  point_award_amount?: InputMaybe<Scalars['Int']['input']>;
  predicate_id?: InputMaybe<Scalars['String']['input']>;
  preferences_predicate_id?: InputMaybe<Scalars['String']['input']>;
  tag_object_id?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Epoch_Questions_Sum_Fields = {
  __typename?: 'epoch_questions_sum_fields';
  epoch_id?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  point_award_amount?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "epoch_questions" */
export type Epoch_Questions_Sum_Order_By = {
  epoch_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  point_award_amount?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Epoch_Questions_Var_Pop_Fields = {
  __typename?: 'epoch_questions_var_pop_fields';
  epoch_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  order?: Maybe<Scalars['Float']['output']>;
  point_award_amount?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "epoch_questions" */
export type Epoch_Questions_Var_Pop_Order_By = {
  epoch_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  point_award_amount?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Epoch_Questions_Var_Samp_Fields = {
  __typename?: 'epoch_questions_var_samp_fields';
  epoch_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  order?: Maybe<Scalars['Float']['output']>;
  point_award_amount?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "epoch_questions" */
export type Epoch_Questions_Var_Samp_Order_By = {
  epoch_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  point_award_amount?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Epoch_Questions_Variance_Fields = {
  __typename?: 'epoch_questions_variance_fields';
  epoch_id?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
  order?: Maybe<Scalars['Float']['output']>;
  point_award_amount?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "epoch_questions" */
export type Epoch_Questions_Variance_Order_By = {
  epoch_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  point_award_amount?: InputMaybe<Order_By>;
};

/** columns and relationships of "epochs" */
export type Epochs = {
  __typename?: 'epochs';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  end_date: Scalars['timestamptz']['output'];
  /** An array relationship */
  epoch_completions: Array<Epoch_Completions>;
  /** An aggregate relationship */
  epoch_completions_aggregate: Epoch_Completions_Aggregate;
  /** An array relationship */
  epoch_questions: Array<Epoch_Questions>;
  /** An aggregate relationship */
  epoch_questions_aggregate: Epoch_Questions_Aggregate;
  id: Scalars['Int']['output'];
  is_active?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  order?: Maybe<Scalars['Int']['output']>;
  start_date: Scalars['timestamptz']['output'];
  total_points?: Maybe<Scalars['Int']['output']>;
  /** A computed field, executes function "total_points_available" */
  total_points_available?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};


/** columns and relationships of "epochs" */
export type EpochsEpoch_CompletionsArgs = {
  distinct_on?: InputMaybe<Array<Epoch_Completions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Epoch_Completions_Order_By>>;
  where?: InputMaybe<Epoch_Completions_Bool_Exp>;
};


/** columns and relationships of "epochs" */
export type EpochsEpoch_Completions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Epoch_Completions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Epoch_Completions_Order_By>>;
  where?: InputMaybe<Epoch_Completions_Bool_Exp>;
};


/** columns and relationships of "epochs" */
export type EpochsEpoch_QuestionsArgs = {
  distinct_on?: InputMaybe<Array<Epoch_Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Epoch_Questions_Order_By>>;
  where?: InputMaybe<Epoch_Questions_Bool_Exp>;
};


/** columns and relationships of "epochs" */
export type EpochsEpoch_Questions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Epoch_Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Epoch_Questions_Order_By>>;
  where?: InputMaybe<Epoch_Questions_Bool_Exp>;
};

/** aggregated selection of "epochs" */
export type Epochs_Aggregate = {
  __typename?: 'epochs_aggregate';
  aggregate?: Maybe<Epochs_Aggregate_Fields>;
  nodes: Array<Epochs>;
};

/** aggregate fields of "epochs" */
export type Epochs_Aggregate_Fields = {
  __typename?: 'epochs_aggregate_fields';
  avg?: Maybe<Epochs_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Epochs_Max_Fields>;
  min?: Maybe<Epochs_Min_Fields>;
  stddev?: Maybe<Epochs_Stddev_Fields>;
  stddev_pop?: Maybe<Epochs_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Epochs_Stddev_Samp_Fields>;
  sum?: Maybe<Epochs_Sum_Fields>;
  var_pop?: Maybe<Epochs_Var_Pop_Fields>;
  var_samp?: Maybe<Epochs_Var_Samp_Fields>;
  variance?: Maybe<Epochs_Variance_Fields>;
};


/** aggregate fields of "epochs" */
export type Epochs_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Epochs_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Epochs_Avg_Fields = {
  __typename?: 'epochs_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
  order?: Maybe<Scalars['Float']['output']>;
  total_points?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "total_points_available" */
  total_points_available?: Maybe<Scalars['Int']['output']>;
};

/** Boolean expression to filter rows from the table "epochs". All fields are combined with a logical 'AND'. */
export type Epochs_Bool_Exp = {
  _and?: InputMaybe<Array<Epochs_Bool_Exp>>;
  _not?: InputMaybe<Epochs_Bool_Exp>;
  _or?: InputMaybe<Array<Epochs_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  end_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  epoch_completions?: InputMaybe<Epoch_Completions_Bool_Exp>;
  epoch_completions_aggregate?: InputMaybe<Epoch_Completions_Aggregate_Bool_Exp>;
  epoch_questions?: InputMaybe<Epoch_Questions_Bool_Exp>;
  epoch_questions_aggregate?: InputMaybe<Epoch_Questions_Aggregate_Bool_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  is_active?: InputMaybe<Boolean_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  order?: InputMaybe<Int_Comparison_Exp>;
  start_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  total_points?: InputMaybe<Int_Comparison_Exp>;
  total_points_available?: InputMaybe<Int_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** aggregate max on columns */
export type Epochs_Max_Fields = {
  __typename?: 'epochs_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  end_date?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  start_date?: Maybe<Scalars['timestamptz']['output']>;
  total_points?: Maybe<Scalars['Int']['output']>;
  /** A computed field, executes function "total_points_available" */
  total_points_available?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Epochs_Min_Fields = {
  __typename?: 'epochs_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  end_date?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  start_date?: Maybe<Scalars['timestamptz']['output']>;
  total_points?: Maybe<Scalars['Int']['output']>;
  /** A computed field, executes function "total_points_available" */
  total_points_available?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** Ordering options when selecting data from "epochs". */
export type Epochs_Order_By = {
  created_at?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  end_date?: InputMaybe<Order_By>;
  epoch_completions_aggregate?: InputMaybe<Epoch_Completions_Aggregate_Order_By>;
  epoch_questions_aggregate?: InputMaybe<Epoch_Questions_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  is_active?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  start_date?: InputMaybe<Order_By>;
  total_points?: InputMaybe<Order_By>;
  total_points_available?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** select columns of table "epochs" */
export enum Epochs_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Description = 'description',
  /** column name */
  EndDate = 'end_date',
  /** column name */
  Id = 'id',
  /** column name */
  IsActive = 'is_active',
  /** column name */
  Name = 'name',
  /** column name */
  Order = 'order',
  /** column name */
  StartDate = 'start_date',
  /** column name */
  TotalPoints = 'total_points',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate stddev on columns */
export type Epochs_Stddev_Fields = {
  __typename?: 'epochs_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
  order?: Maybe<Scalars['Float']['output']>;
  total_points?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "total_points_available" */
  total_points_available?: Maybe<Scalars['Int']['output']>;
};

/** aggregate stddev_pop on columns */
export type Epochs_Stddev_Pop_Fields = {
  __typename?: 'epochs_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  order?: Maybe<Scalars['Float']['output']>;
  total_points?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "total_points_available" */
  total_points_available?: Maybe<Scalars['Int']['output']>;
};

/** aggregate stddev_samp on columns */
export type Epochs_Stddev_Samp_Fields = {
  __typename?: 'epochs_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  order?: Maybe<Scalars['Float']['output']>;
  total_points?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "total_points_available" */
  total_points_available?: Maybe<Scalars['Int']['output']>;
};

/** Streaming cursor of the table "epochs" */
export type Epochs_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Epochs_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Epochs_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  end_date?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  start_date?: InputMaybe<Scalars['timestamptz']['input']>;
  total_points?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Epochs_Sum_Fields = {
  __typename?: 'epochs_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  total_points?: Maybe<Scalars['Int']['output']>;
  /** A computed field, executes function "total_points_available" */
  total_points_available?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Epochs_Var_Pop_Fields = {
  __typename?: 'epochs_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  order?: Maybe<Scalars['Float']['output']>;
  total_points?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "total_points_available" */
  total_points_available?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_samp on columns */
export type Epochs_Var_Samp_Fields = {
  __typename?: 'epochs_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  order?: Maybe<Scalars['Float']['output']>;
  total_points?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "total_points_available" */
  total_points_available?: Maybe<Scalars['Int']['output']>;
};

/** aggregate variance on columns */
export type Epochs_Variance_Fields = {
  __typename?: 'epochs_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
  order?: Maybe<Scalars['Float']['output']>;
  total_points?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "total_points_available" */
  total_points_available?: Maybe<Scalars['Int']['output']>;
};

/** columns and relationships of "eth_claims" */
export type Eth_Claims = {
  __typename?: 'eth_claims';
  account: Scalars['String']['output'];
  amount: Scalars['numeric']['output'];
  claimed?: Maybe<Scalars['Boolean']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['Int']['output'];
  proof: Scalars['jsonb']['output'];
  root: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};


/** columns and relationships of "eth_claims" */
export type Eth_ClaimsProofArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to filter rows from the table "eth_claims". All fields are combined with a logical 'AND'. */
export type Eth_Claims_Bool_Exp = {
  _and?: InputMaybe<Array<Eth_Claims_Bool_Exp>>;
  _not?: InputMaybe<Eth_Claims_Bool_Exp>;
  _or?: InputMaybe<Array<Eth_Claims_Bool_Exp>>;
  account?: InputMaybe<String_Comparison_Exp>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  claimed?: InputMaybe<Boolean_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  proof?: InputMaybe<Jsonb_Comparison_Exp>;
  root?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** Ordering options when selecting data from "eth_claims". */
export type Eth_Claims_Order_By = {
  account?: InputMaybe<Order_By>;
  amount?: InputMaybe<Order_By>;
  claimed?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  proof?: InputMaybe<Order_By>;
  root?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** select columns of table "eth_claims" */
export enum Eth_Claims_Select_Column {
  /** column name */
  Account = 'account',
  /** column name */
  Amount = 'amount',
  /** column name */
  Claimed = 'claimed',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Proof = 'proof',
  /** column name */
  Root = 'root',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** Streaming cursor of the table "eth_claims" */
export type Eth_Claims_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Eth_Claims_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Eth_Claims_Stream_Cursor_Value_Input = {
  account?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['numeric']['input']>;
  claimed?: InputMaybe<Scalars['Boolean']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  proof?: InputMaybe<Scalars['jsonb']['input']>;
  root?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']['input']>;
  _eq?: InputMaybe<Scalars['jsonb']['input']>;
  _gt?: InputMaybe<Scalars['jsonb']['input']>;
  _gte?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']['input']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']['input']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['jsonb']['input']>;
  _lte?: InputMaybe<Scalars['jsonb']['input']>;
  _neq?: InputMaybe<Scalars['jsonb']['input']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']['input']>>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']['input']>;
  _gt?: InputMaybe<Scalars['numeric']['input']>;
  _gte?: InputMaybe<Scalars['numeric']['input']>;
  _in?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['numeric']['input']>;
  _lte?: InputMaybe<Scalars['numeric']['input']>;
  _neq?: InputMaybe<Scalars['numeric']['input']>;
  _nin?: InputMaybe<Array<Scalars['numeric']['input']>>;
};

/** columns and relationships of "onboarding_completions" */
export type Onboarding_Completions = {
  __typename?: 'onboarding_completions';
  account_id: Scalars['String']['output'];
  completed_at: Scalars['timestamptz']['output'];
  counter_triple_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  object_id?: Maybe<Scalars['String']['output']>;
  onboarding_quest_id: Scalars['Int']['output'];
  subject_id?: Maybe<Scalars['String']['output']>;
  triple_id?: Maybe<Scalars['String']['output']>;
};

/** Boolean expression to filter rows from the table "onboarding_completions". All fields are combined with a logical 'AND'. */
export type Onboarding_Completions_Bool_Exp = {
  _and?: InputMaybe<Array<Onboarding_Completions_Bool_Exp>>;
  _not?: InputMaybe<Onboarding_Completions_Bool_Exp>;
  _or?: InputMaybe<Array<Onboarding_Completions_Bool_Exp>>;
  account_id?: InputMaybe<String_Comparison_Exp>;
  completed_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  counter_triple_id?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  object_id?: InputMaybe<String_Comparison_Exp>;
  onboarding_quest_id?: InputMaybe<Int_Comparison_Exp>;
  subject_id?: InputMaybe<String_Comparison_Exp>;
  triple_id?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "onboarding_completions". */
export type Onboarding_Completions_Order_By = {
  account_id?: InputMaybe<Order_By>;
  completed_at?: InputMaybe<Order_By>;
  counter_triple_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  object_id?: InputMaybe<Order_By>;
  onboarding_quest_id?: InputMaybe<Order_By>;
  subject_id?: InputMaybe<Order_By>;
  triple_id?: InputMaybe<Order_By>;
};

/** select columns of table "onboarding_completions" */
export enum Onboarding_Completions_Select_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  CompletedAt = 'completed_at',
  /** column name */
  CounterTripleId = 'counter_triple_id',
  /** column name */
  Id = 'id',
  /** column name */
  ObjectId = 'object_id',
  /** column name */
  OnboardingQuestId = 'onboarding_quest_id',
  /** column name */
  SubjectId = 'subject_id',
  /** column name */
  TripleId = 'triple_id'
}

/** Streaming cursor of the table "onboarding_completions" */
export type Onboarding_Completions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Onboarding_Completions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Onboarding_Completions_Stream_Cursor_Value_Input = {
  account_id?: InputMaybe<Scalars['String']['input']>;
  completed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  counter_triple_id?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  object_id?: InputMaybe<Scalars['String']['input']>;
  onboarding_quest_id?: InputMaybe<Scalars['Int']['input']>;
  subject_id?: InputMaybe<Scalars['String']['input']>;
  triple_id?: InputMaybe<Scalars['String']['input']>;
};

/** columns and relationships of "onboarding_quests" */
export type Onboarding_Quests = {
  __typename?: 'onboarding_quests';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  link?: Maybe<Scalars['String']['output']>;
  object_id?: Maybe<Scalars['String']['output']>;
  predicate_id?: Maybe<Scalars['String']['output']>;
  preferences_predicate_id?: Maybe<Scalars['String']['output']>;
  tag_object_id?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

/** Boolean expression to filter rows from the table "onboarding_quests". All fields are combined with a logical 'AND'. */
export type Onboarding_Quests_Bool_Exp = {
  _and?: InputMaybe<Array<Onboarding_Quests_Bool_Exp>>;
  _not?: InputMaybe<Onboarding_Quests_Bool_Exp>;
  _or?: InputMaybe<Array<Onboarding_Quests_Bool_Exp>>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  link?: InputMaybe<String_Comparison_Exp>;
  object_id?: InputMaybe<String_Comparison_Exp>;
  predicate_id?: InputMaybe<String_Comparison_Exp>;
  preferences_predicate_id?: InputMaybe<String_Comparison_Exp>;
  tag_object_id?: InputMaybe<String_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "onboarding_quests". */
export type Onboarding_Quests_Order_By = {
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  link?: InputMaybe<Order_By>;
  object_id?: InputMaybe<Order_By>;
  predicate_id?: InputMaybe<Order_By>;
  preferences_predicate_id?: InputMaybe<Order_By>;
  tag_object_id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** select columns of table "onboarding_quests" */
export enum Onboarding_Quests_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  Link = 'link',
  /** column name */
  ObjectId = 'object_id',
  /** column name */
  PredicateId = 'predicate_id',
  /** column name */
  PreferencesPredicateId = 'preferences_predicate_id',
  /** column name */
  TagObjectId = 'tag_object_id',
  /** column name */
  Title = 'title'
}

/** Streaming cursor of the table "onboarding_quests" */
export type Onboarding_Quests_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Onboarding_Quests_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Onboarding_Quests_Stream_Cursor_Value_Input = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  object_id?: InputMaybe<Scalars['String']['input']>;
  predicate_id?: InputMaybe<Scalars['String']['input']>;
  preferences_predicate_id?: InputMaybe<Scalars['String']['input']>;
  tag_object_id?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "point_events" */
export type Point_Events = {
  __typename?: 'point_events';
  address: Scalars['String']['output'];
  amount: Scalars['Int']['output'];
  date: Scalars['timestamp']['output'];
  id: Scalars['Int']['output'];
  type: Scalars['String']['output'];
};

/** aggregated selection of "point_events" */
export type Point_Events_Aggregate = {
  __typename?: 'point_events_aggregate';
  aggregate?: Maybe<Point_Events_Aggregate_Fields>;
  nodes: Array<Point_Events>;
};

/** aggregate fields of "point_events" */
export type Point_Events_Aggregate_Fields = {
  __typename?: 'point_events_aggregate_fields';
  avg?: Maybe<Point_Events_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Point_Events_Max_Fields>;
  min?: Maybe<Point_Events_Min_Fields>;
  stddev?: Maybe<Point_Events_Stddev_Fields>;
  stddev_pop?: Maybe<Point_Events_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Point_Events_Stddev_Samp_Fields>;
  sum?: Maybe<Point_Events_Sum_Fields>;
  var_pop?: Maybe<Point_Events_Var_Pop_Fields>;
  var_samp?: Maybe<Point_Events_Var_Samp_Fields>;
  variance?: Maybe<Point_Events_Variance_Fields>;
};


/** aggregate fields of "point_events" */
export type Point_Events_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Point_Events_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Point_Events_Avg_Fields = {
  __typename?: 'point_events_avg_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "point_events". All fields are combined with a logical 'AND'. */
export type Point_Events_Bool_Exp = {
  _and?: InputMaybe<Array<Point_Events_Bool_Exp>>;
  _not?: InputMaybe<Point_Events_Bool_Exp>;
  _or?: InputMaybe<Array<Point_Events_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  amount?: InputMaybe<Int_Comparison_Exp>;
  date?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Point_Events_Max_Fields = {
  __typename?: 'point_events_max_fields';
  address?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['Int']['output']>;
  date?: Maybe<Scalars['timestamp']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Point_Events_Min_Fields = {
  __typename?: 'point_events_min_fields';
  address?: Maybe<Scalars['String']['output']>;
  amount?: Maybe<Scalars['Int']['output']>;
  date?: Maybe<Scalars['timestamp']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "point_events". */
export type Point_Events_Order_By = {
  address?: InputMaybe<Order_By>;
  amount?: InputMaybe<Order_By>;
  date?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** select columns of table "point_events" */
export enum Point_Events_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  Amount = 'amount',
  /** column name */
  Date = 'date',
  /** column name */
  Id = 'id',
  /** column name */
  Type = 'type'
}

/** aggregate stddev on columns */
export type Point_Events_Stddev_Fields = {
  __typename?: 'point_events_stddev_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Point_Events_Stddev_Pop_Fields = {
  __typename?: 'point_events_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Point_Events_Stddev_Samp_Fields = {
  __typename?: 'point_events_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "point_events" */
export type Point_Events_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Point_Events_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Point_Events_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['Int']['input']>;
  date?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Point_Events_Sum_Fields = {
  __typename?: 'point_events_sum_fields';
  amount?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Point_Events_Var_Pop_Fields = {
  __typename?: 'point_events_var_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Point_Events_Var_Samp_Fields = {
  __typename?: 'point_events_var_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Point_Events_Variance_Fields = {
  __typename?: 'point_events_variance_fields';
  amount?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "points" */
export type Points = {
  __typename?: 'points';
  account_id: Scalars['String']['output'];
  community: Scalars['Int']['output'];
  minigame1: Scalars['Int']['output'];
  portal_quests: Scalars['Int']['output'];
  referral: Scalars['Int']['output'];
  social: Scalars['Int']['output'];
};

/** aggregated selection of "points" */
export type Points_Aggregate = {
  __typename?: 'points_aggregate';
  aggregate?: Maybe<Points_Aggregate_Fields>;
  nodes: Array<Points>;
};

/** aggregate fields of "points" */
export type Points_Aggregate_Fields = {
  __typename?: 'points_aggregate_fields';
  avg?: Maybe<Points_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Points_Max_Fields>;
  min?: Maybe<Points_Min_Fields>;
  stddev?: Maybe<Points_Stddev_Fields>;
  stddev_pop?: Maybe<Points_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Points_Stddev_Samp_Fields>;
  sum?: Maybe<Points_Sum_Fields>;
  var_pop?: Maybe<Points_Var_Pop_Fields>;
  var_samp?: Maybe<Points_Var_Samp_Fields>;
  variance?: Maybe<Points_Variance_Fields>;
};


/** aggregate fields of "points" */
export type Points_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Points_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Points_Avg_Fields = {
  __typename?: 'points_avg_fields';
  community?: Maybe<Scalars['Float']['output']>;
  minigame1?: Maybe<Scalars['Float']['output']>;
  portal_quests?: Maybe<Scalars['Float']['output']>;
  referral?: Maybe<Scalars['Float']['output']>;
  social?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "points". All fields are combined with a logical 'AND'. */
export type Points_Bool_Exp = {
  _and?: InputMaybe<Array<Points_Bool_Exp>>;
  _not?: InputMaybe<Points_Bool_Exp>;
  _or?: InputMaybe<Array<Points_Bool_Exp>>;
  account_id?: InputMaybe<String_Comparison_Exp>;
  community?: InputMaybe<Int_Comparison_Exp>;
  minigame1?: InputMaybe<Int_Comparison_Exp>;
  portal_quests?: InputMaybe<Int_Comparison_Exp>;
  referral?: InputMaybe<Int_Comparison_Exp>;
  social?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Points_Max_Fields = {
  __typename?: 'points_max_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  community?: Maybe<Scalars['Int']['output']>;
  minigame1?: Maybe<Scalars['Int']['output']>;
  portal_quests?: Maybe<Scalars['Int']['output']>;
  referral?: Maybe<Scalars['Int']['output']>;
  social?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Points_Min_Fields = {
  __typename?: 'points_min_fields';
  account_id?: Maybe<Scalars['String']['output']>;
  community?: Maybe<Scalars['Int']['output']>;
  minigame1?: Maybe<Scalars['Int']['output']>;
  portal_quests?: Maybe<Scalars['Int']['output']>;
  referral?: Maybe<Scalars['Int']['output']>;
  social?: Maybe<Scalars['Int']['output']>;
};

/** Ordering options when selecting data from "points". */
export type Points_Order_By = {
  account_id?: InputMaybe<Order_By>;
  community?: InputMaybe<Order_By>;
  minigame1?: InputMaybe<Order_By>;
  portal_quests?: InputMaybe<Order_By>;
  referral?: InputMaybe<Order_By>;
  social?: InputMaybe<Order_By>;
};

/** select columns of table "points" */
export enum Points_Select_Column {
  /** column name */
  AccountId = 'account_id',
  /** column name */
  Community = 'community',
  /** column name */
  Minigame1 = 'minigame1',
  /** column name */
  PortalQuests = 'portal_quests',
  /** column name */
  Referral = 'referral',
  /** column name */
  Social = 'social'
}

/** aggregate stddev on columns */
export type Points_Stddev_Fields = {
  __typename?: 'points_stddev_fields';
  community?: Maybe<Scalars['Float']['output']>;
  minigame1?: Maybe<Scalars['Float']['output']>;
  portal_quests?: Maybe<Scalars['Float']['output']>;
  referral?: Maybe<Scalars['Float']['output']>;
  social?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Points_Stddev_Pop_Fields = {
  __typename?: 'points_stddev_pop_fields';
  community?: Maybe<Scalars['Float']['output']>;
  minigame1?: Maybe<Scalars['Float']['output']>;
  portal_quests?: Maybe<Scalars['Float']['output']>;
  referral?: Maybe<Scalars['Float']['output']>;
  social?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Points_Stddev_Samp_Fields = {
  __typename?: 'points_stddev_samp_fields';
  community?: Maybe<Scalars['Float']['output']>;
  minigame1?: Maybe<Scalars['Float']['output']>;
  portal_quests?: Maybe<Scalars['Float']['output']>;
  referral?: Maybe<Scalars['Float']['output']>;
  social?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "points" */
export type Points_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Points_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Points_Stream_Cursor_Value_Input = {
  account_id?: InputMaybe<Scalars['String']['input']>;
  community?: InputMaybe<Scalars['Int']['input']>;
  minigame1?: InputMaybe<Scalars['Int']['input']>;
  portal_quests?: InputMaybe<Scalars['Int']['input']>;
  referral?: InputMaybe<Scalars['Int']['input']>;
  social?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Points_Sum_Fields = {
  __typename?: 'points_sum_fields';
  community?: Maybe<Scalars['Int']['output']>;
  minigame1?: Maybe<Scalars['Int']['output']>;
  portal_quests?: Maybe<Scalars['Int']['output']>;
  referral?: Maybe<Scalars['Int']['output']>;
  social?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Points_Var_Pop_Fields = {
  __typename?: 'points_var_pop_fields';
  community?: Maybe<Scalars['Float']['output']>;
  minigame1?: Maybe<Scalars['Float']['output']>;
  portal_quests?: Maybe<Scalars['Float']['output']>;
  referral?: Maybe<Scalars['Float']['output']>;
  social?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Points_Var_Samp_Fields = {
  __typename?: 'points_var_samp_fields';
  community?: Maybe<Scalars['Float']['output']>;
  minigame1?: Maybe<Scalars['Float']['output']>;
  portal_quests?: Maybe<Scalars['Float']['output']>;
  referral?: Maybe<Scalars['Float']['output']>;
  social?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Points_Variance_Fields = {
  __typename?: 'points_variance_fields';
  community?: Maybe<Scalars['Float']['output']>;
  minigame1?: Maybe<Scalars['Float']['output']>;
  portal_quests?: Maybe<Scalars['Float']['output']>;
  referral?: Maybe<Scalars['Float']['output']>;
  social?: Maybe<Scalars['Float']['output']>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** An array relationship */
  epoch_completions: Array<Epoch_Completions>;
  /** An aggregate relationship */
  epoch_completions_aggregate: Epoch_Completions_Aggregate;
  /** fetch data from the table: "epoch_completions" using primary key columns */
  epoch_completions_by_pk?: Maybe<Epoch_Completions>;
  /** fetch data from the table: "epoch_points" */
  epoch_points: Array<Epoch_Points>;
  /** fetch aggregated fields from the table: "epoch_points" */
  epoch_points_aggregate: Epoch_Points_Aggregate;
  /** fetch data from the table: "epoch_points" using primary key columns */
  epoch_points_by_pk?: Maybe<Epoch_Points>;
  /** An array relationship */
  epoch_questions: Array<Epoch_Questions>;
  /** An aggregate relationship */
  epoch_questions_aggregate: Epoch_Questions_Aggregate;
  /** fetch data from the table: "epoch_questions" using primary key columns */
  epoch_questions_by_pk?: Maybe<Epoch_Questions>;
  /** fetch data from the table: "epochs" */
  epochs: Array<Epochs>;
  /** fetch aggregated fields from the table: "epochs" */
  epochs_aggregate: Epochs_Aggregate;
  /** fetch data from the table: "epochs" using primary key columns */
  epochs_by_pk?: Maybe<Epochs>;
  /** fetch data from the table: "eth_claims" */
  eth_claims: Array<Eth_Claims>;
  /** fetch data from the table: "eth_claims" using primary key columns */
  eth_claims_by_pk?: Maybe<Eth_Claims>;
  /** fetch data from the table: "onboarding_completions" */
  onboarding_completions: Array<Onboarding_Completions>;
  /** fetch data from the table: "onboarding_completions" using primary key columns */
  onboarding_completions_by_pk?: Maybe<Onboarding_Completions>;
  /** fetch data from the table: "onboarding_quests" */
  onboarding_quests: Array<Onboarding_Quests>;
  /** fetch data from the table: "onboarding_quests" using primary key columns */
  onboarding_quests_by_pk?: Maybe<Onboarding_Quests>;
  /** fetch data from the table: "point_events" */
  point_events: Array<Point_Events>;
  /** fetch aggregated fields from the table: "point_events" */
  point_events_aggregate: Point_Events_Aggregate;
  /** fetch data from the table: "point_events" using primary key columns */
  point_events_by_pk?: Maybe<Point_Events>;
  /** fetch data from the table: "points" */
  points: Array<Points>;
  /** fetch aggregated fields from the table: "points" */
  points_aggregate: Points_Aggregate;
  /** fetch data from the table: "points" using primary key columns */
  points_by_pk?: Maybe<Points>;
  /** fetch data from the table: "questions" */
  questions: Array<Questions>;
  /** fetch aggregated fields from the table: "questions" */
  questions_aggregate: Questions_Aggregate;
  /** fetch data from the table: "questions" using primary key columns */
  questions_by_pk?: Maybe<Questions>;
  /** fetch data from the table: "relic_points" */
  relic_points: Array<Relic_Points>;
  /** fetch aggregated fields from the table: "relic_points" */
  relic_points_aggregate: Relic_Points_Aggregate;
  /** fetch data from the table: "relic_points" using primary key columns */
  relic_points_by_pk?: Maybe<Relic_Points>;
};


export type Query_RootEpoch_CompletionsArgs = {
  distinct_on?: InputMaybe<Array<Epoch_Completions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Epoch_Completions_Order_By>>;
  where?: InputMaybe<Epoch_Completions_Bool_Exp>;
};


export type Query_RootEpoch_Completions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Epoch_Completions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Epoch_Completions_Order_By>>;
  where?: InputMaybe<Epoch_Completions_Bool_Exp>;
};


export type Query_RootEpoch_Completions_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootEpoch_PointsArgs = {
  distinct_on?: InputMaybe<Array<Epoch_Points_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Epoch_Points_Order_By>>;
  where?: InputMaybe<Epoch_Points_Bool_Exp>;
};


export type Query_RootEpoch_Points_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Epoch_Points_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Epoch_Points_Order_By>>;
  where?: InputMaybe<Epoch_Points_Bool_Exp>;
};


export type Query_RootEpoch_Points_By_PkArgs = {
  account_id: Scalars['String']['input'];
};


export type Query_RootEpoch_QuestionsArgs = {
  distinct_on?: InputMaybe<Array<Epoch_Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Epoch_Questions_Order_By>>;
  where?: InputMaybe<Epoch_Questions_Bool_Exp>;
};


export type Query_RootEpoch_Questions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Epoch_Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Epoch_Questions_Order_By>>;
  where?: InputMaybe<Epoch_Questions_Bool_Exp>;
};


export type Query_RootEpoch_Questions_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootEpochsArgs = {
  distinct_on?: InputMaybe<Array<Epochs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Epochs_Order_By>>;
  where?: InputMaybe<Epochs_Bool_Exp>;
};


export type Query_RootEpochs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Epochs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Epochs_Order_By>>;
  where?: InputMaybe<Epochs_Bool_Exp>;
};


export type Query_RootEpochs_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootEth_ClaimsArgs = {
  distinct_on?: InputMaybe<Array<Eth_Claims_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Eth_Claims_Order_By>>;
  where?: InputMaybe<Eth_Claims_Bool_Exp>;
};


export type Query_RootEth_Claims_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootOnboarding_CompletionsArgs = {
  distinct_on?: InputMaybe<Array<Onboarding_Completions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Onboarding_Completions_Order_By>>;
  where?: InputMaybe<Onboarding_Completions_Bool_Exp>;
};


export type Query_RootOnboarding_Completions_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootOnboarding_QuestsArgs = {
  distinct_on?: InputMaybe<Array<Onboarding_Quests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Onboarding_Quests_Order_By>>;
  where?: InputMaybe<Onboarding_Quests_Bool_Exp>;
};


export type Query_RootOnboarding_Quests_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootPoint_EventsArgs = {
  distinct_on?: InputMaybe<Array<Point_Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Point_Events_Order_By>>;
  where?: InputMaybe<Point_Events_Bool_Exp>;
};


export type Query_RootPoint_Events_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Point_Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Point_Events_Order_By>>;
  where?: InputMaybe<Point_Events_Bool_Exp>;
};


export type Query_RootPoint_Events_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootPointsArgs = {
  distinct_on?: InputMaybe<Array<Points_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Points_Order_By>>;
  where?: InputMaybe<Points_Bool_Exp>;
};


export type Query_RootPoints_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Points_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Points_Order_By>>;
  where?: InputMaybe<Points_Bool_Exp>;
};


export type Query_RootPoints_By_PkArgs = {
  account_id: Scalars['String']['input'];
};


export type Query_RootQuestionsArgs = {
  distinct_on?: InputMaybe<Array<Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Questions_Order_By>>;
  where?: InputMaybe<Questions_Bool_Exp>;
};


export type Query_RootQuestions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Questions_Order_By>>;
  where?: InputMaybe<Questions_Bool_Exp>;
};


export type Query_RootQuestions_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Query_RootRelic_PointsArgs = {
  distinct_on?: InputMaybe<Array<Relic_Points_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Relic_Points_Order_By>>;
  where?: InputMaybe<Relic_Points_Bool_Exp>;
};


export type Query_RootRelic_Points_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Relic_Points_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Relic_Points_Order_By>>;
  where?: InputMaybe<Relic_Points_Bool_Exp>;
};


export type Query_RootRelic_Points_By_PkArgs = {
  address: Scalars['String']['input'];
};

/** columns and relationships of "questions" */
export type Questions = {
  __typename?: 'questions';
  description: Scalars['String']['output'];
  enabled?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['Int']['output'];
  link?: Maybe<Scalars['String']['output']>;
  object_id: Scalars['Int']['output'];
  point_award_amount: Scalars['Int']['output'];
  predicate_id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

/** aggregated selection of "questions" */
export type Questions_Aggregate = {
  __typename?: 'questions_aggregate';
  aggregate?: Maybe<Questions_Aggregate_Fields>;
  nodes: Array<Questions>;
};

/** aggregate fields of "questions" */
export type Questions_Aggregate_Fields = {
  __typename?: 'questions_aggregate_fields';
  avg?: Maybe<Questions_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Questions_Max_Fields>;
  min?: Maybe<Questions_Min_Fields>;
  stddev?: Maybe<Questions_Stddev_Fields>;
  stddev_pop?: Maybe<Questions_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Questions_Stddev_Samp_Fields>;
  sum?: Maybe<Questions_Sum_Fields>;
  var_pop?: Maybe<Questions_Var_Pop_Fields>;
  var_samp?: Maybe<Questions_Var_Samp_Fields>;
  variance?: Maybe<Questions_Variance_Fields>;
};


/** aggregate fields of "questions" */
export type Questions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Questions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Questions_Avg_Fields = {
  __typename?: 'questions_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
  object_id?: Maybe<Scalars['Float']['output']>;
  point_award_amount?: Maybe<Scalars['Float']['output']>;
  predicate_id?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "questions". All fields are combined with a logical 'AND'. */
export type Questions_Bool_Exp = {
  _and?: InputMaybe<Array<Questions_Bool_Exp>>;
  _not?: InputMaybe<Questions_Bool_Exp>;
  _or?: InputMaybe<Array<Questions_Bool_Exp>>;
  description?: InputMaybe<String_Comparison_Exp>;
  enabled?: InputMaybe<Boolean_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  link?: InputMaybe<String_Comparison_Exp>;
  object_id?: InputMaybe<Int_Comparison_Exp>;
  point_award_amount?: InputMaybe<Int_Comparison_Exp>;
  predicate_id?: InputMaybe<Int_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Questions_Max_Fields = {
  __typename?: 'questions_max_fields';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  object_id?: Maybe<Scalars['Int']['output']>;
  point_award_amount?: Maybe<Scalars['Int']['output']>;
  predicate_id?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type Questions_Min_Fields = {
  __typename?: 'questions_min_fields';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  object_id?: Maybe<Scalars['Int']['output']>;
  point_award_amount?: Maybe<Scalars['Int']['output']>;
  predicate_id?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** Ordering options when selecting data from "questions". */
export type Questions_Order_By = {
  description?: InputMaybe<Order_By>;
  enabled?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  link?: InputMaybe<Order_By>;
  object_id?: InputMaybe<Order_By>;
  point_award_amount?: InputMaybe<Order_By>;
  predicate_id?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** select columns of table "questions" */
export enum Questions_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Enabled = 'enabled',
  /** column name */
  Id = 'id',
  /** column name */
  Link = 'link',
  /** column name */
  ObjectId = 'object_id',
  /** column name */
  PointAwardAmount = 'point_award_amount',
  /** column name */
  PredicateId = 'predicate_id',
  /** column name */
  Title = 'title'
}

/** aggregate stddev on columns */
export type Questions_Stddev_Fields = {
  __typename?: 'questions_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
  object_id?: Maybe<Scalars['Float']['output']>;
  point_award_amount?: Maybe<Scalars['Float']['output']>;
  predicate_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Questions_Stddev_Pop_Fields = {
  __typename?: 'questions_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  object_id?: Maybe<Scalars['Float']['output']>;
  point_award_amount?: Maybe<Scalars['Float']['output']>;
  predicate_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Questions_Stddev_Samp_Fields = {
  __typename?: 'questions_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  object_id?: Maybe<Scalars['Float']['output']>;
  point_award_amount?: Maybe<Scalars['Float']['output']>;
  predicate_id?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "questions" */
export type Questions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Questions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Questions_Stream_Cursor_Value_Input = {
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  object_id?: InputMaybe<Scalars['Int']['input']>;
  point_award_amount?: InputMaybe<Scalars['Int']['input']>;
  predicate_id?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Questions_Sum_Fields = {
  __typename?: 'questions_sum_fields';
  id?: Maybe<Scalars['Int']['output']>;
  object_id?: Maybe<Scalars['Int']['output']>;
  point_award_amount?: Maybe<Scalars['Int']['output']>;
  predicate_id?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Questions_Var_Pop_Fields = {
  __typename?: 'questions_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
  object_id?: Maybe<Scalars['Float']['output']>;
  point_award_amount?: Maybe<Scalars['Float']['output']>;
  predicate_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Questions_Var_Samp_Fields = {
  __typename?: 'questions_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
  object_id?: Maybe<Scalars['Float']['output']>;
  point_award_amount?: Maybe<Scalars['Float']['output']>;
  predicate_id?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Questions_Variance_Fields = {
  __typename?: 'questions_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
  object_id?: Maybe<Scalars['Float']['output']>;
  point_award_amount?: Maybe<Scalars['Float']['output']>;
  predicate_id?: Maybe<Scalars['Float']['output']>;
};

/** columns and relationships of "relic_points" */
export type Relic_Points = {
  __typename?: 'relic_points';
  address: Scalars['String']['output'];
  airdrop_points?: Maybe<Scalars['bigint']['output']>;
  genesis_minter_points: Scalars['Int']['output'];
  snapshot_1_holder_points: Scalars['Int']['output'];
  snapshot_2_holder_points: Scalars['Int']['output'];
  snapshot_3_holder_points: Scalars['Int']['output'];
  snapshot_4_holder_points: Scalars['Int']['output'];
  snapshot_5_holder_points: Scalars['Int']['output'];
  /** A computed field, executes function "calculate_total_relic_points" */
  total_relic_points?: Maybe<Scalars['Int']['output']>;
};

/** aggregated selection of "relic_points" */
export type Relic_Points_Aggregate = {
  __typename?: 'relic_points_aggregate';
  aggregate?: Maybe<Relic_Points_Aggregate_Fields>;
  nodes: Array<Relic_Points>;
};

/** aggregate fields of "relic_points" */
export type Relic_Points_Aggregate_Fields = {
  __typename?: 'relic_points_aggregate_fields';
  avg?: Maybe<Relic_Points_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Relic_Points_Max_Fields>;
  min?: Maybe<Relic_Points_Min_Fields>;
  stddev?: Maybe<Relic_Points_Stddev_Fields>;
  stddev_pop?: Maybe<Relic_Points_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Relic_Points_Stddev_Samp_Fields>;
  sum?: Maybe<Relic_Points_Sum_Fields>;
  var_pop?: Maybe<Relic_Points_Var_Pop_Fields>;
  var_samp?: Maybe<Relic_Points_Var_Samp_Fields>;
  variance?: Maybe<Relic_Points_Variance_Fields>;
};


/** aggregate fields of "relic_points" */
export type Relic_Points_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Relic_Points_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Relic_Points_Avg_Fields = {
  __typename?: 'relic_points_avg_fields';
  airdrop_points?: Maybe<Scalars['Float']['output']>;
  genesis_minter_points?: Maybe<Scalars['Float']['output']>;
  snapshot_1_holder_points?: Maybe<Scalars['Float']['output']>;
  snapshot_2_holder_points?: Maybe<Scalars['Float']['output']>;
  snapshot_3_holder_points?: Maybe<Scalars['Float']['output']>;
  snapshot_4_holder_points?: Maybe<Scalars['Float']['output']>;
  snapshot_5_holder_points?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "calculate_total_relic_points" */
  total_relic_points?: Maybe<Scalars['Int']['output']>;
};

/** Boolean expression to filter rows from the table "relic_points". All fields are combined with a logical 'AND'. */
export type Relic_Points_Bool_Exp = {
  _and?: InputMaybe<Array<Relic_Points_Bool_Exp>>;
  _not?: InputMaybe<Relic_Points_Bool_Exp>;
  _or?: InputMaybe<Array<Relic_Points_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  airdrop_points?: InputMaybe<Bigint_Comparison_Exp>;
  genesis_minter_points?: InputMaybe<Int_Comparison_Exp>;
  snapshot_1_holder_points?: InputMaybe<Int_Comparison_Exp>;
  snapshot_2_holder_points?: InputMaybe<Int_Comparison_Exp>;
  snapshot_3_holder_points?: InputMaybe<Int_Comparison_Exp>;
  snapshot_4_holder_points?: InputMaybe<Int_Comparison_Exp>;
  snapshot_5_holder_points?: InputMaybe<Int_Comparison_Exp>;
  total_relic_points?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Relic_Points_Max_Fields = {
  __typename?: 'relic_points_max_fields';
  address?: Maybe<Scalars['String']['output']>;
  airdrop_points?: Maybe<Scalars['bigint']['output']>;
  genesis_minter_points?: Maybe<Scalars['Int']['output']>;
  snapshot_1_holder_points?: Maybe<Scalars['Int']['output']>;
  snapshot_2_holder_points?: Maybe<Scalars['Int']['output']>;
  snapshot_3_holder_points?: Maybe<Scalars['Int']['output']>;
  snapshot_4_holder_points?: Maybe<Scalars['Int']['output']>;
  snapshot_5_holder_points?: Maybe<Scalars['Int']['output']>;
  /** A computed field, executes function "calculate_total_relic_points" */
  total_relic_points?: Maybe<Scalars['Int']['output']>;
};

/** aggregate min on columns */
export type Relic_Points_Min_Fields = {
  __typename?: 'relic_points_min_fields';
  address?: Maybe<Scalars['String']['output']>;
  airdrop_points?: Maybe<Scalars['bigint']['output']>;
  genesis_minter_points?: Maybe<Scalars['Int']['output']>;
  snapshot_1_holder_points?: Maybe<Scalars['Int']['output']>;
  snapshot_2_holder_points?: Maybe<Scalars['Int']['output']>;
  snapshot_3_holder_points?: Maybe<Scalars['Int']['output']>;
  snapshot_4_holder_points?: Maybe<Scalars['Int']['output']>;
  snapshot_5_holder_points?: Maybe<Scalars['Int']['output']>;
  /** A computed field, executes function "calculate_total_relic_points" */
  total_relic_points?: Maybe<Scalars['Int']['output']>;
};

/** Ordering options when selecting data from "relic_points". */
export type Relic_Points_Order_By = {
  address?: InputMaybe<Order_By>;
  airdrop_points?: InputMaybe<Order_By>;
  genesis_minter_points?: InputMaybe<Order_By>;
  snapshot_1_holder_points?: InputMaybe<Order_By>;
  snapshot_2_holder_points?: InputMaybe<Order_By>;
  snapshot_3_holder_points?: InputMaybe<Order_By>;
  snapshot_4_holder_points?: InputMaybe<Order_By>;
  snapshot_5_holder_points?: InputMaybe<Order_By>;
  total_relic_points?: InputMaybe<Order_By>;
};

/** select columns of table "relic_points" */
export enum Relic_Points_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  AirdropPoints = 'airdrop_points',
  /** column name */
  GenesisMinterPoints = 'genesis_minter_points',
  /** column name */
  Snapshot_1HolderPoints = 'snapshot_1_holder_points',
  /** column name */
  Snapshot_2HolderPoints = 'snapshot_2_holder_points',
  /** column name */
  Snapshot_3HolderPoints = 'snapshot_3_holder_points',
  /** column name */
  Snapshot_4HolderPoints = 'snapshot_4_holder_points',
  /** column name */
  Snapshot_5HolderPoints = 'snapshot_5_holder_points'
}

/** aggregate stddev on columns */
export type Relic_Points_Stddev_Fields = {
  __typename?: 'relic_points_stddev_fields';
  airdrop_points?: Maybe<Scalars['Float']['output']>;
  genesis_minter_points?: Maybe<Scalars['Float']['output']>;
  snapshot_1_holder_points?: Maybe<Scalars['Float']['output']>;
  snapshot_2_holder_points?: Maybe<Scalars['Float']['output']>;
  snapshot_3_holder_points?: Maybe<Scalars['Float']['output']>;
  snapshot_4_holder_points?: Maybe<Scalars['Float']['output']>;
  snapshot_5_holder_points?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "calculate_total_relic_points" */
  total_relic_points?: Maybe<Scalars['Int']['output']>;
};

/** aggregate stddev_pop on columns */
export type Relic_Points_Stddev_Pop_Fields = {
  __typename?: 'relic_points_stddev_pop_fields';
  airdrop_points?: Maybe<Scalars['Float']['output']>;
  genesis_minter_points?: Maybe<Scalars['Float']['output']>;
  snapshot_1_holder_points?: Maybe<Scalars['Float']['output']>;
  snapshot_2_holder_points?: Maybe<Scalars['Float']['output']>;
  snapshot_3_holder_points?: Maybe<Scalars['Float']['output']>;
  snapshot_4_holder_points?: Maybe<Scalars['Float']['output']>;
  snapshot_5_holder_points?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "calculate_total_relic_points" */
  total_relic_points?: Maybe<Scalars['Int']['output']>;
};

/** aggregate stddev_samp on columns */
export type Relic_Points_Stddev_Samp_Fields = {
  __typename?: 'relic_points_stddev_samp_fields';
  airdrop_points?: Maybe<Scalars['Float']['output']>;
  genesis_minter_points?: Maybe<Scalars['Float']['output']>;
  snapshot_1_holder_points?: Maybe<Scalars['Float']['output']>;
  snapshot_2_holder_points?: Maybe<Scalars['Float']['output']>;
  snapshot_3_holder_points?: Maybe<Scalars['Float']['output']>;
  snapshot_4_holder_points?: Maybe<Scalars['Float']['output']>;
  snapshot_5_holder_points?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "calculate_total_relic_points" */
  total_relic_points?: Maybe<Scalars['Int']['output']>;
};

/** Streaming cursor of the table "relic_points" */
export type Relic_Points_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Relic_Points_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Relic_Points_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  airdrop_points?: InputMaybe<Scalars['bigint']['input']>;
  genesis_minter_points?: InputMaybe<Scalars['Int']['input']>;
  snapshot_1_holder_points?: InputMaybe<Scalars['Int']['input']>;
  snapshot_2_holder_points?: InputMaybe<Scalars['Int']['input']>;
  snapshot_3_holder_points?: InputMaybe<Scalars['Int']['input']>;
  snapshot_4_holder_points?: InputMaybe<Scalars['Int']['input']>;
  snapshot_5_holder_points?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Relic_Points_Sum_Fields = {
  __typename?: 'relic_points_sum_fields';
  airdrop_points?: Maybe<Scalars['bigint']['output']>;
  genesis_minter_points?: Maybe<Scalars['Int']['output']>;
  snapshot_1_holder_points?: Maybe<Scalars['Int']['output']>;
  snapshot_2_holder_points?: Maybe<Scalars['Int']['output']>;
  snapshot_3_holder_points?: Maybe<Scalars['Int']['output']>;
  snapshot_4_holder_points?: Maybe<Scalars['Int']['output']>;
  snapshot_5_holder_points?: Maybe<Scalars['Int']['output']>;
  /** A computed field, executes function "calculate_total_relic_points" */
  total_relic_points?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_pop on columns */
export type Relic_Points_Var_Pop_Fields = {
  __typename?: 'relic_points_var_pop_fields';
  airdrop_points?: Maybe<Scalars['Float']['output']>;
  genesis_minter_points?: Maybe<Scalars['Float']['output']>;
  snapshot_1_holder_points?: Maybe<Scalars['Float']['output']>;
  snapshot_2_holder_points?: Maybe<Scalars['Float']['output']>;
  snapshot_3_holder_points?: Maybe<Scalars['Float']['output']>;
  snapshot_4_holder_points?: Maybe<Scalars['Float']['output']>;
  snapshot_5_holder_points?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "calculate_total_relic_points" */
  total_relic_points?: Maybe<Scalars['Int']['output']>;
};

/** aggregate var_samp on columns */
export type Relic_Points_Var_Samp_Fields = {
  __typename?: 'relic_points_var_samp_fields';
  airdrop_points?: Maybe<Scalars['Float']['output']>;
  genesis_minter_points?: Maybe<Scalars['Float']['output']>;
  snapshot_1_holder_points?: Maybe<Scalars['Float']['output']>;
  snapshot_2_holder_points?: Maybe<Scalars['Float']['output']>;
  snapshot_3_holder_points?: Maybe<Scalars['Float']['output']>;
  snapshot_4_holder_points?: Maybe<Scalars['Float']['output']>;
  snapshot_5_holder_points?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "calculate_total_relic_points" */
  total_relic_points?: Maybe<Scalars['Int']['output']>;
};

/** aggregate variance on columns */
export type Relic_Points_Variance_Fields = {
  __typename?: 'relic_points_variance_fields';
  airdrop_points?: Maybe<Scalars['Float']['output']>;
  genesis_minter_points?: Maybe<Scalars['Float']['output']>;
  snapshot_1_holder_points?: Maybe<Scalars['Float']['output']>;
  snapshot_2_holder_points?: Maybe<Scalars['Float']['output']>;
  snapshot_3_holder_points?: Maybe<Scalars['Float']['output']>;
  snapshot_4_holder_points?: Maybe<Scalars['Float']['output']>;
  snapshot_5_holder_points?: Maybe<Scalars['Float']['output']>;
  /** A computed field, executes function "calculate_total_relic_points" */
  total_relic_points?: Maybe<Scalars['Int']['output']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** An array relationship */
  epoch_completions: Array<Epoch_Completions>;
  /** An aggregate relationship */
  epoch_completions_aggregate: Epoch_Completions_Aggregate;
  /** fetch data from the table: "epoch_completions" using primary key columns */
  epoch_completions_by_pk?: Maybe<Epoch_Completions>;
  /** fetch data from the table in a streaming manner: "epoch_completions" */
  epoch_completions_stream: Array<Epoch_Completions>;
  /** fetch data from the table: "epoch_points" */
  epoch_points: Array<Epoch_Points>;
  /** fetch aggregated fields from the table: "epoch_points" */
  epoch_points_aggregate: Epoch_Points_Aggregate;
  /** fetch data from the table: "epoch_points" using primary key columns */
  epoch_points_by_pk?: Maybe<Epoch_Points>;
  /** fetch data from the table in a streaming manner: "epoch_points" */
  epoch_points_stream: Array<Epoch_Points>;
  /** An array relationship */
  epoch_questions: Array<Epoch_Questions>;
  /** An aggregate relationship */
  epoch_questions_aggregate: Epoch_Questions_Aggregate;
  /** fetch data from the table: "epoch_questions" using primary key columns */
  epoch_questions_by_pk?: Maybe<Epoch_Questions>;
  /** fetch data from the table in a streaming manner: "epoch_questions" */
  epoch_questions_stream: Array<Epoch_Questions>;
  /** fetch data from the table: "epochs" */
  epochs: Array<Epochs>;
  /** fetch aggregated fields from the table: "epochs" */
  epochs_aggregate: Epochs_Aggregate;
  /** fetch data from the table: "epochs" using primary key columns */
  epochs_by_pk?: Maybe<Epochs>;
  /** fetch data from the table in a streaming manner: "epochs" */
  epochs_stream: Array<Epochs>;
  /** fetch data from the table: "eth_claims" */
  eth_claims: Array<Eth_Claims>;
  /** fetch data from the table: "eth_claims" using primary key columns */
  eth_claims_by_pk?: Maybe<Eth_Claims>;
  /** fetch data from the table in a streaming manner: "eth_claims" */
  eth_claims_stream: Array<Eth_Claims>;
  /** fetch data from the table: "onboarding_completions" */
  onboarding_completions: Array<Onboarding_Completions>;
  /** fetch data from the table: "onboarding_completions" using primary key columns */
  onboarding_completions_by_pk?: Maybe<Onboarding_Completions>;
  /** fetch data from the table in a streaming manner: "onboarding_completions" */
  onboarding_completions_stream: Array<Onboarding_Completions>;
  /** fetch data from the table: "onboarding_quests" */
  onboarding_quests: Array<Onboarding_Quests>;
  /** fetch data from the table: "onboarding_quests" using primary key columns */
  onboarding_quests_by_pk?: Maybe<Onboarding_Quests>;
  /** fetch data from the table in a streaming manner: "onboarding_quests" */
  onboarding_quests_stream: Array<Onboarding_Quests>;
  /** fetch data from the table: "point_events" */
  point_events: Array<Point_Events>;
  /** fetch aggregated fields from the table: "point_events" */
  point_events_aggregate: Point_Events_Aggregate;
  /** fetch data from the table: "point_events" using primary key columns */
  point_events_by_pk?: Maybe<Point_Events>;
  /** fetch data from the table in a streaming manner: "point_events" */
  point_events_stream: Array<Point_Events>;
  /** fetch data from the table: "points" */
  points: Array<Points>;
  /** fetch aggregated fields from the table: "points" */
  points_aggregate: Points_Aggregate;
  /** fetch data from the table: "points" using primary key columns */
  points_by_pk?: Maybe<Points>;
  /** fetch data from the table in a streaming manner: "points" */
  points_stream: Array<Points>;
  /** fetch data from the table: "questions" */
  questions: Array<Questions>;
  /** fetch aggregated fields from the table: "questions" */
  questions_aggregate: Questions_Aggregate;
  /** fetch data from the table: "questions" using primary key columns */
  questions_by_pk?: Maybe<Questions>;
  /** fetch data from the table in a streaming manner: "questions" */
  questions_stream: Array<Questions>;
  /** fetch data from the table: "relic_points" */
  relic_points: Array<Relic_Points>;
  /** fetch aggregated fields from the table: "relic_points" */
  relic_points_aggregate: Relic_Points_Aggregate;
  /** fetch data from the table: "relic_points" using primary key columns */
  relic_points_by_pk?: Maybe<Relic_Points>;
  /** fetch data from the table in a streaming manner: "relic_points" */
  relic_points_stream: Array<Relic_Points>;
};


export type Subscription_RootEpoch_CompletionsArgs = {
  distinct_on?: InputMaybe<Array<Epoch_Completions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Epoch_Completions_Order_By>>;
  where?: InputMaybe<Epoch_Completions_Bool_Exp>;
};


export type Subscription_RootEpoch_Completions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Epoch_Completions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Epoch_Completions_Order_By>>;
  where?: InputMaybe<Epoch_Completions_Bool_Exp>;
};


export type Subscription_RootEpoch_Completions_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootEpoch_Completions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Epoch_Completions_Stream_Cursor_Input>>;
  where?: InputMaybe<Epoch_Completions_Bool_Exp>;
};


export type Subscription_RootEpoch_PointsArgs = {
  distinct_on?: InputMaybe<Array<Epoch_Points_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Epoch_Points_Order_By>>;
  where?: InputMaybe<Epoch_Points_Bool_Exp>;
};


export type Subscription_RootEpoch_Points_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Epoch_Points_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Epoch_Points_Order_By>>;
  where?: InputMaybe<Epoch_Points_Bool_Exp>;
};


export type Subscription_RootEpoch_Points_By_PkArgs = {
  account_id: Scalars['String']['input'];
};


export type Subscription_RootEpoch_Points_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Epoch_Points_Stream_Cursor_Input>>;
  where?: InputMaybe<Epoch_Points_Bool_Exp>;
};


export type Subscription_RootEpoch_QuestionsArgs = {
  distinct_on?: InputMaybe<Array<Epoch_Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Epoch_Questions_Order_By>>;
  where?: InputMaybe<Epoch_Questions_Bool_Exp>;
};


export type Subscription_RootEpoch_Questions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Epoch_Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Epoch_Questions_Order_By>>;
  where?: InputMaybe<Epoch_Questions_Bool_Exp>;
};


export type Subscription_RootEpoch_Questions_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootEpoch_Questions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Epoch_Questions_Stream_Cursor_Input>>;
  where?: InputMaybe<Epoch_Questions_Bool_Exp>;
};


export type Subscription_RootEpochsArgs = {
  distinct_on?: InputMaybe<Array<Epochs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Epochs_Order_By>>;
  where?: InputMaybe<Epochs_Bool_Exp>;
};


export type Subscription_RootEpochs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Epochs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Epochs_Order_By>>;
  where?: InputMaybe<Epochs_Bool_Exp>;
};


export type Subscription_RootEpochs_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootEpochs_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Epochs_Stream_Cursor_Input>>;
  where?: InputMaybe<Epochs_Bool_Exp>;
};


export type Subscription_RootEth_ClaimsArgs = {
  distinct_on?: InputMaybe<Array<Eth_Claims_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Eth_Claims_Order_By>>;
  where?: InputMaybe<Eth_Claims_Bool_Exp>;
};


export type Subscription_RootEth_Claims_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootEth_Claims_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Eth_Claims_Stream_Cursor_Input>>;
  where?: InputMaybe<Eth_Claims_Bool_Exp>;
};


export type Subscription_RootOnboarding_CompletionsArgs = {
  distinct_on?: InputMaybe<Array<Onboarding_Completions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Onboarding_Completions_Order_By>>;
  where?: InputMaybe<Onboarding_Completions_Bool_Exp>;
};


export type Subscription_RootOnboarding_Completions_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootOnboarding_Completions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Onboarding_Completions_Stream_Cursor_Input>>;
  where?: InputMaybe<Onboarding_Completions_Bool_Exp>;
};


export type Subscription_RootOnboarding_QuestsArgs = {
  distinct_on?: InputMaybe<Array<Onboarding_Quests_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Onboarding_Quests_Order_By>>;
  where?: InputMaybe<Onboarding_Quests_Bool_Exp>;
};


export type Subscription_RootOnboarding_Quests_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootOnboarding_Quests_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Onboarding_Quests_Stream_Cursor_Input>>;
  where?: InputMaybe<Onboarding_Quests_Bool_Exp>;
};


export type Subscription_RootPoint_EventsArgs = {
  distinct_on?: InputMaybe<Array<Point_Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Point_Events_Order_By>>;
  where?: InputMaybe<Point_Events_Bool_Exp>;
};


export type Subscription_RootPoint_Events_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Point_Events_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Point_Events_Order_By>>;
  where?: InputMaybe<Point_Events_Bool_Exp>;
};


export type Subscription_RootPoint_Events_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootPoint_Events_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Point_Events_Stream_Cursor_Input>>;
  where?: InputMaybe<Point_Events_Bool_Exp>;
};


export type Subscription_RootPointsArgs = {
  distinct_on?: InputMaybe<Array<Points_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Points_Order_By>>;
  where?: InputMaybe<Points_Bool_Exp>;
};


export type Subscription_RootPoints_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Points_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Points_Order_By>>;
  where?: InputMaybe<Points_Bool_Exp>;
};


export type Subscription_RootPoints_By_PkArgs = {
  account_id: Scalars['String']['input'];
};


export type Subscription_RootPoints_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Points_Stream_Cursor_Input>>;
  where?: InputMaybe<Points_Bool_Exp>;
};


export type Subscription_RootQuestionsArgs = {
  distinct_on?: InputMaybe<Array<Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Questions_Order_By>>;
  where?: InputMaybe<Questions_Bool_Exp>;
};


export type Subscription_RootQuestions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Questions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Questions_Order_By>>;
  where?: InputMaybe<Questions_Bool_Exp>;
};


export type Subscription_RootQuestions_By_PkArgs = {
  id: Scalars['Int']['input'];
};


export type Subscription_RootQuestions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Questions_Stream_Cursor_Input>>;
  where?: InputMaybe<Questions_Bool_Exp>;
};


export type Subscription_RootRelic_PointsArgs = {
  distinct_on?: InputMaybe<Array<Relic_Points_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Relic_Points_Order_By>>;
  where?: InputMaybe<Relic_Points_Bool_Exp>;
};


export type Subscription_RootRelic_Points_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Relic_Points_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Relic_Points_Order_By>>;
  where?: InputMaybe<Relic_Points_Bool_Exp>;
};


export type Subscription_RootRelic_Points_By_PkArgs = {
  address: Scalars['String']['input'];
};


export type Subscription_RootRelic_Points_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Relic_Points_Stream_Cursor_Input>>;
  where?: InputMaybe<Relic_Points_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']['input']>;
  _gt?: InputMaybe<Scalars['timestamp']['input']>;
  _gte?: InputMaybe<Scalars['timestamp']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamp']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamp']['input']>;
  _lte?: InputMaybe<Scalars['timestamp']['input']>;
  _neq?: InputMaybe<Scalars['timestamp']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']['input']>>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

export type GetQuestionsQueryVariables = Exact<{
  where?: InputMaybe<Epoch_Questions_Bool_Exp>;
}>;


export type GetQuestionsQuery = { __typename?: 'query_root', epoch_questions: Array<{ __typename?: 'epoch_questions', id: number, epoch_id?: number | null, title: string, description?: string | null, point_award_amount: number, enabled?: boolean | null, order?: number | null, link?: string | null, predicate_id?: string | null, object_id?: string | null, created_at?: any | null, tag_object_id?: string | null, preferences_predicate_id?: string | null }> };

export type GetQuestionQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetQuestionQuery = { __typename?: 'query_root', epoch_questions_by_pk?: { __typename?: 'epoch_questions', id: number, epoch_id?: number | null, title: string, description?: string | null, point_award_amount: number, enabled?: boolean | null, order?: number | null, link?: string | null, predicate_id?: string | null, object_id?: string | null, created_at?: any | null, tag_object_id?: string | null, preferences_predicate_id?: string | null } | null };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const GetQuestionsDocument = new TypedDocumentString(`
    query GetQuestions($where: epoch_questions_bool_exp) {
  epoch_questions(where: $where, order_by: {order: asc}) {
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
    `) as unknown as TypedDocumentString<GetQuestionsQuery, GetQuestionsQueryVariables>;
export const GetQuestionDocument = new TypedDocumentString(`
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
    `) as unknown as TypedDocumentString<GetQuestionQuery, GetQuestionQueryVariables>;