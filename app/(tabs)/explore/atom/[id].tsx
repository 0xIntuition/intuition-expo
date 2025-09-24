import { Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import { StyleSheet, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View } from '@/components/Themed';
import { graphql } from '@/lib/graphql';
import { useQuery } from '@tanstack/react-query';
import { execute } from '@/lib/graphql/execute';
import { useEffect } from 'react';
import { blurhash, getCachedImage } from '@/lib/utils';

const GetAtomQuery = graphql(`
query GetAtom($term_id: String!) {
  atom(term_id: $term_id) {
    label
    cached_image {
      url
      safe
    }
  }
}
`);

export default function Atom() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const { id } = useLocalSearchParams();
  const termId = Array.isArray(id) ? id[0] : id

  const { data, isLoading } = useQuery({
    queryKey: ['getAtom', id],
    queryFn: () => execute(GetAtomQuery, {
      term_id: termId
    })
  })

  return (

    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView>
          {isLoading && <Text>Loading</Text>}
          {data !== undefined && <View>

            {data.atom?.cached_image !== null &&
              <Image source={getCachedImage(data.atom?.cached_image?.url)} placeholder={blurhash}
                blurRadius={data.atom?.cached_image?.safe ? 0 : 5}
                style={styles.image} />}
            <Text style={styles.title}>{data.atom?.label}</Text>

          </View>}


        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
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

