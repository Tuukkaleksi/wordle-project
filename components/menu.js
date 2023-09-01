import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { auth } from './firebaseConfig';
import { getDatabase, ref, set } from 'firebase/database';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

/*
    DATABASE IN USE: Firebase Database. (Config found in firebaseConfig.js)
    User can use register after inputting Email and Password, if email is found send an error.
    Give user points, score and level in firebase database: getWord points (4), resetGame points (2), score 0 and level starts 1
    newTimer = when the word is completed save 12h to it after it hits 0 give user a new word.

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

    return(
        <View style={styles.menu}>
            <Text style={styles.title}>Sign In</Text>
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
        width: '100%',
        height: 400,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: 'white',
    },
    title: {
        color: 'white',
        fontSize: 30,
        position: 'absolute',
        top: 40,
    },
    input: {
        width: '80%',
        height: 40,
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 3,
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 8,
    },
    button: {
        backgroundColor: 'white',
        marginTop: 10,
        width: '60%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 3,
    }
});