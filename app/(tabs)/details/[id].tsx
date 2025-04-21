import { Text, View, StyleSheet,  Pressable, TextInput, Switch } from 'react-native'
import { useLocalSearchParams, Link, useNavigation } from 'expo-router'
import { useEffect, useContext, useState } from 'react'
import { FirestoreContext } from '@/contexts/FirestoreContext'
import { AuthenticationContext } from '@/contexts/AuthenticationContext'
import { doc, getDoc } from '@firebase/firestore'
import { ItemPrototype } from '@/interfaces/ItemInterface'

export default function DetailScreen(props: any) {
    const [documentData, setDocumentData] = useState<ItemPrototype | any>()
    const [ dataLoaded, setDataLoaded ] = useState<boolean>( false )
   

    // access navigation object via hook
    const navigation = useNavigation()
    // set screen options
    useEffect( () => {
        navigation.setOptions({ headerShown: false })
    }, [navigation])

   
    const { id }: any = useLocalSearchParams()
    const { name }:any = useLocalSearchParams()
    //const { status }:boolean = useLocalSearchParams()
    


    const db = useContext(FirestoreContext)
    const auth = useContext(AuthenticationContext)

    const getListItems = async () => {
        //console.log( dataLoaded )
        const ref = doc(db, `users/${auth.currentUser.uid}/documents`, id)
        const documents = await getDoc(ref)
        documents.forEach( (doc) => {
            console.log( doc.data() )
        })
        let data: ItemPrototype | any = document.data()
        //data.id = id
        console.log(data)
    }

    useEffect( () => {
        if(!dataLoaded) {
            getListItems()
            //setDataLoaded( true )
            console.log(id)
        }
    },[id])


    if (!documentData) {
        return (
            <Text>No data</Text>
        )
    }
    else {
        return (
            <View style={styles.page}>
                <View style={styles.itemHeader}>
                    <Text style={styles.itemHeaderText}>Detail for  {name}</Text>
                </View>
                <View style={styles.container}>
                    
                </View>

                <Link href="/" style={ styles.backButton }>
                    <Text>Go back</Text>
                </Link>
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