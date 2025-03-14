import React, { useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

const LeftSwipeActions = () => (
  <View style={styles.leftAction}>
    <Text style={styles.actionText}>↑</Text>
  </View>
);

const RightSwipeActions = () => (
  <View style={styles.rightAction}>
    <Text style={styles.actionText}>↓</Text>
  </View>
);

interface SwipeableListItemProps {
  children: React.ReactNode;
  onLeftSwipe?: () => Promise<void>;
  onRightSwipe?: () => Promise<void>;
}

// Define a type for the swipeable ref that includes the close method
type SwipeableRef = {
  close: () => void;
} | null;

const SwipeableListItem = ({
  children,
  onLeftSwipe,
  onRightSwipe
}: SwipeableListItemProps) => {
  const swipeableRef = useRef<SwipeableRef>(null);

  const handleSwipeableOpen = (direction: 'left' | 'right') => {
    if (direction === 'left' && onLeftSwipe) {
      onLeftSwipe();
      if (swipeableRef.current) {
        console.log('closing swipeable');
        swipeableRef.current.close();
      }
    } else if (direction === 'right' && onRightSwipe) {
      onRightSwipe();
      if (swipeableRef.current) {
        console.log('closing swipeable');
        swipeableRef.current.close();
      }
    }
  };

  return (
    <Swipeable
      ref={swipeableRef as any}
      renderLeftActions={LeftSwipeActions}
      renderRightActions={RightSwipeActions}
      enabled={!!(onLeftSwipe || onRightSwipe)}
      onSwipeableOpen={(direction) => handleSwipeableOpen(direction as 'left' | 'right')}
    >
      {children}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  leftAction: { backgroundColor: '#2E8B57', justifyContent: 'center', padding: 20 },
  rightAction: { backgroundColor: '#CD5C5C', justifyContent: 'center', padding: 20 },
  actionText: { color: '#fff', fontWeight: 'bold', fontSize: 40 },
});

export default SwipeableListItem;