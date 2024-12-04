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
            router.navigate('/login')
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
        <Image style={ styles.image} source={ require('@/assets/images/profile.jpg') } />
        <Text>Account Page</Text>
        <Pressable onPress={ () => SignOutUser() }>
            <Text>Sign out</Text>
        </Pressable>
      </View>
    );
  }

  const styles = StyleSheet.create( {
    image: {
        width: 100,
        height: 100,
    },
  })