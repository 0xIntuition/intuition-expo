import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { NativeTabs, Icon, Label, VectorIcon } from 'expo-router/unstable-native-tabs';
import { Platform } from 'react-native';

export default function TabLayout() {

  return (
    <NativeTabs minimizeBehavior="onScrollDown">
      <NativeTabs.Trigger name="index" >
        <Label>Home</Label>
        {Platform.select({
          ios: <Icon sf="house.fill" />,
          android: <Icon src={<VectorIcon family={MaterialIcons} name="home" />} />,
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="account" >
        <Label>Account</Label>
        {Platform.select({
          ios: <Icon sf="person" />,
          android: <Icon src={<VectorIcon family={MaterialIcons} name="person" />} />,
        })}
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="search" role='search' >
        <Label>Search</Label>
        {Platform.select({
          ios: <Icon sf="house.fill" />,
          android: <Icon src={<VectorIcon family={MaterialIcons} name="search" />} />,
        })}
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
