import { Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { Text, View } from '@/components/Themed';
import { graphql } from '@/lib/graphql';
import { useQuery } from '@tanstack/react-query';
import { execute } from '@/lib/graphql/execute';
import { useEffect } from 'react';
import { blurhash, getCachedImage } from '@/lib/utils';

const GetAccountQuery = graphql(`
query GetAccount($id: String!) {
  account(id: $id) {
    id
    label
    atom {
      cached_image {
        url
        safe
      }
    }
  }
}
`);

export default function Account() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const { id } = useLocalSearchParams();
  const accountId = Array.isArray(id) ? id[0] : id

  const { data, isLoading } = useQuery({
    queryKey: ['getAccount', id],
    queryFn: () => execute(GetAccountQuery, {
      id: accountId
    })
  })

  return (

    <ScrollView contentContainerStyle={styles.container}>
      {isLoading && <Text>Loading</Text>}
      {data !== undefined && <View>

        {data.account?.atom?.cached_image !== null &&
          <Image source={getCachedImage(data.account?.atom?.cached_image?.url)} placeholder={blurhash}
            blurRadius={data.account?.atom?.cached_image?.safe ? 0 : 5}
            style={styles.image} />}
        <Text style={styles.title}>{data.account?.label}</Text>

      </View>}


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  image: {
    height: 150,
    width: 150,
  },
});
