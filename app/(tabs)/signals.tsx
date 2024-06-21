import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useQuery, gql } from '@apollo/client';
import React from 'react';
import Avatar from '@/components/Avatar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { formatEther } from 'viem';
import { Ionicons } from '@expo/vector-icons';

const GET_SIGNALS = gql`
query Signals {
  signals(where: {relativeStrength_gt: "0"}) {
    delta
    relativeStrength
    account {
      label
      image
    }
    redemption {
      vault {
        positions {
          balance
          account {
            label
            image
          }
        }
        atom {
          emoji
          label
        }
        triple {
          subject {
            emoji
            label
          }
          predicate {
            emoji
            label
          }
          object {
            emoji
            label
          }
        }
      }
    }
    deposit {
      vault {
        positions {
          balance
          account {
            label
            image
          }
        }
        atom {
          emoji
          label
        }
        triple {
          subject {
            emoji
            label
          }
          predicate {
            emoji
            label
          }
          object {
            emoji
            label
          }
        }
      }
    }
  }
}
`;


export default function Signals() {
  const { loading, error, data } = useQuery(GET_SIGNALS);
  return (
    <ThemedView style={styles.container}>
      {!loading && <FlashList
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
        <Avatar image={signal.account.image} style={styles.avatar} />

        <View style={styles.header}>
          <ThemedText style={styles.name}>{signal.account.label}</ThemedText>
          <ThemedText style={styles.secondary}> {formatEther(signal.delta)}</ThemedText>
          <ThemedText style={styles.secondary}> {signal.relativeStrength}</ThemedText>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => {
          // navigation.navigate('Profile', {
          //   userId,
          // });
        }}
        style={styles.profileLayout}>

        {signal.deposit !== null && <VaultContent vault={signal.deposit.vault} />}
        {signal.redemption !== null && <VaultContent vault={signal.redemption.vault} />}
      </TouchableOpacity>

      <View style={styles.interactionsLayout}>
        <View style={styles.interaction}>
          <Ionicons
            name="heart-outline"
            size={18}
            color="#aaa"
            style={styles.icon}
          />
          <ThemedText style={styles.secondary}>{3}</ThemedText>
        </View>
      </View>
    </ThemedView>
  );
}

function VaultContent({ vault }: { vault: any }) {
  return (
    <View style={styles.vaultContent}>
      {vault.atom !== null && <ThemedText style={styles.shortText}>{vault.atom.emoji} {vault.atom.label}</ThemedText>}
      {vault.triple !== null && <>
        <ThemedText style={styles.shortText}>{vault.triple.subject.emoji} {vault.triple.subject.label}</ThemedText>
        <ThemedText style={styles.shortText}>{vault.triple.predicate.emoji} {vault.triple.predicate.label} {vault.triple.object.emoji} {vault.triple.object.label}</ThemedText>
      </>}
    </View>
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


