import { Button, Image, StyleSheet, Text, View } from "react-native";

import { useRouter } from "expo-router";
import {
  ShareIntent as ShareIntentType,
  useShareIntentContext,
} from "expo-share-intent";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
const WebUrlComponent = ({ shareIntent }: { shareIntent: ShareIntentType }) => {
  return (
    <ThemedView
      style={[
        styles.gap,
        styles.row,
        { borderWidth: 1, borderRadius: 5 },
      ]}
    >
      <Image
        source={
          shareIntent.meta?.["og:image"]
            ? { uri: shareIntent.meta?.["og:image"] }
            : undefined
        }
        style={[styles.icon, styles.gap, { borderRadius: 5 }]}
      />
      <View style={{ padding: 5, flexShrink: 1 }}>
        <ThemedText style={[styles.gap]}>
          {shareIntent.meta?.title || "<NO TITLE>"}
        </ThemedText>
        {!!shareIntent.meta?.description && <ThemedText style={styles.gap}>{shareIntent.meta?.description}</ThemedText>}
        <ThemedText style={styles.gap}>{shareIntent.webUrl}</ThemedText>
      </View>
    </ThemedView>
  );
};

export default function ShareIntent() {
  const router = useRouter();
  const { hasShareIntent, shareIntent, error, resetShareIntent } =
    useShareIntentContext();

  return (
    <ThemedView style={styles.container}>

      {!hasShareIntent && <Text>No Share intent detected</Text>}

      {!!shareIntent.text && <ThemedText style={styles.gap}>{shareIntent.text}</ThemedText>}
      {shareIntent?.type === "weburl" && (
        <WebUrlComponent shareIntent={shareIntent} />
      )}
      {shareIntent?.files?.map((file) => (
        <Image
          key={file.path}
          source={{ uri: file.path }}
          style={[styles.image, styles.gap]}
        />
      ))}
      {hasShareIntent && (
        <Button onPress={() => resetShareIntent()} title="Reset" />
      )}
      <ThemedText style={[styles.error]}>{error}</ThemedText>
      <Button onPress={() => router.replace("/")} title="Go home" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  logo: {
    width: 75,
    height: 75,
    resizeMode: "contain",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  gap: {
    marginBottom: 20,
  },
  error: {
    color: "red",
  },
});