import { Text, View, StyleSheet, FlatList, Modal, Pressable, TextInput } from 'react-native'
import { useState, useEffect, useContext } from 'react'
import { ListHeader } from '@/components/ListHeader'
import { ListItemSeparator } from '@/components/ListItemSeparator'
import { ListEmpty } from '@/components/ListEmpty'
import { ListPrototype } from '@/interfaces/ListInterface'
import { DisplayDate } from '@/components/DisplayDate'
import { FirestoreContext } from '@/contexts/FirestoreContext'
import { AuthenticationContext } from '@/contexts/AuthenticationContext'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'

import { collection, addDoc, getDocs } from '@firebase/firestore'

export default function List(props: any) {

    const db = useContext(FirestoreContext)
    const auth = useContext(AuthenticationContext)

    const [datastate, setDatastate] = useState<ListPrototype[] | any>([])
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [listName, setListName] = useState<string>('')
    const [dataloaded, setDataLoaded] = useState<boolean>(false)

    useEffect(() => {
        if (dataloaded == false && auth.currentUser) {
            getItems()
            setDataLoaded(true)
        }
    }, [dataloaded])

    useEffect( ()=>{
        setListName('')
    }, [modalVisible] )

    const addList = async () => {
        const userid = auth.currentUser.uid
        if (userid) {
            const path = collection(db, `listusers/${auth.currentUser.uid}/lists`)
            const docRef = addDoc(path, {
                name: listName, date: new Date().getTime()
            })
            setListName('')
            setDataLoaded(false)
        }
    }

    const getItems = async () => {
        if (auth.currentUser.uid) {
            const path = collection(db, `listusers/${auth.currentUser.uid}/lists`)
            const querySnapshot = await getDocs(path)
            let userData: ListPrototype[] = []
            querySnapshot.forEach((userDocument) => {
                let document: any = userDocument.data()
                document.id = userDocument.id
                userData.push(document)
            })
            console.log( userData )
            setDatastate(userData)
        }
    }

    const renderItem = ({ item }: any) => {
        return (
            <Link href={{
                pathname: '/listdetails/[id]',
                params: { id: item.id, date: item.date }
            }}>
                <View style={styles.item}>
                    <View>
                        <Text style={styles.itemName} >{item.name}</Text>
                        <Text>
                            added: <DisplayDate date={item.date} />
                        </Text>
                    </View>
                    <Ionicons name="chevron-forward-outline" size={16} />
                </View >
            </Link>
        )
    }

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.button}
                onPress={() => setModalVisible(true)}
            >
                <Ionicons style={styles.buttonText} name="add-outline" size={30} />
            </Pressable>
            <FlatList
                data={datastate}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListHeaderComponent={<ListHeader text="Your Lists" />}
                ListEmptyComponent={<ListEmpty text="You have no lists, add one" />}
                ItemSeparatorComponent={ListItemSeparator}
                style={styles.list}
            />
            {/* Modal to add lists */}
            <Modal visible={modalVisible} >
                <View style={styles.modalContainer}>

                    <Text style={styles.buttonText}>Name your list</Text>
                    <Pressable
                        style={styles.modalCloseButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <Ionicons
                            style={styles.modalCloseButtonText}
                            name="close-outline"
                            size={32}
                        />
                    </Pressable>
                    <View style={styles.modalForm}>
                        <Text>Name of List</Text>
                        <TextInput
                            style={styles.modalInput}
                            value={listName}
                            onChangeText={(val) => setListName(val)}
                            placeholder="name of your list (minimum 3 characters)"
                        />
                        <View style={styles.modalBar}>
                            <Pressable
                                onPress={() => {
                                    addList()
                                    setModalVisible(false)
                                }
                                }
                                style={( listName.length >= 3) ? styles.modalButton : styles.modalButtonDisabled}
                                disabled={ ( listName.length >= 3) ? false : true }
                            >
                                <Text style={styles.modalButtonText}>Submit</Text>
                            </Pressable>
                        </View>
                    </View>

                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        width: "100%",
    },
    item: {
        padding: 12,
        backgroundColor: "lightblue",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    itemName: {
        fontSize: 18
    },
    button: {
        padding: 10,
        backgroundColor: "black",
        position: "absolute",
        right: 20,
        top: 20,
        borderRadius: 25,
        width: 50,
        height: 50,
        zIndex: 100,
    },
    buttonText: {
        color: "white",
    },
    modalContainer: {
        flex: 1,
    },
    modalForm: {
        marginTop: 100,
        marginHorizontal: 30,
    },
    modalInput: {
        borderWidth: 1,
        borderColor: "#aaaaaa",
        borderStyle: "solid",
        padding: 8,
    },
    modalBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20,
    },
    modalButton: {
        padding: 10,
        backgroundColor: "#333333",
        width: "100%",
    },
    modalButtonDisabled: {
        padding: 10,
        backgroundColor: "#666666",
        width: "100%",
    },
    modalButtonText: {
        textAlign: "center",
        color: "#EEEEEE",
    },
    modalCloseButton: {
        padding: 10,
        width: 50,
        height: 50,
        position: "absolute",
        right: 10,
        top: 20,
    },
    modalCloseButtonText: {
        color: "#333333",
        textAlign: "center",
    }
})