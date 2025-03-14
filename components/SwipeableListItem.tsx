import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

const LeftSwipeActions = () => (
  <View style={styles.leftAction}>
    <Text style={styles.actionText}>Upvote</Text>
  </View>
);

const RightSwipeActions = () => (
  <View style={styles.rightAction}>
    <Text style={styles.actionText}>Downvote</Text>
  </View>
);

const SwipeableListItem = ({ children }: { children: React.ReactNode }) => (
  <Swipeable
    renderLeftActions={LeftSwipeActions}
    renderRightActions={RightSwipeActions}

  >
    {children}
  </Swipeable>
);

const styles = StyleSheet.create({
  leftAction: { backgroundColor: 'green', justifyContent: 'center', padding: 20 },
  rightAction: { backgroundColor: 'red', justifyContent: 'center', padding: 20 },
  actionText: { color: '#fff', fontWeight: 'bold' },
});

export default SwipeableListItem;