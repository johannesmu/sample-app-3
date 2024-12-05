import { Text, View, StyleSheet, Pressable, TextInput, FlatList, Modal } from 'react-native'
import { useLocalSearchParams, Link, useNavigation } from 'expo-router'
import { useEffect, useContext, useState } from 'react'
import { FirestoreContext } from '@/contexts/FirestoreContext'
import { AuthenticationContext } from '@/contexts/AuthenticationContext'
import { doc, getDoc, getDocs, collection, addDoc } from '@firebase/firestore'
import { Ionicons } from '@expo/vector-icons'

import { ListPrototype } from '@/interfaces/ListInterface'
import { ListEmpty } from '@/components/ListEmpty'
import { ListHeader } from '@/components/ListHeader'
import { ListItemSeparator } from '@/components/ListItemSeparator'

import { ItemPrototype } from '@/interfaces/ItemInterface'

export default function DetailScreen(props: any) {
    const [list, setList] = useState<ListPrototype | any>()
    const [listItems, setListItems] = useState<any[]>()
    //modal states
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [itemName, setItemName] = useState<string>('')
    const [itemNote, setItemNote] = useState<string>('')
    // access navigation object via hook
    const navigation = useNavigation()

    const { id }: any = useLocalSearchParams()
    const { name } = useLocalSearchParams()

    // set screen options
    useEffect(() => {
        navigation.setOptions({
            title: "Go back to lists overview",
            headerRight: () => (
                <Pressable 
                    style={ styles.button } 
                    onPress={ () => setModalVisible(true) }
                >
                    <Ionicons style={ styles.buttonText } name="add" size={30} />
                </Pressable>
            )
        })
    }, [navigation])

    const db = useContext(FirestoreContext)
    const auth = useContext(AuthenticationContext)



    const getList = async () => {
        const ref = doc(db, `listusers/${auth.currentUser.uid}/lists`, id)
        const list = await getDoc(ref)
        let listData: ListPrototype | any = list.data()
        listData.id = id
        setList(listData)
        getListItems()
    }

    // get all items in the list
    const getListItems = async () => {
        const ref = collection(db, `listusers/${auth.currentUser.uid}/lists/${id}/items`)
        console.log(`listusers/${auth.currentUser.uid}/lists/${id}/items`)
        const snapshot = await getDocs(ref)
        let items:ItemPrototype[] = []
        snapshot.forEach((item) => {
            let listmember:any = item.data()
            listmember.id = item.id
            items.push(listmember)
        })
        setListItems( items )
    }
    // add an item to the list
    const addListItem = async () => {
        const colRef = collection( db, `listusers/${auth.currentUser.uid}/lists/${id}/items`)
        const data = { name: itemName, note: itemNote, date: new Date().getTime(), status: false  }
        const document = await addDoc( colRef , data )
        console.log( document.id )
        // clear the input and notes ready for next input
        setItemName('')
        setItemNote('')
        getListItems()
    }

    useEffect(() => {
        if (auth) {
            //console.log( auth )
            getList()
        }
    }, [id])

    // list renderer
    const renderItems = ({ item }: any) => (
        <Link href={{ 
            pathname: "/(details)/itemdetail",
            params: { id: item.id, name: item.name, list: id }
        }}
        >
            <View style={ styles.item }>
                <Text>{item.name}</Text>
            </View>
        </Link>
    )

    if (list) {
        return (
            <View style={styles.page}>
                <FlatList
                    data={listItems}
                    renderItem={renderItems}
                    ListEmptyComponent={<ListEmpty text="You have no items! Add some to this list" />}
                    ListHeaderComponent={<ListHeader text={list.name} />}
                    ItemSeparatorComponent={ListItemSeparator}
                />
                <Modal visible={ modalVisible }>
                    <Pressable style={styles.modalCloseButton} onPress={ () => setModalVisible( false) }>
                        <Ionicons name="close" size={30} />
                    </Pressable>
                    <View style={ styles.modalContainer }>
                        <Text style={ styles.modalLabel }>Name of Item</Text>
                        <TextInput 
                            style={ styles.modalInput }
                            value={ itemName } 
                            placeholder="Name of the item"
                            onChangeText={ (val) => setItemName(val) }
                        />
                        <Text style={ styles.modalLabel }>Notes for Item</Text>
                        <TextInput 
                            multiline={true} 
                            style={ styles.modalInput }
                            placeholder='Notes for item (optional)'
                            numberOfLines={4}
                            value={itemNote}
                            onChangeText={ (val) => setItemNote(val) }
                        />
                        <Pressable 
                            style={ styles.modalSaveButton }
                            onPress={ () => {
                                addListItem()
                                setModalVisible( false )
                            } }
                        >
                            <Text style={ styles.modalSaveButtonText }>Add Item</Text>
                        </Pressable>
                    </View>
                </Modal>
            </View>
        )
    }
    else {
        return null
    }

}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 25,
        width: 50,
        height: 50,
        backgroundColor: "darkgreen",
        marginRight: 10,
    },
    buttonText: {
        color: "white",
    },
    modalContainer: {
        flex: 1,
        padding: 20,
        marginTop: 100,
    },
    page: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 10,
        marginTop: 100,
    },
    modalCloseButton: {
        position: "absolute",
        right: 10,
        top: 10,
        zIndex: 100,
    },
    modalInput: {
        padding: 10,
        borderColor: "#666666",
        borderWidth: 2,
        marginBottom: 15,
        borderRadius: 4,
    },
    modalLabel: {
        fontWeight: 600,
    },
    modalSaveButton: {
        width: "100%",
        padding: 10,
        backgroundColor: "#333333",
    },
    modalSaveButtonText: {
        color: "#EEEEEE",
        textAlign: "center",
    },
    item: {
        padding: 10,
    }
})