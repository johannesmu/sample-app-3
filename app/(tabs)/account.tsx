import { Image, StyleSheet, View, Text, Pressable } from 'react-native'
import { useContext, useState } from 'react'
import { AuthenticationContext } from '@/contexts/AuthenticationContext'
import { onAuthStateChanged, signOut } from '@firebase/auth'
import { useNavigation, router } from 'expo-router'

export default function AccountScreen() {
    const[ currentUser, setCurrentUser ] = useState<any | null>()

    const fbauth = useContext( AuthenticationContext )
    const navigation = useNavigation()
    
    onAuthStateChanged( fbauth, ( user:any | null ) => {
        if( user ) {
            // user is signed in
            setCurrentUser( user )
            console.log( user )
        }
        else {
            // user is not signed in
            setCurrentUser( null )
            console.log("signed out")
            router.navigate('../')
        }
    })

    const SignOutUser = () => {
        signOut( fbauth )
        .then( () => {
            // sign out successful
        })
        .catch( () => {
            // error occured
        })
    }

    return (
      <View>
        <Text>Account Page</Text>
        <Pressable onPress={ () => SignOutUser() }>
            <Text>Sign out</Text>
        </Pressable>
      </View>
    );
  }