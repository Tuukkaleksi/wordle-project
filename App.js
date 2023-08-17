import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  const words = ['apple', 'banana', 'cherry', 'grape', 'orange']; // Add more words here

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
      <Text>Guess the Wordle!</Text>
      <Text>Attempts: {attempts}</Text>
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
        <Text>Guess</Text>
      </TouchableOpacity>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
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
    backgroundColor: 'green',
  },
  incorrectBox: {
    backgroundColor: 'darkgray',
  },
  guessedLetter: {
    fontSize: 24,
  },
});