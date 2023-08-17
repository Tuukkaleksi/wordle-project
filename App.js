import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  const words = ['apple', 'baker', 'cabin', 'cable', 'daddy', 'dizzy', 'eagle', 'eager', 'early', 'faces', 'flame', 'fuzzy', 'grape', 'jazzy', 'jelly', 'kebab', 'latch', 'lunar', 'mirth', 'nudge', 'oasis', 'ocean', 'peach', 'pizza', 'plaza', 'quest', 'quiet', 'roast', 'saber', 'sable', 'squat', 'sugar', 'sweep', 'table', 'thorn', 'tiger', 'umbra', 'vague', 'vivid', 'vowel', 'waltz', 'wrist', 'xerox', 'yacht', 'yummy', 'zesty', 'zebra'];

  const [targetWord, setTargetWord] = useState(generateRandomWord());
  const [guess, setGuess] = useState('');
  const [revealedLetters, setRevealedLetters] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState(Array(6).fill(Array(5).fill('')));

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

  //Get a letter when pressing question mark button
  function getWord() {
    const unrevealedIndices = targetWord
      .split('')
      .map((_, index) => index)
      .filter(index => !revealedLetters.includes(index));

    if (unrevealedIndices.length > 0) {
      const randomIndex = unrevealedIndices[Math.floor(Math.random() * unrevealedIndices.length)];
      const updatedGuessedLetters = guessedLetters.map((row, rowIndex) =>
        rowIndex === attempts
          ? row.map((letter, colIndex) =>
              colIndex === randomIndex ? targetWord[colIndex] : letter
            )
          : row
      );
      setGuessedLetters(updatedGuessedLetters);
      setRevealedLetters([...revealedLetters, randomIndex]);
    }
  }
  //Reset the Game and generate new random word
  function resetGame() {
    setTargetWord(generateRandomWord());
    setGuess('');
    setAttempts(0);
    setGuessedLetters(Array(6).fill(Array(5).fill('')));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wordle</Text>
      <View style={styles.guessContainer}>
        {guessedLetters.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.guessedRow}>
            {row.map((letter, colIndex) => {
              const correctPosition = targetWord[colIndex] === letter;
              const includedInWord = targetWord.includes(letter);
              return (
                <View
                  key={colIndex}
                  style={[
                    styles.guessedLetterBox,
                    correctPosition
                    ? styles.correctBox
                    : letter === ''
                    ? styles.emptyBox
                    : includedInWord
                    ? styles.includedBox 
                    : styles.incorrectBox,
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
      {/* Buttons */}
      <TouchableOpacity style={styles.button} onPress={handleGuess}>
        <Icon name='send' size={15} color='white' />
      </TouchableOpacity>
      <TouchableOpacity style={styles.questButton} onPress={getWord}>
        <Icon name='question' size={18} color='white' />
      </TouchableOpacity>
      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Icon name='refresh' size={18} color='white' />
      </TouchableOpacity>
        <Text>{targetWord}</Text>
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
    top: '83.5%',
    position: 'absolute'
  },
  questButton: {
    backgroundColor: 'lightcoral',
    width: 35,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    left: '100%',
    top: '48%',
    position: 'absolute',
  },
  resetButton: {
    backgroundColor: 'lightcoral',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    left: '100%',
    top: '59%',
    position: 'absolute',
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
  emptyBox: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1.5,
  },
  correctBox: {
    backgroundColor: 'lightgreen',
    borderColor: 'black',
    borderWidth: 1.5,
  },
  incorrectBox: {
    backgroundColor: 'lightgray',
    borderColor: 'black',
    borderWidth: 1.5,
  },
  guessedLetter: {
    fontSize: 24,
  },
  includedBox: {
    backgroundColor: 'yellow',
    borderColor: 'black',
    borderWidth: 1.5,
  },
});