import { Button, TextInput, View, StyleSheet, Modal, Image } from 'react-native';
import { useState } from 'react';

export const GoalInput = ({ onAddGoal, visible, onVisible }) => {
  const [enteredGoalText, setEnteredGoalText] = useState('');

  const goalInputHandler = enteredText => {
    setEnteredGoalText(enteredText);
  };

  const addGoalHandler = () => {
    onAddGoal(enteredGoalText);
    setEnteredGoalText('');
    onVisible();
  };

  return (
    <Modal visible={visible} animationType="fade">
      <View style={styles.inputContainer}>
        <Image style={styles.image} source={require('../assets/images/goal.png')} />
        <TextInput
          style={styles.textInput}
          placeholder="You course goal!"
          value={enteredGoalText}
          onChangeText={goalInputHandler}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Cancle" onPress={onVisible} color="red" />
          </View>
          <View style={styles.button}>
            <Button title="Add Goal" onPress={addGoalHandler} />
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
    padding: 16,
    backgroundColor: '#111',
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },

  textInput: {
    padding: 8,
    borderWidth: 1,
    width: '100%',
    borderColor: '#ccc',
    color: '#fff',
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
