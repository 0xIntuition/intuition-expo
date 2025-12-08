/**
 * Test fixtures for lists functionality
 * Mock data matching GraphQL types from app/(tabs)/(lists)/index.tsx
 */

export const mockCachedImage = {
  __typename: 'cached_images_cached_image' as const,
  safe: true,
  url: 'https://example.com/image.jpg',
};

export const mockSubject = {
  __typename: 'atoms' as const,
  term_id: 'subject-1',
  cached_image: mockCachedImage,
};

export const mockSubjectWithNullImage = {
  __typename: 'atoms' as const,
  term_id: 'subject-2',
  cached_image: null,
};

export const mockTripleWithSubject = {
  __typename: 'triples' as const,
  subject: mockSubject,
};

export const mockTripleWithNullSubject = {
  __typename: 'triples' as const,
  subject: null,
};

export const mockTripleWithSubjectNullImage = {
  __typename: 'triples' as const,
  subject: mockSubjectWithNullImage,
};

export const mockObject = {
  __typename: 'atoms' as const,
  term_id: 'object-1',
  label: 'Test List',
  cached_image: mockCachedImage,
  as_object_triples: [
    mockTripleWithSubject,
    {
      __typename: 'triples' as const,
      subject: {
        __typename: 'atoms' as const,
        term_id: 'subject-2',
        cached_image: { __typename: 'cached_images_cached_image' as const, safe: true, url: 'https://example.com/image2.jpg' },
      },
    },
    {
      __typename: 'triples' as const,
      subject: {
        __typename: 'atoms' as const,
        term_id: 'subject-3',
        cached_image: { __typename: 'cached_images_cached_image' as const, safe: true, url: 'https://example.com/image3.jpg' },
      },
    },
    {
      __typename: 'triples' as const,
      subject: {
        __typename: 'atoms' as const,
        term_id: 'subject-4',
        cached_image: { __typename: 'cached_images_cached_image' as const, safe: true, url: 'https://example.com/image4.jpg' },
      },
    },
  ],
  as_object_triples_aggregate: {
    __typename: 'triples_aggregate' as const,
    aggregate: {
      __typename: 'triples_aggregate_fields' as const,
      count: 4,
    },
  },
};

export const mockObjectWithNullTriples = {
  __typename: 'atoms' as const,
  term_id: 'object-2',
  label: 'Empty List',
  cached_image: null,
  as_object_triples: [mockTripleWithNullSubject, mockTripleWithSubjectNullImage],
  as_object_triples_aggregate: {
    __typename: 'triples_aggregate' as const,
    aggregate: {
      __typename: 'triples_aggregate_fields' as const,
      count: 0,
    },
  },
};

export const mockPredicateObject = {
  __typename: 'predicate_objects' as const,
  object: mockObject,
};

export const mockPredicateObjectWithNull = {
  __typename: 'predicate_objects' as const,
  object: null,
};

export const mockQueryData = {
  predicate_objects: [
    mockPredicateObject,
    {
      __typename: 'predicate_objects' as const,
      object: {
        __typename: 'atoms' as const,
        term_id: 'object-2',
        label: 'Another List',
        cached_image: null,
        as_object_triples: [],
        as_object_triples_aggregate: {
          __typename: 'triples_aggregate' as const,
          aggregate: {
            __typename: 'triples_aggregate_fields' as const,
            count: 0,
          },
        },
      },
    },
  ],
};

export const mockQueryDataWithNulls = {
  predicate_objects: [
    mockPredicateObject,
    mockPredicateObjectWithNull,
    {
      __typename: 'predicate_objects' as const,
      object: mockObjectWithNullTriples,
    },
  ],
};

export const mockEmptyQueryData = {
  predicate_objects: [],
};
