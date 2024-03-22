import React, { useState, useEffect } from "react";
import { Text, View, Pressable } from 'react-native';
import { getDatabase, ref, get, update } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Menu from "./menu";
import styles from "./styles/storestyles";
import Icon from "react-native-vector-icons/FontAwesome";

const Store = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [showmenu, setShowmenu] = useState(false);

  const basicValue = '5.99€';
  const premiumValue = '12.99€';
  const ultimateValue = '24.99€';

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

          // Make Sure userData.settings exists
          if (!userData.settings) {
            userData.settings = {};
          }

          //Initialize
          if (!userData.settings.getWord) {
            userData.settings.getWord = 0;
          }
          if (!userData.settings.resetGame) {
            userData.settings.resetGame = 0;
          }

          setUserData(userData);
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
            userData.settings.getWord += pointsToAdd;
          }
          if (action === 'resetGame') {
            userData.settings.resetGame += pointsToAdd;
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

  const handlePackageButtonPress = async (pointsForGetWord, pointsForResetGame) => {
    await addPoints(pointsForGetWord, 'getWord');
    await addPoints(pointsForResetGame, 'resetGame');
  };

  const toggleMenu = () => {
    setShowmenu(!showmenu);
  };

  return (
    <>
    {!showmenu ? (
    <View style={styles.packageContainer}>

      {/* Close Store Button */}
      <Pressable
        style={styles.closeButton}
        onPress={toggleMenu}
      >
        <Icon name="close" size={50} color="white" />
      </Pressable>

      <Text style={styles.packageName}>Store</Text>

      {/* Package 1 */}
      <Pressable
        style={styles.packageButton}
        onPress={() => handlePackageButtonPress(4, 1)}
      >
        <Text style={styles.packageButtonText}>Basic Point Package</Text>
        <Text style={styles.packagePoints}>{basicValue}</Text>
        <Text style={styles.packageDescription}>With This Package Get | Help: 4, Reset: 1</Text>
      </Pressable>

      {/* Package 2 */}
      <Pressable
        style={styles.packageButton}
        onPress={() => handlePackageButtonPress(12, 2)}
      >
        <Text style={styles.packageButtonText}>Premium Point Package</Text>
        <Text style={styles.packagePoints}>{premiumValue}</Text>
        <Text style={styles.packageDescription}>With This Package Get | Help: 12, Reset: 2</Text>
      </Pressable>

      {/* Package 3 */}
      <Pressable
        style={styles.packageButton}
        onPress={() => handlePackageButtonPress(20, 4)}
      >
        <Text style={styles.packageButtonText}>Ultimate Point Package</Text>
        <Text style={styles.packagePoints}>{ultimateValue}</Text>
        <Text style={styles.packageDescription}>With This Package Get | Help: 20, Reset: 4</Text>
      </Pressable>
    </View>
    ) : (
      <>
      {showmenu}
      </>
    )}
    </>
  );
};

export default Store;