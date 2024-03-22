import { StyleSheet, Platform } from 'react-native';

// -------- WEB : MOBILE --------
// isWeb ? '50%' : '80%',
const isWeb = Platform.OS === 'web';

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
        alignSelf: 'center',
        textShadowOffset: { width: 1, height: 1 },
    },
    undertitle: {
        position: 'absolute',
        top: 165,
        fontSize: 24,
        color: 'white',
        alignSelf: 'center',
        textShadowOffset: { width: 1, height: 1 },
    },
    input: {
        width: isWeb ? '20%' : '80%',
        height: 40,
        backgroundColor: 'transparent',
        borderColor: 'darkcyan',
        borderWidth: 2,
        borderRadius: 4,
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
        bottom: isWeb ? 120 : 20,
        right: isWeb ? 'auto' : 20,
        marginTop: 0,
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
        bottom: 'auto',
        left: isWeb ? 'auto' : 'auto',
        justifyContent: 'center',
        alignItems: 'center',
    },
    guessedRow: {
        flexDirection: 'row',
    },
    guessedLetterBox: {
        width: 40,
        height: 40,
        marginRight: isWeb ? 20 : 10,
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
    github: {
        position: 'absolute',
        bottom: 20,
        right: 'auto',
        shadowColor: 'white',
    },
});

export default styles;