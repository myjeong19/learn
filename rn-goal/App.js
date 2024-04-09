import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [couresGoals, setCourseGoals] = useState([]);

  const goalInputHandler = enteredText => {
    setEnteredGoalText(enteredText);
  };

  const addGoalHandler = () => {
    setCourseGoals(prevCouresGoals => [...prevCouresGoals, enteredGoalText]);
    setEnteredGoalText('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder="You course goal!" onChangeText={goalInputHandler} />
        <Button title="Add Goal" onPress={addGoalHandler} />
      </View>
      <View style={styles.goalsContainer}>
        {couresGoals.map((goal, index) => (
          <View style={styles.goalItem} key={index + goal}>
            <Text style={styles.goalItemText}>{goal}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
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
  },
  goalsContainer: {
    flex: 3,
  },
  goalItem: {
    padding: 8,
    marginVertical: 8,
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 30,
  },

  goalItemText: {
    color: '#fff',
  },
});
