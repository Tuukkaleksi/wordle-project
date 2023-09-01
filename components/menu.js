import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { auth } from './firebaseConfig';
import { getDatabase, ref, set } from 'firebase/database';

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

    const handleSignup = async () => {
        try {
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
    }
};

    return(
        <View style={styles.menu}>
            <Text style={styles.title}>Sign In</Text>
            <TextInput style={styles.input} placeholder='Email' />
            <TextInput style={styles.input} placeholder='Password' />
            <TouchableOpacity style={styles.button}>
              <Text>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text>Register</Text>
            </TouchableOpacity>
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
        width: 300,
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