import { Text, View, StyleSheet, Pressable, TextInput, FlatList, Modal } from 'react-native'
import { useLocalSearchParams, Link, useNavigation } from 'expo-router'
import { useEffect, useContext, useState } from 'react'
import { FirestoreContext } from '@/contexts/FirestoreContext'
import { AuthenticationContext } from '@/contexts/AuthenticationContext'
import { doc, getDoc, getDocs, collection } from '@firebase/firestore'
import { Ionicons } from '@expo/vector-icons'

import { ListPrototype } from '@/interfaces/ListInterface'
import { ListEmpty } from '@/components/ListEmpty'
import { ListHeader } from '@/components/ListHeader'

export default function DetailScreen(props: any) {
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [list, setList] = useState<ListPrototype | any>()
    const [listItems, setListItems] = useState<any[]>()
    // access navigation object via hook
    const navigation = useNavigation()

    const { id }: any = useLocalSearchParams()
    const { name } = useLocalSearchParams()

    // component for header button
    const addButton = () => {
        return (
            <Pressable>
                <Ionicons name="add" size={16} />
            </Pressable>
        )
    }
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
    }

    // get all items in the list
    const getListItems = async () => {
        const ref = collection(db, `listusers/${auth.currentUser.uid}/lists/${list.id}`)
        const snapshot = await getDocs(ref)
        let listItems = []
        snapshot.forEach((item) => {
            let listmember = item.data()
            listmember.id = item.id
            listItems.push(listmember)
        })
    }

    useEffect(() => {
        if (auth) {
            //console.log( auth )
            getList()
        }
    }, [id])

    // list renderer
    const renderItems = ({ item }: any) => (
        <Text>
            {item.name}
        </Text>
    )

    if (list) {
        return (
            <View style={styles.page}>
                <FlatList
                    data={listItems}
                    renderItem={renderItems}
                    ListEmptyComponent={<ListEmpty text="You have no items! Add some to this list" />}
                    ListHeaderComponent={<ListHeader text={list.name} />}
                />
                <Modal visible={ modalVisible }>
                    <Pressable style={styles.modalButton} onPress={ () => setModalVisible( false) }>
                        <Ionicons name="close" size={30} />
                    </Pressable>
                    <View style={ styles.modalContainer }>
                        <Text>Modal content</Text>
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
    },
    page: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 10,
        marginTop: 100,
    },
    modalButton: {
        position: "absolute",
        right: 10,
        top: 10,
        zIndex: 100,
    }
})