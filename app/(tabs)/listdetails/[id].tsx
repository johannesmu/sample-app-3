import { Text, View, StyleSheet,  Pressable, TextInput, Switch, FlatList } from 'react-native'
import { useLocalSearchParams, Link, useNavigation } from 'expo-router'
import { useEffect, useContext, useState } from 'react'
import { FirestoreContext } from '@/contexts/FirestoreContext'
import { AuthenticationContext } from '@/contexts/AuthenticationContext'
import { doc, getDoc } from '@firebase/firestore'
import { ListPrototype } from '@/interfaces/ListInterface'

export default function DetailScreen(props: any) {
    const [documentData, setDocumentData] = useState<ListPrototype | any>()
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

    const getDocument = async () => {
        const ref = doc(db, `listusers/${auth.currentUser.uid}/lists`, id)
        const document = await getDoc(ref)
        let data: ListPrototype | any = document.data()
        data.id = id
        setDocumentData(data)
    }

    useEffect( () => { 
        //if( !loaded && auth ) {
            getDocument()
        //}      
    }, [id ])

    if (!documentData) {
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