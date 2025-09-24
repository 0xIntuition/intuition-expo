import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { NativeTabs, Icon, Label, VectorIcon } from 'expo-router/unstable-native-tabs';
import { Platform } from 'react-native';

export default function TabLayout() {

  return (
    <NativeTabs minimizeBehavior="onScrollDown">
      <NativeTabs.Trigger name="quests" >
        <Label>Quests</Label>
        {Platform.select({
          ios: <Icon sf="bolt" />,
          android: <Icon src={<VectorIcon family={MaterialIcons} name="bolt" />} />,
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="account" >
        <Label>My Intuition</Label>
        {Platform.select({
          ios: <Icon sf="person" />,
          android: <Icon src={<VectorIcon family={MaterialIcons} name="person" />} />,
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="explore" role='search' >
        <Label>Explore</Label>
        {Platform.select({
          ios: <Icon sf="magnifyingglass" />,
          android: <Icon src={<VectorIcon family={MaterialIcons} name="search" />} />,
        })}
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
