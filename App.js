import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Menu from './components/menu';
import words from './components/words';
import styles from './components/styles';

export default function App() {

  /* 
    Question Mark (getWord) breaks? i don't know why
    Point System: getWord, resetGame, How many wins etc
    Signup and Login System to save the progress (Not necessery) can add a login button that user can press it and login/signup (using firebase and config already done ./components/firebaseConfig.js)
    Ads to raise the points, 30sec = getWord + resetGame, and short = getWord (like 2 points) popup or when pressing and points are 0 get popup if user wants more
    Everytime user clicks a button remove certain point
    Add github button? Credits?
  */

  const [backgroundColor, setBackgroundColor] = useState('white');
  const [darkmode, setDarkMode] = useState(false);
  const [showmenu, setShowmenu] = useState(false);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [targetWord, setTargetWord] = useState(generateRandomWord());
  const [revealedLetters, setRevealedLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState(Array(6).fill(Array(5).fill('')));

  //Change background color from a button
  const changeBackgroundColor = () => {
    const newColor = darkmode ? 'white' : '#242424';
    setBackgroundColor(newColor);
    setDarkMode(!darkmode);
  };

  //ToggleMenu
  const toggleMenu = () => {
    setShowmenu(!showmenu);
  };

  function generateRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };

  //Handle input so user cannot enter more or less than 5 letter word.
  function handleInputGuess(text) {
    if (text.length <= 5) {
      setGuess(text);
    }
  };

  function handleGuess() {
    // Update guessedLetters with the new guess
    if (guess.length === 5) {
      const updatedGuessedLetters = guessedLetters.map((row, rowIndex) =>
        rowIndex === attempts ? guess.toLowerCase().split('') : row
      );
    setGuessedLetters(updatedGuessedLetters);

    setAttempts(attempts + 1);
    // Check the guess against the targetWord and provide feedback
    // Update game state based on correct or incorrect guess
    } else {
      alert('Please Enter a 5-letter word.');
    }
  }

  //Get a letter when pressing question mark button
  function getWord() {
    const unrevealedIndices = targetWord
      .split('')
      .map((_, index) => index)
      .filter(index => !revealedLetters.includes(index));
      console.log("line 74.");
    if (unrevealedIndices.length > 0) {
      console.log("line 76.");
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
      console.log("line 87.");
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
  <KeyboardAvoidingView style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: darkmode ? 'white' : 'black' }]}>Wordle</Text>
      <SafeAreaView style={styles.guessContainer}>
        {guessedLetters.map((row, rowIndex) => (
          <KeyboardAvoidingView key={rowIndex} style={styles.guessedRow}>
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
          </KeyboardAvoidingView>
        ))}
      </SafeAreaView>
      <TextInput
        style={[styles.input, { color: darkmode ? 'white' : 'black' }]}
        onChangeText={text => setGuess(text)}
        value={guess}
        placeholder="Enter your guess"
      />
      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleGuess}>
          <Icon name='send' size={15} color='white' />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.questButton]} onPress={getWord}>
          <Icon name='question' size={18} color='white' />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={resetGame}>
          <Icon name='refresh' size={18} color='white' />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.darkbutton]} onPress={changeBackgroundColor}>
          <Icon name='lightbulb-o' size={15} color='white' />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.userbutton]} onPress={toggleMenu}>
          <Icon name='user' size={15} color='white' />
        </TouchableOpacity>
      </View>
      <Text style={[{ color: darkmode ? 'white' : 'black' }]}>{targetWord}</Text>
      {showmenu && <Menu />}
  </KeyboardAvoidingView>
  );
};