import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList } from 'react-native';

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [couresGoals, setCourseGoals] = useState([]);

  const goalInputHandler = enteredText => {
    setEnteredGoalText(enteredText);
  };

  const addGoalHandler = () => {
    setCourseGoals(prevCouresGoals => [
      ...prevCouresGoals,
      { id: Math.random().toString(), text: enteredGoalText },
    ]);
    setEnteredGoalText('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="You course goal!"
          onChangeText={goalInputHandler}
        />
        <Button title="Add Goal" onPress={addGoalHandler} />
      </View>
      <View style={styles.goalsContainer}>
        <FlatList
          data={couresGoals}
          renderItem={itemData => {
            return (
              <View style={styles.goalItem}>
                <Text style={styles.goalItemText}>{itemData.item.text}</Text>
              </View>
            );
          }}
          alwaysBounceVertical={false}
          keyExtractor={(item, index) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#111',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textInput: {
    marginRight: 8,
    padding: 8,
    borderWidth: 1,
    width: '80%',
    borderColor: '#ccc',
    color: '#fff',
  },
  goalsContainer: {
    flex: 3,
  },
  goalItem: {
    padding: 8,
    marginVertical: 8,
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 30,
  },

  goalItemText: {
    color: '#fff',
  },
});
