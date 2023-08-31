import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';

const Menu = () => {
    return(
        <View style={styles.menu}>
            <Text style={styles.title}>Sign In</Text>
            <TextInput style={styles.input} placeholder='Username' />
            <TextInput style={styles.input} placeholder='Password' />
            <TouchableOpacity style={styles.button}>
              <Text>Sign In</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Menu;

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        backgroundColor: '#121212',
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
        top: 50
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