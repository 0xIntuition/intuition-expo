import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { ListItem } from '@/components/list-item';
import { Address } from 'viem';
import { ThemedText } from '@/components/ThemedText';

// Define a type for the cached_image sub-object
interface CachedImage {
  safe: boolean;
  url: string;
}

// Define AtomData type based on the expected response
export interface AtomData {
  id: string;
  emoji?: string;
  image?: string;
  cached_image?: CachedImage;
  label?: string;
  type?: string;
}

type LayoutType = 'text' | 'text-avatar' | 'list-item' | 'summary-card' | 'details';

interface AtomProps {
  atom: AtomData;
  layout: LayoutType;
}

const Atom: React.FC<AtomProps> = ({ atom, layout }) => {
  const imageUrl = atom.cached_image?.url || atom.image;
  switch (layout) {
    case 'text':
      return (
        <ThemedText style={styles.text}>
          {atom.emoji ? `${atom.emoji} ` : ''}{atom.label}
        </ThemedText>
      );

    case 'text-avatar':
      return (
        <View style={styles.row}>
          {imageUrl && (
            <Image
              source={{ uri: imageUrl }}
              style={styles.avatar}
            />
          )}
          <ThemedText style={[styles.text, { marginLeft: 8, marginRight: 8 }]}>
            {!imageUrl ? `${atom.emoji} ` : ''}{atom.label}
          </ThemedText>
        </View>
      );

    case 'list-item':
      return (
        <ListItem
          image={imageUrl}
          label={atom.label || ''}
          subLabel={atom.type || ''}
          id={atom.id as Address}
        />
      );

    case 'summary-card':
      return (
        <View style={styles.card}>
          <ThemedText style={styles.cardTitle}>
            {atom.emoji ? `${atom.emoji} ` : ''}{atom.label}
          </ThemedText>
          {atom.cached_image?.url && (
            <Image
              source={{ uri: imageUrl }}
              style={styles.cardImage}
            />
          )}
          {atom.type && <ThemedText style={styles.cardType}>{atom.type}</ThemedText>}
        </View>
      );

    case 'details':
      return (
        <View style={styles.detailsContainer}>
          <ThemedText style={styles.detailText}>ID: {atom.id}</ThemedText>
          <ThemedText style={styles.detailText}>
            Label: {atom.emoji ? `${atom.emoji} ` : ''}{atom.label}
          </ThemedText>
          {atom.type && <ThemedText style={styles.detailText}>Type: {atom.type}</ThemedText>}
          {imageUrl && (
            <Image
              source={{ uri: imageUrl }}
              style={styles.detailImage}
            />
          )}
        </View>
      );

    default:
      return null;
  }
};

export default Atom;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  text: {
    fontSize: 16,
  },
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 18,
  },
  cardImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  cardType: {
    fontStyle: 'italic',
  },
  detailsContainer: {
    padding: 16,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 4,
  },
  detailImage: {
    width: 100,
    height: 100,
    marginTop: 8,
  },
}); 