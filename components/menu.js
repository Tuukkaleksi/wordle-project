import { Pressable, Text, TextInput, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from './firebaseConfig';
import { getDatabase, ref, set, get } from 'firebase/database';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import styles from './menustyles';
import Icon from 'react-native-vector-icons/FontAwesome';

/*
    BUILD IN DATABASE:
    user.uid {
        email:
        password:
        settings: {
            level: 1
            score: 0
            getword: 4
            resetGame: 2
            newTimer: 0
        }
    }
*/

const Menu = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
            setUser(authUser);
            if (authUser) {
                //Fetch user data
                const db = getDatabase();
                const userRef = ref(db, `${authUser.uid}`);
                try {
                    const snapshot = await get(userRef);
                    if (snapshot.exists()) {
                        setUserData(snapshot.val());
                    } else {
                        console.log('User data not found.');
                    }
                } catch (error) {
                    console.log("Error fetching: ", error);
                }
            } else {
                //Clear user data when not logged in
                setUserData(null);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const handleSignup = async () => {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User Created.");

            //Create a database entry for the user
            const db = getDatabase();
            const userRef = ref(db, `${user.uid}`);
            set(userRef, {
                email: email,
                pass: password,
                settings: {
                    level: 1,
                    score: 0,
                    getWord: 4,
                    resetGame: 2,
                    newTimer: 0,
                },
            });
        } catch (error) {
            console.error(error.message);
            alert('Password should be at least 6 characters.');
        }
    };

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User Found.");
        } catch (error) {
            console.error(error.message);
            alert('Invalid email or password.')
        }
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error("Error handleLogout.")
        }
    };

    return(
        <View style={styles.menu}>
            <Text style={styles.title}>Sign In</Text>
            {user ? (
                // Display user information when logged in
                <View style={styles.logContainer}>
                    <Text style={styles.logTextTitle}>Statistics{/* , {user.email} */}</Text>
                    {userData ? (
                        <View style={{alignItems: 'center', width: '80%'}}>
                            <Text style={styles.logText}>Level: {userData.settings.level}</Text>
                            <Text style={styles.logText}>Score: {userData.settings.score}</Text>
                            <View style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
                                <View style={{flex: 1, width: '100%', height: 1, backgroundColor: 'black'}} />
                                    <View>
                                        <Text style={{marginLeft: 1, marginRight: 5, width: '100%', textAlign: 'center', fontSize: 16, marginBottom: 5}}>Points</Text>
                                    </View>
                                <View style={{flex: 1, width: '100%', height: 1, backgroundColor: 'black'}} />
                            </View>
                            <Text style={styles.logText}>Help: {userData.settings.getWord}</Text>
                            <Text style={styles.logText}>Reset: {userData.settings.resetGame}</Text>
                            <Text style={styles.logText}>New Word: {userData.settings.newTimer}</Text>
                        </View>
                    ) : (
                        <Text style={styles.logText}>Loading...</Text>
                    )}
                    <View style={styles.buttonContainer}>
                        <Pressable style={styles.storeButton}>
                            <Icon name="shopping-cart" size={18} color='white' />
                        </Pressable>
                        <Pressable style={styles.logButton} onPress={handleLogout}>
                            <Icon name='sign-out' size={18} color='white' />
                        </Pressable>
                    </View>
                </View>
            ) : (
                // Display sign-in/register form when not logged in
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        inputMode='email'
                        placeholder='Email'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder='Password'
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <Pressable style={styles.button} onPress={handleLogin}>
                        <Text>Sign In</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={handleSignup}>
                        <Text>Register</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
};

export default Menu;