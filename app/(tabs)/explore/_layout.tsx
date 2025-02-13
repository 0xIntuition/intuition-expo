import React, { memo, useMemo } from 'react';
import { Text, View, Pressable, useWindowDimensions } from 'react-native';
import { useQuery } from '@apollo/client';
import { gql } from '@/lib/generated';
import { Link, Slot, usePathname, router } from 'expo-router';
import { StyleSheet } from 'react-native';

const GET_AGGREGATES = gql(`
  query GetAggregates {
    accounts_aggregate {
      aggregate {
        count
      }
    }
    atoms_aggregate {
      aggregate {
        count
      }
    }
    triples_aggregate {
      aggregate {
        count
      }
    }
  }
`);

const WIDE_SCREEN_THRESHOLD = 768;

const NavigationMenu = memo(({ data, loading, pathname }: { data: any; loading: boolean; pathname: string }) => (
  <View style={styles.header}>
    <Link href="/explore/atoms" asChild>
      <Pressable style={{ ...styles.item, ...(pathname === '/explore/atoms' ? styles.activeItem : {}) }}>
        <Text style={{ ...styles.title, ...(pathname === '/explore/atoms' ? styles.activeText : {}) }}>Atoms</Text>
        <Text style={{ ...styles.count, ...(pathname === '/explore/atoms' ? styles.activeText : {}) }}>
          {loading ? '...' : data?.atoms_aggregate.aggregate?.count ?? 0}
        </Text>
      </Pressable>
    </Link>

    <Link href="/explore/triples" asChild>
      <Pressable style={{ ...styles.item, ...(pathname === '/explore/triples' ? styles.activeItem : {}) }}>
        <Text style={{ ...styles.title, ...(pathname === '/explore/triples' ? styles.activeText : {}) }}>Triples</Text>
        <Text style={{ ...styles.count, ...(pathname === '/explore/triples' ? styles.activeText : {}) }}>
          {loading ? '...' : data?.triples_aggregate.aggregate?.count ?? 0}
        </Text>
      </Pressable>
    </Link>

    <Link href="/explore/accounts" asChild>
      <Pressable style={{ ...styles.item, ...(pathname === '/explore/accounts' ? styles.activeItem : {}) }}>
        <Text style={{ ...styles.title, ...(pathname === '/explore/accounts' ? styles.activeText : {}) }}>Accounts</Text>
        <Text style={{ ...styles.count, ...(pathname === '/explore/accounts' ? styles.activeText : {}) }}>
          {loading ? '...' : data?.accounts_aggregate.aggregate?.count ?? 0}
        </Text>
      </Pressable>
    </Link>
  </View>
));

const MobileHeader = memo(({ title }: { title: string }) => (
  <View style={styles.mobileHeader}>
    <Pressable onPress={() => router.back()} style={styles.backButton}>
      <Text style={styles.backText}>←</Text>
    </Pressable>
    <Text style={styles.mobileTitle}>{title}</Text>
  </View>
));

const LayoutContent = memo(({ isWideScreen, isExploreRoot, data, loading, pathname }: {
  isWideScreen: boolean;
  isExploreRoot: boolean;
  data: any;
  loading: boolean;
  pathname: string;
}) => {
  const getTitle = () => {
    if (pathname.includes('atoms')) return 'Atoms';
    if (pathname.includes('triples')) return 'Triples';
    if (pathname.includes('accounts')) return 'Accounts';
    return 'Explore';
  };

  if (isWideScreen) {
    return (
      <View style={[styles.container, styles.wideContainer]}>
        <View style={styles.wideInner}>
          <NavigationMenu data={data} loading={loading} pathname={pathname} />
          <View style={[styles.content, styles.wideContent]}>
            <Slot />
          </View>
          <View style={styles.rightColumn} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isExploreRoot ? (
        <>
          <NavigationMenu data={data} loading={loading} pathname={pathname} />
          <Slot />
        </>
      ) : (
        <>
          <MobileHeader title={getTitle()} />
          <Slot />
        </>
      )}
    </View>
  );
});

export default function ExploreLayout() {
  const { data, loading } = useQuery(GET_AGGREGATES);
  const pathname = usePathname();
  const { width } = useWindowDimensions();
  const isWideScreen = width >= WIDE_SCREEN_THRESHOLD;
  const isExploreRoot = pathname === '/explore';

  return (
    <LayoutContent
      isWideScreen={isWideScreen}
      isExploreRoot={isExploreRoot}
      data={data}
      loading={loading}
      pathname={pathname}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wideContainer: {
    paddingLeft: '20%',
    paddingRight: '20%',
  },
  wideInner: {
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
  },
  wideContent: {
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(100,100,100,0.5)',
  },
  rightColumn: {
    width: '20%',
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(100,100,100,0.5)',
  },
  header: {
    padding: 16,
    gap: 16,
    minWidth: 250,
  },
  item: {
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
  },
  count: {
    fontSize: 16,
    opacity: 0.7,
    color: '#fff',
  },
  activeItem: {
    backgroundColor: '#333',
    borderColor: '#666',
    borderWidth: 1,
  },
  activeText: {
    opacity: 1,
    color: '#fff',
  },
  mobileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(100,100,100,0.5)',
  },
  backButton: {
    marginRight: 16,
  },
  backText: {
    color: '#fff',
    fontSize: 24,
  },
  mobileTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});