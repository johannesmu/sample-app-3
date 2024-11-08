import { Text, View, StyleSheet, FlatList, Modal, Pressable, TextInput } from 'react-native'
import { useLocalSearchParams, Link } from 'expo-router'
import { useEffect, useContext, useState } from 'react'
import { FirestoreContext } from '@/contexts/FirestoreContext'
import { AuthenticationContext } from '@/contexts/AuthenticationContext'
import { doc, getDoc } from '@firebase/firestore'
import { onAuthStateChanged } from '@firebase/auth'

export default function DetailScreen( props:any ) {
    const[ loaded, setLoaded ] = useState( false )

    const {id} = useLocalSearchParams()
    const {name} = useLocalSearchParams()
   

    const db = useContext( FirestoreContext )
    const auth = useContext( AuthenticationContext )

    const getDocument = async () => {
        const ref = doc( db, `users/${auth.currentUser.uid}/documents`, id )
        const document = await getDoc( ref )
        console.log( document.data() )
    }

    

    onAuthStateChanged( auth, (user) => {
        if(user) {
            getDocument()
        }
    })

    return(
        <View style={ styles.container }>
            <View style={ styles.itemHeader }>
                <Text style={ styles.itemHeaderText}>Detail for  {name}</Text>
            </View>
            <Text>Detail for document with {name}</Text>
            
            <Link href="/(tabs)/list">
                <Text>Go back</Text>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    itemHeader: {
        backgroundColor: "#f1f7b7",
        padding: 10,
    },
    itemHeaderText: {
        fontSize: 16,
    }
})