import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useQuery, gql, useSubscription } from '@apollo/client';
import React from 'react';
import Avatar from '@/components/Avatar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { formatEther } from 'viem';
import { Ionicons } from '@expo/vector-icons';

const GET_SIGNALS = gql`
subscription Signals {
  signals(limit: 5, order_by: {block_timestamp: desc}) {
    account {
      label
    }
    delta
    block_number
  }
}
`;


export default function Signals() {
  const { loading, error, data } = useSubscription(GET_SIGNALS);
  return (
    <ThemedView style={styles.container}>
      {error && <ThemedText>{error.message}</ThemedText>}
      {!loading && data && <FlashList
        data={data.signals}
        renderItem={({ item }) => <SignalListItem signal={item} />}
        estimatedItemSize={150}
      />}
    </ThemedView>
  );
}
export function SignalListItem({ signal }: { signal: any }) {
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

        <View style={styles.header}>
          <ThemedText style={styles.secondary}>{signal.account.label} -  {formatEther(signal.delta)}</ThemedText>
          <ThemedText style={styles.secondary}> - {signal.block_number}</ThemedText>
        </View>
      </TouchableOpacity>



    </ThemedView>
  );
}


const styles = StyleSheet.create({
  shortText: {
    fontSize: 11,
  },

  vaultContent: {
    flex: 1,
    padding: 16,
    marginLeft: 32,

    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
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
  header: {
    flexDirection: 'row',
    alignContent: 'space-between',
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


