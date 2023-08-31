import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        position: 'absolute',
        top: 120,
        fontSize: 36,
        color: 'white',
    },
    input: {
        width: '80%',
        height: 40,
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 3,
        marginTop: 10,
        marginBottom: 10,
        paddingHorizontal: 8,
        position: 'absolute',
        top: '75%'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    button: {
        height: 40,
        backgroundColor: 'darkcyan',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginHorizontal: 5,
    },
    darkbutton: {
        backgroundColor: 'lightcoral',
    },
    questButton: {
        backgroundColor: 'lightcoral',
    },
    resetButton: {
        backgroundColor: 'lightcoral',
    },
    guessContainer: {
        flexDirection: 'column',
        marginTop: 0,
        marginBottom: 5,
        position: 'absolute',
        bottom: '25%',
        left: '16.5%',
    },
    guessedRow: {
        flexDirection: 'row',
    },
    guessedLetterBox: {
        width: 40,
        height: 40,
        marginRight: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1.5,
    },
    emptyBox: {
        backgroundColor: 'white',
    },
    correctBox: {
        backgroundColor: 'lightgreen',
    },
    incorrectBox: {
        backgroundColor: 'lightgray',
    },
    guessedLetter: {
        fontSize: 24,
    },
    includedBox: {
        backgroundColor: 'yellow',
    },
});

export default styles;