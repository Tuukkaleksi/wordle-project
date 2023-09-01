import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from './firebaseConfig';
import { getDatabase, ref, set, get } from 'firebase/database';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

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
                    <Text style={styles.logText}>Welcome, {user.email}</Text>
                    {userData ? (
                        <View>
                            <Text style={styles.logText}>Level: {userData.settings.level}</Text>
                            <Text style={styles.logText}>Score: {userData.settings.score}</Text>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{flex: 1, width: '40%', height: 1, backgroundColor: 'black'}} />
                                    <View>
                                        <Text style={{width: 50, textAlign: 'center', fontSize: 18, marginBottom: 5}}>Points</Text>
                                    </View>
                                <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
                            </View>
                            <Text style={styles.logText}>Get A Letter: {userData.settings.getWord}</Text>
                            <Text style={styles.logText}>Get New Word: {userData.settings.resetGame}</Text>
                            <Text style={styles.logText}>New Word Timer: {userData.settings.newTimer}</Text>
                        </View>
                    ) : (
                        <Text style={styles.logText}>Loading...</Text>
                    )}
                    <Pressable style={styles.logButton} onPress={handleLogout}>
                        <Text style={styles.logButtonText}>Log Out</Text>
                    </Pressable>
                </View>
            ) : (
                // Display sign-in/register form when not logged in
                <View>
                    <TextInput
                        style={styles.input}
                        inputMode='email-address'
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

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        backgroundColor: '#242424',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        position: 'absolute',
        width: '90%',
        height: 400,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'lightcoral',
    },
    title: {
        color: 'white',
        fontSize: 30,
        position: 'absolute',
        top: 40,
        textShadowColor: 'darkcyan',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 8,
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 3,
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 8,
        borderWidth: 2,
        borderRadius: 8,
        borderColor: 'darkcyan',

    },
    button: {
        backgroundColor: 'white',
        marginTop: 10,
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#242424',
        borderWidth: 1,
        borderRadius: 5,
    },
    logContainer: {
        width: '95%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    logText: {
        fontSize: 20,
        marginBottom: 10,
        color: '#242424',
    },
    logButton: {
        backgroundColor: '#242424',
        marginTop: 10,
        width: '60%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#242424',
        borderWidth: 1,
        borderRadius: 5,
    },
    logButtonText: {
        color: 'white',
        fontSize: 16,
    },
});