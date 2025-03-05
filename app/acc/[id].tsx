import { Button, SafeAreaView, View, Pressable } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { useQuery, gql } from '@apollo/client';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { shareAsync } from 'expo-sharing';
import Chat from '@/components/Chat';
import { systemPrompt } from '@/lib/system-prompt';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useThemeColor } from '@/hooks/useThemeColor';
const GET_ACCOUNT = gql`
query Account($id: String!) {
  account(id: $id) {
    id
    label
    image
    atom {
      id
      as_subject_claims {
        predicate {
          label
        }
        object {
          label
        }
      }
    }
  }
}`;

export default function Account() {
  const textColor = useThemeColor({}, 'text');
  const { id } = useLocalSearchParams();
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
          headerRight: () => <Pressable onPress={async () => {
            await shareAsync('https://app.i7n.xyz/acc/' + id);
          }} style={{ marginRight: 10 }}>
            <Ionicons name="share-outline" size={24} color={textColor} />
          </Pressable>,
          headerTitle: () => <View style={styles.header} >
            {account.image !== null && <Image style={styles.image} source={{ uri: account.image }} />}
            <ThemedText>{account.label}</ThemedText>
          </View>,
        }}
      />
      <SafeAreaView style={styles.container}>
        <Chat
          assistantMessage={`What do you want to know about ${account.label}?`}
          systemPrompt={`${systemPrompt} You that can answer questions about ${account.label} ${account.id}.`}
          sampleQuestions={[
            `Summary of the account`,
          ]}
        />
      </SafeAreaView>
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
  },
});
