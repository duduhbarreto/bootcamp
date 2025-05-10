import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 30
    },
    formContainer: {
        width: '90%',
        height: '50%',
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        marginTop: 60,
    },
    inputContainer: {
        width: '90%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginLeft: 15,
        marginTop: 5,
    },
    label: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 15,
        marginTop: 20,
    },
    input: {
        height: 50,
        paddingLeft: 10,
        fontSize: 20,
        backgroundColor: 'transparent',
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginTop: 20,
    }
});