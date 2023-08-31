import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Menu = () => {
    return(
        <View style={styles.menu}>
            <Text>Menu</Text>
        </View>
    );
};

export default Menu;

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        backgroundColor: 'orange',
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
});