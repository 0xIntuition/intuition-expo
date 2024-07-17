import { View, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useQuery, gql } from '@apollo/client';
import React from 'react';
import Avatar from '@/components/Avatar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const GET_ACCOUNTS = gql`
query Accounts {
  accounts(where: {type: {_eq: "Default"}}) {
    image
    label
    id
  }
}`;
function shortId(id: string): string {
  return id.substring(0, 6) + "..." + id.substring(id.length - 4)
}

export default function Accounts() {
  const { loading, error, data, refetch } = useQuery(GET_ACCOUNTS);

  return (
    <ThemedView style={styles.container}>
      {loading && <ThemedText>loading</ThemedText>}
      {error && <ThemedText>{error.message}</ThemedText>}
      {!loading && <FlashList
        data={data.accounts}
        renderItem={({ item }) => <AccountListItem account={item} />}
        estimatedItemSize={150}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refetch}
          />
        }
      />}
    </ThemedView>
  );
}
export function AccountListItem({ account }: { account: any }) {
  return (
    <ThemedView style={styles.listContainer}>

      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => {
          // navigation.navigate('Profile', {
          //   userId,
          // });
        }}
        style={styles.profileLayout}>
        <Avatar image={account.image} style={styles.avatar} />

        <View>
          <ThemedText style={styles.name}>{account.label}</ThemedText>
          <ThemedText style={styles.secondary}>{shortId(account.id)}</ThemedText>
        </View>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
  },
  listContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingRight: 16,
    borderBottomWidth: 1,
    // borderBottomStyle: 'solid',
    borderBottomColor: '#ddd',
  },
  masonryContainer: {
    flex: 1,
    marginTop: 10,
    marginRight: 10,
    padding: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ddd',
    borderRadius: 8,
  },
  avatar: {
    marginRight: 10,
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  secondary: {
    color: '#888',
  },
  profileLayout: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  interactionsLayout: {
    flexDirection: 'row',
  },
  interaction: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#aaa',
    marginRight: 20,
    marginTop: 12,
  },
  icon: {
    marginRight: 4,
  },
});


