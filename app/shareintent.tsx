import { Button, StyleSheet } from "react-native";
import {
  useShareIntentContext,
} from "expo-share-intent";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import AtomForm from "@/components/AtomForm";

export default function ShareIntent() {
  const { hasShareIntent, shareIntent, error, resetShareIntent } =
    useShareIntentContext();

  return (
    <ThemedView style={styles.container}>
      <AtomForm
        name={shareIntent.meta?.title || ""}
        description={shareIntent.meta?.["og:description"] || ""}
        image={shareIntent.meta?.["og:image"] || undefined}
        url={shareIntent.webUrl}
        onSuccess={() => resetShareIntent()}
      />

      {hasShareIntent && (
        <Button onPress={() => resetShareIntent()} title="Cancel" />
      )}
      <ThemedText style={[styles.error]}>{error}</ThemedText>
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
  error: {
    color: "red",
  },
});