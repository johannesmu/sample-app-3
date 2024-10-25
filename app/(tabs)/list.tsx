import { Text, View, StyleSheet, FlatList, Modal, Pressable, TextInput } from 'react-native'
import { useState, useEffect, useContext } from 'react'
import { ListHeader } from '@/components/ListHeader'
import { ItemPrototype } from '@/interfaces/ItemInterface'
import { FirestoreContext } from '@/contexts/FirestoreContext'
import { AuthenticationContext } from '@/contexts/AuthenticationContext'
import { Ionicons } from '@expo/vector-icons'

import { collection, addDoc } from '@firebase/firestore'

export default function List( props:any ) {

    const db = useContext( FirestoreContext )
    const auth = useContext( AuthenticationContext )

    // data inside component
    const listData:ItemPrototype[] = [
        { id: 1, name: "item 1", status:true},
        { id: 2, name: "item 2", status: false},
        { id: 3, name: "item 3", status: true},
        { id: 4, name: "item 4", status: false},
        { id: 5, name: "item 5", status: true},
    ]

    const[ datastate, setDatastate ] = useState<ItemPrototype | any>([])
    const[ modalVisible, setModalVisible ] = useState<boolean> ( false )
    const[ itemName, setItemName ] = useState<string | undefined>()

    useEffect( () => {
        if( datastate.length == 0 ) {
            setDatastate( listData )
        }
    })

    const addItem = async () => {
        const userid = auth.currentUser.uid
        if( userid ) {
            const path = collection( db, `users/${userid}/documents`)
            const docRef = addDoc( path, {
                name: itemName, status: false
            })
            setItemName('')
        }
    }

    const renderItem = ({item}:any) => {
        return (
            <View style={ (item.status) ? styles.item : styles.itemOut }>
                <Text>{ item.name }</Text>
            </View>
        )
    }

    return (
        <View>
            <Text>List View</Text>
            <Pressable 
                style={ styles.button }
                onPress={ () => setModalVisible(true) }
            >
                <Text style={ styles.buttonText}>
                    <Ionicons name="add-outline" size={18} />
                    Add Data
                </Text>
            </Pressable>
            <FlatList
                data = { datastate }
                renderItem={ renderItem }
                keyExtractor={item => item.id }
                ListHeaderComponent={ <ListHeader text="List Header" />}
            />
            <Modal visible={ modalVisible } >
                <View>
                    <Text>Name of Item</Text>
                    <TextInput 
                        value={ itemName} 
                        onChangeText={(val) => setItemName(val)}
                    />
                    <Pressable
                        onPress={ () => addItem() }
                    >
                        <Text>Submit</Text>
                    </Pressable>
                    <Pressable 
                        onPress={ () => setModalVisible(false) }
                    >
                        <Text>Cancel</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 12,
        backgroundColor: "lightblue",
    },
    itemOut: {
        padding: 12,
        backgroundColor: "lightgreen",
    },
    button: {
        padding: 10,
        backgroundColor: "black",
    },
    buttonText: {
        color: "white",
    }

})