import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, KeyboardAvoidingView, SafeAreaView, Pressable } from 'react-native'; 
import { getDatabase, ref, get, update } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import Menu from './components/menu';
import words from './components/words';
import styles from './components/styles/styles';

export default function App() {

  /* 
    Ads to raise the points, 30sec = getWord + resetGame, and short = getWord (like 2 points) popup or when pressing and points are 0 get popup if user wants more
    Everytime user clicks a button remove certain point
    Add github button? Credits?

    Guessing right removes a resetGame point
    If points >= 0 dont remove anymore from database
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

  async function fetchDataFromDatabase(currentUser) {
    if (currentUser) {
      const db = getDatabase();
      const userRef = ref(db, `${currentUser.uid}`);

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

  //Remove Points from Database
  async function removePointsDB(pointsToRemove, action) {
    if (user) {
      const db = getDatabase();
      const userRef = ref(db, `${user.uid}`);

      try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();

          //Minus points from user
          if (action === 'getWord') {
            if (userData.settings.getWord === 0) {
              // Do Nothing
            } else {
              userData.settings.getWord -= pointsToRemove;
            }
          } 
          if (action === 'resetGame') {
            if (userData.settings.resetGame === 0) {
              // Do Nothing
            } else {
              userData.settings.resetGame -= pointsToRemove;
            }
          }

          //Update user data
          await update(userRef, userData);

          console.log(`Removed ${pointsToRemove} points from ${action}`);
        } else {
          console.log("User data not found.");
        }
      } catch (error) {
        console.log("Error updating user data: ", error);
      }
    }
  }

  function generateRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  };

  function handleGuess() {
    if (guess === targetWord) {
      alert('Congratulations! You guessed the correct word: ' + targetWord);
      resetGame();// For now
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
  async function getWord() {

    if (user) {
      const db = getDatabase();
      const userRef = ref(db, `${user.uid}`);
      try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            const userData = snapshot.val();
            if (userData.settings.getWord === 0) {
              alert("You Don't Have Points to Get a Letter.");
            } else {
              removePointsDB(1, 'getWord');
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
                alert("All letters revealed.");
                console.log("All letters revealed.");
              }
            }
          }
        } catch (error) {
          console.log("", error);
        }
      } else if (!user) {
        alert("You currently aren't Signed In.");
      }
  }  

  async function resetGame() {
    if (user) {
      const db = getDatabase();
      const userRef = ref(db, `${user.uid}`);
      try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            const userData = snapshot.val();
            if (userData.settings.resetGame === 0) {
              alert("You Don't Have Points to Reset.");
            } else {
              if (guess === targetWord) {
                setTargetWord(generateRandomWord());
                setGuess('');
                setAttempts(0);
                setGuessedLetters(Array(6).fill(Array(5).fill('')));
                setRevealedLetters([]);
              } else {
                //Reset Functions
                removePointsDB(1, 'resetGame');
                setTargetWord(generateRandomWord());
                setGuess('');
                setAttempts(0);
                setGuessedLetters(Array(6).fill(Array(5).fill('')));
                setRevealedLetters([]);
              }
            }
        }
      } catch (error) {
        console.log("Error resetGame: ", error);
      }
    } else if (!user) {
      alert("You currently aren't Signed In.");
    }
  }

  return (
  <KeyboardAvoidingView style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: darkmode ? 'white' : 'black' }]}>Wordle</Text>
      <Text style={[styles.undertitle, { color: darkmode ? 'white' : 'black' }]}>{attempts}</Text>
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