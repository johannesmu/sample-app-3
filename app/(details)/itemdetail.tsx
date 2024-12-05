import { View, Text, TextInput, StyleSheet } from 'react-native'
import { useContext, useState, useEffect } from 'react'
import { useLocalSearchParams, Link, useNavigation } from 'expo-router'
// contexts
import { AuthenticationContext } from '@/contexts/AuthenticationContext'
import { FirestoreContext } from '@/contexts/FirestoreContext'
import { doc, getDoc, getDocs, collection, updateDoc, deleteDoc } from '@firebase/firestore'
// interface
import { ItemPrototype } from '@/interfaces/ItemInterface'


export default function ItemDetail( props:any ) {
    const [ listItem, setListItem ] = useState<ItemPrototype>({
        id: '', name: '', date: 0, note: '', status: false
    })

    const auth = useContext( AuthenticationContext )
    const db = useContext( FirestoreContext )

    const { id } = useLocalSearchParams()
    const { name } = useLocalSearchParams()
    const { list } = useLocalSearchParams()

    const navigation = useNavigation()

    const getItem = () => {
        const ref = doc( db, `listusers/${auth.currentUser.uid}/lists/${list}/items/`, id )


    }

    useEffect( () => {
        navigation.setOptions({ title: "Detail for " + name })
    }, [id])

    return (
        <View style={ styles.container }>
            <Text>Detail for { id }</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    }
})