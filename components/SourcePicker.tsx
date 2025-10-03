import { Platform } from 'react-native';
import { Picker as AndroidPicker } from '@expo/ui/jetpack-compose';
import { Host, Picker as IOSPicker } from '@expo/ui/swift-ui';

interface SourcePickerProps {
  options: string[];
  selectedIndex: number;
  onOptionSelected: ({ nativeEvent }: { nativeEvent: { index: number } }) => void;
  variant?: string;
}

export const SourcePicker: React.FC<SourcePickerProps> = ({
  options,
  selectedIndex,
  onOptionSelected,
}) => {
  return Platform.select({
    android: (
      <AndroidPicker
        options={options}
        selectedIndex={selectedIndex}
        onOptionSelected={onOptionSelected}
        variant={"segmented"}
      />
    ),
    ios: (
      <Host matchContents>
        <IOSPicker
          options={options}
          selectedIndex={selectedIndex}
          onOptionSelected={onOptionSelected}
          variant={"segmented"}
        />
      </Host>
    ),
    default: (
      <AndroidPicker
        options={options}
        selectedIndex={selectedIndex}
        onOptionSelected={onOptionSelected}
        variant={"segmented"}
      />
    )
  });
};
