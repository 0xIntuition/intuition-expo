import { TextInput, type TextInputProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedInput({ style, lightColor, darkColor, ...otherProps }: ThemedInputProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'backgroundSecondary');
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <TextInput style={[{ backgroundColor, color: textColor, padding: 10, borderRadius: 10 }, style]} {...otherProps} />;
}
