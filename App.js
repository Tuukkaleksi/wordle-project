import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, KeyboardAvoidingView, SafeAreaView, Pressable } from 'react-native'; 
import { getDatabase, ref, get } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import Menu from './components/menu';
import words from './components/words';
import styles from './components/styles';

export default function App() {

  /* 
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
  const [dataFound, setDataFound] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        setUser(user);
        fetchDataFromDatabase(user);
      } else {
        // User is signed out.
        setUser(null);
      }
    });
  }, []);

  async function fetchDataFromDatabase(user) {
    if (user) {
      const db = getDatabase();
      const userRef = ref(db, `${user.uid}`);

      try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          console.log("Data Found: ", userData);
          setDataFound(true);
        } else {
          console.log("Data not Found.");
          setDataFound(false);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  }

  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

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
    if (guess === targetWord) {
      alert('Congratulations! You guessed the correct word: ' + targetWord);
      resetGame();
    } else {
      if (guess.length === 5) {
        const updatedGuessedLetters = guessedLetters.map((row, rowIndex) =>
          rowIndex === attempts ? guess.toLowerCase().split('') : row
        );
        setGuessedLetters(updatedGuessedLetters);
  
        setAttempts(attempts + 1);
  
        if (attempts >= 5) {
            alert('Sorry, you reached the maxium number of attempts. The correct word was: ' + targetWord);
            resetGame();//For now.
        }
      } else {
        alert('Please Enter a 5-letter word.');
      }
    }
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
    } else {
      console.log("All letters revealed.");
    }
  }  

  function resetGame() {
    setTargetWord(generateRandomWord());
    setGuess('');
    setAttempts(0);
    setGuessedLetters(Array(6).fill(Array(5).fill('')));
    setRevealedLetters([]);
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
        <Pressable style={styles.button} onPress={handleGuess}>
          <Icon name='send' size={15} color='white' />
        </Pressable>
        <Pressable style={[styles.button, styles.questButton]} onPress={getWord}>
          <Icon name='question' size={18} color='white' />
        </Pressable>
        <Pressable style={[styles.button, styles.resetButton]} onPress={resetGame}>
          <Icon name='refresh' size={18} color='white' />
        </Pressable>
        <Pressable style={[styles.button, styles.darkbutton]} onPress={changeBackgroundColor}>
          <Icon name='lightbulb-o' size={15} color='white' />
        </Pressable>
        <Pressable style={[styles.button, styles.userbutton]} onPress={toggleMenu}>
          <Icon name='user' size={15} color='white' />
        </Pressable>
      </View>
      <Text style={[{ color: darkmode ? 'white' : 'black' }]}>{targetWord}</Text>
      {showmenu && <Menu />}
  </KeyboardAvoidingView>
  );
};