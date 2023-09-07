import React, { useState, useEffect } from "react";
import { Text, View, Pressable } from 'react-native';
import { getDatabase, ref, get, update } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import styles from "./styles/storestyles";

/*
    Adds points to resetGame but doesnt add to getWord?????
*/

const Store = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchDataFromDatabase(user);
      } else {
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
        } else {
          console.log("Data not Found.");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
  }

  async function addPoints(pointsToAdd, action) {
    if (user) {
      const db = getDatabase();
      const userRef = ref(db, `${user.uid}`);
  
      try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();

          if (action === 'getWord') {
            if (!userData.settings.getWord) {
                userData.settings.getWord = 0;
            }
            userData.settings.getWord += pointsToAdd;
          } else if (action === 'resetGame') {
            if (!userData.settings.resetGame) {
                userData.settings.resetGame = 0;
            }
            userData.settings.resetGame += pointsToAdd;
          } else {
            console.log("Invalid action.");
            return;
          }
  
          // Update user data
          await update(userRef, userData);
  
          console.log(`Added ${pointsToAdd} points for ${action}.`);
        } else {
          console.log("User data not found.");
        }
      } catch (error) {
        console.log("Error updating user data: ", error);
      }
    }
  }

  const handlePackageButtonPress = (pointsForGetWord, pointsForResetGame) => {
    addPoints(pointsForGetWord, 'getWord');
    addPoints(pointsForResetGame, 'resetGame');
  };

  return (
    <View style={styles.packageContainer}>
      <Text style={styles.packageName}>Store</Text>
      
      {/* Package 1 */}
      <Pressable
        style={styles.packageButton}
        onPress={() => handlePackageButtonPress(4, 1)}
      >
        <Text style={styles.packageButtonText}>Basic Point Package</Text>
        <Text style={styles.packagePoints}>$5.99</Text>
        <Text style={styles.packageDescription}>With This Package Get | Help: 4, Reset: 1</Text>
      </Pressable>

      {/* Package 2 */}
      <Pressable
        style={styles.packageButton}
        onPress={() => handlePackageButtonPress(12, 2)}
      >
        <Text style={styles.packageButtonText}>Premium Point Package</Text>
        <Text style={styles.packagePoints}>$12.99</Text>
        <Text style={styles.packageDescription}>With This Package Get | Help: 12, Reset: 2</Text>
      </Pressable>

      {/* Package 3 */}
      <Pressable
        style={styles.packageButton}
        onPress={() => handlePackageButtonPress(20, 4)}
      >
        <Text style={styles.packageButtonText}>Ultimate Point Package</Text>
        <Text style={styles.packagePoints}>$24.99</Text>
        <Text style={styles.packageDescription}>With This Package Get | Help: 20, Reset: 4</Text>
      </Pressable>
    </View>
  );
};

export default Store;