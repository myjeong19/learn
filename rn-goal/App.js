import { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { GoalList } from './components/GoalList';
import { GoalInput } from './components/GoalInput';

export default function App() {
  const [modalIsVisble, setModalIsVisible] = useState(false);
  const [couresGoals, setCourseGoals] = useState([]);

  const visibleAddGoalHandler = () => setModalIsVisible(prevIsVisible => !prevIsVisible);

  const addGoalHandler = enteredGoalText => {
    setCourseGoals(prevCouresGoals => [
      ...prevCouresGoals,
      { id: Math.random().toString(), text: enteredGoalText },
    ]);
  };

  const deleteGoalHandler = id => {
    setCourseGoals(prevCouresGoals => {
      return prevCouresGoals.filter(goal => goal.id !== id);
    });
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <Button title="Add New Goal" color="#111" onPress={visibleAddGoalHandler} />

        <GoalInput
          onAddGoal={addGoalHandler}
          visible={modalIsVisble}
          onVisible={visibleAddGoalHandler}
        />

        <GoalList couresGoals={couresGoals} onDeleteGoal={deleteGoalHandler} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#111',
  },
});
