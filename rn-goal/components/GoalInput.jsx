import { Button, TextInput, View, StyleSheet, Modal } from 'react-native';
import { useState } from 'react';

export const GoalInput = ({ onAddGoal, visible, onVisible }) => {
  const [enteredGoalText, setEnteredGoalText] = useState('');

  const goalInputHandler = enteredText => {
    setEnteredGoalText(enteredText);
  };

  const addGoalHandler = () => {
    onAddGoal(enteredGoalText);
    setEnteredGoalText('');
  };

  return (
    <Modal visible={visible} animationType="fade">
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="You course goal!"
          value={enteredGoalText}
          onChangeText={goalInputHandler}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Add Goal" onPress={addGoalHandler} />
          </View>
          <View style={styles.button}>
            <Button title="Cancle" onPress={onVisible} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textInput: {
    padding: 8,
    borderWidth: 1,
    width: '100%',
    borderColor: '#ccc',
    color: '#fff',
    backgroundColor: '#fff',
  },

  buttonContainer: {
    flexDirection: 'row',
  },

  button: {
    marginTop: 16,
    width: '100',
    marginHorizontal: 8,
  },
});
