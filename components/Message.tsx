import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';


import Avatar from './Avatar';
const USERS = [
  {
    name: 'Natalia Rodman',
    handle: 'natrod',
    about: 'Developing, herding cats, and eating avocados.',
    followers: 17,
    following: 11,
    color: '#FFB84C',
  },
  {
    name: 'Elijah Summers',
    handle: 'elisum',
    about: 'Passionate coder, coffee addict, and book lover.',
    followers: 312,
    following: 248,
    color: '#2CD3E1'
  },
  {
    name: 'Olivia Johnson',
    handle: 'olijoh',
    about: 'UI/UX designer, nature enthusiast, and yoga practitioner.',
    followers: 754,
    following: 612,
    color: '#F266AB'
  },
  {
    name: 'Maxwell Foster',
    handle: 'maxfos',
    about: 'Frontend developer, music lover, and travel junkie.',
    followers: 521,
    following: 398,
    color: '#F45050'
  },
  {
    name: 'Sophia Ruiz',
    handle: 'sopruiz',
    about: 'Full-stack developer, foodie, and dog person.',
    followers: 1256,
    following: 873,
    color: '#A459D1'
  },
  {
    name: 'Sebastian Lee',
    handle: 'sebalee',
    about: 'Software engineer, gamer, and anime enthusiast.',
    followers: 981,
    following: 789,
    color: '#00AF91'
  },
  {
    name: 'Ava Chen',
    handle: 'avache',
    about: 'Data scientist, fitness enthusiast, and beach lover.',
    followers: 412,
    following: 268,
    color: '#007965'
  },
  {
    name: 'Ethan Watson',
    handle: 'ethwat',
    about: 'Backend developer, coffee connoisseur, and soccer fan.',
    followers: 672,
    following: 521,
    color: '#FF6000'
  },
  {
    name: 'Isabella Liu',
    handle: 'isaliu',
    about: 'Mobile app developer, photography lover, and hiker.',
    followers: 1037,
    following: 846,
    color: '#3DB2FF'
  },
];
export function Message({
  //@ts-ignore
  message,
  //@ts-ignore
  userId,
  //@ts-ignore
  likes,
  //@ts-ignore
  replies,
  masonry = false,
  skipHeader = false,
}) {
  const navigation = useNavigation();
  return (
    <View style={masonry ? styles.masonryContainer : styles.listContainer}>
      {!skipHeader && (
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => {
            // navigation.navigate('Profile', {
            //   userId,
            // });
          }}
          style={styles.profileLayout}>
          <Avatar userId={userId} style={styles.avatar} />
          <View>
            <Text style={styles.name}>{USERS[userId].name}</Text>
            <Text style={styles.secondary}>@{USERS[userId].handle}</Text>
          </View>
        </TouchableOpacity>
      )}
      <Text>{message}</Text>
      <View style={styles.interactionsLayout}>
        <View style={styles.interaction}>
          <Ionicons
            name="heart-outline"
            size={18}
            color="#aaa"
            style={styles.icon}
          />
          <Text style={styles.secondary}>{likes}</Text>
        </View>
        <View style={styles.interaction}>
          <Ionicons
            size={18}
            color="#aaa"
            style={styles.icon}
          />
          <Text style={styles.secondary}>{replies}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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

