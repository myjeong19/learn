import { StyleSheet, View, Text, Pressable } from 'react-native';

export const GoalItem = ({ text, onDeleteGoal }) => {
  return (
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: '#222' }}
        style={({ pressed }) => pressed && styles.pressedItem}
        onPress={onDeleteGoal}
      >
        <Text style={styles.goalItemText}>{text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  goalItem: {
    marginVertical: 8,
    backgroundColor: '#333',
    borderRadius: 10,
  },

  goalItemText: {
    color: '#fff',
    padding: 25,
  },

  pressedItem: {
    opacity: 0.5,
  },
});
