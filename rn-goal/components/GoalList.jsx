import { StyleSheet, FlatList, View } from 'react-native';
import { GoalItem } from './GoalItem';

export const GoalList = ({ couresGoals, onDeleteGoal }) => {
  return (
    <View style={styles.goalsContainer}>
      <FlatList
        data={couresGoals}
        renderItem={itemData => {
          return (
            <GoalItem
              text={itemData.item.text}
              onDeleteGoal={onDeleteGoal.bind(this, itemData.item.id)}
            />
          );
        }}
        alwaysBounceVertical={false}
        keyExtractor={(item, index) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  goalsContainer: {
    flex: 3,
  },
});
