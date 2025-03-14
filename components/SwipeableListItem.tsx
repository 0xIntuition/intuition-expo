import React, { useRef } from 'react';
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
      onLeftSwipe().then(() => {
        if (swipeableRef.current) {
          console.log('closing swipeable');
          swipeableRef.current.close();
        }
      });
    } else if (direction === 'right' && onRightSwipe) {
      onRightSwipe().then(() => {
        if (swipeableRef.current) {
          console.log('closing swipeable');
          swipeableRef.current.close();
        }
      });
    }
  };

  return (
    <Swipeable
      ref={swipeableRef as any}
      renderLeftActions={LeftSwipeActions}
      renderRightActions={RightSwipeActions}
      onSwipeableOpen={(direction) => handleSwipeableOpen(direction as 'left' | 'right')}
    >
      {children}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  leftAction: { backgroundColor: 'green', justifyContent: 'center', padding: 20 },
  rightAction: { backgroundColor: 'red', justifyContent: 'center', padding: 20 },
  actionText: { color: '#fff', fontWeight: 'bold' },
});

export default SwipeableListItem;