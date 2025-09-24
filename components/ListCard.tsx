import React from 'react';
import { Pressable, StyleSheet, Platform, ViewStyle, View } from 'react-native';
import { Image } from 'expo-image';
import { Text, useThemeColor } from '@/components/Themed';
import { Link } from 'expo-router';
import { blurhash, getCachedImage } from '@/lib/utils';

interface CachedImage {
  safe?: boolean;
  url?: string;
}

interface Subject {
  term_id: string;
  cached_image?: CachedImage;
}

interface Triple {
  subject: Subject;
}

interface ListObject {
  term_id: string;
  label: string;
  cached_image?: CachedImage;
  value?: {
    thing?: {
      description?: string;
    };
  };
  as_object_triples: Triple[];
  as_object_triples_aggregate: {
    aggregate: {
      count: number;
    };
  };
}

interface ListCardProps {
  id: string;
  triple_count: number;
  object: ListObject;
}

const Avatar: React.FC<{ imageUrl?: string; fallback?: string }> = ({ imageUrl, fallback }) => {
  const backgroundColor = useThemeColor({}, 'tabIconDefault');

  return (
    <View style={[styles.avatar, { backgroundColor }]}>
      {imageUrl ? (
        <Image
          source={getCachedImage(imageUrl)}
          placeholder={blurhash}
          style={styles.avatarImage}
        />
      ) : (
        <Text style={styles.avatarText}>{fallback || '?'}</Text>
      )}
    </View>
  );
};

const AvatarStack: React.FC<{ triples: Triple[]; totalCount: number }> = ({ triples, totalCount }) => {
  const visibleAvatars = triples.slice(0, 4);
  const remainingCount = totalCount - visibleAvatars.length;

  return (
    <View style={styles.avatarStack}>
      {visibleAvatars.map((triple, index) => (
        <View key={triple.subject.term_id} style={[styles.avatarWrapper, { marginLeft: index > 0 ? -8 : 0 }]}>
          <Avatar
            imageUrl={triple.subject.cached_image?.safe ? triple.subject.cached_image.url : undefined}
            fallback={triple.subject.term_id.slice(0, 2).toUpperCase()}
          />
        </View>
      ))}
      {remainingCount > 0 && (
        <View style={[styles.avatarWrapper, { marginLeft: visibleAvatars.length > 0 ? -8 : 0 }]}>
          <View style={styles.moreAvatar}>
            <Text style={styles.moreAvatarText}>+{remainingCount}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export const ListCard: React.FC<ListCardProps> = ({ id, triple_count, object }) => {
  const cardBackgroundColor = useThemeColor({}, 'secondaryBackground');
  const borderColor = useThemeColor({ light: '#e1e1e1', dark: '#333' }, 'tabIconDefault');
  const textColor = useThemeColor({}, 'text');

  const cardStyle: ViewStyle = {
    ...styles.card,
    backgroundColor: cardBackgroundColor,
    borderColor,
    ...(Platform.OS === 'ios' ? {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    } : {
      elevation: 3,
    }),
  };

  const memberCount = object.as_object_triples_aggregate.aggregate.count;

  return (
    <Link href={`/explore/list/${object.term_id}`} asChild>
      <Pressable
        style={({ pressed }) => [
          cardStyle,
          pressed && styles.cardPressed,
        ]}
      >
        <View style={cardStyle}>
          <View style={styles.cardHeader}>
            {object.cached_image?.url && (
              <Image
                source={getCachedImage(object.cached_image.url)}
                placeholder={blurhash}
                blurRadius={object.cached_image?.safe ? 0 : 5}
                style={styles.listIcon}
              />
            )}
            <View style={styles.titleContainer}>
              <Text style={[styles.title, { color: textColor }]} numberOfLines={2}>
                {object.label}
              </Text>
              <AvatarStack
                triples={object.as_object_triples}
                totalCount={memberCount}
              />

            </View>
          </View>


        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginBottom: 8,
    padding: 10,
    overflow: 'hidden',
  },
  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  listIcon: {
    width: 52,
    height: 52,
    borderRadius: 8,
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  avatarImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  avatarText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  moreAvatar: {
    paddingHorizontal: 8,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(100,100,100,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  moreAvatarText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  memberCount: {
    fontSize: 12,
    fontWeight: '500',
  },
});
