import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View, Button, ActivityIndicator, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedInput } from './ThemedInput';
import { ThemedView } from './ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { OpenAI } from 'openai';
import { convert } from 'html-to-text';
import { parse } from 'node-html-parser';
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';
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
  const backgroundColor = useThemeColor({}, 'backgroundSecondary');
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [url, setUrl] = useState(props.url);
  const [image, setImage] = useState(props.image);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [debugString, setDebugString] = useState("");
  const [semanticTriples, setSemanticTriples] = useState<{ triples: { subject: string, predicate: string, object: string }[] }>({ triples: [] });
  const openAI = React.useMemo(
    () =>
      new OpenAI({
        apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
        baseURL: process.env.EXPO_PUBLIC_OPENAI_BASE_URL,
        dangerouslyAllowBrowser: true,
        defaultHeaders: {
          // 'HTTP-Referer': 'https://app.i7n.xyz',
          'X-Title': 'i7n',
        },
      }),
    []
  );
  const save = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      props.onSuccess?.();
    }, 4000);
  };

  const fetchWebsiteContent = async (url: string) => {
    const response = await fetch(url);
    const html = await response.text();
    const root = parse(html);
    let title = root.querySelector('title')?.textContent;
    const metatags = root.querySelectorAll('meta');
    const metaTitle = metatags.find(tag => tag.getAttribute('property') === 'og:title')?.getAttribute('content');
    if (metaTitle) {
      title = metaTitle;
    }
    const description = metatags.find(tag => tag.getAttribute('property') === 'og:description')?.getAttribute('content');
    const image = metatags.find(tag => tag.getAttribute('property') === 'og:image')?.getAttribute('content');
    const text = convert(html);
    return { title, description, image, text };
  };

  const summarizeWebsiteContent = async (text: string) => {
    const response = await openAI.chat.completions.create({
      model: "gpt-4o-mini-2024-07-18",
      messages: [{ role: "user", content: `Summarize in one short paragraph the following website: ${text}` }],
    });
    return response.choices[0].message.content;
  };

  const getSemanticTriples = async (text: string) => {
    // schema is an array of {subject, predicate, object}
    try {
      const response = await openAI.beta.chat.completions.parse({
        model: "gpt-4o-mini-2024-07-18",
        messages: [{ role: "user", content: `Get the semantic triples (ex. earth - is - planet) of the top 5 ideas or concepts from the following website: ${text}` }],
        response_format: zodResponseFormat(
          z.object({
            triples: z.array(z.object({
              subject: z.string(),
              predicate: z.string(),
              object: z.string()
            }))
          }),
          "semanticTriples"
        ),
      });
      const triples = response.choices[0].message.parsed?.triples || [];
      return { triples };
    } catch (error) {
      console.error(error);
      return { triples: [] };
    }
  };


  const generate = async () => {
    setIsGenerating(true);
    if (!url) {
      setIsGenerating(false);
      return;
    }
    const { title, description, image, text } = await fetchWebsiteContent(url);
    setName(title || "");
    setDescription(description || "");
    setImage(image || "");
    const summary = await summarizeWebsiteContent(text);
    setDescription(summary || "");
    const semanticTriples = await getSemanticTriples(text);
    setSemanticTriples(semanticTriples);
    setDebugString(semanticTriples.triples.map(triple => `${triple.subject} - ${triple.predicate} - ${triple.object}`).join("\n") || "");
    setIsGenerating(false);
  };

  useEffect(() => {
    setName(props.name);
    setDescription(props.description);
    setUrl(props.url);
  }, [props]);
  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        {image && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
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
        {semanticTriples.triples.map((triple, index) => (
          <ThemedView key={index} style={[styles.triple, { backgroundColor: backgroundColor }]}>
            <ThemedText>{triple.subject}</ThemedText>
            <ThemedText>{triple.predicate}</ThemedText>
            <ThemedText>{triple.object}</ThemedText>
          </ThemedView>
        ))}
        {/* <ThemedText>{debugString}</ThemedText> */}
        {isGenerating ? (
          <ActivityIndicator size="small" color={color} />
        ) : (
          <Button onPress={() => generate()} title="Fetch with AI" />
        )}

        {isSaving ? (
          <ActivityIndicator size="small" color={color} />
        ) : (
          <Button onPress={() => save()} title="Save" disabled={isGenerating} />
        )}
      </ThemedView>
    </ScrollView>
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
  triple: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
}); 