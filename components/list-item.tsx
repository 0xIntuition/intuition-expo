import React, { FC } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Address } from 'viem';
import { useThemeColor } from '@/hooks/useThemeColor';

interface ListItemProps {
  id?: Address;
  href?: string;
  emoji?: string | null;
  image?: string | null;
  label: string;
  subLabel?: string;
  value?: string;
  subValue?: string;
  title?: string;
  children?: React.ReactNode;
  last?: boolean;
}

export const ListItem: FC<ListItemProps> = ({
  children,
  id,
  href,
  emoji,
  image,
  label,
  subLabel,
  value,
  subValue,
  title,
  last,
}) => {
  const textColor = useThemeColor({}, 'text');
  const subTextColor = useThemeColor({}, 'tabIconDefault');

  const icon = image ? (
    <Image source={{ uri: image }} style={styles.icon} />
  ) : emoji ? (
    <Text style={styles.emoji}>{emoji}</Text>
  ) : null;

  const content = (
    <View style={[styles.contentContainer, { borderBottomWidth: last ? 0 : 1 }]}>
      <View style={styles.leftContent}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        {!icon && id !== undefined && (
          <Image
            style={styles.idIcon}
            source={{ uri: `https://i7n.app/blo/${id}` }}
          />
        )}
        <View style={styles.labelContainer}>
          <Text style={[styles.label, { color: textColor }]}>{label}</Text>
          {subLabel && <Text style={[styles.subLabel, { color: subTextColor }]}>{subLabel}</Text>}
        </View>
      </View>
      <View style={styles.centerContent}>{children}</View>
      {(value || subValue) && (
        <View style={styles.rightContent}>
          {value && <Text style={[styles.value, { color: textColor }]} numberOfLines={1}>{value}</Text>}
          {subValue && <Text style={[styles.subValue, { color: subTextColor }]}>{subValue}</Text>}
        </View>
      )}
    </View>
  );

  const ChevronIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill={subTextColor}>
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <View style={[styles.container]}>
      {href ? (
        <TouchableOpacity onPress={() => {/* Handle navigation */ }}>
          {content}
          <ChevronIcon />
        </TouchableOpacity>
      ) : (
        content
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingRight: 0,
    paddingBottom: 0,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
    marginTop: 4,

  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(250, 250, 250, 0.1)',
    paddingRight: 16,
    paddingBottom: 16,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 16,
  },
  icon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  emoji: {
    fontSize: 24,
  },
  idIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 16,
  },
  labelContainer: {
    flexDirection: 'column',
  },
  label: {
    fontSize: 16,
  },
  subLabel: {
    fontSize: 12,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  value: {
    fontSize: 14,
  },
  subValue: {
    fontSize: 12,
  },
});
