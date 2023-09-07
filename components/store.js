import React, { useState } from "react";
import { Text, View, TextInput, KeyboardAvoidingView, SafeAreaView, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from "./styles/storestyles";

const Store = () => {
    return (
        <View style={styles.packageContainer}>
            <Text style={styles.packageName}>Store</Text>
            
            {/* Package 1 */}
            <Pressable style={styles.packageButton}>
                <Text style={styles.packageButtonText}>Basic Package</Text>
                <Text style={styles.packagePoints}>$5.99</Text>
                <Text style={styles.packageDescription}>Get More Points To Help You, Help: 4, Reset: 1</Text>
            </Pressable>

            {/* Package 2 */}
            <Pressable style={styles.packageButton}>
                <Text style={styles.packageButtonText}>Premium Package</Text>
                <Text style={styles.packagePoints}>$12.99</Text>
                <Text style={styles.packageDescription}>Get More Points To Help You, Help: 12, Reset: 2</Text>
            </Pressable>

            {/* Package 3 */}
            <Pressable style={styles.packageButton}>
                <Text style={styles.packageButtonText}>Ultimate Package</Text>
                <Text style={styles.packagePoints}>$24.99</Text>
                <Text style={styles.packageDescription}>Get More Points To Help You, Help: 15, Reset: 4</Text>
            </Pressable>
        </View>
    );
};

export default Store;