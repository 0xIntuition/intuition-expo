import { Platform } from 'react-native';
import { Picker as AndroidPicker } from '@expo/ui/jetpack-compose';
import { Host, Picker as IOSPicker } from '@expo/ui/swift-ui';

interface CrossPlatformPickerProps {
  options: string[];
  selectedIndex: number;
  onOptionSelected: ({ nativeEvent }: { nativeEvent: { index: number } }) => void;
  variant?: string;
}

export const CrossPlatformPicker: React.FC<CrossPlatformPickerProps> = ({
  options,
  selectedIndex,
  onOptionSelected,
  variant = "segmented"
}) => {
  return Platform.select({
    android: (
      <AndroidPicker
        options={options}
        selectedIndex={selectedIndex}
        onOptionSelected={onOptionSelected}
        variant={variant}
      />
    ),
    ios: (
      <Host matchContents>
        <IOSPicker
          options={options}
          selectedIndex={selectedIndex}
          onOptionSelected={onOptionSelected}
          variant={variant}
        />
      </Host>
    ),
    default: (
      <AndroidPicker
        options={options}
        selectedIndex={selectedIndex}
        onOptionSelected={onOptionSelected}
        variant={variant}
      />
    )
  });
};
