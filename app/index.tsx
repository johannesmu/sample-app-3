import { Text, View, TextInput, Pressable, StyleSheet } from 'react-native'
import { useState, useEffect, useContext } from 'react'
import { CheckMark } from '@/components/CheckMark'
import { FirebaseError } from '@/components/FirebaseError'

import { AuthenticationContext } from '@/contexts/AuthenticationContext'
import { createUserWithEmailAndPassword, onAuthStateChanged} from '@firebase/auth'
import {  Link, router } from 'expo-router'

export default function AuthenticationScreen() {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    // validation
    const [ validPassword, setValidPassword ] = useState(false)
    const [ validEmail, setValidEmail ] = useState(false)
    const [ error, setError ] = useState<any | string>()

    const fbauth = useContext( AuthenticationContext )

    const SignUpUser = () => {
        createUserWithEmailAndPassword( fbauth, email, password )
        .then( (user) => {
            router.navigate("/(tabs)")
        })
        .catch( (error) => {
            setError(error.code)
            console.log( error.code )
        } )
    }

    useEffect( () => {
        if( password.length >= 8 ) {
            setValidPassword( true )
        }
        else {
            setValidPassword( false )
        }
        setError('')
    }, [password] )

    useEffect( () => {
        if( 
            email.includes('@') && 
            email.includes('.') &&
            email.indexOf('@') > 0
        ) 
        {
            setValidEmail( true )
        }
        else {
            setValidEmail( false )
        }
        setError('')
    }, [email])

    onAuthStateChanged( fbauth, (user) => {
        if( user ) {
            // user is currently authenticated
            // redirect user
           router.navigate("/(tabs)")
        }
        else {
            // user is not authenticated
        }
    })


    return(
        <View style={ styles.container }>
            <View style={ styles.form }>
                <Text style={ styles.title }>Sign up for an account</Text>
                {/* email address */}
                <Text style={ styles.label }>
                    Email address
                    <CheckMark show={ validEmail } />
                </Text>
                <TextInput
                    style={ styles.field }
                    value={ email }
                    onChangeText={ ( txt ) => setEmail( txt ) }
                    placeholder='you@example.com'
                />
                {/* password */}
                <Text style={ styles.label }>
                    Password
                    <CheckMark show={ validPassword} />
                </Text>
                <TextInput
                    style={ ( validPassword == true ) ? styles.validfield : styles.field }
                    secureTextEntry={ true }
                    value={ password }
                    onChangeText={ ( txt ) => setPassword( txt ) }
                    placeholder='minimum 8 characters'
                />
                <Pressable
                    style={ (validEmail && validPassword ) ? styles.button : styles.buttonDisabled }
                    disabled={ (validEmail && validPassword) ? false : true }
                    onPress={ () => SignUpUser() }
                >
                    <Text style={ styles.buttonText } >Sign up</Text>
                </Pressable>
                <Link href="/login" style={ styles.textButton }>
                    <Text style={ styles.textButtonText}>
                        Already have an account? Sign in
                    </Text>
                </Link>
            </View>
            <FirebaseError error={ error } />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
    },
    form: {
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
    buttonDisabled: {
        backgroundColor: "#86877f",
        padding: 8,
    },
    textButton: {
        padding: 8,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
    },
    textButtonText: {
        textAlign: "center",
    }
})