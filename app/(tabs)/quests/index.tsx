import { Pressable, StyleSheet, View as RNView } from 'react-native';
import { ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { Text, View, useThemeColor } from '@/components/Themed';
import { Link, useNavigation } from 'expo-router';
import { QUESTS } from '@/constants/quests';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect } from 'react';

export default function Quests() {
  const backgroundColor = useThemeColor({}, 'background');
  const cardBackground = useThemeColor({}, 'secondaryBackground');
  const borderColor = useThemeColor({}, 'border');
  const textColor = useThemeColor({}, 'text');
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: 'Quests' });
  }, []);


  const getIconName = (iconType: string) => {
    switch (iconType) {
      case 'book': return 'menu-book';
      case 'globe': return 'language';
      case 'person': return 'person';
      default: return 'circle';
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.container, { backgroundColor }]} edges={['top']}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {QUESTS.map((quest) => (
            <View key={quest.index} style={[styles.card, { backgroundColor: cardBackground, borderColor }]}>
              <Link href={quest.link} asChild>
                <Pressable style={styles.cardContent}>
                  <View style={[styles.iconContainer, { borderColor }]}>
                    <MaterialIcons
                      name={getIconName(quest.icon)}
                      size={32}
                      color={textColor}
                    />
                    <Text style={[styles.romanNumeral, { color: textColor }]}>
                      {quest.romanNumeral}
                    </Text>
                  </View>
                  <RNView style={styles.textContent}>
                    <Text style={[styles.title, { color: textColor }]}>{quest.title}</Text>
                    <Text style={[styles.description, { color: textColor }]}>{quest.description}</Text>
                  </RNView>
                </Pressable>
              </Link>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  romanNumeral: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    opacity: 0.8,
  },
});
