import { Link, Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import { StyleSheet, ScrollView, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View } from '@/components/Themed';
import { graphql } from '@/lib/graphql';
import { useQuery } from '@tanstack/react-query';
import { execute } from '@/lib/graphql/execute';
import { useEffect } from 'react';
import { blurhash, getCachedImage } from '@/lib/utils';

const GetTripleQuery = graphql(`
query GetTriple($term_id: String!) {
  triple(term_id: $term_id) {
    subject {
      term_id
      label
      cached_image {
        url
        safe
      }
    }
    predicate {
      term_id
      label
      cached_image {
        url
        safe
      }
    }
    object {
      term_id
      label
      cached_image {
        url
        safe
      }
    }
  }
}
`);

export default function Triple() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const { id } = useLocalSearchParams();
  const termId = Array.isArray(id) ? id[0] : id

  const { data, isLoading } = useQuery({
    queryKey: ['getTriple', id],
    queryFn: () => execute(GetTripleQuery, {
      term_id: termId
    })
  })

  return (

    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView contentContainerStyle={styles.container}>
          {isLoading && <Text>Loading</Text>}
          {data !== undefined && <View>

            <Link href={`../atom/${data.triple?.subject?.term_id}`} asChild>
              <Pressable>
                {data.triple?.subject?.cached_image !== null &&
                  <Image
                    source={getCachedImage(data.triple?.subject?.cached_image?.url)}
                    blurRadius={data.triple?.subject.cached_image?.safe ? 0 : 5}
                    style={styles.image}
                    placeholder={blurhash}
                  />}
                <Text>{data.triple?.subject?.label}</Text>
              </Pressable>
            </Link>

            <Link href={`../atom/${data.triple?.predicate?.term_id}`} asChild>
              <Pressable>
                {data.triple?.predicate?.cached_image !== null &&
                  <Image
                    source={getCachedImage(data.triple?.predicate?.cached_image?.url)}
                    blurRadius={data.triple?.predicate.cached_image?.safe ? 0 : 5}
                    style={styles.image}
                    placeholder={blurhash}
                  />}
                <Text>{data.triple?.predicate?.label}</Text>
              </Pressable>
            </Link>

            <Link href={`../atom/${data.triple?.object?.term_id}`} asChild>
              <Pressable>
                {data.triple?.object?.cached_image !== null &&
                  <Image
                    source={getCachedImage(data.triple?.object?.cached_image?.url)}
                    blurRadius={data.triple?.object.cached_image?.safe ? 0 : 5}
                    style={styles.image}
                    placeholder={blurhash}
                  />}
                <Text>{data.triple?.object?.label}</Text>
              </Pressable>
            </Link>

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
    height: 50,
    width: 50,
  },
});

