import { Text, View, TextInput, Pressable, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'

export default function AuthenticationScreen() {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    // validation
    const [ validPassword, setValidPassword ] = useState(false)

    useEffect( () => {
        if( password.length < 8 ) {
            setValidPassword( true )
        }
        else {
            setValidPassword( false )
        }
    }, [password] )

    return(
        <View style={ styles.container }>
            <Text style={ styles.title }>Sign up for an account</Text>
            {/* email address */}
            <Text style={ styles.label }>Email address</Text>
            <TextInput 
                style={ styles.field } 
                value={ email }
                onChangeText={ ( txt ) => setEmail( txt ) }
                placeholder='you@example.com'
            />
            {/* password */}
            <Text style={ styles.label }>Password</Text>
            <TextInput 
                style={ ( validPassword == true ) ? styles.validfield : styles.field } 
                secureTextEntry={ true }
                value={ password }
                onChangeText={ ( txt ) => setPassword( txt ) }
                placeholder='minimum 8 characters'
            />
            <Pressable style={ styles.button }>
                <Text style={ styles.buttonText } >Sign up</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 30,
        marginTop: 100,
        backgroundColor: "#f1f7b7",
        padding: 10,
    },
    title: {
        fontSize: 20,
        marginVertical: 20,
    },
    label: {
        fontSize: 16
    },
    field: {
        backgroundColor: "#f6f7ed",
        padding: 5,
        borderColor: "#1a1c0c",
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 4,
    },
    validfield: {
        backgroundColor: "#f6f7ed",
        padding: 5,
        borderColor: "#8e9e02",
        borderWidth: 1,
        marginBottom: 20,
        borderRadius: 4,
    },
    button: {
        backgroundColor: "#1a1c0c",
        padding: 8,
    },
    buttonText: {
        color: "#f6f7ed",
        textAlign: "center",
    },
})