import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  const words = ['apple', 'baker', 'cabin', 'cable', 'daddy', 'dizzy', 'eagle', 'eager', 'early', 'faces', 'flame', 'fuzzy', 'grape', 'jazzy', 'jelly', 'kebab', 'latch', 'lunar', 'mirth', 'nudge', 'oasis', 'ocean', 'peach', 'pizza', 'plaza', 'quest', 'quiet', 'roast', 'saber', 'sable', 'squat', 'sugar', 'sweep', 'table', 'thorn', 'tiger', 'umbra', 'vague', 'vivid', 'vowel', 'waltz', 'wrist', 'xerox', 'yacht', 'yummy', 'zesty', 'zebra'];

  const [targetWord, setTargetWord] = useState(generateRandomWord());
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState(Array(6).fill(Array(5).fill(null)));

  function generateRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }

  function handleGuess() {
    // Update guessedLetters with the new guess
    const updatedGuessedLetters = guessedLetters.map((row, rowIndex) =>
      rowIndex === attempts ? guess.toLowerCase().split('') : row
    );
    setGuessedLetters(updatedGuessedLetters);

    setAttempts(attempts + 1);
    // Check the guess against the targetWord and provide feedback
    // Update game state based on correct or incorrect guess
  }

  function resetGame() {
    setTargetWord(generateRandomWord());
    setGuess('');
    setAttempts(0);
    setGuessedLetters(Array(6).fill(Array(5).fill(null)));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wordle</Text>
      <View style={styles.guessContainer}>
        {guessedLetters.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.guessedRow}>
            {row.map((letter, colIndex) => {
              const correctPosition = targetWord[colIndex] === letter;
              return (
                <View
                  key={colIndex}
                  style={[
                    styles.guessedLetterBox,
                    correctPosition ? styles.correctBox : styles.incorrectBox,
                  ]}
                >
                  <Text style={styles.guessedLetter}>{letter}</Text>
                </View>
              );
            })}
          </View>
        ))}
      </View>
      <TextInput
        style={styles.input}
        onChangeText={text => setGuess(text)}
        value={guess}
        placeholder="Enter your guess"
      />
      <TouchableOpacity style={styles.button} onPress={handleGuess}>
        <Icon name='send' size={15} color='white' />
      </TouchableOpacity>
          <Text>{targetWord}</Text>
      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text>Reset</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: '15%',
    backgroundColor: '#fff',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  title: {
    marginBottom: 15,
    fontSize: 36
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    left: '85%',
    top: '75.65%',
    position: 'absolute'
  },
  resetButton: {
    backgroundColor: 'lightcoral',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  guessContainer: {
    flexDirection: 'column',
    marginTop: 20,
  },
  guessedRow: {
    flexDirection: 'row',
  },
  guessedLetterBox: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  correctBox: {
    backgroundColor: 'lightgreen',
  },
  incorrectBox: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1.5,
  },
  guessedLetter: {
    fontSize: 24,
  },
});