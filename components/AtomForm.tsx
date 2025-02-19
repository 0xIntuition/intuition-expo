import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { ListItem } from '@/components/list-item';
import { Address } from 'viem';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from './ThemedView';
// Define AtomData type based on the expected response
export interface AtomFormProps {
  image?: string;
  name?: string;
  description?: string;
  url?: string | null;
  type?: string;
  onSuccess?: () => void;
}


const AtomForm: React.FC<AtomFormProps> = (props) => {


  return (
    <ThemedView>
      <Image source={{ uri: props.image }} style={styles.image} />
      <ThemedText style={styles.text}>
        {props.name}
      </ThemedText>
      <ThemedText style={styles.text}>
        {props.description}
      </ThemedText>
      <ThemedText style={styles.text}>
        {props.url}
      </ThemedText>
    </ThemedView>
  );
};

export default AtomForm;
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
  },
}); 