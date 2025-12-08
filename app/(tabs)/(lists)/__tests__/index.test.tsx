/**
 * Tests for Lists Index (app/(tabs)/(lists)/index.tsx)
 * Testing ComposedImage, ListItem, and AccountIndex components
 */

import * as React from 'react';
import renderer from 'react-test-renderer';

// Mock dependencies BEFORE importing the component
jest.mock('expo-router', () => ({
  Link: ({ children, href }: any) => children,
  Stack: {
    Screen: () => null,
  },
}));

jest.mock('@reown/appkit-wagmi-react-native', () => ({
  AppKitButton: () => null,
}));

jest.mock('wagmi', () => ({
  useAccount: () => ({ address: undefined, status: 'disconnected' }),
}));

jest.mock('@tanstack/react-query', () => ({
  useQuery: () => ({ data: null, isLoading: false, error: null }),
}));

jest.mock('@/lib/graphql/execute', () => ({
  execute: jest.fn(),
}));

jest.mock('@/lib/graphql', () => ({
  graphql: jest.fn(),
}));

jest.mock('@/providers/SourcePickerProvider', () => ({
  useSourcePicker: () => ({ sourceIndex: 0, setSourceIndex: jest.fn() }),
}));

jest.mock('@/hooks/useDebounce', () => ({
  useDebounce: (value: any) => value,
}));

jest.mock('@/components/SourcePicker', () => ({
  SourcePicker: () => null,
}));

jest.mock('@/components/Themed', () => {
  const RN = require('react-native');
  return {
    Text: RN.Text,
    View: RN.View,
    useThemeColor: () => '#000000',
  };
});

jest.mock('expo-image', () => {
  const RN = require('react-native');
  return {
    Image: RN.Image,
  };
});

jest.mock('@expo/vector-icons', () => {
  const RN = require('react-native');
  return {
    Ionicons: RN.View,
  };
});

jest.mock('@/lib/utils', () => ({
  blurhash: 'mock-blurhash',
  getCachedImage: (url: string) => ({ uri: url }),
}));

// Now import the components AFTER all mocks are set up
import { ComposedImage, ListItem } from '../index';
import {
  mockTripleWithSubject,
  mockTripleWithNullSubject,
  mockTripleWithSubjectNullImage,
  mockObject,
  mockObjectWithNullTriples,
} from '@/test-utils/fixtures/lists-fixtures';

describe('ComposedImage', () => {
  it('should render fallback icon when no images', () => {
    const triples = [mockTripleWithNullSubject, mockTripleWithSubjectNullImage];
    const tree = renderer.create(<ComposedImage triples={triples} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should handle null subjects without crashing', () => {
    const triples = [mockTripleWithNullSubject];
    const tree = renderer.create(<ComposedImage triples={triples} />).toJSON();
    // Component should render (fallback icon shown when no valid images)
    expect(tree).toMatchSnapshot();
  });

  it('should render single image layout', () => {
    const triples = [mockTripleWithSubject];
    const tree = renderer.create(<ComposedImage triples={triples} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render 2-image layout', () => {
    const triples = [
      mockTripleWithSubject,
      {
        __typename: 'triples' as const,
        subject: {
          __typename: 'atoms' as const,
          term_id: 'subject-2',
          cached_image: {
            __typename: 'cached_images_cached_image' as const,
            safe: true,
            url: 'https://example.com/image2.jpg',
          },
        },
      },
    ];
    const tree = renderer.create(<ComposedImage triples={triples} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render 3-image layout', () => {
    const triples = [
      mockTripleWithSubject,
      {
        __typename: 'triples' as const,
        subject: {
          __typename: 'atoms' as const,
          term_id: 'subject-2',
          cached_image: {
            __typename: 'cached_images_cached_image' as const,
            safe: true,
            url: 'https://example.com/image2.jpg',
          },
        },
      },
      {
        __typename: 'triples' as const,
        subject: {
          __typename: 'atoms' as const,
          term_id: 'subject-3',
          cached_image: {
            __typename: 'cached_images_cached_image' as const,
            safe: true,
            url: 'https://example.com/image3.jpg',
          },
        },
      },
    ];
    const tree = renderer.create(<ComposedImage triples={triples} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render 4-image grid layout', () => {
    const triples = mockObject.as_object_triples;
    const tree = renderer.create(<ComposedImage triples={triples} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should filter out unsafe images', () => {
    const triples = [
      mockTripleWithSubject,
      {
        __typename: 'triples' as const,
        subject: {
          __typename: 'atoms' as const,
          term_id: 'subject-unsafe',
          cached_image: {
            __typename: 'cached_images_cached_image' as const,
            safe: false, // Unsafe image
            url: 'https://example.com/unsafe.jpg',
          },
        },
      },
    ];
    const tree = renderer.create(<ComposedImage triples={triples} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('ListItem', () => {
  it('should render list item correctly', () => {
    const tree = renderer.create(
      <ListItem object={mockObject} isLast={false} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render list item without separator when isLast is true', () => {
    const tree = renderer.create(
      <ListItem object={mockObject} isLast={true} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should handle object with null label', () => {
    const objectWithNullLabel = {
      ...mockObject,
      label: null,
    };
    const tree = renderer.create(
      <ListItem object={objectWithNullLabel} isLast={false} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correct member count (singular)', () => {
    const objectWithOneItem = {
      ...mockObject,
      as_object_triples_aggregate: {
        __typename: 'triples_aggregate' as const,
        aggregate: {
          __typename: 'triples_aggregate_fields' as const,
          count: 1,
        },
      },
    };
    const tree = renderer.create(
      <ListItem object={objectWithOneItem} isLast={false} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correct member count (plural)', () => {
    const tree = renderer.create(
      <ListItem object={mockObject} isLast={false} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should handle null aggregate count', () => {
    const objectWithNullCount = {
      ...mockObject,
      as_object_triples_aggregate: {
        __typename: 'triples_aggregate' as const,
        aggregate: null,
      },
    };
    const tree = renderer.create(
      <ListItem object={objectWithNullCount} isLast={false} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render list item with null triples', () => {
    const tree = renderer.create(
      <ListItem object={mockObjectWithNullTriples} isLast={false} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

// Note: AccountIndex component tests would require more complex mocking
// of useQuery, useAccount, useSourcePicker, etc. These are placeholder
// tests to demonstrate the structure. Full implementation would need
// proper provider setup.

describe('AccountIndex (integration)', () => {
  it('should export default component', () => {
    // This test just verifies the module structure
    const IndexModule = require('../index');
    expect(IndexModule.default).toBeDefined();
    expect(IndexModule.ComposedImage).toBeDefined();
    expect(IndexModule.ListItem).toBeDefined();
  });
});
