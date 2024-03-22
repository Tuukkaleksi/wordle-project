import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    packageContainer: {
        flex: 1,
        backgroundColor: 'rgba(36, 36, 36, 0.90)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        position: 'absolute',
        width: '100%',
        height: 400,
        borderRadius: 20,
    },
    packageName: {
        color: 'white',
        fontSize: 30,
        position: 'relative',
        top: 0,
        marginBottom: 5,
    },
    packageButtons: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        position: 'absolute',
        textAlign: 'center',
        bottom: 20,
    },
    packageButton: {
        backgroundColor: 'lightcoral',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 10,
        width: '95%',
    },
    packageButtonText: {
        color: 'white',
        fontSize: 16,
    },
    packagePoints: {
        color: 'black',
        fontSize: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});

export default styles;