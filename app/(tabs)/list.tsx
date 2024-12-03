import { Text, View, StyleSheet, FlatList, Modal, Pressable, TextInput } from 'react-native'
import { useState, useEffect, useContext } from 'react'
import { ListHeader } from '@/components/ListHeader'
import { ListItemSeparator } from '@/components/ListItemSeparator'
import { ItemPrototype } from '@/interfaces/ItemInterface'
import { FirestoreContext } from '@/contexts/FirestoreContext'
import { AuthenticationContext } from '@/contexts/AuthenticationContext'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, Link } from 'expo-router'

import { collection, addDoc, getDocs } from '@firebase/firestore'

export default function List(props: any) {

    const db = useContext(FirestoreContext)
    const auth = useContext(AuthenticationContext)
    const navigation = useNavigation()

    const [datastate, setDatastate] = useState<ItemPrototype | any>([])
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [itemName, setItemName] = useState<string | undefined>()
    const [dataloaded, setDataLoaded] = useState<boolean>(false)
    
    useEffect(() => {
        if (dataloaded == false && auth.currentUser) {
            getItems()
            setDataLoaded(true)
        }
    }, [dataloaded])

    const addItem = async () => {
        const userid = auth.currentUser.uid
        if (userid) {
            const path = collection(db, `users/${auth.currentUser.uid}/documents`)
            const docRef = addDoc(path, {
                name: itemName, status: false
            })
            setItemName('')
            setDataLoaded(false)
        }
    }

    const getItems = async () => {
        if (auth.currentUser.uid) {
            const path = collection(db, `users/${auth.currentUser.uid}/documents`)
            const querySnapshot = await getDocs(path)
            let userData: ItemPrototype[] = []
            querySnapshot.forEach((userDocument) => {
                let document: any = userDocument.data()
                document.id = userDocument.id
                userData.push(document)
            })
            console.log('data')
            setDatastate(userData)
        }
    }

    const renderItem = ({ item }: any) => {
        return (

            <View style={(item.status) ? styles.item : styles.itemOut}>
                <Link 
                    style={styles.itemLink} 
                    href={{
                    pathname: '/detail',
                    params: { id: item.id, name: item.name, status: item.status }
                }}>
                    <Text>{item.name}</Text>
                    <Ionicons name="chevron-forward-outline" />
                </View >
            </Link>
        )
    }

    return (
        <View>
            <Text>List View</Text>
            <Pressable
                style={styles.button}
                onPress={() => setModalVisible(true)}
            >
                <Ionicons style={styles.buttonText} name="add-outline" size={18} />
                <Text style={styles.buttonText}>
                    Add Data
                </Text>
            </Pressable>
            <FlatList
                data={datastate}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListHeaderComponent={<ListHeader text="List Header" />}
                ItemSeparatorComponent={ListItemSeparator}
                style={styles.list}
            />
            <Modal visible={modalVisible} >
                <View style={styles.container}>
                    <View style={styles.modalBar}>
                        <Text style={styles.buttonText}>Add details for new item</Text>
                        <Pressable
                            style={styles.button}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                            <Ionicons style={styles.buttonText} name="close-outline" size={18} />
                        </Pressable>
                    </View>

                    <Text>Name of Item</Text>
                    <TextInput
                        value={itemName}
                        onChangeText={(val) => setItemName(val)}
                        style={styles.modalInput}
                    />
                    <View style={styles.modalBar}>
                        <Pressable
                            onPress={() => {
                                addItem()
                                setModalVisible(false)
                            }
                            }
                            style={styles.modalButton}
                        >
                            <Text style={styles.buttonText}>Submit</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => setModalVisible(false)}
                            style={styles.modalButton}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        width: "100%",
        flex: 1,
    },
    itemLink: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
    },
    item: {
        padding: 0,
        backgroundColor: "lightblue",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    itemOut: {
        padding: 0,
        backgroundColor: "lightgreen",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    button: {
        padding: 10,
        backgroundColor: "black",
        flexDirection: "row",
        gap: 20,
    },
    buttonText: {
        color: "white",
    },
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: "#f7eccd",
    },
    modalBar: {
        backgroundColor: "#333333",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    modalInput: {
        backgroundColor: "white",
        padding: 8,
    },
    modalButton: {
        padding: 10,
    }
})