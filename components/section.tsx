import React, { FC, PropsWithChildren } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';

interface SectionProps extends PropsWithChildren {
  title: string;
}

export const Section: FC<SectionProps> = ({ title, children }) => {
  const titleColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'backgroundSecondary');

  return (
    <View style={styles.container}>
      <ThemedText style={[styles.title, { color: titleColor }]}>{title}</ThemedText>
      <View style={[styles.content, { backgroundColor }]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    padding: 8,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
  },
  content: {
    borderRadius: 8,
    // Note: React Native doesn't have a direct equivalent for divide-y
    // You might need to add separators manually between child components
  },
});
