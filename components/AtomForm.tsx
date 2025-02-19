import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, Button, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedInput } from './ThemedInput';
import { ThemedView } from './ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
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
  const color = useThemeColor({}, 'text');
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [url, setUrl] = useState(props.url);
  const [isSaving, setIsSaving] = useState(false);

  const save = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      props.onSuccess?.();
    }, 4000);
  };

  useEffect(() => {
    setName(props.name);
    setDescription(props.description);
    setUrl(props.url);
  }, [props]);
  return (
    <ThemedView style={styles.container}>
      {props.image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: props.image }} style={styles.image} />
        </View>
      )}
      <ThemedInput
        placeholder="URL"
        value={url || ""}
        defaultValue={props.url || ""}
        onChangeText={(text) => setUrl(text)}
        style={styles.input}
        editable={!isSaving}
        multiline={true}
      />

      <ThemedInput
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
        editable={!isSaving}
        multiline={true}
      />

      <ThemedInput
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline={true}
        style={styles.input}
        editable={!isSaving}
      />

      {isSaving ? (
        <ActivityIndicator size="small" color={color} />
      ) : (
        <Button onPress={() => save()} title="Save" />
      )}
    </ThemedView>
  );
};

export default AtomForm;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
  },
  input: {
    margin: 10,

  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    marginTop: 50,
  },
}); 