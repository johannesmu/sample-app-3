import { Text, View, StyleSheet,  Pressable, TextInput,  FlatList } from 'react-native'
import { useLocalSearchParams, Link, useNavigation } from 'expo-router'
import { useEffect, useContext, useState } from 'react'
import { FirestoreContext } from '@/contexts/FirestoreContext'
import { AuthenticationContext } from '@/contexts/AuthenticationContext'
import { doc, getDoc, getDocs, collection } from '@firebase/firestore'
import { ListPrototype } from '@/interfaces/ListInterface'

export default function DetailScreen(props: any) {
    const [list, setList] = useState<ListPrototype | any>()
    // access navigation object via hook
    const navigation = useNavigation()
    
    const { id }: any = useLocalSearchParams()
    const { name } = useLocalSearchParams()
    // set screen options
    useEffect( () => {
        navigation.setOptions({ headerShown: true, title: "List" })
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
        const ref = collection( db, `listusers/${auth.currentUser.uid}/lists/${list.id}`)
        const snapshot = await getDocs( ref )
        let listItems = []
        snapshot.forEach( ( item ) => {
            let listitem = item.data()
            listitem.id = 
        })
    }

    useEffect( () => { 
        //if( !loaded && auth ) {
            getList()
        //}      
    }, [id ])

    if (!list) {
        return null
    }
    else {
        return (
            <View style={styles.page}>
                <FlatList />
            </View>

        )
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 10,
    },
    itemHeader: {
        backgroundColor: "#f1f7b7",
        padding: 10,
    },
    itemHeaderText: {
        fontSize: 20,
        fontWeight: "bold",
    },
    backButton: {
        padding: 12,
    },
    editButton: {
        padding: 10,
        backgroundColor: "darkblue",
        marginVertical: 20,
    },
    editButtonText: {
        color: "white",
        textAlign: "center"
    },
    editButtonDisabled: {
        display: "none"
    }
})