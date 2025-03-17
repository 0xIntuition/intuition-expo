import { Button, SafeAreaView, View, Pressable, ScrollView, Platform } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery, gql } from '@apollo/client';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { shareAsync } from 'expo-sharing';
import Chat from '@/components/Chat';
import { systemPrompt } from '@/lib/system-prompt';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeColor } from '@/hooks/useThemeColor';
import TriplesList from './TriplesList';
import Avatar from './Avatar';
const GET_ACCOUNT = gql`
query AccountInfo($id: String!) {
  account(id: $id) {
    id
    label
    image
    atom {
      id
      tags: as_subject_triples(
        where: {
          predicate: { type: { _eq: "Keywords" } }
          vault: { position_count: { _gt: 0 } }
        }
      ) {
        id
        predicate {
          label
          type
        }
        object {
          id
          label
        }
      }
    }
    claims {
      id
      subject {
        id
        type
        label
        image
      }
      predicate {
        id
        type
        label
        image
      }
      object {
        id
        type
        label
        image
      }

      shares
      vault {
        id
        total_shares
        position_count
        current_share_price
      }
      counter_shares
      counter_vault {
        id
        total_shares
        position_count
        current_share_price
      }
    }
  }
}`;

export function AccountInfo({ id }: { id: string }) {

  const textColor = useThemeColor({}, 'text');
  const secondaryTextColor = useThemeColor({}, 'textSecondary');
  const backgroundColor = useThemeColor({}, 'background');
  const backgroundSecondaryColor = useThemeColor({}, 'backgroundSecondary');

  const router = useRouter();
  const { loading, error, data, refetch } = useQuery(GET_ACCOUNT, { variables: { id: id.toString().toLowerCase() } });

  if (loading) return <ThemedText>Loading...</ThemedText>;
  if (error) return <ThemedText>{error.message}</ThemedText>;

  if (!data.account) {
    return <ThemedText>Account not found</ThemedText>;
  }

  const account = data.account;
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Link href={`/acc-ai/${id}`} style={{ marginRight: 10 }}>
              <Ionicons name="chatbubble-ellipses-outline" size={24} color={textColor} />
            </Link>
            <Pressable onPress={async () => {
              await shareAsync('https://app.i7n.xyz/acc/' + id);
            }} style={{ marginRight: 10 }}>
              <Ionicons name="share-outline" size={24} color={textColor} />
            </Pressable>

          </View>,
          headerTitle: () => <View style={styles.header} >
            {account.image !== null && <Image style={styles.image} source={{ uri: account.image }} />}
            <ThemedText>{account.label}</ThemedText>
          </View>,
        }}
      />
      <ScrollView style={{ padding: 8, height: 100, flexGrow: 0 }}>
        <ThemedView style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 }}>
          {data?.account?.atom?.tags.map((claim: any) => (
            <Link href={`/t/${claim.id}`} key={claim.id}>
              <ThemedView style={[styles.keywordContainer, { backgroundColor: backgroundSecondaryColor, marginRight: 4 }]}>
                <ThemedText key={claim.id} style={styles.keyword}>{claim.object.label}</ThemedText>
              </ThemedView>
            </Link>
          ))}
          <ThemedView style={{ marginRight: 4 }}>
            <Avatar size={24} radius={24} id={data?.account?.id} style={{ marginRight: 4, marginTop: Platform.OS === 'ios' ? 4 : 8 }} />
          </ThemedView>
        </ThemedView>
      </ScrollView>
      {/* {data?.account?.atom?.as_subject_claims.map((claim: any) => (
          <ThemedText key={claim.predicate.label}>{claim.predicate.label}: {claim.object.label}</ThemedText>
        ))} */}

      <TriplesList triples={data?.account?.claims.map((claim: any) => ({
        ...claim,
        id: Number(claim.id.split('-')[0]),
        vault: {
          ...claim.vault,
          positions: [{
            shares: claim.shares,
            account_id: data?.account.id
          }]
        },
        counter_vault: {
          ...claim.counter_vault,
          positions: [{
            shares: claim.counter_shares,
            account_id: data?.account.id
          }]
        }
      }))} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  keywordContainer: {
    marginTop: 4,
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
    marginVertical: 2,
  },
  keyword: {
    fontSize: 12,
  },
});
